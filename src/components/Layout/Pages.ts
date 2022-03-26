interface Page {
  label: string;
  title: string;
  desc: string;
  href: string;
  hidden?: boolean;
  footerOnly?: boolean;
}

const desc = 'Drone photography';

/**
 * Each key is the path/href to the page,
 * label is what to display for links to the page
 * title is the page title that goes in the tab in browser
 * desc goes in the description meta for the page
 * hidden means it is hidden from navigation
 */
export const pages: { [href: string]: Page } = {
  '/': {
    label: 'home',
    title: 'Big Air Angles',
    desc,
    href: '/',
  },
  '/login': {
    label: 'login',
    title: 'Big Air Angles | login',
    desc,
    hidden: true,
    href: '/login',
  },
  '/admin': {
    label: 'admin',
    title: 'Big Air Angles | admin',
    desc,
    hidden: true,
    href: '/admin',
  },
};

// Pages that should be shown in navigation areas
export const navPages = Object.values(pages).filter((page) => !page.hidden);
