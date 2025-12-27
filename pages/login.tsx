'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setSuccessMessage('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage('Login successful! Redirecting...');
        // Store user data in localStorage (optional)
        localStorage.setItem('user', JSON.stringify(data.user));
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 1500);
      } else {
        setErrors({ submit: data.message || 'Login failed' });
      }
    } catch (error) {
      setErrors({ submit: 'An error occurred. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f5f5f5', padding: '20px' }}>
      <div style={{ width: '100%', maxWidth: '450px', padding: '40px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.08)', backgroundColor: '#fff' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{ width: '60px', height: '60px', margin: '0 auto 15px', backgroundColor: '#714B67', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '32px' }}>⚙️</span>
          </div>
          <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#1a1a1a', margin: '0 0 8px 0' }}>GearGuard</h1>
          <p style={{ fontSize: '14px', color: '#666', margin: '0' }}>The Ultimate Maintenance Tracker</p>
        </div>

        {successMessage && (
          <div style={{ padding: '12px', marginBottom: '20px', backgroundColor: '#d4edda', border: '1px solid #c3e6cb', borderRadius: '6px', color: '#155724', fontSize: '14px' }}>
            {successMessage}
          </div>
        )}

        {errors.submit && (
          <div style={{ padding: '12px', marginBottom: '20px', backgroundColor: '#f8d7da', border: '1px solid #f5c6cb', borderRadius: '6px', color: '#721c24', fontSize: '14px' }}>
            {errors.submit}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#333' }}>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@company.com"
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: '6px',
                border: errors.email ? '1px solid #e74c3c' : '1px solid #e0e0e0',
                fontSize: '14px',
                boxSizing: 'border-box',
                fontFamily: 'inherit',
              }}
            />
            {errors.email && <p style={{ color: '#e74c3c', fontSize: '12px', marginTop: '4px', margin: '4px 0 0 0' }}>{errors.email}</p>}
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#333' }}>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: '6px',
                border: errors.password ? '1px solid #e74c3c' : '1px solid #e0e0e0',
                fontSize: '14px',
                boxSizing: 'border-box',
                fontFamily: 'inherit',
              }}
            />
            {errors.password && <p style={{ color: '#e74c3c', fontSize: '12px', marginTop: '4px', margin: '4px 0 0 0' }}>{errors.password}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '6px',
              backgroundColor: loading ? '#8b6280' : '#714B67',
              color: '#fff',
              fontWeight: '600',
              fontSize: '14px',
              border: 'none',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.2s',
            }}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <p style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>
            <Link href="/forgot-password" style={{ color: '#714B67', textDecoration: 'none', fontWeight: '500' }}>
              Forgot password?
            </Link>
          </p>
          <p style={{ fontSize: '14px', color: '#666' }}>
            Don't have an account?{' '}
            <Link href="/signup" style={{ color: '#714B67', textDecoration: 'none', fontWeight: '500' }}>
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;