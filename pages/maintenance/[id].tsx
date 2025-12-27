'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface MaintenanceRequest {
  id: string;
  subject: string;
  status: 'New' | 'In Progress' | 'Repaired' | 'Scrap';
  priority: 'Low' | 'Medium' | 'High';
  createdBy: string;
  team: string;
  maintenanceFor: string;
  equipment: string;
  technician: string;
  category: string;
  duration: string;
  requestDate: string;
  scheduledDate: string;
  maintenanceType: 'Corrective' | 'Preventive';
  company: string;
  notes: string;
  instructions: string;
}

const MaintenanceDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [userName, setUserName] = useState('User');
  const [activeTab, setActiveTab] = useState<'Notes' | 'Instructions'>('Notes');
  const [request, setRequest] = useState<MaintenanceRequest | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editData, setEditData] = useState<MaintenanceRequest | null>(null);

  const teams = [
    { name: 'Internal Maintenance', technicians: ['Mitchell Admin', 'Aka Foster', 'John Smith'] },
    { name: 'Metrology', technicians: ['Marc Demo', 'Sarah Johnson', 'Mike Davis'] },
    { name: 'Subcontractor', technicians: ['David Lee', 'Emma Wilson', 'Robert Brown'] },
  ];

  const equipmentOptions = [
    { id: 'EQ-001', name: 'Samsung Monitor 15"', category: 'Monitors' },
    { id: 'EQ-002', name: 'Acer Laptop', category: 'Computers' },
    { id: 'EQ-003', name: 'Dell Desktop', category: 'Computers' },
    { id: 'EQ-004', name: 'HP Printer', category: 'Printers' },
  ];

  const companies = [
    'TechCorp Industries',
    'Precision Manufacturing Ltd',
    'Global Solutions Inc',
    'Advanced Systems Corp',
    'Innovation Labs',
    'Digital Enterprises',
  ];

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

  useEffect(() => {
    // Mock data - in production this would come from an API
    const mockRequest: MaintenanceRequest = {
      id: id as string || 'MR-001',
      subject: 'Test activity',
      status: 'New',
      priority: 'Medium',
      createdBy: 'Mitchell Admin',
      team: 'Internal Maintenance',
      maintenanceFor: 'Equipment',
      equipment: 'Acer Laptop / LP/203/19281928',
      technician: 'Aka Foster',
      category: 'Computers',
      duration: '00:00 hours',
      requestDate: '12/18/2025',
      scheduledDate: '12/28/2025 14:30',
      maintenanceType: 'Corrective',
      company: 'TechCorp Industries',
      notes: '',
      instructions: '',
    };
    setRequest(mockRequest);
    setEditData(mockRequest);
  }, [id]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Low':
        return '#95a5a6';
      case 'Medium':
        return '#f39c12';
      case 'High':
        return '#e74c3c';
      default:
        return '#95a5a6';
    }
  };

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

  const handleEditChange = (field: string, value: string) => {
    if (editData) {
      setEditData({
        ...editData,
        [field]: value,
      });
    }
  };

  const handleEquipmentChange = (equipmentId: string) => {
    const selectedEquipment = equipmentOptions.find(eq => eq.id === equipmentId || eq.name === equipmentId);
    if (selectedEquipment && editData) {
      setEditData({
        ...editData,
        equipment: selectedEquipment.name,
        category: selectedEquipment.category,
      });
    }
  };

  const handleTeamChange = (teamName: string) => {
    if (editData) {
      setEditData({
        ...editData,
        team: teamName,
        technician: '',
      });
    }
  };

  const getCurrentTeamTechnicians = () => {
    const team = teams.find(t => t.name === editData?.team);
    return team ? team.technicians : [];
  };

  const handleSave = () => {
    if (editData) {
      setRequest(editData);
      setIsEditMode(false);
    }
  };

  if (!request) {
    return <div>Loading...</div>;
  }

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
              <div style={{ width: '35px', height: '35px', backgroundColor: '#714B67', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '18px', fontWeight: '700' }}>
                {userName.charAt(0).toUpperCase()}
              </div>
              <span style={{ fontSize: '14px', color: '#333' }}>{userName}</span>
            </div>
          </div>
        </div>

        {/* Breadcrumb */}
        <div style={{
          backgroundColor: '#fff',
          borderBottom: '1px solid #e0e0e0',
          padding: '12px 30px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '13px',
          color: '#666',
        }}>
          <span style={{ color: '#3b5bdb', fontWeight: '600' }}>New</span>
          <span>&gt;</span>
          <span>Maintenance Requests</span>
          <span>&gt;</span>
          <span style={{ fontWeight: '600', color: '#1a1a1a' }}>Test activity</span>
        </div>

        {/* Status Tabs */}
        <div style={{
          backgroundColor: '#fff',
          borderBottom: '1px solid #e0e0e0',
          padding: '0 30px',
          display: 'flex',
          gap: '30px',
          fontSize: '13px',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <div style={{ display: 'flex', gap: '30px' }}>
            {['New Request', 'In Progress', 'Repaired', 'Scrap'].map((tab, idx) => (
              <div
                key={idx}
                style={{
                  padding: '15px 0',
                  borderBottom: tab === 'New Request' ? '3px solid #3b5bdb' : 'none',
                  color: tab === 'New Request' ? '#3b5bdb' : '#999',
                  fontWeight: tab === 'New Request' ? '600' : '500',
                  cursor: 'pointer',
                }}
              >
                {idx === 0 && '1 '}{tab}
              </div>
            ))}
          </div>
          {!isEditMode && (
            <button
              onClick={() => setIsEditMode(true)}
              style={{
                padding: '8px 16px',
                backgroundColor: '#714B67',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                fontWeight: '600',
                fontSize: '12px',
                cursor: 'pointer',
                marginBottom: '0',
              }}
            >
              Edit
            </button>
          )}
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '30px' }}>
          {isEditMode ? (
            // EDIT MODE
            <div style={{
              backgroundColor: '#fff',
              borderRadius: '8px',
              padding: '30px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
            }}>
              <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#1a1a1a', margin: '0 0 25px 0' }}>Edit Maintenance Request</h2>

              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '25px',
                marginBottom: '30px',
              }}>
                {/* Subject */}
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#666', textTransform: 'uppercase', marginBottom: '8px' }}>
                    Subject
                  </label>
                  <input
                    type="text"
                    value={editData?.subject || ''}
                    onChange={(e) => handleEditChange('subject', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1px solid #e0e0e0',
                      borderRadius: '6px',
                      fontSize: '14px',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                {/* Maintenance For */}
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#666', textTransform: 'uppercase', marginBottom: '8px' }}>
                    Maintenance For
                  </label>
                  <select
                    value={editData?.maintenanceFor || ''}
                    onChange={(e) => handleEditChange('maintenanceFor', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1px solid #e0e0e0',
                      borderRadius: '6px',
                      fontSize: '14px',
                      boxSizing: 'border-box',
                    }}
                  >
                    <option value="Equipment">Equipment</option>
                    <option value="Work Center">Work Center</option>
                  </select>
                </div>

                {/* Equipment */}
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#666', textTransform: 'uppercase', marginBottom: '8px' }}>
                    Equipment
                  </label>
                  <select
                    value={editData?.equipment || ''}
                    onChange={(e) => handleEquipmentChange(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1px solid #e0e0e0',
                      borderRadius: '6px',
                      fontSize: '14px',
                      boxSizing: 'border-box',
                    }}
                  >
                    <option value="">Select Equipment</option>
                    {equipmentOptions.map((eq, idx) => (
                      <option key={idx} value={eq.name}>{eq.name}</option>
                    ))}
                  </select>
                </div>

                {/* Category */}
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#666', textTransform: 'uppercase', marginBottom: '8px' }}>
                    Category
                  </label>
                  <input
                    type="text"
                    value={editData?.category || ''}
                    disabled
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1px solid #e0e0e0',
                      borderRadius: '6px',
                      fontSize: '14px',
                      boxSizing: 'border-box',
                      backgroundColor: '#f9f9f9',
                      cursor: 'not-allowed',
                    }}
                  />
                </div>

                {/* Request Date */}
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#666', textTransform: 'uppercase', marginBottom: '8px' }}>
                    Request Date
                  </label>
                  <input
                    type="date"
                    value={editData?.requestDate || ''}
                    onChange={(e) => handleEditChange('requestDate', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1px solid #e0e0e0',
                      borderRadius: '6px',
                      fontSize: '14px',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                {/* Maintenance Type */}
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#666', textTransform: 'uppercase', marginBottom: '8px' }}>
                    Maintenance Type
                  </label>
                  <div style={{ display: 'flex', gap: '20px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
                      <input
                        type="radio"
                        name="maintenanceType"
                        value="Corrective"
                        checked={editData?.maintenanceType === 'Corrective'}
                        onChange={(e) => handleEditChange('maintenanceType', e.target.value)}
                      />
                      <span style={{ fontSize: '14px', color: '#333' }}>Corrective</span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
                      <input
                        type="radio"
                        name="maintenanceType"
                        value="Preventive"
                        checked={editData?.maintenanceType === 'Preventive'}
                        onChange={(e) => handleEditChange('maintenanceType', e.target.value)}
                      />
                      <span style={{ fontSize: '14px', color: '#333' }}>Preventive</span>
                    </label>
                  </div>
                </div>

                {/* Team */}
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#666', textTransform: 'uppercase', marginBottom: '8px' }}>
                    Team
                  </label>
                  <select
                    value={editData?.team || ''}
                    onChange={(e) => handleTeamChange(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1px solid #e0e0e0',
                      borderRadius: '6px',
                      fontSize: '14px',
                      boxSizing: 'border-box',
                    }}
                  >
                    <option value="">Select Team</option>
                    {teams.map((team, idx) => (
                      <option key={idx} value={team.name}>{team.name}</option>
                    ))}
                  </select>
                </div>

                {/* Technician */}
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#666', textTransform: 'uppercase', marginBottom: '8px' }}>
                    Technician
                  </label>
                  <select
                    value={editData?.technician || ''}
                    onChange={(e) => handleEditChange('technician', e.target.value)}
                    disabled={!editData?.team}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1px solid #e0e0e0',
                      borderRadius: '6px',
                      fontSize: '14px',
                      boxSizing: 'border-box',
                      backgroundColor: !editData?.team ? '#f9f9f9' : '#fff',
                      cursor: !editData?.team ? 'not-allowed' : 'pointer',
                    }}
                  >
                    <option value="">Select Technician</option>
                    {getCurrentTeamTechnicians().map((tech, idx) => (
                      <option key={idx} value={tech}>{tech}</option>
                    ))}
                  </select>
                </div>

                {/* Scheduled Date */}
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#666', textTransform: 'uppercase', marginBottom: '8px' }}>
                    Scheduled Date
                  </label>
                  <input
                    type="datetime-local"
                    value={editData?.scheduledDate || ''}
                    onChange={(e) => handleEditChange('scheduledDate', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1px solid #e0e0e0',
                      borderRadius: '6px',
                      fontSize: '14px',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                {/* Duration */}
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#666', textTransform: 'uppercase', marginBottom: '8px' }}>
                    Duration
                  </label>
                  <input
                    type="text"
                    value={editData?.duration || ''}
                    onChange={(e) => handleEditChange('duration', e.target.value)}
                    placeholder="e.g., 02:30 hours"
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1px solid #e0e0e0',
                      borderRadius: '6px',
                      fontSize: '14px',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                {/* Priority */}
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#666', textTransform: 'uppercase', marginBottom: '8px' }}>
                    Priority
                  </label>
                  <select
                    value={editData?.priority || ''}
                    onChange={(e) => handleEditChange('priority', e.target.value as 'Low' | 'Medium' | 'High')}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1px solid #e0e0e0',
                      borderRadius: '6px',
                      fontSize: '14px',
                      boxSizing: 'border-box',
                    }}
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>

                {/* Company */}
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#666', textTransform: 'uppercase', marginBottom: '8px' }}>
                    Company
                  </label>
                  <select
                    value={editData?.company || ''}
                    onChange={(e) => handleEditChange('company', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1px solid #e0e0e0',
                      borderRadius: '6px',
                      fontSize: '14px',
                      boxSizing: 'border-box',
                    }}
                  >
                    <option value="">Select Company</option>
                    {companies.map((company, idx) => (
                      <option key={idx} value={company}>{company}</option>
                    ))}
                  </select>
                </div>

                {/* Notes */}
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#666', textTransform: 'uppercase', marginBottom: '8px' }}>
                    Notes
                  </label>
                  <textarea
                    value={editData?.notes || ''}
                    onChange={(e) => handleEditChange('notes', e.target.value)}
                    placeholder="Add notes..."
                    style={{
                      width: '100%',
                      minHeight: '100px',
                      padding: '10px 12px',
                      border: '1px solid #e0e0e0',
                      borderRadius: '6px',
                      fontSize: '14px',
                      boxSizing: 'border-box',
                      fontFamily: 'inherit',
                      resize: 'vertical',
                    }}
                  />
                </div>

                {/* Instructions */}
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#666', textTransform: 'uppercase', marginBottom: '8px' }}>
                    Instructions
                  </label>
                  <textarea
                    value={editData?.instructions || ''}
                    onChange={(e) => handleEditChange('instructions', e.target.value)}
                    placeholder="Add instructions..."
                    style={{
                      width: '100%',
                      minHeight: '100px',
                      padding: '10px 12px',
                      border: '1px solid #e0e0e0',
                      borderRadius: '6px',
                      fontSize: '14px',
                      boxSizing: 'border-box',
                      fontFamily: 'inherit',
                      resize: 'vertical',
                    }}
                  />
                </div>
              </div>

              {/* Save/Cancel Buttons */}
              <div style={{ display: 'flex', gap: '15px' }}>
                <button
                  onClick={handleSave}
                  style={{
                    padding: '10px 25px',
                    backgroundColor: '#714B67',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '6px',
                    fontWeight: '600',
                    fontSize: '14px',
                    cursor: 'pointer',
                  }}
                >
                  Save Changes
                </button>
                <button
                  onClick={() => {
                    setIsEditMode(false);
                    setEditData(request);
                  }}
                  style={{
                    padding: '10px 25px',
                    backgroundColor: '#f5f5f5',
                    color: '#333',
                    border: '1px solid #e0e0e0',
                    borderRadius: '6px',
                    fontWeight: '600',
                    fontSize: '14px',
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            // VIEW MODE
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '30px',
            }}>
              {/* Left Column */}
              <div>
                <div style={{ marginBottom: '25px' }}>
                  <label style={{ fontSize: '12px', fontWeight: '600', color: '#999', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                    Subject
                  </label>
                  <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#1a1a1a', margin: '0' }}>
                    {request?.subject}
                  </h2>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '20px',
                  marginBottom: '25px',
                }}>
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: '600', color: '#999', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                      Created By
                    </label>
                    <p style={{ fontSize: '14px', color: '#333', margin: '0' }}>
                      {request?.createdBy}
                    </p>
                  </div>
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: '600', color: '#999', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                      Team
                    </label>
                    <p style={{ fontSize: '14px', color: '#333', margin: '0' }}>
                      {request?.team}
                    </p>
                  </div>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '20px',
                  marginBottom: '25px',
                }}>
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: '600', color: '#999', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                      Maintenance For
                    </label>
                    <p style={{ fontSize: '14px', color: '#333', margin: '0' }}>
                      {request?.maintenanceFor}
                    </p>
                  </div>
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: '600', color: '#999', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                      Technician
                    </label>
                    <p style={{ fontSize: '14px', color: '#333', margin: '0' }}>
                      {request?.technician}
                    </p>
                  </div>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '20px',
                  marginBottom: '25px',
                }}>
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: '600', color: '#999', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                      Equipment
                    </label>
                    <p style={{ fontSize: '14px', color: '#333', margin: '0' }}>
                      📄 {request?.equipment}
                    </p>
                  </div>
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: '600', color: '#999', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                      Category
                    </label>
                    <p style={{ fontSize: '14px', color: '#333', margin: '0' }}>
                      {request?.category}
                    </p>
                  </div>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '20px',
                  marginBottom: '25px',
                }}>
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: '600', color: '#999', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                      Request Date
                    </label>
                    <p style={{ fontSize: '14px', color: '#333', margin: '0' }}>
                      {request?.requestDate}
                    </p>
                  </div>
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: '600', color: '#999', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                      Maintenance Type
                    </label>
                    <div>
                      <input type="radio" id="corrective" name="type" checked={request?.maintenanceType === 'Corrective'} readOnly />
                      <label htmlFor="corrective" style={{ fontSize: '14px', color: '#333', marginRight: '15px' }}>Corrective</label>
                      <input type="radio" id="preventive" name="type" checked={request?.maintenanceType === 'Preventive'} readOnly />
                      <label htmlFor="preventive" style={{ fontSize: '14px', color: '#333' }}>Preventive</label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div>
                <div style={{
                  backgroundColor: '#fff',
                  padding: '20px',
                  borderRadius: '8px',
                  border: '1px solid #e0e0e0',
                  marginBottom: '25px',
                }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div style={{ textAlign: 'center', paddingBottom: '15px', borderBottom: '1px solid #e0e0e0' }}>
                      <label style={{ fontSize: '12px', fontWeight: '600', color: '#999', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                        Status
                      </label>
                      <span style={{
                        display: 'inline-block',
                        padding: '6px 12px',
                        backgroundColor: getStatusColor(request?.status || '') + '20',
                        color: getStatusColor(request?.status || ''),
                        borderRadius: '4px',
                        fontWeight: '600',
                        fontSize: '13px',
                      }}>
                        {request?.status}
                      </span>
                    </div>
                    <div style={{ textAlign: 'center', paddingBottom: '15px', borderBottom: '1px solid #e0e0e0' }}>
                      <label style={{ fontSize: '12px', fontWeight: '600', color: '#999', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                        Priority
                      </label>
                      <div style={{ display: 'flex', gap: '3px', justifyContent: 'center' }}>
                        {[...Array(3)].map((_, i) => (
                          <span
                            key={i}
                            style={{
                              display: 'inline-block',
                              width: '16px',
                              height: '16px',
                              borderRadius: '3px',
                              backgroundColor: i < (request?.priority === 'High' ? 3 : request?.priority === 'Medium' ? 2 : 1) ? getPriorityColor(request?.priority || '') : '#e0e0e0',
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ marginBottom: '25px' }}>
                  <label style={{ fontSize: '12px', fontWeight: '600', color: '#999', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                    Scheduled Date
                  </label>
                  <p style={{ fontSize: '14px', color: '#333', margin: '0' }}>
                    {request?.scheduledDate}
                  </p>
                </div>

                <div style={{ marginBottom: '25px' }}>
                  <label style={{ fontSize: '12px', fontWeight: '600', color: '#999', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                    Duration
                  </label>
                  <p style={{ fontSize: '14px', color: '#333', margin: '0' }}>
                    {request?.duration}
                  </p>
                </div>

                <div style={{ marginBottom: '25px' }}>
                  <label style={{ fontSize: '12px', fontWeight: '600', color: '#999', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                    Company
                  </label>
                  <p style={{ fontSize: '14px', color: '#333', margin: '0' }}>
                    {request?.company}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Notes and Instructions */}
          {!isEditMode && (
            <div style={{ marginTop: '30px' }}>
              <div style={{ display: 'flex', gap: '20px', borderBottom: '1px solid #e0e0e0', marginBottom: '20px' }}>
                {(['Notes', 'Instructions'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    style={{
                      padding: '12px 0',
                      border: 'none',
                      backgroundColor: 'transparent',
                      borderBottom: activeTab === tab ? '3px solid #714B67' : 'none',
                      color: activeTab === tab ? '#714B67' : '#999',
                      fontWeight: activeTab === tab ? '600' : '500',
                      fontSize: '14px',
                      cursor: 'pointer',
                    }}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {activeTab === 'Notes' && (
                <div style={{
                  padding: '15px',
                  backgroundColor: '#f9f9f9',
                  borderRadius: '6px',
                  color: request?.notes ? '#333' : '#999',
                  fontSize: '14px',
                  minHeight: '100px',
                }}>
                  {request?.notes || 'No notes added yet.'}
                </div>
              )}

              {activeTab === 'Instructions' && (
                <div style={{
                  padding: '15px',
                  backgroundColor: '#f9f9f9',
                  borderRadius: '6px',
                  color: request?.instructions ? '#333' : '#999',
                  fontSize: '14px',
                  minHeight: '100px',
                }}>
                  {request?.instructions || 'No instructions added yet.'}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MaintenanceDetail;