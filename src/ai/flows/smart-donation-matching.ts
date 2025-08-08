'use server';

/**
 * @fileOverview This file implements the Smart Donation Matching flow.
 *
 * It analyzes donation patterns and suggests the most suitable recipient organizations for each donation,
 * optimizing food distribution and reducing waste.
 *
 * @exports {
 *   smartDonationMatching: (input: SmartDonationMatchingInput) => Promise<SmartDonationMatchingOutput>;
 *   SmartDonationMatchingInput: z.infer<typeof SmartDonationMatchingInputSchema>;
 *   SmartDonationMatchingOutput: z.infer<typeof SmartDonationMatchingOutputSchema>;
 * }
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Define the input schema
const SmartDonationMatchingInputSchema = z.object({
  foodType: z.string().describe('Type of food being donated (e.g., canned goods, fresh produce).'),
  quantity: z.string().describe('Quantity of food available for donation (e.g., 10 boxes, 50 lbs).'),
  expirationDate: z.string().describe('Expiration date of the food donation (e.g., YYYY-MM-DD).'),
  donorLocation: z.string().describe('Location of the food donor (e.g., city, state).'),
  recipientOrganizationPreferences: z.string().optional().describe('Any preferences or requirements that recipient organizations might have'),
});

export type SmartDonationMatchingInput = z.infer<typeof SmartDonationMatchingInputSchema>;

// Define the output schema
const SmartDonationMatchingOutputSchema = z.object({
  suggestedRecipients: z.array(
    z.object({
      organizationName: z.string().describe('Name of the suggested recipient organization.'),
      reason: z.string().describe('Reason for suggesting this organization (e.g., high need for this food type, proximity to donor).'),
      contactInformation: z.string().describe('Contact information for the organization'),
    })
  ).describe('A list of suggested recipient organizations and reasons for the suggestion.'),
});

export type SmartDonationMatchingOutput = z.infer<typeof SmartDonationMatchingOutputSchema>;

// Define the prompt
const smartDonationMatchingPrompt = ai.definePrompt({
  name: 'smartDonationMatchingPrompt',
  input: {schema: SmartDonationMatchingInputSchema},
  output: {schema: SmartDonationMatchingOutputSchema},
  prompt: `You are an AI assistant designed to suggest suitable recipient organizations for food donations.

  Analyze the following donation details and suggest the three most appropriate recipient organizations, providing a clear reason for each suggestion.  Consider recipient organization preferences, if any are specified.

  Food Type: {{{foodType}}}
  Quantity: {{{quantity}}}
  Expiration Date: {{{expirationDate}}}
  Donor Location: {{{donorLocation}}}
  Recipient Organization Preferences: {{{recipientOrganizationPreferences}}}

  Ensure that your suggestions are practical and will minimize food waste while effectively meeting community needs. Return your answer as a JSON object.
  `,
});

// Define the flow
const smartDonationMatchingFlow = ai.defineFlow(
  {
    name: 'smartDonationMatchingFlow',
    inputSchema: SmartDonationMatchingInputSchema,
    outputSchema: SmartDonationMatchingOutputSchema,
  },
  async input => {
    const {output} = await smartDonationMatchingPrompt(input);
    return output!;
  }
);

/**
 * Analyzes donation patterns and suggests the most suitable recipient organizations for a given donation.
 * @param input - The input containing donation details.
 * @returns A promise that resolves to the suggested recipient organizations.
 */
export async function smartDonationMatching(input: SmartDonationMatchingInput): Promise<SmartDonationMatchingOutput> {
  return smartDonationMatchingFlow(input);
}
