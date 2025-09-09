import { NavLink } from 'react-router-dom';
import css from './Navigation.module.css';
import clsx from 'clsx';

const navigationLinks = [
  { to: '/', label: 'Home' },
  { to: '/movies', label: 'Movies' },
];

export default function Navigation() {
  return (
    <nav className={css.nav}>
      {navigationLinks.map(({ to, label }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) => clsx(css.link, { [css.active]: isActive })}
        >
          {label}
        </NavLink>
      ))}
    </nav>
  );
}
