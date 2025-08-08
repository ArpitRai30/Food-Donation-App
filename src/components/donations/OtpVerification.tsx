'use client';

import { useActionState, useEffect, useRef } from 'react';
import { verifyOtpAction } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, ShieldCheck } from 'lucide-react';
import type { Donation } from '@/lib/types';
import { useFormStatus } from 'react-dom';

const initialState = {
  success: false,
  message: '',
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <ShieldCheck className="mr-2 h-4 w-4" />
      )}
      {pending ? 'Verifying...' : 'Verify & Approve'}
    </Button>
  );
}

export default function OtpVerification({ donation }: { donation: Donation }) {
  const [state, formAction] = useActionState(verifyOtpAction, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast({
          title: 'Success!',
          description: state.message,
        });
      } else {
        toast({
          title: 'Error',
          description: state.message,
          variant: 'destructive',
        });
      }
    }
  }, [state, toast]);
  
  if (donation.status !== 'Claimed') {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Verification Status</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-center text-lg">This donation is now <span className="font-bold">{donation.status}</span>.</p>
            </CardContent>
        </Card>
    )
  }

  return (
    <Card>
      <form ref={formRef} action={formAction}>
        <CardHeader>
          <CardTitle>Enter OTP</CardTitle>
        </CardHeader>
        <CardContent>
          <input type="hidden" name="donationId" value={donation.id} />
          <div className="space-y-2">
            <Label htmlFor="otp">One-Time Password</Label>
            <Input
              id="otp"
              name="otp"
              type="text"
              placeholder="Enter 6-digit OTP"
              maxLength={6}
              className="text-center text-2xl tracking-[0.5em] font-mono"
            />
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton />
        </CardFooter>
      </form>
    </Card>
  );
}