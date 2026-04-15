import React from 'react';
import { ShieldCheck } from 'lucide-react';

export default function PolicyLayout({ title, effectiveDate, intro, sections }) {
  return (
    <div style={{ minHeight: '100vh', background: '#070d1a', color: '#e7eefb', padding: '2.2rem 1rem' }}>
      <div style={{ maxWidth: 980, margin: '0 auto' }}>
        <div
          style={{
            border: '1px solid rgba(96,165,250,0.28)',
            borderRadius: 20,
            background:
              'linear-gradient(120deg, rgba(14,29,54,0.94) 0%, rgba(20,45,90,0.9) 45%, rgba(13,86,112,0.84) 100%)',
            padding: '1.1rem 1.2rem',
            marginBottom: '1rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '.55rem', fontWeight: 900, letterSpacing: '.01em' }}>
            <ShieldCheck size={20} />
            <span style={{ fontSize: '1.22rem' }}>{title}</span>
          </div>
          <p style={{ margin: '.45rem 0 .3rem', color: '#d3e6ff', fontSize: '.92rem' }}>{intro}</p>
          <p style={{ margin: 0, color: '#a9c4e6', fontSize: '.8rem' }}>
            Effective Date: <strong style={{ color: '#e6f2ff' }}>{effectiveDate}</strong>
          </p>
        </div>

        <div
          style={{
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 18,
            background: 'rgba(255,255,255,0.03)',
            padding: '1.1rem'
          }}
        >
          <div style={{ display: 'grid', gap: '.7rem' }}>
            {sections.map((section, index) => (
              <div
                key={section.heading}
                style={{
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 14,
                  background: 'rgba(255,255,255,0.02)',
                  padding: '.9rem .95rem'
                }}
              >
                <h2 style={{ margin: '0 0 .4rem', fontSize: '1.15rem', color: '#f4f8ff' }}>
                  {index + 1}. {section.heading}
                </h2>
                {section.body && <p style={{ margin: 0, color: '#c8d8ec', lineHeight: 1.7 }}>{section.body}</p>}
                {section.items && (
                  <ul style={{ margin: '.5rem 0 0', paddingLeft: '1.15rem', color: '#c8d8ec', lineHeight: 1.7 }}>
                    {section.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
          <p style={{ margin: '.9rem 0 0', color: '#9ab4d1', fontSize: '.8rem' }}>
            For legal concerns, write to <strong style={{ color: '#d8eaff' }}>support@prachivip.in</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
