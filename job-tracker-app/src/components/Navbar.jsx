import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import ThemeToggle from './ThemeToggle.jsx';
import { BriefcaseIcon, LogoutIcon } from './Icons.jsx';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const initials = (user?.displayName || user?.email || 'U').trim().charAt(0).toUpperCase();

  const handleLogout = async () => {
    await logout();
    navigate('/login', { replace: true });
  };

  return (
    <nav className="navbar">
      <div className="nav-inner">
        <div className="nav-brand">
          <span className="logo">
            <BriefcaseIcon size={17} />
          </span>
          <span className="name">JobTrack</span>
        </div>

        <div className="tabs">
          <NavLink to="/" end className={({ isActive }) => 'tab' + (isActive ? ' active' : '')}>
            Tracker
          </NavLink>
          <NavLink to="/companies" className={({ isActive }) => 'tab' + (isActive ? ' active' : '')}>
            Companies
          </NavLink>
        </div>

        <div className="nav-right">
          <ThemeToggle />
          <button className="user-chip" onClick={handleLogout} title="Sign out">
            <span className="avatar">{initials}</span>
            <span className="user-email">{user?.displayName || user?.email}</span>
            <LogoutIcon size={15} />
          </button>
        </div>
      </div>
    </nav>
  );
}
