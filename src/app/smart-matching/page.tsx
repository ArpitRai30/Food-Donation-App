import SmartMatch from '@/components/smart-matching/SmartMatch';

export default function SmartMatchingPage() {
  return (
    <div className="container mx-auto max-w-4xl py-8 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-8">
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-gray-800 dark:text-white">
          Find the Perfect Match
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Use our AI-powered tool to find the best recipient for your donation.
        </p>
      </div>
      <SmartMatch />
    </div>
  );
}
