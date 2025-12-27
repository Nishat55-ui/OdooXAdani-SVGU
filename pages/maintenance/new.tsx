'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const MaintenanceNew = () => {
  const router = useRouter();
  const [userName, setUserName] = useState('User');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [requestType, setRequestType] = useState<'equipment' | 'workCenter'>('equipment');
  const [formData, setFormData] = useState({
    subject: '',
    description: '',
    equipment: '',
    workCenter: '',
    category: '',
    requestDate: new Date().toISOString().split('T')[0],
    maintenanceType: 'Preventive',
    team: '',
    technician: '',
    priority: 'Medium',
    duration: '0',
    notes: '',
    instructions: '',
  });

  const navigationItems = [
    { icon: '📊', label: 'Dashboard', href: '/dashboard', active: false },
    { icon: '⚙️', label: 'Equipment', href: '/equipment', active: false },
    { icon: '🔧', label: 'Maintenance', href: '/maintenance', active: false },
    { icon: '🏭', label: 'Work Centers', href: '/workcenters', active: false },
    { icon: '👥', label: 'Teams', href: '/equipment/teams', active: false },
    { icon: '📅', label: 'Calendar', href: '/calendar', active: false },
    { icon: '📈', label: 'Reports', href: '/reports', active: false },
  ];

  const teams = ['Internal Maintenance', 'Metrology', 'Subcontractor', 'HVAC', 'Electricians', 'Plumbing'];
  const equipment = ['HVAC Unit 03', 'HP LaserJet Pro', 'Belt Conveyor 01', 'CNC Machine', 'Air Compressor', 'Forklift 02'];
  const workcenters = ['Assembly 1', 'Drill 1', 'Welding Center A', 'CNC Machine Center', 'Packaging Station'];
  const categories = ['Preventive Maintenance', 'Breakdown Repair', 'Installation', 'Inspection', 'Calibration'];

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
    console.log('Maintenance Request Data:', { ...formData, requestType });
    alert(`Maintenance request created successfully for ${requestType === 'equipment' ? formData.equipment : formData.workCenter}!`);
    router.push('/maintenance');
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
          <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#1a1a1a', margin: '0' }}>New Maintenance Request</h1>
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
              {/* Request Type Selection */}
              <div style={{ marginBottom: '30px' }}>
                <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#1a1a1a', marginBottom: '15px' }}>Request Created For</h3>
                <div style={{ display: 'flex', gap: '20px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name="requestType"
                      value="equipment"
                      checked={requestType === 'equipment'}
                      onChange={(e) => setRequestType(e.target.value as 'equipment' | 'workCenter')}
                      style={{ cursor: 'pointer' }}
                    />
                    <span style={{ fontSize: '14px', fontWeight: '500' }}>📦 Equipment</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name="requestType"
                      value="workCenter"
                      checked={requestType === 'workCenter'}
                      onChange={(e) => setRequestType(e.target.value as 'equipment' | 'workCenter')}
                      style={{ cursor: 'pointer' }}
                    />
                    <span style={{ fontSize: '14px', fontWeight: '500' }}>🏭 Work Center</span>
                  </label>
                </div>
              </div>

              {/* Equipment or Work Center Selection */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginBottom: '25px' }}>
                {requestType === 'equipment' ? (
                  <>
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>
                        Equipment
                      </label>
                      <select
                        name="equipment"
                        value={formData.equipment}
                        onChange={handleInputChange}
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
                        <option value="">Select Equipment</option>
                        {equipment.map((eq) => (
                          <option key={eq} value={eq}>{eq}</option>
                        ))}
                      </select>
                    </div>
                    <div />
                  </>
                ) : (
                  <>
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>
                        Work Center
                      </label>
                      <select
                        name="workCenter"
                        value={formData.workCenter}
                        onChange={handleInputChange}
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
                        <option value="">Select Work Center</option>
                        {workcenters.map((wc) => (
                          <option key={wc} value={wc}>{wc}</option>
                        ))}
                      </select>
                    </div>
                    <div />
                  </>
                )}
              </div>

              {/* Subject and Description */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginBottom: '25px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Maintenance request subject"
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
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
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
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Request Date and Maintenance Type */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginBottom: '25px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>
                    Request Date
                  </label>
                  <input
                    type="date"
                    name="requestDate"
                    value={formData.requestDate}
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
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>
                    Maintenance Type
                  </label>
                  <div style={{ display: 'flex', gap: '20px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                      <input
                        type="radio"
                        name="maintenanceType"
                        value="Corrective"
                        checked={formData.maintenanceType === 'Corrective'}
                        onChange={handleInputChange}
                        style={{ cursor: 'pointer' }}
                      />
                      <span style={{ fontSize: '13px' }}>Corrective</span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                      <input
                        type="radio"
                        name="maintenanceType"
                        value="Preventive"
                        checked={formData.maintenanceType === 'Preventive'}
                        onChange={handleInputChange}
                        style={{ cursor: 'pointer' }}
                      />
                      <span style={{ fontSize: '13px' }}>Preventive</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Team, Technician, Priority, Duration */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginBottom: '25px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>
                    Team
                  </label>
                  <select
                    name="team"
                    value={formData.team}
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
                    <option value="">Select Team</option>
                    {teams.map((team) => (
                      <option key={team} value={team}>{team}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>
                    Technician
                  </label>
                  <input
                    type="text"
                    name="technician"
                    value={formData.technician}
                    onChange={handleInputChange}
                    placeholder="Assigned technician"
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
                    Priority
                  </label>
                  <select
                    name="priority"
                    value={formData.priority}
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
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>
                    Duration (hours)
                  </label>
                  <input
                    type="number"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    placeholder="0"
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

              {/* Notes and Instructions Tabs */}
              <div style={{ marginBottom: '25px' }}>
                <div style={{ display: 'flex', gap: '15px', borderBottom: '2px solid #e0e0e0', marginBottom: '15px' }}>
                  <button
                    type="button"
                    style={{
                      padding: '10px 15px',
                      border: 'none',
                      backgroundColor: 'transparent',
                      color: '#714B67',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      borderBottom: '3px solid #714B67',
                    }}
                  >
                    Notes
                  </button>
                  <button
                    type="button"
                    style={{
                      padding: '10px 15px',
                      border: 'none',
                      backgroundColor: 'transparent',
                      color: '#999',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer',
                    }}
                  >
                    Instructions
                  </button>
                </div>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="Add notes..."
                  style={{
                    width: '100%',
                    minHeight: '120px',
                    padding: '12px',
                    border: '1px solid #e0e0e0',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontFamily: 'inherit',
                    boxSizing: 'border-box',
                    outline: 'none',
                  }}
                />
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
                  Create Request
                </button>
                <button
                  type="button"
                  onClick={() => router.push('/maintenance')}
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

export default MaintenanceNew;
