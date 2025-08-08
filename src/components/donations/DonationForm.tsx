'use client';

import React, { useActionState, useEffect, useRef } from 'react';
import { useFormStatus } from 'react-dom';
import { addDonationAction } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Calendar as CalendarIcon, PlusCircle } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

const initialState = {
  message: '',
  errors: {},
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
      <PlusCircle className="mr-2 h-4 w-4" />
      {pending ? 'Adding Donation...' : 'Add Donation'}
    </Button>
  );
}

export default function DonationForm() {
  const [state, formAction] = useActionState(addDonationAction, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [date, setDate] = React.useState<Date>();

  useEffect(() => {
    if (state.message) {
      if (state.errors && Object.keys(state.errors).length > 0) {
        toast({
          title: 'Error',
          description: state.message,
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Success!',
          description: state.message,
        });
        formRef.current?.reset();
        setDate(undefined);
      }
    }
  }, [state, toast]);

  return (
    <Card>
      <form ref={formRef} action={formAction}>
        <CardHeader>
          <CardTitle className="font-headline">Donation Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="donor">Your Business Name</Label>
            <Input id="donor" name="donor" placeholder="e.g., The Corner Cafe" />
            {state.errors?.donor && <p className="text-sm font-medium text-destructive">{state.errors.donor[0]}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="foodType">Food Type</Label>
            <Input id="foodType" name="foodType" placeholder="e.g., Fresh Produce, Canned Goods" />
            {state.errors?.foodType && <p className="text-sm font-medium text-destructive">{state.errors.foodType[0]}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity</Label>
            <Input id="quantity" name="quantity" placeholder="e.g., 15 boxes, 3 large bags" />
            {state.errors?.quantity && <p className="text-sm font-medium text-destructive">{state.errors.quantity[0]}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="expirationDate">Expiration Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={'outline'}
                  className={cn(
                    'w-full justify-start text-left font-normal',
                    !date && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, 'PPP') : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <input type="hidden" name="expirationDate" value={date?.toISOString()} />
            {state.errors?.expirationDate && <p className="text-sm font-medium text-destructive">{state.errors.expirationDate[0]}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Pickup Location</Label>
            <Textarea id="location" name="location" placeholder="e.g., 123 Main St, Springfield" />
            {state.errors?.location && <p className="text-sm font-medium text-destructive">{state.errors.location[0]}</p>}
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton />
        </CardFooter>
      </form>
    </Card>
  );
}
