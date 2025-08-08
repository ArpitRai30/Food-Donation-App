'use client';

import { useState } from 'react';
import type { SmartDonationSuggestion } from '@/lib/types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Sparkles, Building, Info, Phone } from 'lucide-react';
import { getSmartMatchingSuggestions } from '@/app/actions';
import type { SmartDonationMatchingInput } from '@/ai/flows/smart-donation-matching';

const formSchema = z.object({
  foodType: z.string().min(1, 'Food type is required.'),
  quantity: z.string().min(1, 'Quantity is required.'),
  expirationDate: z.string().min(1, 'Expiration date is required.'),
  donorLocation: z.string().min(1, 'Donor location is required.'),
  recipientOrganizationPreferences: z.string().optional(),
});

export default function SmartMatch() {
  const [suggestions, setSuggestions] = useState<SmartDonationSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      foodType: '',
      quantity: '',
      expirationDate: '',
      donorLocation: '',
      recipientOrganizationPreferences: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError(null);
    setSuggestions([]);

    const result = await getSmartMatchingSuggestions(values as SmartDonationMatchingInput);

    if (result.success && result.data) {
      setSuggestions(result.data);
    } else {
      setError(result.message || 'An unknown error occurred.');
    }
    setIsLoading(false);
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Describe Your Donation</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="foodType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Food Type</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Canned Goods" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantity</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 50 lbs" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="expirationDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Expiration Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="donorLocation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Donor Location</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Springfield, IL" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="recipientOrganizationPreferences"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Recipient Preferences (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., Prefers non-perishables, requires delivery"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="mr-2 h-4 w-4" />
                )}
                {isLoading ? 'Analyzing...' : 'Get Suggestions'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      {isLoading && (
        <div className="text-center py-8">
            <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary"/>
            <p className="mt-4 text-muted-foreground">Finding the best matches...</p>
        </div>
      )}

      {error && (
        <div className="text-center py-8 text-destructive">
            <p>{error}</p>
        </div>
      )}

      {suggestions.length > 0 && (
        <div>
          <h2 className="font-headline text-3xl font-bold text-center mb-8">Suggested Recipients</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {suggestions.map((suggestion, index) => (
              <Card key={index} className="flex flex-col">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="w-6 h-6 text-primary"/>
                    {suggestion.organizationName}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 flex-grow">
                  <div className="flex items-start text-sm">
                    <Info className="w-4 h-4 mr-2 mt-0.5 shrink-0 text-accent"/>
                    <span className="text-muted-foreground">{suggestion.reason}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Phone className="w-4 h-4 mr-2 shrink-0 text-accent"/>
                    <span className="font-medium">{suggestion.contactInformation}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
