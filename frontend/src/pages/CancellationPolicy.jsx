import React from 'react';
import PolicyLayout from './PolicyLayout';

export default function CancellationPolicy() {
  const sections = [
    {
      heading: 'One-Time Orders',
      body:
        'One-time digital purchases cannot be cancelled once payment is successful and content access is delivered.'
    },
    {
      heading: 'Subscription Cancellations',
      body:
        'For recurring plans, cancellation can be requested anytime. Future renewals are stopped, while access continues until the current billing cycle ends.'
    },
    {
      heading: 'Immediate Access Revocation',
      body:
        'Access may be suspended immediately in cases of payment reversal, chargeback, failed verification, or policy abuse.'
    },
    {
      heading: 'How to Request Cancellation',
      body:
        'Send your request to support@prachivip.in with transaction ID and your registered contact details.'
    },
    {
      heading: 'Support SLA',
      body: 'Cancellation requests are typically reviewed and processed within 24 business hours.'
    }
  ];

  return (
    <PolicyLayout
      title="Cancellation Policy"
      effectiveDate="09 April 2026"
      intro="This Cancellation Policy explains cancellation terms for one-time purchases and recurring subscriptions on Prachi VIP."
      sections={sections}
    />
  );
}
