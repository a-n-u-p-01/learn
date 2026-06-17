import { useTheme } from '../context/ThemeContext.jsx';
import { SunIcon, MoonIcon } from './Icons.jsx';

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button className="icon-btn" onClick={toggle} aria-label="Toggle dark mode" title="Toggle theme">
      {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}
