import React from 'react';
import { Package, LayoutDashboard, FileText, Users, Settings, Search, Bell, TrendingUp, DollarSign, Box, Cpu } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './index.css';

const data = [
  { name: 'Mon', listings: 12 },
  { name: 'Tue', listings: 19 },
  { name: 'Wed', listings: 15 },
  { name: 'Thu', listings: 25 },
  { name: 'Fri', listings: 22 },
  { name: 'Sat', listings: 30 },
  { name: 'Sun', listings: 28 },
];

function App() {
  const pendingListings = [
    { id: 1, sku: 'BOT-A1B2C3', title: 'Professional DSLR Camera Lens', price: 14500, status: 'approved', date: 'Oct 24, 2023' },
    { id: 2, sku: 'BOT-99XYZ1', title: 'Wireless Bluetooth Headphones', price: 2999, status: 'editing', date: 'Oct 24, 2023' },
    { id: 3, sku: 'BOT-L0L0L0', title: 'Men\'s Formal Leather Shoes', price: 1200, status: 'pending', date: 'Oct 23, 2023' },
    { id: 4, sku: 'BOT-X8Y8Z8', title: 'Ergonomic Office Chair', price: 8500, status: 'approved', date: 'Oct 22, 2023' }
  ];

  const connectedUsers = [
    { id: 1, phone: '+91 98765 43210', platforms: ['AMAZON', 'FLIPKART'] },
    { id: 2, phone: '+91 87654 32109', platforms: ['AMAZON'] },
    { id: 3, phone: '+1 555 123 4567', platforms: ['FLIPKART'] },
    { id: 4, phone: '+44 7911 123456', platforms: ['AMAZON', 'FLIPKART'] }
  ];

  return (
    <div className="layout">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="sidebar-brand">
          <Cpu color="var(--accent)" size={32} />
          <span>DNInfo</span>
        </div>
        <nav className="sidebar-nav">
          <div className="nav-item active">
            <LayoutDashboard size={20} />
            Overview
          </div>
          <div className="nav-item">
            <FileText size={20} />
            Products
          </div>
          <div className="nav-item">
            <Users size={20} />
            Sellers Hub
          </div>
          <div className="nav-item" style={{ marginTop: 'auto' }}>
            <Settings size={20} />
            Settings
          </div>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="main-content">
        <header className="top-header">
          <div className="search-bar">
            <Search size={18} color="var(--text-secondary)" />
            <input type="text" placeholder="Search operations, active products..." />
          </div>
          <div className="header-actions">
            <button className="btn-primary">
              Run Sequence
            </button>
            <Bell className="icon-btn" size={24} color="var(--text-secondary)" />
            <div className="avatar">P</div>
          </div>
        </header>

        <div className="dashboard-body">
          <div className="page-header">
            <h1 className="page-title">Operations Control</h1>
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-header">
                <span className="stat-title">Volume Processed</span>
                <Box size={22} className="stat-icon highlight" />
              </div>
              <div className="stat-value">1,432</div>
              <div className="stat-change change-positive">
                <TrendingUp size={16} /> +12.5% acceleration
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-header">
                <span className="stat-title">Active Integrations</span>
                <Users size={22} className="stat-icon" />
              </div>
              <div className="stat-value">84</div>
              <div className="stat-change change-positive">
                <TrendingUp size={16} /> Expanding network
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-header">
                <span className="stat-title">Pending Analysis</span>
                <FileText size={22} className="stat-icon" />
              </div>
              <div className="stat-value">12</div>
              <div className="stat-change" style={{ color: 'var(--text-secondary)' }}>
                Require WhatsApp action
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-header">
                <span className="stat-title">Revenue Generated</span>
                <DollarSign size={22} className="stat-icon" />
              </div>
              <div className="stat-value">₹4.2M</div>
              <div className="stat-change change-positive">
                <TrendingUp size={16} /> Based on ML indexing
              </div>
            </div>
          </div>

          <div className="content-grid">
            
            <div className="panel">
              <div className="panel-header">
                <div className="panel-title">Throughput</div>
              </div>
              <div style={{ padding: '2rem', height: '350px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorListings" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="var(--accent)" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-secondary)', fontSize: 13 }} dy={15} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--text-secondary)', fontSize: 13 }} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--accent)', borderRadius: '12px' }}
                      itemStyle={{ color: 'var(--text-primary)' }}
                    />
                    <Area type="monotone" dataKey="listings" stroke="var(--accent)" strokeWidth={3} fillOpacity={1} fill="url(#colorListings)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              
              <div className="panel-header" style={{ borderTop: '1px solid var(--border-color)' }}>
                <div className="panel-title">Recent Generations</div>
              </div>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Identifier (SKU)</th>
                    <th>Extracted Title</th>
                    <th>Market Value</th>
                    <th>Pipeline Status</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingListings.map(item => (
                    <tr key={item.id}>
                      <td style={{ fontFamily: 'monospace', color: 'var(--text-secondary)' }}>{item.sku}</td>
                      <td style={{ fontWeight: 500 }}>{item.title}</td>
                      <td>₹{item.price.toLocaleString()}</td>
                      <td>
                        <span className={`badge badge-${item.status}`}>
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="panel" style={{ height: 'fit-content' }}>
              <div className="panel-header">
                <div className="panel-title">Active Connections</div>
              </div>
              <div className="user-list">
                {connectedUsers.map((user, idx) => (
                  <div key={user.id} className="user-item">
                    <div className="user-info">
                      <div className="user-avatar">
                        <span style={{ fontSize: '0.9rem', color: idx === 0 ? 'var(--accent)' : 'inherit' }}>
                          0{user.id}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.95rem', fontWeight: 500 }}>{user.phone}</div>
                    </div>
                    <div>
                      {user.platforms.map(p => (
                        <span key={p} className={`platform-pill ${idx === 0 ? 'active' : ''}`}>{p}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
