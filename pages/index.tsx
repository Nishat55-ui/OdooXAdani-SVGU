import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f5f5f5' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: '80px', height: '80px', margin: '0 auto 30px', backgroundColor: '#8b7ba8', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: '48px' }}>⚙️</span>
        </div>
        <h1 style={{ fontSize: '36px', fontWeight: '700', color: '#1a1a1a', marginBottom: '15px' }}>GearGuard</h1>
        <p style={{ fontSize: '18px', color: '#666', marginBottom: '30px' }}>The Ultimate Maintenance Tracker</p>
        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
          <Link href="/login" style={{ padding: '12px 30px', backgroundColor: '#8b7ba8', color: '#fff', textDecoration: 'none', borderRadius: '6px', fontWeight: '600', display: 'inline-block' }}>
            Sign In
          </Link>
          <Link href="/signup" style={{ padding: '12px 30px', backgroundColor: '#f5f5f5', color: '#8b7ba8', textDecoration: 'none', borderRadius: '6px', fontWeight: '600', display: 'inline-block', border: '2px solid #8b7ba8' }}>
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}