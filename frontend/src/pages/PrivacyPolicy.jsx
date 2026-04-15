import React from 'react';
import PolicyLayout from './PolicyLayout';

export default function PrivacyPolicy() {
  const sections = [
    {
      heading: 'Information We Collect',
      body:
        'We may collect name, phone number, email address, payment metadata (via secure gateways), device/IP details, and order history to provide digital access and support.'
    },
    {
      heading: 'How We Use Information',
      body:
        'We process data to complete transactions, deliver purchased content, respond to support requests, improve platform reliability, and prevent abuse/fraud.'
    },
    {
      heading: 'Payment Security',
      body:
        'Payments are handled through trusted third-party processors. We do not store complete card numbers, CVV, or confidential UPI PIN credentials on our servers.'
    },
    {
      heading: 'Data Sharing',
      body:
        'We never sell personal data. Limited information may be shared with payment providers, infrastructure partners, or legal authorities only when necessary.'
    },
    {
      heading: 'Data Retention',
      body:
        'Transaction and account records may be retained for legal, tax, fraud-prevention, and service continuity obligations.'
    },
    {
      heading: 'Your Rights',
      body:
        'You may request correction or deletion of eligible account data by contacting support, subject to statutory record-retention requirements.'
    }
  ];

  return (
    <PolicyLayout
      title="Privacy Policy"
      effectiveDate="09 April 2026"
      intro="This Privacy Policy explains how Prachi VIP collects, uses, and safeguards information when you access our website and digital products."
      sections={sections}
    />
  );
}
