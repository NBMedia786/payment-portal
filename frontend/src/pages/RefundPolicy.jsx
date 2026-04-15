import React from 'react';
import PolicyLayout from './PolicyLayout';

export default function RefundPolicy() {
  const sections = [
    {
      heading: 'Digital Product Nature',
      body:
        'Our products are delivered digitally and access is granted instantly after successful payment verification.'
    },
    {
      heading: 'Refund Eligibility',
      body: 'Refunds are considered only in verified exceptional situations.',
      items: [
        'Duplicate payment for the same order',
        'Payment captured but access not delivered within 24 hours',
        'Confirmed technical issue at our end preventing content delivery'
      ]
    },
    {
      heading: 'Refund Request Window',
      body: 'Eligible requests must be raised within 48 hours from the transaction timestamp.'
    },
    {
      heading: 'Processing Timeline',
      body:
        'Approved refunds are processed within 5-7 business days and credited to the original payment source.'
    },
    {
      heading: 'Non-Refundable Scenarios',
      body:
        'Refunds are not applicable for downloaded/consumed digital content, user-side connectivity issues, or change-of-mind cases after successful access.'
    }
  ];

  return (
    <PolicyLayout
      title="Refund Policy"
      effectiveDate="09 April 2026"
      intro="This Refund Policy governs purchases of digital products and subscription content offered via Prachi VIP."
      sections={sections}
    />
  );
}
