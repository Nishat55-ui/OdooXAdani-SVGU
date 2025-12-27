'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface Equipment {
  id: string;
  name: string;
  employee: string;
  department: string;
  serialNumber: string;
  technician: string;
  category: string;
  company: string;
}

const Equipment = () => {
  const [userName, setUserName] = useState('User');
  const [equipmentList, setEquipmentList] = useState<Equipment[]>([
    {
      id: 'EQ-001',
      name: "Samsung Monitor 15\"",
      employee: 'Tejas Modi',
      department: 'Admin',
      serialNumber: 'MT/125/22778837',
      technician: 'Mitchell Admin',
      category: 'Monitors',
      company: 'Precision Manufacturing Ltd',
    },
    {
      id: 'EQ-002',
      name: 'Acer Laptop',
      employee: 'Bhaumik P',
      department: 'Technician',
      serialNumber: 'MT/122/11112222',
      technician: 'Marc Demo',
      category: 'Computers',
      company: 'Global Solutions Inc',
    },
    {
      id: 'EQ-003',
      name: 'Dell Desktop',
      employee: 'John Smith',
      department: 'IT',
      serialNumber: 'MT/150/33334444',
      technician: 'Aka Foster',
      category: 'Computers',
      company: 'Advanced Systems Corp',
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');

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

  const filteredEquipment = equipmentList.filter((eq) =>
    eq.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    eq.serialNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            { icon: '⚙️', label: 'Equipment', href: '/equipment', active: true },
            { icon: '🔧', label: 'Maintenance', href: '/maintenance' },
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
          <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#1a1a1a', margin: '0' }}>Equipment</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
          <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '10px' }}>
              <Link
                href="/equipment/categories"
                style={{
                  padding: '8px 12px',
                  backgroundColor: '#fff',
                  border: '1px solid #e0e0e0',
                  borderRadius: '6px',
                  fontWeight: '500',
                  fontSize: '13px',
                  color: '#333',
                  cursor: 'pointer',
                  textDecoration: 'none',
                }}
              >
                📋 Categories
              </Link>
              <Link
                href="/equipment/teams"
                style={{
                  padding: '8px 12px',
                  backgroundColor: '#fff',
                  border: '1px solid #e0e0e0',
                  borderRadius: '6px',
                  fontWeight: '500',
                  fontSize: '13px',
                  color: '#333',
                  cursor: 'pointer',
                  textDecoration: 'none',
                }}
              >
                👥 Teams
              </Link>
            </div>
            <Link
              href="/equipment/new"
              style={{
                padding: '10px 20px',
                backgroundColor: '#8b7ba8',
                color: '#fff',
                textDecoration: 'none',
                borderRadius: '6px',
                fontWeight: '600',
                fontSize: '14px',
                display: 'inline-block',
              }}
            >
              + New Equipment
            </Link>
          </div>

          {/* Equipment Table */}
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
                  <th style={{ padding: '15px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#666', textTransform: 'uppercase' }}>Equipment Name</th>
                  <th style={{ padding: '15px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#666', textTransform: 'uppercase' }}>Employee</th>
                  <th style={{ padding: '15px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#666', textTransform: 'uppercase' }}>Department</th>
                  <th style={{ padding: '15px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#666', textTransform: 'uppercase' }}>Serial Number</th>
                  <th style={{ padding: '15px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#666', textTransform: 'uppercase' }}>Technician</th>
                  <th style={{ padding: '15px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#666', textTransform: 'uppercase' }}>Equipment Category</th>
                  <th style={{ padding: '15px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#666', textTransform: 'uppercase' }}>Company</th>
                </tr>
              </thead>
              <tbody>
                {filteredEquipment.map((eq, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid #e0e0e0', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9f9f9'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                    <td style={{ padding: '15px', fontSize: '14px', fontWeight: '600', color: '#1a1a1a' }}>{eq.name}</td>
                    <td style={{ padding: '15px', fontSize: '14px', color: '#666' }}>{eq.employee}</td>
                    <td style={{ padding: '15px', fontSize: '14px', color: '#666' }}>{eq.department}</td>
                    <td style={{ padding: '15px', fontSize: '14px', color: '#666' }}>{eq.serialNumber}</td>
                    <td style={{ padding: '15px', fontSize: '14px', color: '#666' }}>{eq.technician}</td>
                    <td style={{ padding: '15px', fontSize: '14px', color: '#666' }}>{eq.category}</td>
                    <td style={{ padding: '15px', fontSize: '14px', color: '#666' }}>{eq.company}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Equipment;