import DonationList from '@/components/donations/DonationList';
import { donations } from '@/lib/data';

export default function VolunteerPage() {
  const openDonations = donations.filter(d => d.status === 'Approved');

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-8">
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-gray-800 dark:text-white">
          Volunteer for Transportation
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Browse approved donations that need to be transported.
        </p>
      </div>
      <DonationList initialDonations={openDonations} />
    </div>
  );
}