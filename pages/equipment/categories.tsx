'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface Category {
  id: string;
  name: string;
  responsible: string;
  company: string;
}

const EquipmentCategories = () => {
  const router = useRouter();
  const [userName, setUserName] = useState('User');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [categories, setCategories] = useState<Category[]>([
    {
      id: 'CAT-001',
      name: 'Computers',
      responsible: 'OdooBot',
      company: 'Precision Manufacturing Ltd',
    },
    {
      id: 'CAT-002',
      name: 'Software',
      responsible: 'OdooBot',
      company: 'Global Solutions Inc',
    },
    {
      id: 'CAT-003',
      name: 'Monitors',
      responsible: 'Mitchell Admin',
      company: 'Advanced Systems Corp',
    },
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

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#f5f5f5' }}>
      {/* Sidebar */}
      <div style={{
        width: sidebarOpen ? '250px' : '0',
        backgroundColor: '#fff',
        borderRight: '1px solid #e0e0e0',
        padding: sidebarOpen ? '20px' : '0',
        overflowY: 'auto',
        transition: 'all 0.3s ease',
        position: 'relative',
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
                color: item.active ? '#714B67' : '#666',
                backgroundColor: item.active ? '#f3eef8' : 'transparent',
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
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              marginRight: '15px',
            }}
          >
            ☰
          </button>
          <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#1a1a1a', margin: '0' }}>Equipment Categories</h1>
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
              <div style={{ width: '35px', height: '35px', backgroundColor: '#714B67', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '18px', fontWeight: '700' }}>
                {userName.charAt(0).toUpperCase()}
              </div>
              <span style={{ fontSize: '14px', color: '#333' }}>{userName}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '30px' }}>
          <div style={{
            backgroundColor: '#fff',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
            overflow: 'hidden',
          }}>
            {/* Header with New Button */}
            <div style={{
              padding: '20px 30px',
              borderBottom: '1px solid #e0e0e0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#1a1a1a', margin: '0' }}>Categories</h2>
              <button
                onClick={() => router.push('/equipment/categories/new')}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#714B67',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  fontWeight: '600',
                  fontSize: '14px',
                  cursor: 'pointer',
                }}
              >
                New
              </button>
            </div>

            {/* Table */}
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '14px',
            }}>
              <thead>
                <tr style={{ backgroundColor: '#f9f9f9', borderBottom: '1px solid #e0e0e0' }}>
                  <th style={{ padding: '15px 30px', textAlign: 'left', fontWeight: '600', color: '#666' }}>Name</th>
                  <th style={{ padding: '15px 30px', textAlign: 'left', fontWeight: '600', color: '#666' }}>Responsible</th>
                  <th style={{ padding: '15px 30px', textAlign: 'left', fontWeight: '600', color: '#666' }}>Company</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <tr
                    key={category.id}
                    style={{
                      borderBottom: '1px solid #e0e0e0',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f9f9f9')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                    onClick={() => router.push(`/equipment/categories/${category.id}`)}
                  >
                    <td style={{ padding: '15px 30px', color: '#333' }}>{category.name}</td>
                    <td style={{ padding: '15px 30px', color: '#333' }}>{category.responsible}</td>
                    <td style={{ padding: '15px 30px', color: '#333' }}>{category.company}</td>
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

export default EquipmentCategories;
