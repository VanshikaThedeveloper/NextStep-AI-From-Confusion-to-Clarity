import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import Navbar2 from '../components/Navbar2';
import Sidebar from '../components/Sidebar';

const DashboardLayout = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);

  return (
    <div className="control-layout">
      <Navbar2 />

      <div className="control-body">
        <Sidebar
          expanded={sidebarExpanded}
          onToggle={() => setSidebarExpanded((current) => !current)}
        />

        <main
          className={`control-main ${
            sidebarExpanded ? 'with-sidebar' : 'collapsed-sidebar'
          }`}
          id="main-content"
          role="main"
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
