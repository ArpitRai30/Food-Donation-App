export type DonationStatus = 'Available' | 'Claimed' | 'Approved' | 'Picked Up';

export interface Donation {
  id: string;
  donor: string;
  foodType: string;
  quantity: string;
  expirationDate: string;
  location: {
    address: string;
    latitude: number;
    longitude: number;
  };
  status: DonationStatus;
  imageUrl: string;
  dataAiHint: string;
}

export interface AppNotification {
  id: string;
  message: string;
  timestamp: string;
  donationId: string;
}

export type SmartDonationSuggestion = {
  organizationName: string;
  reason: string;
  contactInformation: string;
};
