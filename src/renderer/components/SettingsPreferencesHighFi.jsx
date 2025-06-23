// src/components/SettingsPreferencesHighFi.jsx
import React, { useState } from 'react';
import { User, Lock, Bell, Sun, Moon, Shield } from 'lucide-react';

// UI primitives
const Card = ({ children, className = '' }) => (
  <div className={`${className} bg-white rounded-lg shadow p-6`}>{children}</div>
);
const Button = ({ children, className = '', ...props }) => (
  <button className={`${className} px-4 py-2 rounded bg-teal-600 text-white hover:shadow transition`} {...props}>
    {children}
  </button>
);
const Toggle = ({ enabled, onToggle }) => (
  <div onClick={onToggle} className="cursor-pointer inline-flex items-center p-1 bg-gray-200 rounded-full w-14">
    <div className={`w-6 h-6 bg-white rounded-full shadow transform transition ${enabled ? 'translate-x-6' : ''}`} />
  </div>
);

export default function SettingsPreferencesHighFi() {
  const [twoFactor, setTwoFactor] = useState(false);
  const [notifications, setNotifications] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50 p-6">
      <aside className="w-64 bg-white shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-teal-600 mb-6">Settings</h2>
      </aside>
      <main className="flex-1 space-y-6 overflow-auto">
        {/* Profile */}
        <Card>
          <div className="flex items-center mb-4 space-x-3">
            <User size={24} className="text-teal-600" />
            <h3 className="text-xl font-semibold">Profile</h3>
          </div>
          <div className="opacity-50 pointer-events-none relative">
            <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center">
              <Shield size={32} className="text-gray-400 animate-pulse" />
            </div>
            <div className="space-y-4">
              <input className="w-full border rounded p-2" placeholder="Locked" readOnly />
              <input className="w-full border rounded p-2" placeholder="Locked" readOnly />
            </div>
          </div>
        </Card>
        {/* Two-factor */}
        <Card>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-3">
              <Lock size={24} className="text-teal-600" />
              <h3 className="text-xl font-semibold">Two-factor Auth</h3>
            </div>
            <Toggle enabled={twoFactor} onToggle={() => setTwoFactor(!twoFactor)} />
          </div>
          <p className="text-gray-600 text-sm">
            Adds an extra layer of security by requiring a code at login.
          </p>
        </Card>
        {/* Notifications */}
        <Card>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-3">
              <Bell size={24} className="text-teal-600" />
              <h3 className="text-xl font-semibold">Email Notifications</h3>
            </div>
            <Toggle enabled={notifications} onToggle={() => setNotifications(!notifications)} />
          </div>
          <p className="text-gray-600 text-sm">
            Receive updates about upcoming sessions, tasks, and messages.
          </p>
        </Card>
        {/* Appearance */}
        <Card>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-3">
              {darkMode ? <Moon size={24} className="text-teal-600" /> : <Sun size={24} className="text-teal-600" />}
              <h3 className="text-xl font-semibold">Dark Mode</h3>
            </div>
            <Toggle enabled={darkMode} onToggle={() => setDarkMode(!darkMode)} />
          </div>
          <p className="text-gray-600 text-sm">
            Toggle between light and dark themes for comfortable viewing.
          </p>
        </Card>
        <div className="flex justify-end">
          <Button>Save Changes</Button>
        </div>
      </main>
    </div>
  );
}
