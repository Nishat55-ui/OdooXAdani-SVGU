'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const NewTeam = () => {
  const router = useRouter();
  const [userName, setUserName] = useState('User');
  const [formData, setFormData] = useState({
    teamName: '',
    members: [''],
    company: '',
  });

  const companies = ['TechCorp Industries', 'Precision Manufacturing Ltd', 'Global Solutions Inc', 'Advanced Systems Corp', 'Innovation Labs', 'Digital Enterprises'];
  const availableMembers = ['Anas Makari', 'Marc Demo', 'Maggie Davidson', 'Mitchell Admin', 'Aka Foster', 'John Smith', 'Sarah Johnson', 'David Lee', 'Emma Wilson', 'Robert Brown'];

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleMemberChange = (index: number, value: string) => {
    const newMembers = [...formData.members];
    newMembers[index] = value;
    setFormData((prev) => ({
      ...prev,
      members: newMembers,
    }));
  };

  const addMember = () => {
    setFormData((prev) => ({
      ...prev,
      members: [...prev.members, ''],
    }));
  };

  const removeMember = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      members: prev.members.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('New Team:', formData);
    router.push('/equipment/teams');
  };

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
            { icon: '👥', label: 'Teams', href: '/equipment/teams', active: true },
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
          <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#1a1a1a', margin: '0' }}>New Team</h1>
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
            padding: '40px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
            maxWidth: '700px',
          }}>
            <form onSubmit={handleSubmit}>
              {/* Team Name */}
              <div style={{ marginBottom: '30px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>
                  Team Name?
                </label>
                <input
                  type="text"
                  name="teamName"
                  value={formData.teamName}
                  onChange={handleChange}
                  placeholder="e.g., Internal Maintenance"
                  required
                  style={{
                    width: '100%',
                    padding: '10px 0px',
                    border: 'none',
                    borderBottom: '2px solid #333',
                    fontSize: '14px',
                    boxSizing: 'border-box',
                    outline: 'none',
                  }}
                />
              </div>

              {/* Company */}
              <div style={{ marginBottom: '30px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>
                  Company?
                </label>
                <select
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '10px 0px',
                    border: 'none',
                    borderBottom: '2px solid #333',
                    fontSize: '14px',
                    boxSizing: 'border-box',
                    outline: 'none',
                    backgroundColor: 'transparent',
                  }}
                >
                  <option value="">Select Company</option>
                  {companies.map((comp) => (
                    <option key={comp} value={comp}>{comp}</option>
                  ))}
                </select>
              </div>

              {/* Team Members */}
              <div style={{ marginBottom: '30px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#333', marginBottom: '15px' }}>
                  Team Members?
                </label>
                {formData.members.map((member, index) => (
                  <div key={index} style={{ display: 'flex', gap: '10px', marginBottom: '12px' }}>
                    <select
                      value={member}
                      onChange={(e) => handleMemberChange(index, e.target.value)}
                      style={{
                        flex: 1,
                        padding: '10px 0px',
                        border: 'none',
                        borderBottom: '2px solid #e0e0e0',
                        fontSize: '14px',
                        boxSizing: 'border-box',
                        outline: 'none',
                        backgroundColor: 'transparent',
                      }}
                    >
                      <option value="">Select Member</option>
                      {availableMembers.map((m) => (
                        <option key={m} value={m}>{m}</option>
                      ))}
                    </select>
                    {formData.members.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeMember(index)}
                        style={{
                          padding: '8px 12px',
                          backgroundColor: '#f5f5f5',
                          color: '#e74c3c',
                          border: '1px solid #e0e0e0',
                          borderRadius: '4px',
                          fontWeight: '600',
                          fontSize: '12px',
                          cursor: 'pointer',
                        }}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addMember}
                  style={{
                    marginTop: '12px',
                    padding: '8px 16px',
                    backgroundColor: '#f3eef8',
                    color: '#714B67',
                    border: '1px solid #e0c9d9',
                    borderRadius: '4px',
                    fontWeight: '600',
                    fontSize: '13px',
                    cursor: 'pointer',
                  }}
                >
                  + Add Member
                </button>
              </div>

              {/* Buttons */}
              <div style={{ display: 'flex', gap: '15px', marginTop: '40px' }}>
                <button
                  type="submit"
                  style={{
                    padding: '12px 30px',
                    backgroundColor: '#714B67',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    fontWeight: '600',
                    fontSize: '14px',
                    cursor: 'pointer',
                  }}
                >
                  Save Team
                </button>
                <button
                  type="button"
                  onClick={() => router.push('/equipment/teams')}
                  style={{
                    padding: '12px 30px',
                    backgroundColor: 'transparent',
                    color: '#333',
                    border: '1px solid #333',
                    borderRadius: '4px',
                    fontWeight: '600',
                    fontSize: '14px',
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

export default NewTeam;
