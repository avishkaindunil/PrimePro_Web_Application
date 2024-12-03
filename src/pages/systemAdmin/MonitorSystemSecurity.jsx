import React, { useState } from 'react';

const MonitorSystemSecurity = () => {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: 'Critical',
      message: 'Unauthorized login attempt detected.',
      timestamp: '2024-11-28 14:30',
    },
    {
      id: 2,
      type: 'Warning',
      message: 'System update required for security patch.',
      timestamp: '2024-11-27 16:00',
    },
    {
      id: 3,
      type: 'Info',
      message: 'Firewall is active and running.',
      timestamp: '2024-11-27 09:15',
    },
  ]);

  const securityStats = {
    systemUptime: '99.98%',
    lastUpdate: '2024-11-20',
    activeSessions: 25,
    firewallStatus: 'Active',
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">System Security Monitoring</h1>

      {/* Security Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-lg font-bold">System Uptime</h2>
          <p className="text-gray-600">{securityStats.systemUptime}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-lg font-bold">Last Update</h2>
          <p className="text-gray-600">{securityStats.lastUpdate}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-lg font-bold">Active Sessions</h2>
          <p className="text-gray-600">{securityStats.activeSessions}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-lg font-bold">Firewall Status</h2>
          <p className="text-gray-600">{securityStats.firewallStatus}</p>
        </div>
      </div>

      {/* Security Alerts */}
      <div className="bg-white shadow rounded-lg p-4 mb-6">
        <h2 className="text-xl font-bold mb-4">Security Alerts</h2>
        {alerts.length === 0 ? (
          <p className="text-gray-600">No alerts at this time.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {alerts.map((alert) => (
              <li
                key={alert.id}
                className={`py-4 px-2 rounded ${
                  alert.type === 'Critical'
                    ? 'bg-red-100 border-l-4 border-red-500'
                    : alert.type === 'Warning'
                    ? 'bg-yellow-100 border-l-4 border-yellow-500'
                    : 'bg-green-100 border-l-4 border-green-500'
                }`}
              >
                <h3 className="font-semibold">
                  {alert.type} Alert: {alert.message}
                </h3>
                <p className="text-sm text-gray-600">Timestamp: {alert.timestamp}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Security Tools */}
      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-xl font-bold mb-4">Security Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="bg-blue-500 text-white py-2 px-4 rounded">
            Run Security Scan
          </button>
          <button className="bg-blue-500 text-white py-2 px-4 rounded">
            Update System
          </button>
          <button className="bg-blue-500 text-white py-2 px-4 rounded">
            View Session Logs
          </button>
          <button className="bg-blue-500 text-white py-2 px-4 rounded">
            Configure Firewall
          </button>
        </div>
      </div>
    </div>
  );
};

export default MonitorSystemSecurity;
