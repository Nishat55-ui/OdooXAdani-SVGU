'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 0, 1)); // January 2024
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

  const teams = [
    { name: 'Mechanics', color: '#714B67' },
    { name: 'IT Support', color: '#3b5bdb' },
    { name: 'HVAC', color: '#27ae60' },
    { name: 'Electricians', color: '#f39c12' },
  ];

  const events = [
    { date: 5, title: 'Monthly Checkup', team: 'Mechanics', color: '#714B67' },
    { date: 8, title: 'Filter Replacement', team: 'Mechanics', color: '#714B67' },
    { date: 12, title: 'AC Maintenance', team: 'HVAC', color: '#27ae60' },
    { date: 15, title: 'Server Checkup', team: 'IT Support', color: '#3b5bdb' },
    { date: 18, title: 'Belt Inspection', team: 'Mechanics', color: '#714B67' },
    { date: 22, title: 'Oil Change', team: 'Mechanics', color: '#714B67' },
    { date: 25, title: 'Printer Maintenance', team: 'IT Support', color: '#3b5bdb' },
  ];

  const daysInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const getEventForDate = (day: number) => {
    return events.find((event) => event.date === day);
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const totalDays = daysInMonth(currentDate);
  const firstDay = firstDayOfMonth(currentDate);
  const calendarDays = [];

  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }
  for (let i = 1; i <= totalDays; i++) {
    calendarDays.push(i);
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
            { icon: '🔧', label: 'Maintenance', href: '/maintenance' },
            { icon: '👥', label: 'Teams', href: '/equipment/teams' },
            { icon: '📅', label: 'Calendar', href: '/calendar', active: true },
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
          <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#1a1a1a', margin: '0' }}>Maintenance Calendar</h1>
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

        {/* Calendar Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '30px' }}>
          <div style={{
            backgroundColor: '#fff',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
            padding: '30px',
          }}>
            {/* Header with Navigation */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '30px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <button
                  onClick={previousMonth}
                  style={{
                    padding: '8px 12px',
                    border: '1px solid #e0e0e0',
                    backgroundColor: '#f9f9f9',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '16px',
                  }}
                >
                  ←
                </button>
                <h2 style={{
                  fontSize: '24px',
                  fontWeight: '700',
                  color: '#1a1a1a',
                  margin: '0',
                  minWidth: '180px',
                  textAlign: 'center',
                }}>
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h2>
                <button
                  onClick={nextMonth}
                  style={{
                    padding: '8px 12px',
                    border: '1px solid #e0e0e0',
                    backgroundColor: '#f9f9f9',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '16px',
                  }}
                >
                  →
                </button>
              </div>
              <button style={{
                padding: '10px 20px',
                backgroundColor: '#714B67',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                fontWeight: '600',
                fontSize: '14px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}>
                + Schedule Maintenance
              </button>
            </div>

            {/* Team Legend */}
            <div style={{
              display: 'flex',
              gap: '20px',
              marginBottom: '30px',
              flexWrap: 'wrap',
            }}>
              {teams.map((team, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div
                    style={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '2px',
                      backgroundColor: team.color,
                    }}
                  />
                  <span style={{ fontSize: '13px', color: '#666', fontWeight: '500' }}>
                    {team.name}
                  </span>
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div style={{ marginBottom: '20px' }}>
              {/* Day Headers */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(7, 1fr)',
                gap: '1px',
                backgroundColor: '#e0e0e0',
                marginBottom: '1px',
              }}>
                {dayNames.map((day, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '15px',
                      backgroundColor: '#f9f9f9',
                      textAlign: 'center',
                      fontWeight: '600',
                      fontSize: '13px',
                      color: '#666',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                    }}
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Days */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(7, 1fr)',
                gap: '1px',
                backgroundColor: '#e0e0e0',
              }}>
                {calendarDays.map((day, idx) => {
                  const event = day ? getEventForDate(day) : null;
                  return (
                    <div
                      key={idx}
                      style={{
                        padding: '15px',
                        backgroundColor: '#fff',
                        minHeight: '120px',
                        position: 'relative',
                      }}
                    >
                      {day && (
                        <>
                          <div style={{
                            fontSize: '14px',
                            fontWeight: '600',
                            color: '#1a1a1a',
                            marginBottom: '10px',
                          }}>
                            {day}
                          </div>
                          {event && (
                            <div
                              style={{
                                padding: '6px 8px',
                                backgroundColor: event.color,
                                color: '#fff',
                                borderRadius: '4px',
                                fontSize: '11px',
                                fontWeight: '600',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                cursor: 'pointer',
                              }}
                              title={event.title}
                            >
                              {event.title}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Event List */}
            <div style={{ marginTop: '30px', borderTop: '1px solid #e0e0e0', paddingTop: '30px' }}>
              <h3 style={{
                fontSize: '16px',
                fontWeight: '700',
                color: '#1a1a1a',
                margin: '0 0 20px 0',
              }}>
                Scheduled Maintenance Tasks
              </h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '15px',
              }}>
                {events.map((event, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '15px',
                      border: '1px solid #e0e0e0',
                      borderRadius: '6px',
                      borderLeft: `4px solid ${event.color}`,
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                      <p style={{ fontSize: '14px', fontWeight: '600', color: '#1a1a1a', margin: '0' }}>
                        {event.title}
                      </p>
                      <span style={{
                        fontSize: '12px',
                        fontWeight: '600',
                        color: event.color,
                        backgroundColor: event.color + '20',
                        padding: '2px 8px',
                        borderRadius: '3px',
                      }}>
                        {event.team}
                      </span>
                    </div>
                    <p style={{ fontSize: '13px', color: '#999', margin: '0' }}>
                      {monthNames[currentDate.getMonth()]} {event.date}, {currentDate.getFullYear()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;