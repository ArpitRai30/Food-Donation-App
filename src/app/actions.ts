'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { smartDonationMatching, type SmartDonationMatchingInput } from '@/ai/flows/smart-donation-matching';

// This is a mock database. In a real app, you'd use a database.
import { donations } from '@/lib/data';
import type { Donation, DonationStatus } from '@/lib/types';

const AddDonationSchema = z.object({
  foodType: z.string().min(1, 'Food type is required.'),
  quantity: z.string().min(1, 'Quantity is required.'),
  expirationDate: z.date({ required_error: 'Expiration date is required.' }),
  location: z.string().min(1, 'Location is required.'),
  donor: z.string().min(1, 'Donor name is required.'),
});

export async function addDonationAction(prevState: any, formData: FormData) {
  const validatedFields = AddDonationSchema.safeParse({
    foodType: formData.get('foodType'),
    quantity: formData.get('quantity'),
    expirationDate: new Date(formData.get('expirationDate') as string),
    location: formData.get('location'),
    donor: formData.get('donor'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Error: Please check the form fields.',
    };
  }

  const newDonation: Donation = {
    id: String(Date.now()),
    ...validatedFields.data,
    location: {
        address: validatedFields.data.location,
        // TODO: Geocode the address to get lat/lng
        latitude: 39.7817,
        longitude: -89.6501,
    },
    expirationDate: validatedFields.data.expirationDate.toISOString().split('T')[0],
    status: 'Available',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: validatedFields.data.foodType.toLowerCase().split(' ').slice(0, 2).join(' '),
    otp: null,
  };

  donations.unshift(newDonation); // Add to the start of the array
  revalidatePath('/browse');
  
  return {
    message: `Successfully added donation for ${validatedFields.data.foodType}.`,
  };
}


export async function claimDonationAction(donationId: string) {
  try {
    const donation = donations.find(d => d.id === donationId);
    if (donation && donation.status === 'Available') {
      donation.status = 'Claimed';
      donation.otp = String(Math.floor(100000 + Math.random() * 900000));
      revalidatePath('/browse');
      return { success: true, message: 'Donation claimed successfully!' };
    }
    return { success: false, message: 'Donation could not be claimed.' };
  } catch (error) {
    return { success: false, message: 'An error occurred.' };
  }
}

export async function verifyOtpAction(prevState: any, formData: FormData) {
  const donationId = formData.get('donationId') as string;
  const otp = formData.get('otp') as string;
  
  if (!donationId || !otp) {
    return { success: false, message: 'Donation ID and OTP are required.' };
  }

  try {
    const donation = donations.find(d => d.id === donationId);
    if (donation && donation.otp === otp) {
      donation.status = 'Approved';
      revalidatePath('/browse');
      revalidatePath(`/otp/${donationId}`);
      return { success: true, message: 'OTP verified successfully! The donation is approved for pickup.' };
    }
    return { success: false, message: 'Invalid OTP. Please try again.' };
  } catch (error) {
    return { success: false, message: 'An error occurred during OTP verification.' };
  }
}

export async function getSmartMatchingSuggestions(input: SmartDonationMatchingInput) {
    try {
        const result = await smartDonationMatching(input);
        return { success: true, data: result.suggestedRecipients };
    } catch(error) {
        console.error(error);
        return { success: false, message: 'Failed to get smart matching suggestions.' };
    }
}