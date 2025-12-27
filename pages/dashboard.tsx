'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userName, setUserName] = useState('User');

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      try {
        const userData = JSON.parse(user);
        setUserName(userData.name || 'User');
      } catch (e) {
        setUserName('User');
      }
    }
  }, []);

  const navigationItems = [
    { icon: '📊', label: 'Dashboard', href: '/dashboard', active: true },
    { icon: '⚙️', label: 'Equipment', href: '/equipment', active: false },
    { icon: '🔧', label: 'Maintenance', href: '/maintenance', active: false },
    { icon: '🏭', label: 'Work Centers', href: '/workcenters', active: false },
    { icon: '👥', label: 'Teams', href: '/equipment/teams', active: false },
    { icon: '📅', label: 'Calendar', href: '/calendar', active: false },
    { icon: '📈', label: 'Reports', href: '/reports', active: false },
  ];

  const metrics = [
    { label: 'Total Equipment', value: '156', change: '+12% from last month', icon: '⚙️', color: '#714B67' },
    { label: 'Open Requests', value: '23', change: 'Pending review', icon: '📋', color: '#017E84' },
    { label: 'In Progress', value: '8', change: 'Being worked on', icon: '⏱️', color: '#27ae60' },
    { label: 'Overdue', value: '3', change: 'Need attention', icon: '⚠️', color: '#e74c3c' },
  ];

  const recentRequests = [
    { id: 'MR-001', subject: 'Server Room AC Failure', equipment: 'HVAC Unit 03', team: 'HVAC', status: 'In Progress', date: '2025-12-27' },
    { id: 'MR-002', subject: 'Printer Jam', equipment: 'HP LaserJet Pro', team: 'IT Support', status: 'New', date: '2025-12-27' },
    { id: 'MR-003', subject: 'Conveyor Belt Wear', equipment: 'Belt Conveyor 01', team: 'Mechanics', status: 'New', date: '2025-12-26' },
    { id: 'MR-004', subject: 'Electrical Panel Check', equipment: 'Main Panel', team: 'Electricians', status: 'Completed', date: '2025-12-26' },
    { id: 'MR-005', subject: 'Pump Vibration Issue', equipment: 'Water Pump', team: 'Plumbing', status: 'In Progress', date: '2025-12-25' },
  ];

  const activityLog = [
    { time: 'Today at 2:30 PM', activity: 'John Doe created new maintenance request MR-005', type: 'created' },
    { time: 'Today at 1:15 PM', activity: 'Sarah Smith updated equipment HVAC Unit 03 status', type: 'updated' },
    { time: 'Today at 12:00 PM', activity: 'Mike Johnson completed maintenance request MR-004', type: 'completed' },
    { time: 'Yesterday at 4:45 PM', activity: 'Team assigned request MR-001 to HVAC team', type: 'assigned' },
    { time: 'Yesterday at 3:20 PM', activity: 'New equipment added: Backup Generator', type: 'created' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return '#27ae60';
      case 'In Progress':
        return '#e8a45e';
      case 'New':
        return '#3498db';
      default:
        return '#95a5a6';
    }
  };

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
          <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#1a1a1a', margin: '0' }}>Dashboard</h1>
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
              <div style={{ width: '35px', height: '35px', backgroundColor: '#714B67', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '18px', fontWeight: '700' }}>{userName.charAt(0).toUpperCase()}</div>
              <span style={{ fontSize: '14px', color: '#333' }}>{userName}</span>
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '30px' }}>
          {/* Equipment Options Section */}
          <div style={{ marginBottom: '30px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: '700', color: '#1a1a1a', margin: '0 0 20px 0' }}>
              Equipment
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '20px',
              marginBottom: '30px',
            }}>
              <div
                style={{
                  padding: '24px',
                  backgroundColor: '#fff',
                  borderRadius: '8px',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                  border: '1px solid #e0e0e0',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.12)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#1a1a1a', margin: '0 0 10px 0' }}>
                  Work Sector
                </h3>
                <p style={{ fontSize: '12px', color: '#999', margin: '0' }}>
                  View and manage equipment by work sector
                </p>
              </div>
              <div
                style={{
                  padding: '24px',
                  backgroundColor: '#fff',
                  borderRadius: '8px',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                  border: '1px solid #e0e0e0',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.12)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#1a1a1a', margin: '0 0 10px 0' }}>
                  Machine & Tools
                </h3>
                <p style={{ fontSize: '12px', color: '#999', margin: '0' }}>
                  Manage machines and tools inventory
                </p>
              </div>
            </div>
          </div>

          {/* Metrics Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px',
            marginBottom: '40px',
          }}>
            {metrics.map((metric, idx) => (
              <div
                key={idx}
                style={{
                  padding: '24px',
                  backgroundColor: '#fff',
                  borderRadius: '8px',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                  border: '1px solid #e0e0e0',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
                  <h3 style={{ fontSize: '13px', fontWeight: '500', color: '#999', margin: '0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    {metric.label}
                  </h3>
                  <div style={{ fontSize: '28px' }}>{metric.icon}</div>
                </div>
                <p style={{ fontSize: '32px', fontWeight: '700', color: metric.color, margin: '0 0 10px 0' }}>
                  {metric.value}
                </p>
                <p style={{ fontSize: '12px', color: '#999', margin: '0' }}>
                  {metric.change}
                </p>
              </div>
            ))}
          </div>

          {/* Special Status Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '20px',
            marginBottom: '40px',
          }}>
            {/* Critical Equipment Card - Red */}
            <div
              style={{
                padding: '24px',
                backgroundColor: '#ffebee',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                border: '2px solid #e74c3c',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
                <h3 style={{ fontSize: '13px', fontWeight: '500', color: '#e74c3c', margin: '0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Critical Equipment
                </h3>
                <div style={{ fontSize: '28px' }}>⚠️</div>
              </div>
              <p style={{ fontSize: '32px', fontWeight: '700', color: '#e74c3c', margin: '0 0 10px 0' }}>
                5 Units
              </p>
              <p style={{ fontSize: '12px', color: '#c0392b', margin: '0' }}>
                Health {'<'} 30% - Need attention
              </p>
            </div>

            {/* Technician Load Card - Blue */}
            <div
              style={{
                padding: '24px',
                backgroundColor: '#e3f2fd',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                border: '2px solid #3498db',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
                <h3 style={{ fontSize: '13px', fontWeight: '500', color: '#3498db', margin: '0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Technician Load
                </h3>
                <div style={{ fontSize: '28px' }}>👤</div>
              </div>
              <p style={{ fontSize: '32px', fontWeight: '700', color: '#3498db', margin: '0 0 10px 0' }}>
                85%
              </p>
              <p style={{ fontSize: '12px', color: '#1976d2', margin: '0' }}>
                Assigned Carefully
              </p>
            </div>

            {/* Open Requests Card - Green */}
            <div
              style={{
                padding: '24px',
                backgroundColor: '#e8f5e9',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                border: '2px solid #27ae60',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
                <h3 style={{ fontSize: '13px', fontWeight: '500', color: '#27ae60', margin: '0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Open Requests
                </h3>
                <div style={{ fontSize: '28px' }}>📋</div>
              </div>
              <p style={{ fontSize: '32px', fontWeight: '700', color: '#27ae60', margin: '0 0 10px 0' }}>
                12 Pending
              </p>
              <p style={{ fontSize: '12px', color: '#1b5e20', margin: '0' }}>
                3 Overdue
              </p>
            </div>
          </div>

          {/* Maintenance Data Table */}
          <div style={{ marginBottom: '30px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: '700', color: '#1a1a1a', margin: '0 0 20px 0' }}>
              Maintenance Activities
            </h2>
            <div style={{
              backgroundColor: '#fff',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
              border: '1px solid #e0e0e0',
              overflowX: 'auto',
            }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #e0e0e0', backgroundColor: '#f9f9f9' }}>
                    <th style={{ padding: '15px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#666', textTransform: 'uppercase' }}>Activity</th>
                    <th style={{ padding: '15px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#666', textTransform: 'uppercase' }}>Machine</th>
                    <th style={{ padding: '15px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#666', textTransform: 'uppercase' }}>Assigned To</th>
                    <th style={{ padding: '15px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#666', textTransform: 'uppercase' }}>Company</th>
                    <th style={{ padding: '15px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#666', textTransform: 'uppercase' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
                    <td style={{ padding: '15px', fontSize: '14px', color: '#333' }}>Preventive Check</td>
                    <td style={{ padding: '15px', fontSize: '14px', color: '#666' }}>HVAC Unit 03</td>
                    <td style={{ padding: '15px', fontSize: '14px', color: '#666' }}>Bar Foster</td>
                    <td style={{ padding: '15px', fontSize: '14px', color: '#666' }}>TechCorp Industries</td>
                    <td style={{ padding: '15px' }}>
                      <span style={{ padding: '4px 12px', backgroundColor: '#27ae6020', color: '#27ae60', borderRadius: '4px', fontSize: '12px', fontWeight: '600' }}>
                        Completed
                      </span>
                    </td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
                    <td style={{ padding: '15px', fontSize: '14px', color: '#333' }}>Belt Replacement</td>
                    <td style={{ padding: '15px', fontSize: '14px', color: '#666' }}>Belt Conveyor 01</td>
                    <td style={{ padding: '15px', fontSize: '14px', color: '#666' }}>Sarah Johnson</td>
                    <td style={{ padding: '15px', fontSize: '14px', color: '#666' }}>Global Solutions Inc</td>
                    <td style={{ padding: '15px' }}>
                      <span style={{ padding: '4px 12px', backgroundColor: '#e8a45e20', color: '#e8a45e', borderRadius: '4px', fontSize: '12px', fontWeight: '600' }}>
                        In Progress
                      </span>
                    </td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
                    <td style={{ padding: '15px', fontSize: '14px', color: '#333' }}>Filter Cleaning</td>
                    <td style={{ padding: '15px', fontSize: '14px', color: '#666' }}>Air Compressor A2</td>
                    <td style={{ padding: '15px', fontSize: '14px', color: '#666' }}>David Lee</td>
                    <td style={{ padding: '15px', fontSize: '14px', color: '#666' }}>Precision Manufacturing Ltd</td>
                    <td style={{ padding: '15px' }}>
                      <span style={{ padding: '4px 12px', backgroundColor: '#3498db20', color: '#3498db', borderRadius: '4px', fontSize: '12px', fontWeight: '600' }}>
                        Scheduled
                      </span>
                    </td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
                    <td style={{ padding: '15px', fontSize: '14px', color: '#333' }}>Oil Change</td>
                    <td style={{ padding: '15px', fontSize: '14px', color: '#666' }}>Generator Backup</td>
                    <td style={{ padding: '15px', fontSize: '14px', color: '#666' }}>Emma Wilson</td>
                    <td style={{ padding: '15px', fontSize: '14px', color: '#666' }}>Advanced Systems Corp</td>
                    <td style={{ padding: '15px' }}>
                      <span style={{ padding: '4px 12px', backgroundColor: '#e74c3c20', color: '#e74c3c', borderRadius: '4px', fontSize: '12px', fontWeight: '600' }}>
                        Overdue
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ padding: '15px', fontSize: '14px', color: '#333' }}>Safety Inspection</td>
                    <td style={{ padding: '15px', fontSize: '14px', color: '#666' }}>Electrical Panel Main</td>
                    <td style={{ padding: '15px', fontSize: '14px', color: '#666' }}>Robert Brown</td>
                    <td style={{ padding: '15px', fontSize: '14px', color: '#666' }}>Innovation Labs</td>
                    <td style={{ padding: '15px' }}>
                      <span style={{ padding: '4px 12px', backgroundColor: '#27ae6020', color: '#27ae60', borderRadius: '4px', fontSize: '12px', fontWeight: '600' }}>
                        Completed
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Two Column Layout */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '30px' }}>
            {/* Recent Maintenance Requests */}
            <div style={{ gridColumn: '1 / -1' }}>
              <h2 style={{ fontSize: '16px', fontWeight: '700', color: '#1a1a1a', margin: '0 0 20px 0' }}>
                Recent Maintenance Requests
              </h2>
              <div style={{
                backgroundColor: '#fff',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                border: '1px solid #e0e0e0',
                overflowX: 'auto',
              }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #e0e0e0', backgroundColor: '#f9f9f9' }}>
                      <th style={{ padding: '15px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#666', textTransform: 'uppercase' }}>ID</th>
                      <th style={{ padding: '15px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#666', textTransform: 'uppercase' }}>Subject</th>
                      <th style={{ padding: '15px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#666', textTransform: 'uppercase' }}>Equipment</th>
                      <th style={{ padding: '15px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#666', textTransform: 'uppercase' }}>Team</th>
                      <th style={{ padding: '15px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#666', textTransform: 'uppercase' }}>Status</th>
                      <th style={{ padding: '15px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#666', textTransform: 'uppercase' }}>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentRequests.map((request, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid #e0e0e0' }}>
                        <td style={{ padding: '15px', fontSize: '14px', fontWeight: '600', color: '#1a1a1a' }}>{request.id}</td>
                        <td style={{ padding: '15px', fontSize: '14px', color: '#333' }}>{request.subject}</td>
                        <td style={{ padding: '15px', fontSize: '14px', color: '#666' }}>{request.equipment}</td>
                        <td style={{ padding: '15px', fontSize: '14px', color: '#666' }}>{request.team}</td>
                        <td style={{ padding: '15px' }}>
                          <span style={{
                            padding: '4px 12px',
                            backgroundColor: getStatusColor(request.status) + '20',
                            color: getStatusColor(request.status),
                            borderRadius: '4px',
                            fontSize: '12px',
                            fontWeight: '600',
                          }}>
                            {request.status}
                          </span>
                        </td>
                        <td style={{ padding: '15px', fontSize: '14px', color: '#999' }}>{request.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Activity Screen */}
            <div>
              <h2 style={{ fontSize: '16px', fontWeight: '700', color: '#1a1a1a', margin: '0 0 20px 0' }}>
                Recent Activity
              </h2>
              <div style={{
                backgroundColor: '#fff',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                border: '1px solid #e0e0e0',
                padding: '20px',
              }}>
                {activityLog.map((log, idx) => (
                  <div key={idx} style={{ marginBottom: idx !== activityLog.length - 1 ? '20px' : '0', paddingBottom: idx !== activityLog.length - 1 ? '20px' : '0', borderBottom: idx !== activityLog.length - 1 ? '1px solid #e0e0e0' : 'none' }}>
                    <div style={{ display: 'flex', gap: '12px' }}>
                      <div style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        backgroundColor: '#714B67',
                        marginTop: '6px',
                        flexShrink: 0,
                      }} />
                      <div style={{ flex: 1 }}>
                        <p style={{ fontSize: '13px', color: '#666', margin: '0 0 4px 0' }}>
                          {log.time}
                        </p>
                        <p style={{ fontSize: '14px', color: '#333', margin: '0', lineHeight: '1.4' }}>
                          {log.activity}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Maintenance */}
            <div>
              <h2 style={{ fontSize: '16px', fontWeight: '700', color: '#1a1a1a', margin: '0 0 20px 0' }}>
                Upcoming Maintenance
              </h2>
              <div style={{
                backgroundColor: '#fff',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                border: '1px solid #e0e0e0',
                padding: '20px',
              }}>
                <div style={{ marginBottom: '15px', paddingBottom: '15px', borderBottom: '1px solid #e0e0e0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <p style={{ fontSize: '14px', fontWeight: '600', color: '#1a1a1a', margin: '0' }}>Generator Service</p>
                    <span style={{ fontSize: '12px', color: '#e74c3c', fontWeight: '600' }}>Due in 2 days</span>
                  </div>
                  <p style={{ fontSize: '13px', color: '#999', margin: '0' }}>Equipment: Backup Generator</p>
                </div>

                <div style={{ marginBottom: '15px', paddingBottom: '15px', borderBottom: '1px solid #e0e0e0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <p style={{ fontSize: '14px', fontWeight: '600', color: '#1a1a1a', margin: '0' }}>AC Filter Replacement</p>
                    <span style={{ fontSize: '12px', color: '#e8a45e', fontWeight: '600' }}>Due in 5 days</span>
                  </div>
                  <p style={{ fontSize: '13px', color: '#999', margin: '0' }}>Equipment: HVAC Unit 03</p>
                </div>

                <div style={{ marginBottom: '0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <p style={{ fontSize: '14px', fontWeight: '600', color: '#1a1a1a', margin: '0' }}>Safety Inspection</p>
                    <span style={{ fontSize: '12px', color: '#27ae60', fontWeight: '600' }}>Due in 10 days</span>
                  </div>
                  <p style={{ fontSize: '13px', color: '#999', margin: '0' }}>Equipment: All Equipment</p>
                </div>
              </div>
            </div>
          </div>

          {/* Maintenance Reports Section */}
          <div style={{ marginTop: '40px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: '700', color: '#1a1a1a', margin: '0 0 20px 0' }}>
              Maintenance Reports
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '20px',
            }}>
              {/* Status Report Card - New */}
              <div style={{
                padding: '20px',
                backgroundColor: '#fff',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                border: '1px solid #e0e0e0',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                  <div style={{ fontSize: '24px' }}>🆕</div>
                  <h3 style={{ fontSize: '13px', fontWeight: '600', color: '#666', margin: '0', textTransform: 'uppercase' }}>New Requests</h3>
                </div>
                <p style={{ fontSize: '28px', fontWeight: '700', color: '#3498db', margin: '0' }}>5</p>
                <p style={{ fontSize: '11px', color: '#999', margin: '5px 0 0 0' }}>Awaiting Assignment</p>
              </div>

              {/* Status Report Card - In Progress */}
              <div style={{
                padding: '20px',
                backgroundColor: '#fff',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                border: '1px solid #e0e0e0',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                  <div style={{ fontSize: '24px' }}>⚙️</div>
                  <h3 style={{ fontSize: '13px', fontWeight: '600', color: '#666', margin: '0', textTransform: 'uppercase' }}>In Progress</h3>
                </div>
                <p style={{ fontSize: '28px', fontWeight: '700', color: '#e8a45e', margin: '0' }}>8</p>
                <p style={{ fontSize: '11px', color: '#999', margin: '5px 0 0 0' }}>Being Worked On</p>
              </div>

              {/* Status Report Card - Completed */}
              <div style={{
                padding: '20px',
                backgroundColor: '#fff',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                border: '1px solid #e0e0e0',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                  <div style={{ fontSize: '24px' }}>✅</div>
                  <h3 style={{ fontSize: '13px', fontWeight: '600', color: '#666', margin: '0', textTransform: 'uppercase' }}>Completed</h3>
                </div>
                <p style={{ fontSize: '28px', fontWeight: '700', color: '#27ae60', margin: '0' }}>42</p>
                <p style={{ fontSize: '11px', color: '#999', margin: '5px 0 0 0' }}>This Month</p>
              </div>

              {/* Status Report Card - Overdue */}
              <div style={{
                padding: '20px',
                backgroundColor: '#fff',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                border: '1px solid #e0e0e0',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                  <div style={{ fontSize: '24px' }}>⏰</div>
                  <h3 style={{ fontSize: '13px', fontWeight: '600', color: '#666', margin: '0', textTransform: 'uppercase' }}>Overdue</h3>
                </div>
                <p style={{ fontSize: '28px', fontWeight: '700', color: '#e74c3c', margin: '0' }}>3</p>
                <p style={{ fontSize: '11px', color: '#999', margin: '5px 0 0 0' }}>Need Immediate Attention</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}