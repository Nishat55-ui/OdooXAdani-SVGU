'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Reports() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userName, setUserName] = useState('User');
  const [activeTab, setActiveTab] = useState('overview');

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
    { icon: '👥', label: 'Teams', href: '/equipment/teams', active: false },
    { icon: '📅', label: 'Calendar', href: '/calendar', active: false },
    { icon: '📈', label: 'Reports', href: '/reports', active: true },
  ];

  const reportStats = [
    { label: 'Total Equipment', value: '156', change: '+5 this month', icon: '⚙️', color: '#714B67' },
    { label: 'Total Requests', value: '245', change: '+23 pending', icon: '📋', color: '#017E84' },
    { label: 'Completion Rate', value: '94%', change: 'Above target', icon: '✅', color: '#27ae60' },
    { label: 'Avg Response Time', value: '2.4h', change: 'Within SLA', icon: '⏱️', color: '#e8a45e' },
  ];

  const equipmentHealthData = [
    { status: 'Healthy', count: 142, percentage: 91, color: '#27ae60' },
    { status: 'Warning', count: 10, percentage: 6, color: '#e8a45e' },
    { status: 'Critical', count: 4, percentage: 3, color: '#e74c3c' },
  ];

  const maintenanceByTeam = [
    { team: 'Internal Maintenance', completed: 45, pending: 5, inProgress: 3, company: 'TechCorp Industries' },
    { team: 'Metrology', completed: 38, pending: 4, inProgress: 2, company: 'Precision Manufacturing' },
    { team: 'Subcontractor', completed: 32, pending: 6, inProgress: 3, company: 'Global Solutions' },
  ];

  const requestsByPriority = [
    { priority: 'High', count: 12, color: '#e74c3c' },
    { priority: 'Medium', count: 28, color: '#e8a45e' },
    { priority: 'Low', count: 5, color: '#3498db' },
  ];

  const monthlyTrend = [
    { month: 'Jan', scheduled: 18, completed: 17, overdue: 2 },
    { month: 'Feb', scheduled: 22, completed: 21, overdue: 1 },
    { month: 'Mar', scheduled: 25, completed: 24, overdue: 2 },
    { month: 'Apr', scheduled: 20, completed: 19, overdue: 1 },
    { month: 'May', scheduled: 28, completed: 27, overdue: 2 },
    { month: 'Jun', scheduled: 30, completed: 29, overdue: 1 },
  ];

  const technicianPerformance = [
    { name: 'Anas Makari', completed: 28, avgTime: '2.1h', rating: 4.8 },
    { name: 'Sarah Johnson', completed: 25, avgTime: '2.3h', rating: 4.7 },
    { name: 'David Lee', completed: 22, avgTime: '2.5h', rating: 4.6 },
    { name: 'Emma Wilson', completed: 19, avgTime: '2.4h', rating: 4.8 },
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
          <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#1a1a1a', margin: '0' }}>Reports</h1>
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
          {/* Tab Navigation */}
          <div style={{ display: 'flex', gap: '20px', marginBottom: '30px', borderBottom: '2px solid #e0e0e0', paddingBottom: '15px' }}>
            {[
              { id: 'overview', label: 'Overview', icon: '📊' },
              { id: 'equipment', label: 'Equipment Health', icon: '⚙️' },
              { id: 'teams', label: 'Team Performance', icon: '👥' },
              { id: 'trends', label: 'Trends & Analytics', icon: '📈' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '10px 20px',
                  border: 'none',
                  backgroundColor: activeTab === tab.id ? '#714B67' : 'transparent',
                  color: activeTab === tab.id ? '#fff' : '#666',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '600',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <>
              {/* Report Stats Cards */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '20px',
                marginBottom: '40px',
              }}>
                {reportStats.map((stat, idx) => (
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
                        {stat.label}
                      </h3>
                      <div style={{ fontSize: '28px' }}>{stat.icon}</div>
                    </div>
                    <p style={{ fontSize: '32px', fontWeight: '700', color: stat.color, margin: '0 0 10px 0' }}>
                      {stat.value}
                    </p>
                    <p style={{ fontSize: '12px', color: '#999', margin: '0' }}>
                      {stat.change}
                    </p>
                  </div>
                ))}
              </div>

              {/* Quick Summary Section */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '30px',
              }}>
                {/* Equipment Health Summary */}
                <div style={{
                  backgroundColor: '#fff',
                  borderRadius: '8px',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                  border: '1px solid #e0e0e0',
                  padding: '24px',
                }}>
                  <h2 style={{ fontSize: '16px', fontWeight: '700', color: '#1a1a1a', margin: '0 0 20px 0' }}>
                    Equipment Status Summary
                  </h2>
                  {equipmentHealthData.map((item, idx) => (
                    <div key={idx} style={{ marginBottom: idx !== equipmentHealthData.length - 1 ? '20px' : '0' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <span style={{ fontSize: '14px', fontWeight: '600', color: '#333' }}>{item.status}</span>
                        <span style={{ fontSize: '13px', fontWeight: '600', color: item.color }}>{item.count} units ({item.percentage}%)</span>
                      </div>
                      <div style={{
                        width: '100%',
                        height: '8px',
                        backgroundColor: '#f0f0f0',
                        borderRadius: '4px',
                        overflow: 'hidden',
                      }}>
                        <div style={{
                          width: `${item.percentage}%`,
                          height: '100%',
                          backgroundColor: item.color,
                          transition: 'width 0.3s ease',
                        }} />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Requests by Priority */}
                <div style={{
                  backgroundColor: '#fff',
                  borderRadius: '8px',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                  border: '1px solid #e0e0e0',
                  padding: '24px',
                }}>
                  <h2 style={{ fontSize: '16px', fontWeight: '700', color: '#1a1a1a', margin: '0 0 20px 0' }}>
                    Requests by Priority
                  </h2>
                  {requestsByPriority.map((item, idx) => (
                    <div key={idx} style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '15px',
                      backgroundColor: item.color + '10',
                      borderRadius: '6px',
                      marginBottom: idx !== requestsByPriority.length - 1 ? '12px' : '0',
                      borderLeft: `4px solid ${item.color}`,
                    }}>
                      <span style={{ fontSize: '14px', fontWeight: '600', color: '#333' }}>{item.priority} Priority</span>
                      <span style={{ fontSize: '18px', fontWeight: '700', color: item.color }}>{item.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Equipment Tab */}
          {activeTab === 'equipment' && (
            <div style={{
              backgroundColor: '#fff',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
              border: '1px solid #e0e0e0',
              padding: '24px',
            }}>
              <h2 style={{ fontSize: '16px', fontWeight: '700', color: '#1a1a1a', margin: '0 0 20px 0' }}>
                Equipment Health Detailed Report
              </h2>
              <div style={{
                overflowX: 'auto',
              }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #017E84', backgroundColor: '#f9f9f9' }}>
                      <th style={{ padding: '15px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#017E84', textTransform: 'uppercase' }}>Equipment Name</th>
                      <th style={{ padding: '15px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#017E84', textTransform: 'uppercase' }}>Category</th>
                      <th style={{ padding: '15px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#017E84', textTransform: 'uppercase' }}>Health Status</th>
                      <th style={{ padding: '15px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#017E84', textTransform: 'uppercase' }}>Last Maintenance</th>
                      <th style={{ padding: '15px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#017E84', textTransform: 'uppercase' }}>Next Due</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: 'HVAC Unit 03', category: 'HVAC', status: 'Healthy', lastMaint: '2025-12-15', nextDue: '2026-01-15' },
                      { name: 'Belt Conveyor 01', category: 'Machinery', status: 'Warning', lastMaint: '2025-11-20', nextDue: '2025-12-30' },
                      { name: 'Air Compressor A2', category: 'Machinery', status: 'Healthy', lastMaint: '2025-12-10', nextDue: '2026-01-10' },
                      { name: 'Electrical Panel', category: 'Electrical', status: 'Healthy', lastMaint: '2025-12-01', nextDue: '2026-02-01' },
                      { name: 'Backup Generator', category: 'Power', status: 'Critical', lastMaint: '2025-10-15', nextDue: '2025-12-28' },
                    ].map((item, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid #e0e0e0' }}>
                        <td style={{ padding: '15px', fontSize: '14px', fontWeight: '600', color: '#1a1a1a' }}>{item.name}</td>
                        <td style={{ padding: '15px', fontSize: '14px', color: '#666' }}>{item.category}</td>
                        <td style={{ padding: '15px' }}>
                          <span style={{
                            padding: '4px 12px',
                            backgroundColor: item.status === 'Healthy' ? '#27ae6020' : item.status === 'Warning' ? '#e8a45e20' : '#e74c3c20',
                            color: item.status === 'Healthy' ? '#27ae60' : item.status === 'Warning' ? '#e8a45e' : '#e74c3c',
                            borderRadius: '4px',
                            fontSize: '12px',
                            fontWeight: '600',
                          }}>
                            {item.status}
                          </span>
                        </td>
                        <td style={{ padding: '15px', fontSize: '14px', color: '#666' }}>{item.lastMaint}</td>
                        <td style={{ padding: '15px', fontSize: '14px', color: '#666' }}>{item.nextDue}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Teams Tab */}
          {activeTab === 'teams' && (
            <div style={{
              backgroundColor: '#fff',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
              border: '1px solid #e0e0e0',
              padding: '24px',
            }}>
              <h2 style={{ fontSize: '16px', fontWeight: '700', color: '#1a1a1a', margin: '0 0 20px 0' }}>
                Team Performance Analysis
              </h2>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                gap: '20px',
                marginBottom: '30px',
              }}>
                {maintenanceByTeam.map((team, idx) => (
                  <div key={idx} style={{
                    backgroundColor: '#f9f9f9',
                    borderRadius: '8px',
                    padding: '20px',
                    borderLeft: `4px solid #714B67`,
                  }}>
                    <h3 style={{ fontSize: '14px', fontWeight: '700', color: '#1a1a1a', margin: '0 0 5px 0' }}>{team.team}</h3>
                    <p style={{ fontSize: '12px', color: '#999', margin: '0 0 15px 0' }}>{team.company}</p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '20px', fontWeight: '700', color: '#27ae60' }}>{team.completed}</div>
                        <div style={{ fontSize: '11px', color: '#999', marginTop: '4px' }}>Completed</div>
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '20px', fontWeight: '700', color: '#e8a45e' }}>{team.pending}</div>
                        <div style={{ fontSize: '11px', color: '#999', marginTop: '4px' }}>Pending</div>
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '20px', fontWeight: '700', color: '#017E84' }}>{team.inProgress}</div>
                        <div style={{ fontSize: '11px', color: '#999', marginTop: '4px' }}>In Progress</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Technician Performance */}
              <h2 style={{ fontSize: '16px', fontWeight: '700', color: '#1a1a1a', margin: '30px 0 20px 0' }}>
                Technician Performance
              </h2>
              <div style={{
                overflowX: 'auto',
              }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #017E84', backgroundColor: '#f9f9f9' }}>
                      <th style={{ padding: '15px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#017E84', textTransform: 'uppercase' }}>Technician</th>
                      <th style={{ padding: '15px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#017E84', textTransform: 'uppercase' }}>Completed</th>
                      <th style={{ padding: '15px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#017E84', textTransform: 'uppercase' }}>Avg Time</th>
                      <th style={{ padding: '15px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#017E84', textTransform: 'uppercase' }}>Rating</th>
                    </tr>
                  </thead>
                  <tbody>
                    {technicianPerformance.map((tech, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid #e0e0e0' }}>
                        <td style={{ padding: '15px', fontSize: '14px', fontWeight: '600', color: '#1a1a1a' }}>{tech.name}</td>
                        <td style={{ padding: '15px', fontSize: '14px', color: '#666' }}>{tech.completed}</td>
                        <td style={{ padding: '15px', fontSize: '14px', color: '#666' }}>{tech.avgTime}</td>
                        <td style={{ padding: '15px' }}>
                          <span style={{ fontSize: '14px', fontWeight: '600', color: '#e8a45e' }}>⭐ {tech.rating}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Trends Tab */}
          {activeTab === 'trends' && (
            <>
              <div style={{
                backgroundColor: '#fff',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                border: '1px solid #e0e0e0',
                padding: '24px',
              }}>
                <h2 style={{ fontSize: '16px', fontWeight: '700', color: '#1a1a1a', margin: '0 0 20px 0' }}>
                  Monthly Maintenance Trends
                </h2>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
                  gap: '15px',
                }}>
                  {monthlyTrend.map((item, idx) => (
                    <div key={idx} style={{
                      textAlign: 'center',
                      padding: '15px',
                      backgroundColor: '#f9f9f9',
                      borderRadius: '8px',
                      borderTop: `3px solid #714B67`,
                    }}>
                      <div style={{ fontSize: '12px', fontWeight: '700', color: '#1a1a1a', marginBottom: '10px' }}>{item.month}</div>
                      <div style={{ fontSize: '13px', fontWeight: '600', color: '#27ae60', marginBottom: '5px' }}>✓ {item.completed}</div>
                      <div style={{ fontSize: '13px', fontWeight: '600', color: '#e8a45e', marginBottom: '5px' }}>→ {item.scheduled}</div>
                      <div style={{ fontSize: '13px', fontWeight: '600', color: '#e74c3c' }}>! {item.overdue}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Insights */}
              <div style={{
                backgroundColor: '#f3eef8',
                borderRadius: '8px',
                border: '2px solid #714B67',
                padding: '24px',
                marginTop: '30px',
              }}>
                <h2 style={{ fontSize: '16px', fontWeight: '700', color: '#714B67', margin: '0 0 15px 0' }}>
                  📊 Key Insights
                </h2>
                <ul style={{
                  listStyle: 'none',
                  padding: '0',
                  margin: '0',
                }}>
                  {[
                    'Overall maintenance completion rate is 94% - above the 90% target',
                    'Equipment health is excellent with 91% of units in healthy status',
                    'Team productivity trending upward with June showing 30 scheduled maintenance tasks',
                    'Average response time of 2.4 hours is well within the 4-hour SLA',
                    'Technician ratings average 4.7/5.0 with strong team performance across all companies',
                  ].map((insight, idx) => (
                    <li key={idx} style={{
                      fontSize: '14px',
                      color: '#333',
                      marginBottom: idx !== 4 ? '12px' : '0',
                      paddingLeft: '24px',
                      position: 'relative',
                    }}>
                      <span style={{
                        position: 'absolute',
                        left: '0',
                        color: '#017E84',
                        fontWeight: '700',
                      }}>✓</span>
                      {insight}
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
