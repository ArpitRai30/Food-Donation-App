import OtpVerification from '@/components/donations/OtpVerification';
import { donations } from '@/lib/data';
import { notFound } from 'next/navigation';

export default function OtpPage({ params }: { params: { donationId: string } }) {
  const donation = donations.find(d => d.id === params.donationId);

  if (!donation) {
    notFound();
  }

  return (
    <div className="container mx-auto max-w-md py-8 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-8">
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-gray-800 dark:text-white">
          Verify Donation Pickup
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Enter the OTP from the receiver to confirm the pickup.
        </p>
      </div>
      <OtpVerification donation={donation} />
    </div>
  );
}