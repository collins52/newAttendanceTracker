// Navigation configuration mapping
const navConfig = {
  home: {
    href: './index.html',
    icon: 'home.svg'
  },
  list: {
    href: './attendance/attendance.html',
    icon: 'list.svg'
  },
  add_circle: {
    href: './addStaff/addStaff.html',
    icon: 'add_circle.svg'
  },
  checklist: {
    href: './staffList/staffList.html',
    icon: 'checklist.svg'
  }
};

/**
 * Updates navigation links and highlights current page icon
 * Changes the icon src to include 'Page' in camelCase for the active page
 */
function updateNavigation() {
  const navItems = document.querySelectorAll('.nav-item');
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  navItems.forEach((item) => {
    const img = item.querySelector('img');
    if (!img) return;

    const iconName = img.src.split('/').pop().replace('.svg', '');
    const config = navConfig[iconName];

    if (config) {
      // Set the href
      item.href = config.href;

      // Determine if this is the current page
      const itemHref = config.href.split('/').pop();
      const isCurrentPage = currentPage === itemHref || 
                           (currentPage === '' && itemHref === 'index.html') ||
                           (currentPage === 'index.html' && itemHref === 'index.html');

      // Update class and icon
      if (isCurrentPage) {
        item.classList.add('active');
        // Change icon src to include 'Page' in camelCase
        const iconBaseName = iconName.replace('.svg', '');
        const pageIconName = iconBaseName.charAt(0).toUpperCase() + 
                            iconBaseName.slice(1).replace(/_./g, x => x[1].toUpperCase()) + 
                            'Page.svg';
        img.src = `./assets/${pageIconName}`;
      } else {
        item.classList.remove('active');
      }
    }
  });
}

// Call on page load
document.addEventListener('DOMContentLoaded', updateNavigation);
