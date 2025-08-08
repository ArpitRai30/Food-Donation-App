import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Donation } from '@/lib/types';

interface DonationsMapProps {
  donations: Donation[];
}

export default function DonationsMap({ donations }: DonationsMapProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Donation Locations</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full h-[600px] bg-muted rounded-lg flex items-center justify-center relative overflow-hidden">
          <Image
            src="https://placehold.co/1200x800.png"
            alt="Map of donation locations"
            fill
            className="object-cover"
            data-ai-hint="city map"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          <div className="relative z-10 text-center p-4 bg-background/80 rounded-lg backdrop-blur-sm">
            <h3 className="text-lg font-bold">Interactive Map Coming Soon</h3>
            <p className="text-muted-foreground">
              To enable the interactive map, please add your Google Maps API key.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
