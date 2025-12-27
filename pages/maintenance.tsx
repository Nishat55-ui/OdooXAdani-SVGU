'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface MaintenanceRequest {
  id: string;
  title: string;
  equipment: string;
  status: 'New' | 'In Progress' | 'Repaired' | 'Scrap';
  type: 'Preventive' | 'Corrective';
  date: string;
  time?: string;
  team?: string;
  priority?: 'Low' | 'Medium' | 'High';
}

const Maintenance = () => {
  const [userName, setUserName] = useState('User');
  const [requests, setRequests] = useState<MaintenanceRequest[]>([
    { id: 'MR-001', title: 'Printer Paper Jam', equipment: 'HP LaserJet Pro', status: 'New', type: 'Corrective', date: '2024-01-18' },
    { id: 'MR-002', title: 'Monthly Checkup', equipment: 'CNC Machine 01', status: 'New', type: 'Preventive', date: '2024-01-20' },
    { id: 'MR-003', title: 'Filter Replacement', equipment: 'Air Compressor', status: 'New', type: 'Preventive', date: '2024-01-22' },
    { id: 'MR-004', title: 'Server Room AC Failure', equipment: 'HVAC Unit 03', status: 'In Progress', type: 'Corrective', date: '2024-01-15' },
    { id: 'MR-005', title: 'Belt Replacement', equipment: 'Conveyor Belt 01', status: 'In Progress', type: 'Corrective', date: '2024-01-12' },
    { id: 'MR-006', title: 'Oil Change', equipment: 'Forklift 02', status: 'Repaired', type: 'Preventive', date: '2024-01-10' },
    { id: 'MR-007', title: 'Firmware Update', equipment: 'Dell Server R740', status: 'Repaired', type: 'Preventive', date: '2024-01-19' },
    { id: 'MR-008', title: 'Motor Burnout', equipment: 'Industrial Press', status: 'Scrap', type: 'Corrective', date: '2024-01-05' },
  ]);

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'New':
        return '#3b5bdb';
      case 'In Progress':
        return '#e8a45e';
      case 'Repaired':
        return '#27ae60';
      case 'Scrap':
        return '#95a5a6';
      default:
        return '#95a5a6';
    }
  };

  const getTypeColor = (type: string) => {
    return type === 'Preventive' ? '#8b7ba8' : '#e74c3c';
  };

  const getTypeLabel = (type: string) => {
    return type === 'Preventive' ? '🔧 Preventive' : '⚠️ Corrective';
  };

  const columns: Array<'New' | 'In Progress' | 'Repaired' | 'Scrap'> = ['New', 'In Progress', 'Repaired', 'Scrap'];

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#f5f5f5' }}>
      {/* Sidebar */}
      <div style={{
        width: '250px',
        backgroundColor: '#fff',
        borderRight: '1px solid #e0e0e0',
        padding: '20px',
        overflowY: 'auto',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '30px', gap: '10px' }}>
          <div style={{ fontSize: '28px' }}>⚙️</div>
          <h2 style={{ margin: '0', fontSize: '18px', fontWeight: '700', color: '#1a1a1a' }}>GearGuard</h2>
        </div>

        <nav>
          {[
            { icon: '📊', label: 'Dashboard', href: '/dashboard' },
            { icon: '⚙️', label: 'Equipment', href: '/equipment' },
            { icon: '🔧', label: 'Maintenance', href: '/maintenance', active: true },
            { icon: '👥', label: 'Teams', href: '/equipment/teams' },
            { icon: '📅', label: 'Calendar', href: '/calendar' },
            { icon: '📈', label: 'Reports', href: '/reports' },
          ].map((item, idx) => (
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
                color: item.active ? '#8b7ba8' : '#666',
                backgroundColor: item.active ? '#f0ecf7' : 'transparent',
                fontSize: '14px',
                fontWeight: item.active ? '600' : '500',
                gap: '10px',
              }}
            >
              <span style={{ fontSize: '18px' }}>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
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
          <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#1a1a1a', margin: '0' }}>Maintenance Requests</h1>
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
              <div style={{ width: '35px', height: '35px', backgroundColor: '#8b7ba8', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '18px', fontWeight: '700' }}>
                {userName.charAt(0).toUpperCase()}
              </div>
              <span style={{ fontSize: '14px', color: '#333' }}>{userName}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '30px' }}>
          <div style={{ marginBottom: '20px' }}>
            <p style={{ fontSize: '14px', color: '#666', margin: '0' }}>{requests.length} Total Requests</p>
          </div>

          {/* Status Pills */}
          <div style={{ display: 'flex', gap: '10px', marginBottom: '30px', flexWrap: 'wrap' }}>
            {columns.map((status, idx) => {
              const count = requests.filter(r => r.status === status).length;
              return (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 16px',
                    backgroundColor: '#fff',
                    borderRadius: '6px',
                    border: '1px solid #e0e0e0',
                  }}
                >
                  <div
                    style={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      backgroundColor: getStatusColor(status),
                    }}
                  />
                  <span style={{ fontSize: '13px', fontWeight: '600', color: '#333' }}>{status}</span>
                  <span style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    backgroundColor: getStatusColor(status),
                    color: '#fff',
                    fontSize: '12px',
                    fontWeight: '700',
                  }}>
                    {count}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Kanban Board */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '20px',
            marginBottom: '30px',
          }}>
            {columns.map((status, colIdx) => {
              const columnRequests = requests.filter(r => r.status === status);
              return (
                <div
                  key={colIdx}
                  style={{
                    backgroundColor: '#f9f9f9',
                    borderRadius: '8px',
                    padding: '15px',
                    minHeight: '600px',
                  }}
                >
                  <h3 style={{
                    fontSize: '14px',
                    fontWeight: '700',
                    color: '#1a1a1a',
                    margin: '0 0 15px 0',
                    paddingBottom: '15px',
                    borderBottom: `2px solid ${getStatusColor(status)}`,
                  }}>
                    {status}
                  </h3>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {columnRequests.map((request, idx) => (
                      <Link
                        key={idx}
                        href={`/maintenance/${request.id}`}
                        style={{
                          padding: '15px',
                          backgroundColor: '#fff',
                          borderRadius: '6px',
                          border: '1px solid #e0e0e0',
                          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
                          textDecoration: 'none',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          display: 'block',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
                          e.currentTarget.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.05)';
                          e.currentTarget.style.transform = 'translateY(0)';
                        }}
                      >
                        <div style={{ marginBottom: '10px' }}>
                          <p style={{ fontSize: '14px', fontWeight: '600', color: '#1a1a1a', margin: '0 0 6px 0' }}>
                            {request.title}
                          </p>
                          <p style={{ fontSize: '12px', color: '#999', margin: '0' }}>
                            {request.equipment}
                          </p>
                        </div>

                        <div style={{ marginBottom: '10px' }}>
                          <span style={{
                            display: 'inline-block',
                            padding: '4px 8px',
                            backgroundColor: getTypeColor(request.type) + '20',
                            color: getTypeColor(request.type),
                            borderRadius: '3px',
                            fontSize: '11px',
                            fontWeight: '600',
                          }}>
                            {getTypeLabel(request.type)}
                          </span>
                        </div>

                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          fontSize: '12px',
                          color: '#999',
                          borderTop: '1px solid #e0e0e0',
                          paddingTop: '10px',
                        }}>
                          <span>📅 {request.date}</span>
                          <span style={{
                            padding: '2px 8px',
                            backgroundColor: getStatusColor(status) + '20',
                            color: getStatusColor(status),
                            borderRadius: '3px',
                            fontWeight: '600',
                          }}>
                            {request.id}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* New Request Button */}
          <button style={{
            padding: '12px 24px',
            backgroundColor: '#8b7ba8',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            fontWeight: '600',
            fontSize: '14px',
            cursor: 'pointer',
          }}>
            + New Request
          </button>
        </div>
      </div>
    </div>
  );
};

export default Maintenance;