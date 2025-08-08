'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Donation, DonationStatus } from '@/lib/types';
import { Calendar, HandHelping, MapPin, Package, KeyRound, ShieldCheck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { claimDonationAction } from '@/app/actions';
import { cn } from '@/lib/utils';
import { useTransition } from 'react';

interface DonationCardProps {
  donation: Donation;
}

const statusColors: Record<DonationStatus, string> = {
  Available: 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800/40',
  Claimed: 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-800/40',
  Approved: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800/40',
  'Picked Up': 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/20 dark:text-gray-300 dark:border-gray-800/40',
};

export default function DonationCard({ donation }: DonationCardProps) {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const handleClaim = () => {
    startTransition(async () => {
      const result = await claimDonationAction(donation.id);
      if (result.success) {
        toast({
          title: 'Success!',
          description: result.message,
        });
      } else {
        toast({
          title: 'Error',
          description: result.message,
          variant: 'destructive',
        });
      }
    });
  };
  
  const isClaimable = donation.status === 'Available';
  const isVerifiable = donation.status === 'Claimed';

  return (
    <Card className="flex flex-col overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl dark:hover:shadow-primary/10">
      <div className="relative w-full h-48">
        <Image
          src={donation.imageUrl}
          alt={donation.foodType}
          fill
          className="object-cover"
          data-ai-hint={donation.dataAiHint}
        />
      </div>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">{donation.foodType}</CardTitle>
        <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">by {donation.donor}</p>
            <Badge variant="outline" className={cn('font-semibold', statusColors[donation.status])}>
              {donation.status}
            </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-grow space-y-3">
        <div className="flex items-center text-sm">
          <Package className="w-4 h-4 mr-2 text-primary" />
          <span>{donation.quantity}</span>
        </div>
        <div className="flex items-center text-sm">
          <Calendar className="w-4 h-4 mr-2 text-primary" />
          <span>Expires: {new Date(donation.expirationDate).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center text-sm">
          <MapPin className="w-4 h-4 mr-2 text-primary" />
          <span>{donation.location.address}</span>
        </div>
        {isVerifiable && donation.otp && (
            <div className="flex items-center text-sm font-mono bg-muted p-2 rounded-md justify-center">
                <KeyRound className="w-4 h-4 mr-2 text-accent"/>
                <span className="tracking-widest">{donation.otp}</span>
            </div>
        )}
      </CardContent>
      <CardFooter>
        {isClaimable && (
            <Button
              onClick={handleClaim}
              disabled={isPending}
              className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
            >
              <HandHelping className="w-4 h-4 mr-2" />
              {isPending ? 'Claiming...' : 'Claim'}
            </Button>
        )}
        {isVerifiable && (
            <Button asChild className="w-full">
                <Link href={`/otp/${donation.id}`}>
                    <ShieldCheck className="w-4 h-4 mr-2" />
                    Verify Pickup
                </Link>
            </Button>
        )}
      </CardFooter>
    </Card>
  );
}