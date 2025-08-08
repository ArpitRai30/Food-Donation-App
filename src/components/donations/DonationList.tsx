'use client';

import { useState } from 'react';
import type { Donation } from '@/lib/types';
import DonationCard from './DonationCard';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { MapPin, Search } from 'lucide-react';

interface DonationListProps {
  initialDonations: Donation[];
}

const allStatuses = ['Available', 'Claimed', 'Approved', 'Picked Up'];

// Mock distance calculation. Replace with a real one using a geocoding service.
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  // This is a simplified calculation (Haversine formula) and doesn't account for driving distance.
  const R = 6371; // Radius of the Earth in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance;
}


export default function DonationList({ initialDonations }: DonationListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [radius, setRadius] = useState(20);
  const [userLocation, setUserLocation] = useState<{lat: number, lon: number} | null>(null);

  const filteredDonations = initialDonations.filter((donation) => {
    const matchesSearch =
      donation.foodType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donation.donor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || donation.status === statusFilter;

    // TODO: This is a mock implementation.
    // In a real app, you would use a geocoding API to get coordinates for the user's entered location.
    // For now, if a user location is entered but not geocoded, we assume it doesn't match.
    const matchesLocation = userLocation
      ? calculateDistance(userLocation.lat, userLocation.lon, donation.location.latitude, donation.location.longitude) <= radius
      : true;

    return matchesSearch && matchesStatus && matchesLocation;
  });

  const handleLocationSearch = (address: string) => {
      // In a real app, you would use a geocoding service here.
      // For this example, we'll use a mock location for "Springfield" if the user types it.
      if (address.toLowerCase().includes('springfield')) {
          setUserLocation({ lat: 39.7817, lon: -89.6501 });
      } else {
          setUserLocation(null);
      }
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <div className="relative flex-1 md:col-span-2 lg:col-span-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search by food type or donor..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Statuses</SelectItem>
            {allStatuses.map((status) => (
              <SelectItem key={status} value={status}>
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
         <div className="relative flex-1 md:col-span-2 lg:col-span-1">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
                type="text"
                placeholder="Enter your address or city"
                className="pl-10"
                onChange={(e) => handleLocationSearch(e.target.value)}
            />
        </div>
        <div className="flex flex-col gap-2 md:col-span-2">
            <div className="flex justify-between items-center">
                <Label htmlFor="radius">Search Radius</Label>
                <span className="text-sm font-medium text-muted-foreground">{radius} km</span>
            </div>
            <Slider
                id="radius"
                min={1}
                max={100}
                step={1}
                value={[radius]}
                onValueChange={(value) => setRadius(value[0])}
            />
        </div>
      </div>

      {filteredDonations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDonations.map((donation) => (
            <DonationCard key={donation.id} donation={donation} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-xl text-muted-foreground">No donations match your filters.</p>
        </div>
      )}
    </div>
  );
}
