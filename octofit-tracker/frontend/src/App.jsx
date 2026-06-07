import { NavLink, Navigate, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import { buildApiUrl, getApiHost, isCodespaceConfigured } from './lib/api';
import './App.css';

const tabs = [
  { to: '/users', label: 'Users' },
  { to: '/teams', label: 'Teams' },
  { to: '/activities', label: 'Activities' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/workouts', label: 'Workouts' },
];

function Home() {
  return (
    <section className="panel card border-0 shadow-sm">
      <div className="card-body">
        <h2 className="h4 mb-3">OctoFit Tracker Presentation Tier</h2>
        <p className="mb-3">
          This React 19 app uses <strong>react-router-dom</strong> for navigation and
          fetches data from the Node.js API.
        </p>
        <div className="alert alert-info mb-3" role="alert">
          Define <code>VITE_CODESPACE_NAME</code> in <code>.env.local</code> to target
          Codespaces APIs.
        </div>
        <p className="mb-2"><strong>Current API host:</strong> {getApiHost()}</p>
        <p className="mb-2">
          <strong>Endpoint pattern:</strong>{' '}
          https://{import.meta.env.VITE_CODESPACE_NAME || 'YOUR_CODESPACE_NAME'}-8000.app.github.dev/api/[component]/
        </p>
        {!isCodespaceConfigured() && (
          <p className="mb-0 text-warning-emphasis">
            Fallback in use: <code>http://localhost:8000</code>
          </p>
        )}
      </div>
    </section>
  );
}

function App() {
  return (
    <div className="app-shell">
      <header className="hero-band">
        <div className="container py-4 py-md-5">
          <div className="d-flex align-items-center gap-3 flex-wrap">
            <img src="/docs/octofitapp-small.png" alt="OctoFit logo" className="logo-mark" />
            <div>
              <p className="eyebrow mb-1">OctoFit Tracker</p>
              <h1 className="display-6 mb-0">Modern Multi-Tier Fitness Dashboard</h1>
            </div>
          </div>
          <p className="hero-copy mt-3 mb-0">
            API base for users: <code>{buildApiUrl('users')}</code>
          </p>
        </div>
      </header>

      <main className="container py-4 py-md-5">
        <nav className="nav nav-pills octofit-nav mb-4" aria-label="Primary navigation">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            Overview
          </NavLink>
          {tabs.map((tab) => (
            <NavLink
              key={tab.to}
              to={tab.to}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              {tab.label}
            </NavLink>
          ))}
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
