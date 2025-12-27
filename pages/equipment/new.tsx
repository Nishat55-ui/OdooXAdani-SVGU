'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const NewEquipment = () => {
  const router = useRouter();
  const [userName, setUserName] = useState('User');
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    company: '',
    usedBy: 'Employee',
    maintenanceTeam: '',
    assignedDate: '',
    technician: '',
    employee: '',
    scrapDate: '',
    usedInLocation: '',
    workCenter: '',
    description: '',
  });

  const categories = ['Computers', 'Monitors', 'Printers', 'Network Equipment', 'Power Equipment', 'Cooling Equipment', 'Other'];
  const teams = ['Internal Maintenance', 'Metrology', 'Subcontractor'];
  const companies = ['TechCorp Industries', 'Precision Manufacturing Ltd', 'Global Solutions Inc', 'Advanced Systems Corp', 'Innovation Labs', 'Digital Enterprises'];
  const employees = ['Mitchell Admin', 'Aka Foster', 'John Smith', 'Marc Demo', 'Sarah Johnson', 'Abigail Peterson'];
  const technicians = ['Mitchell Admin', 'Aka Foster', 'John Smith', 'Marc Demo', 'Sarah Johnson', 'David Lee'];

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('New Equipment:', formData);
    router.push('/equipment');
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
          <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#1a1a1a', margin: '0' }}>New Equipment</h1>
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
            padding: '30px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
          }}>
            <form onSubmit={handleSubmit}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '40px',
                marginBottom: '30px',
              }}>
                {/* Left Column */}
                <div>
                  {/* Name */}
                  <div style={{ marginBottom: '25px' }}>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>
                      Name?
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g., Samsung Monitor"
                      required
                      style={{
                        width: '100%',
                        padding: '8px 0px',
                        border: 'none',
                        borderBottom: '1px solid #333',
                        fontSize: '14px',
                        boxSizing: 'border-box',
                        outline: 'none',
                      }}
                    />
                  </div>

                  {/* Equipment Category */}
                  <div style={{ marginBottom: '25px' }}>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>
                      Equipment Category?
                    </label>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        style={{
                          flex: 1,
                          padding: '8px 0px',
                          border: 'none',
                          borderBottom: '1px solid #333',
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
                      <Link
                        href="/equipment/categories"
                        style={{
                          padding: '6px 12px',
                          backgroundColor: '#f0ecf7',
                          color: '#8b7ba8',
                          borderRadius: '4px',
                          textDecoration: 'none',
                          fontWeight: '600',
                          fontSize: '12px',
                          cursor: 'pointer',
                          alignSelf: 'flex-end',
                        }}
                      >
                        New
                      </Link>
                    </div>
                  </div>

                  {/* Company */}
                  <div style={{ marginBottom: '25px' }}>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>
                      Company?
                    </label>
                    <select
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: '8px 0px',
                        border: 'none',
                        borderBottom: '1px solid #333',
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

                  {/* Used By */}
                  <div style={{ marginBottom: '25px' }}>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>
                      Used By?
                    </label>
                    <select
                      name="usedBy"
                      value={formData.usedBy}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: '8px 0px',
                        border: 'none',
                        borderBottom: '1px solid #333',
                        fontSize: '14px',
                        boxSizing: 'border-box',
                        outline: 'none',
                        backgroundColor: 'transparent',
                      }}
                    >
                      <option value="Employee">Employee</option>
                      <option value="Department">Department</option>
                      <option value="Work Center">Work Center</option>
                    </select>
                  </div>

                  {/* Maintenance Team */}
                  <div style={{ marginBottom: '25px' }}>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>
                      Maintenance Team?
                    </label>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <select
                        name="maintenanceTeam"
                        value={formData.maintenanceTeam}
                        onChange={handleChange}
                        style={{
                          flex: 1,
                          padding: '8px 0px',
                          border: 'none',
                          borderBottom: '1px solid #333',
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
                      <Link
                        href="/equipment/teams"
                        style={{
                          padding: '6px 12px',
                          backgroundColor: '#f3eef8',
                          color: '#714B67',
                          borderRadius: '4px',
                          textDecoration: 'none',
                          fontWeight: '600',
                          fontSize: '12px',
                          cursor: 'pointer',
                          alignSelf: 'flex-end',
                        }}
                      >
                        New
                      </Link>
                    </div>
                  </div>

                  {/* Assigned Date */}
                  <div style={{ marginBottom: '25px' }}>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>
                      Assigned Date?
                    </label>
                    <input
                      type="date"
                      name="assignedDate"
                      value={formData.assignedDate}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: '8px 0px',
                        border: 'none',
                        borderBottom: '1px solid #333',
                        fontSize: '14px',
                        boxSizing: 'border-box',
                        outline: 'none',
                      }}
                    />
                  </div>

                  {/* Description */}
                  <div style={{ marginBottom: '25px' }}>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Enter equipment description..."
                      style={{
                        width: '100%',
                        minHeight: '100px',
                        padding: '8px 0px',
                        border: 'none',
                        borderBottom: '1px solid #333',
                        fontSize: '14px',
                        boxSizing: 'border-box',
                        fontFamily: 'inherit',
                        resize: 'vertical',
                        outline: 'none',
                        backgroundColor: 'transparent',
                      }}
                    />
                  </div>
                </div>

                {/* Right Column */}
                <div>
                  {/* Technician */}
                  <div style={{ marginBottom: '25px' }}>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>
                      Technician?
                    </label>
                    <select
                      name="technician"
                      value={formData.technician}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: '8px 0px',
                        border: 'none',
                        borderBottom: '1px solid #333',
                        fontSize: '14px',
                        boxSizing: 'border-box',
                        outline: 'none',
                        backgroundColor: 'transparent',
                      }}
                    >
                      <option value="">Select Technician</option>
                      {technicians.map((tech) => (
                        <option key={tech} value={tech}>{tech}</option>
                      ))}
                    </select>
                  </div>

                  {/* Employee */}
                  <div style={{ marginBottom: '25px' }}>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>
                      Employee?
                    </label>
                    <select
                      name="employee"
                      value={formData.employee}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: '8px 0px',
                        border: 'none',
                        borderBottom: '1px solid #333',
                        fontSize: '14px',
                        boxSizing: 'border-box',
                        outline: 'none',
                        backgroundColor: 'transparent',
                      }}
                    >
                      <option value="">Select Employee</option>
                      {employees.map((emp) => (
                        <option key={emp} value={emp}>{emp}</option>
                      ))}
                    </select>
                  </div>

                  {/* Scrap Date */}
                  <div style={{ marginBottom: '25px' }}>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>
                      Scrap Date?
                    </label>
                    <input
                      type="date"
                      name="scrapDate"
                      value={formData.scrapDate}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: '8px 0px',
                        border: 'none',
                        borderBottom: '1px solid #333',
                        fontSize: '14px',
                        boxSizing: 'border-box',
                        outline: 'none',
                      }}
                    />
                  </div>

                  {/* Used in location */}
                  <div style={{ marginBottom: '25px' }}>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>
                      Used in location?
                    </label>
                    <input
                      type="text"
                      name="usedInLocation"
                      value={formData.usedInLocation}
                      onChange={handleChange}
                      placeholder="Enter location..."
                      style={{
                        width: '100%',
                        padding: '8px 0px',
                        border: 'none',
                        borderBottom: '1px solid #333',
                        fontSize: '14px',
                        boxSizing: 'border-box',
                        outline: 'none',
                      }}
                    />
                  </div>

                  {/* Work Center */}
                  <div style={{ marginBottom: '25px' }}>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>
                      Work Center?
                    </label>
                    <input
                      type="text"
                      name="workCenter"
                      value={formData.workCenter}
                      onChange={handleChange}
                      placeholder="Enter work center..."
                      style={{
                        width: '100%',
                        padding: '8px 0px',
                        border: 'none',
                        borderBottom: '1px solid #333',
                        fontSize: '14px',
                        boxSizing: 'border-box',
                        outline: 'none',
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div style={{ display: 'flex', gap: '15px', justifyContent: 'flex-start', marginTop: '30px' }}>
                <button
                  type="submit"
                  style={{
                    padding: '10px 25px',
                    backgroundColor: '#714B67',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    fontWeight: '600',
                    fontSize: '14px',
                    cursor: 'pointer',
                  }}
                >
                  Save Equipment
                </button>
                <button
                  type="button"
                  onClick={() => router.push('/equipment')}
                  style={{
                    padding: '10px 25px',
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

export default NewEquipment;