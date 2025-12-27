'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface WorkCenter {
  id: string;
  name: string;
  code: string;
  tag?: string;
  alternativeWorkcenters?: string;
  costPerHour: number;
  capacityTimeEfficiency: number;
  oeeTarget: number;
  company: string;
}

export default function WorkCenters() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userName, setUserName] = useState('User');
  const [workcenters, setWorkcenters] = useState<WorkCenter[]>([
    {
      id: '1',
      name: 'Assembly 1',
      code: 'ASM-001',
      tag: 'High Volume',
      alternativeWorkcenters: 'Assembly 2, Assembly 3',
      costPerHour: 100.00,
      capacityTimeEfficiency: 34.59,
      oeeTarget: 85,
      company: 'TechCorp Industries',
    },
    {
      id: '2',
      name: 'Drill 1',
      code: 'DRL-001',
      tag: 'Precision',
      alternativeWorkcenters: 'Drill 2',
      costPerHour: 100.00,
      capacityTimeEfficiency: 90.00,
      oeeTarget: 88,
      company: 'Precision Manufacturing Ltd',
    },
    {
      id: '3',
      name: 'Welding Center A',
      code: 'WLD-001',
      tag: 'Heavy Duty',
      alternativeWorkcenters: 'Welding Center B',
      costPerHour: 150.00,
      capacityTimeEfficiency: 78.50,
      oeeTarget: 82,
      company: 'Global Solutions Inc',
    },
    {
      id: '4',
      name: 'CNC Machine Center',
      code: 'CNC-001',
      tag: 'Computer Controlled',
      alternativeWorkcenters: 'CNC-002, CNC-003',
      costPerHour: 200.00,
      capacityTimeEfficiency: 92.30,
      oeeTarget: 90,
      company: 'Advanced Systems Corp',
    },
    {
      id: '5',
      name: 'Packaging Station',
      code: 'PKG-001',
      tag: 'Automated',
      alternativeWorkcenters: 'Packaging Station 2',
      costPerHour: 75.00,
      capacityTimeEfficiency: 95.00,
      oeeTarget: 92,
      company: 'Innovation Labs',
    },
  ]);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      router.push('/login');
    } else {
      try {
        const userData = JSON.parse(user);
        setUserName(userData.name || 'User');
      } catch (e) {
        setUserName('User');
      }
    }
  }, [router]);

  const navigationItems = [
    { icon: '📊', label: 'Dashboard', href: '/dashboard', active: false },
    { icon: '⚙️', label: 'Equipment', href: '/equipment', active: false },
    { icon: '🔧', label: 'Maintenance', href: '/maintenance', active: false },
    { icon: '🏭', label: 'Work Centers', href: '/workcenters', active: true },
    { icon: '👥', label: 'Teams', href: '/equipment/teams', active: false },
    { icon: '📅', label: 'Calendar', href: '/calendar', active: false },
    { icon: '📈', label: 'Reports', href: '/reports', active: false },
  ];

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#f5f5f5' }}>
      {/* Sidebar */}
      <div style={{
        width: sidebarOpen ? '250px' : '80px',
        backgroundColor: '#fff',
        borderRight: '1px solid #e0e0e0',
        padding: '20px',
        transition: 'width 0.3s ease',
        overflowY: 'auto',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '30px', gap: '10px' }}>
          <div style={{ fontSize: '28px' }}>⚙️</div>
          {sidebarOpen && <h2 style={{ margin: '0', fontSize: '18px', fontWeight: '700', color: '#1a1a1a' }}>GearGuard</h2>}
        </div>

        <nav>
          {navigationItems.map((item, idx) => (
            <Link
              key={idx}
              href={item.href}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '12px 15px',
                marginBottom: '8px',
                borderRadius: '8px',
                textDecoration: 'none',
                color: item.active ? '#714B67' : '#666',
                backgroundColor: item.active ? '#f3eef8' : 'transparent',
                fontSize: '14px',
                fontWeight: item.active ? '600' : '500',
                gap: '10px',
                transition: 'all 0.2s ease',
              }}
            >
              <span style={{ fontSize: '18px' }}>{item.icon}</span>
              {sidebarOpen && item.label}
            </Link>
          ))}
        </nav>

        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          style={{
            width: '100%',
            padding: '10px',
            marginTop: '30px',
            border: 'none',
            backgroundColor: '#f5f5f5',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '12px',
            color: '#666',
          }}
        >
          {sidebarOpen ? 'Collapse' : 'Expand'}
        </button>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Top Header */}
        <div style={{
          backgroundColor: '#fff',
          borderBottom: '1px solid #e0e0e0',
          padding: '15px 30px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#1a1a1a', margin: '0' }}>Work Centers</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <input
              type="text"
              placeholder="Search..."
              style={{
                padding: '8px 15px',
                border: '1px solid #e0e0e0',
                borderRadius: '6px',
                fontSize: '14px',
                width: '200px',
              }}
            />
            <div style={{ fontSize: '20px' }}>🔔</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '35px',
                height: '35px',
                backgroundColor: '#714B67',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontSize: '18px',
                fontWeight: '700'
              }}>
                {userName.charAt(0).toUpperCase()}
              </div>
              <span style={{ fontSize: '14px', color: '#333' }}>{userName}</span>
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '30px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#1a1a1a', margin: '0' }}>
              All Work Centers
            </h2>
            <Link
              href="/workcenters/new"
              style={{
                padding: '10px 20px',
                backgroundColor: '#714B67',
                color: '#fff',
                textDecoration: 'none',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: '600',
                display: 'inline-block',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#5a3b54')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#714B67')}
            >
              + New Work Center
            </Link>
          </div>

          {/* Table */}
          <div style={{
            backgroundColor: '#fff',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
            border: '1px solid #e0e0e0',
            overflow: 'hidden',
          }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#f9f9f9', borderBottom: '2px solid #017E84' }}>
                  <th style={{ padding: '15px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#017E84', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Work Center</th>
                  <th style={{ padding: '15px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#017E84', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Code</th>
                  <th style={{ padding: '15px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#017E84', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Tag</th>
                  <th style={{ padding: '15px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#017E84', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Alternative Workcenters</th>
                  <th style={{ padding: '15px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#017E84', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Cost/Hour</th>
                  <th style={{ padding: '15px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#017E84', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Capacity %</th>
                  <th style={{ padding: '15px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#017E84', textTransform: 'uppercase', letterSpacing: '0.5px' }}>OEE Target</th>
                  <th style={{ padding: '15px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#017E84', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Company</th>
                </tr>
              </thead>
              <tbody>
                {workcenters.map((workcenter, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid #e0e0e0', backgroundColor: idx % 2 === 0 ? '#fff' : '#f9f9f9' }}>
                    <td style={{ padding: '15px', fontSize: '14px', fontWeight: '600', color: '#1a1a1a' }}>{workcenter.name}</td>
                    <td style={{ padding: '15px', fontSize: '14px', color: '#666' }}>{workcenter.code}</td>
                    <td style={{ padding: '15px', fontSize: '14px', color: '#666' }}>
                      {workcenter.tag && (
                        <span style={{
                          display: 'inline-block',
                          padding: '4px 12px',
                          backgroundColor: '#f3eef8',
                          color: '#714B67',
                          borderRadius: '12px',
                          fontSize: '12px',
                          fontWeight: '600',
                        }}>
                          {workcenter.tag}
                        </span>
                      )}
                    </td>
                    <td style={{ padding: '15px', fontSize: '13px', color: '#666' }}>{workcenter.alternativeWorkcenters || '—'}</td>
                    <td style={{ padding: '15px', fontSize: '14px', fontWeight: '600', color: '#714B67' }}>${workcenter.costPerHour.toFixed(2)}</td>
                    <td style={{ padding: '15px', fontSize: '14px', fontWeight: '600', color: '#1a1a1a' }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                      }}>
                        <div style={{
                          width: '100px',
                          height: '6px',
                          backgroundColor: '#e0e0e0',
                          borderRadius: '3px',
                          overflow: 'hidden',
                        }}>
                          <div style={{
                            width: `${workcenter.capacityTimeEfficiency}%`,
                            height: '100%',
                            backgroundColor: workcenter.capacityTimeEfficiency > 80 ? '#27ae60' : workcenter.capacityTimeEfficiency > 50 ? '#e8a45e' : '#e74c3c',
                          }} />
                        </div>
                        <span>{workcenter.capacityTimeEfficiency.toFixed(1)}%</span>
                      </div>
                    </td>
                    <td style={{ padding: '15px', fontSize: '14px', fontWeight: '600', color: '#017E84' }}>{workcenter.oeeTarget}%</td>
                    <td style={{ padding: '15px', fontSize: '13px', color: '#999' }}>{workcenter.company}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Summary Stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px',
            marginTop: '30px',
          }}>
            <div style={{
              backgroundColor: '#fff',
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
              border: '1px solid #e0e0e0',
            }}>
              <p style={{ fontSize: '12px', color: '#999', margin: '0 0 10px 0', textTransform: 'uppercase', fontWeight: '600' }}>Total Work Centers</p>
              <p style={{ fontSize: '32px', fontWeight: '700', color: '#714B67', margin: '0' }}>{workcenters.length}</p>
            </div>
            <div style={{
              backgroundColor: '#fff',
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
              border: '1px solid #e0e0e0',
            }}>
              <p style={{ fontSize: '12px', color: '#999', margin: '0 0 10px 0', textTransform: 'uppercase', fontWeight: '600' }}>Avg Capacity</p>
              <p style={{ fontSize: '32px', fontWeight: '700', color: '#017E84', margin: '0' }}>
                {(workcenters.reduce((sum, wc) => sum + wc.capacityTimeEfficiency, 0) / workcenters.length).toFixed(1)}%
              </p>
            </div>
            <div style={{
              backgroundColor: '#fff',
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
              border: '1px solid #e0e0e0',
            }}>
              <p style={{ fontSize: '12px', color: '#999', margin: '0 0 10px 0', textTransform: 'uppercase', fontWeight: '600' }}>Avg OEE Target</p>
              <p style={{ fontSize: '32px', fontWeight: '700', color: '#27ae60', margin: '0' }}>
                {(workcenters.reduce((sum, wc) => sum + wc.oeeTarget, 0) / workcenters.length).toFixed(1)}%
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
