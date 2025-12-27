'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const WorkCenterNew = () => {
  const router = useRouter();
  const [userName, setUserName] = useState('User');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    tag: '',
    alternativeWorkcenters: '',
    costPerHour: '0',
    capacityTimeEfficiency: '100',
    oeeTarget: '85',
    company: 'TechCorp Industries',
  });

  const companies = [
    'TechCorp Industries',
    'Precision Manufacturing Ltd',
    'Global Solutions Inc',
    'Advanced Systems Corp',
    'Innovation Labs',
    'Digital Enterprises',
  ];

  const navigationItems = [
    { icon: '📊', label: 'Dashboard', href: '/dashboard', active: false },
    { icon: '⚙️', label: 'Equipment', href: '/equipment', active: false },
    { icon: '🔧', label: 'Maintenance', href: '/maintenance', active: false },
    { icon: '🏭', label: 'Work Centers', href: '/workcenters', active: false },
    { icon: '👥', label: 'Teams', href: '/equipment/teams', active: false },
    { icon: '📅', label: 'Calendar', href: '/calendar', active: false },
    { icon: '📈', label: 'Reports', href: '/reports', active: false },
  ];

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name.trim()) {
      alert('Work Center name is required');
      return;
    }
    if (!formData.code.trim()) {
      alert('Code is required');
      return;
    }

    setLoading(true);

    // Submit to API
    fetch('/api/workcenters', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert(`Error: ${data.error}`);
          setLoading(false);
        } else {
          alert(`Work Center "${data.name}" created successfully!`);
          router.push('/workcenters');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Failed to create work center');
        setLoading(false);
      });
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
          <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#1a1a1a', margin: '0' }}>New Work Center</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
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

        {/* Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '30px' }}>
          <div style={{
            backgroundColor: '#fff',
            borderRadius: '8px',
            padding: '30px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
            border: '1px solid #e0e0e0',
            maxWidth: '900px',
          }}>
            <form onSubmit={handleSubmit}>
              {/* Basic Information */}
              <h2 style={{ fontSize: '16px', fontWeight: '700', color: '#1a1a1a', marginBottom: '20px', marginTop: '0' }}>
                Basic Information
              </h2>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginBottom: '25px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>
                    Work Center Name<span style={{ color: '#e74c3c' }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g., Assembly 1"
                    style={{
                      width: '100%',
                      padding: '10px 0px',
                      border: 'none',
                      borderBottom: '2px solid #ddd',
                      fontSize: '14px',
                      boxSizing: 'border-box',
                      outline: 'none',
                      backgroundColor: 'transparent',
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>
                    Code<span style={{ color: '#e74c3c' }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="code"
                    value={formData.code}
                    onChange={handleInputChange}
                    placeholder="e.g., ASM-001"
                    style={{
                      width: '100%',
                      padding: '10px 0px',
                      border: 'none',
                      borderBottom: '2px solid #ddd',
                      fontSize: '14px',
                      boxSizing: 'border-box',
                      outline: 'none',
                      backgroundColor: 'transparent',
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginBottom: '25px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>
                    Tag <span style={{ fontSize: '12px', fontWeight: '400', color: '#666' }}>(Optional)</span>
                  </label>
                  <input
                    type="text"
                    name="tag"
                    value={formData.tag}
                    onChange={handleInputChange}
                    placeholder="e.g., High Volume"
                    style={{
                      width: '100%',
                      padding: '10px 0px',
                      border: 'none',
                      borderBottom: '2px solid #ddd',
                      fontSize: '14px',
                      boxSizing: 'border-box',
                      outline: 'none',
                      backgroundColor: 'transparent',
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>
                    Company
                  </label>
                  <select
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '10px 0px',
                      border: 'none',
                      borderBottom: '2px solid #ddd',
                      fontSize: '14px',
                      boxSizing: 'border-box',
                      outline: 'none',
                      backgroundColor: 'transparent',
                    }}
                  >
                    {companies.map((comp) => (
                      <option key={comp} value={comp}>{comp}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: '25px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>
                  Alternative Workcenters <span style={{ fontSize: '12px', fontWeight: '400', color: '#666' }}>(Optional)</span>
                </label>
                <textarea
                  name="alternativeWorkcenters"
                  value={formData.alternativeWorkcenters}
                  onChange={handleInputChange}
                  placeholder="e.g., Assembly 2, Assembly 3"
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontFamily: 'inherit',
                    boxSizing: 'border-box',
                    outline: 'none',
                    minHeight: '80px',
                  }}
                />
              </div>

              {/* Financial & Performance Information */}
              <h2 style={{ fontSize: '16px', fontWeight: '700', color: '#1a1a1a', marginBottom: '20px', marginTop: '30px' }}>
                Financial & Performance
              </h2>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '25px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>
                    Cost Per Hour (₹) <span style={{ fontSize: '12px', fontWeight: '400', color: '#666' }}>(Optional)</span>
                  </label>
                  <input
                    type="number"
                    name="costPerHour"
                    value={formData.costPerHour}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    style={{
                      width: '100%',
                      padding: '10px 0px',
                      border: 'none',
                      borderBottom: '2px solid #ddd',
                      fontSize: '14px',
                      boxSizing: 'border-box',
                      outline: 'none',
                      backgroundColor: 'transparent',
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>
                    Capacity Time Efficiency (%)
                  </label>
                  <input
                    type="number"
                    name="capacityTimeEfficiency"
                    value={formData.capacityTimeEfficiency}
                    onChange={handleInputChange}
                    placeholder="100"
                    min="0"
                    max="100"
                    step="0.01"
                    style={{
                      width: '100%',
                      padding: '10px 0px',
                      border: 'none',
                      borderBottom: '2px solid #ddd',
                      fontSize: '14px',
                      boxSizing: 'border-box',
                      outline: 'none',
                      backgroundColor: 'transparent',
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>
                    OEE Target (%)
                  </label>
                  <input
                    type="number"
                    name="oeeTarget"
                    value={formData.oeeTarget}
                    onChange={handleInputChange}
                    placeholder="85"
                    min="0"
                    max="100"
                    step="0.01"
                    style={{
                      width: '100%',
                      padding: '10px 0px',
                      border: 'none',
                      borderBottom: '2px solid #ddd',
                      fontSize: '14px',
                      boxSizing: 'border-box',
                      outline: 'none',
                      backgroundColor: 'transparent',
                    }}
                  />
                </div>
              </div>

              {/* Help Text */}
              <div style={{
                backgroundColor: '#f3eef8',
                borderLeft: '4px solid #714B67',
                padding: '15px',
                marginBottom: '25px',
                borderRadius: '4px',
              }}>
                <p style={{ fontSize: '12px', color: '#666', margin: '0' }}>
                  <strong>Note:</strong> Capacity Time Efficiency and OEE Target should be percentages (0-100). Cost Per Hour will be used for financial calculations.
                </p>
              </div>

              {/* Buttons */}
              <div style={{ display: 'flex', gap: '15px', justifyContent: 'flex-start' }}>
                <button
                  type="submit"
                  style={{
                    padding: '12px 30px',
                    backgroundColor: '#714B67',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#5a3b54')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#714B67')}
                >
                  Create Work Center
                </button>
                <button
                  type="button"
                  onClick={() => router.push('/workcenters')}
                  style={{
                    padding: '12px 30px',
                    backgroundColor: '#f5f5f5',
                    color: '#333',
                    border: '1px solid #e0e0e0',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkCenterNew;
