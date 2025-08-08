import DonationForm from '@/components/donations/DonationForm';

export default function DonatePage() {
  return (
    <div className="container mx-auto max-w-2xl py-8 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-8">
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-gray-800 dark:text-white">
          Share Your Surplus
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Fill out the form below to list a new food donation.
        </p>
      </div>
      <DonationForm />
    </div>
  );
}
