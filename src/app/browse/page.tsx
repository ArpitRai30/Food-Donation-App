import { donations } from '@/lib/data';
import DonationList from '@/components/donations/DonationList';
import DonationsMap from '@/components/map/DonationsMap';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function BrowsePage() {
  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-8">
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-gray-800 dark:text-white">
          Find Donations Near You
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Browse available food donations and help reduce waste in our community.
        </p>
      </div>

      <Tabs defaultValue="list" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:w-96 mx-auto">
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="map">Map View</TabsTrigger>
        </TabsList>
        <TabsContent value="list" className="mt-8">
          <DonationList initialDonations={donations} />
        </TabsContent>
        <TabsContent value="map" className="mt-8">
          <DonationsMap donations={donations} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
