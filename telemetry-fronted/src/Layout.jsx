import { Outlet, Link, useLocation } from 'react-router-dom';

export default function Layout() {
  const location = useLocation();
    const navLinks =[
    { path: '/', icon: 'dashboard', label: 'Dashboard' },
    { path: '/history', icon: 'history', label: 'History' },
    { path: '/logs', icon: 'description', label: 'Logs' },
    { path: '/safety', icon: 'security', label: 'Safety' },
    { path: '/admin', icon: 'admin_panel_settings', label: 'Admin' },
    { path: '/profile', icon: 'account_circle', label: 'Profile' },
  ];

  return (
    <>
      {/* SideNavBar */}
      <aside className="side-bar fixed left-0 top-0 h-full z-40 flex flex-col bg-slate-900 dark:bg-[#111316] w-64 border-r-0">
        <div className="p-6 flex flex-col gap-1">
          <span className="text-xl font-bold tracking-tighter text-slate-100 dark:text-[#9ecaff] headline-font">Telemetry Pro</span>
          <span className="text-xs uppercase tracking-widest text-slate-400 dark:text-slate-500 font-label">Precision Tracking</span>
        </div>
        
        <nav className="flex-1 mt-4">
          <ul className="space-y-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <li key={link.path} className="px-4">
                  <Link
                    to={link.path}
                    className={`flex items-center gap-3 px-4 py-3 transition-colors duration-200 ${
                      isActive
                        ? 'bg-[#282a2d] text-[#9ecaff] font-bold border-l-4 border-[#9ecaff]'
                        : 'text-slate-400 dark:text-slate-500 hover:text-slate-200 hover:bg-[#1e2023] dark:hover:bg-[#1e2023]'
                    }`}
                  >
                    <span className="material-symbols-outlined">{link.icon}</span>
                    <span className="text-xs uppercase tracking-widest font-label">{link.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        
        <div className="p-6 mt-auto">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-surface-container-low">
            <img alt="User profile avatar" className="w-8 h-8 rounded-full bg-surface-container-highest" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAMSGi_cFAdLfC4RURL8xjJkbSy-wznNoDU_bBcnWS9jQM1XF7vYjiMFnVkG_RGYm82aVc_hpFWlR-eALB3wUl_NNCF3df_RP4C7LeYthnE3WESnn9IIkTYCmZVHJaUEAIDAHxL3mV-kxmXTVN4NlrkpxKEGWV02SW4RLcZVYkhO3ceGe_pY6T0cVXBTAgMn9itfILvV3S7KoSVSgvEnDYyfgGLTwV6WAlnsD6jG9qCTx4eKU20ONhh4RQDgz64UoF1szy6_EUoBQA"/>
            <div className="flex flex-col">
              <span className="text-sm font-bold headline-font">Chief Op.</span>
              <span className="text-[10px] text-outline uppercase tracking-tighter">System Root</span>
            </div>
          </div>
        </div>
      </aside>
      {/* TopNavBar */}
      <header className="fixed top-0 right-0 left-64 h-16 z-30 flex justify-between items-center px-8 bg-slate-900/60 dark:bg-[#111316]/60 backdrop-blur-xl border-b-0">
        <div className="flex items-center gap-4 flex-1">
          {/* Dynamically change header title based on active page */}
          <span className="hidden md:block text-lg font-black tracking-tighter text-[#9ecaff] headline-font uppercase">
            {location.pathname === '/admin' ? 'ADMIN CONSOLE' : 'TELEMETRY PRO'}
          </span>
          <div className="relative w-full max-w-md focus-within:ring-1 focus-within:ring-[#9ecaff] rounded-lg overflow-hidden">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-500 text-sm">search</span>
            <input className="w-full bg-[#0c0e11] border-none text-sm pl-10 py-2 focus:ring-0 text-on-surface placeholder-slate-600" placeholder="Search vehicle ID, driver, or location..." type="text"/>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <button className="text-slate-400 hover:text-white transition-opacity relative">
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-error rounded-full"></span>
          </button>
          <button className="text-slate-400 hover:text-white transition-opacity"><span className="material-symbols-outlined">settings</span></button>
          <button className="text-slate-400 hover:text-white transition-opacity"><span className="material-symbols-outlined">help_outline</span></button>
        </div>
      </header>
      {/* Main Content Area Container */}
      <main className="ml-64 pt-16 h-screen overflow-y-auto custom-scrollbar bg-[#0c0e11]">
        {/* React Router injects your page components right here */}
        <Outlet />
      </main>
    </>
  );
}