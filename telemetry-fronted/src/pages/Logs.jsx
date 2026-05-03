import React from 'react';

export default function Logs() {
  return (
    <div className="flex flex-col h-full w-full max-w-[1600px] mx-auto overflow-hidden">
      {/* Page Header & Summary Section */}
      <div className="p-8 pb-4 shrink-0">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
          <div>
            <h1 className="font-headline text-3xl font-black tracking-tighter text-on-surface uppercase">
              Incident Archive
            </h1>
            <p className="text-xs text-outline font-medium tracking-wide mt-1">
              Comprehensive fleet-wide safety event logging
            </p>
          </div>
          
          <div className="flex gap-4">
            {/* Summary Card 1 */}
            <div className="bg-surface-container-high px-4 py-3 rounded-lg border border-outline-variant/10 min-w-[180px]">
              <p className="text-[9px] font-bold text-outline uppercase tracking-[0.1em] mb-1">
                Total Incidents
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-headline font-bold text-on-surface">128</span>
                <span className="text-[10px] text-primary">+12%</span>
              </div>
            </div>
            {/* Summary Card 2 */}
            <div className="bg-surface-container-high px-4 py-3 rounded-lg border border-outline-variant/10 min-w-[180px]">
              <p className="text-[9px] font-bold text-outline uppercase tracking-[0.1em] mb-1">
                Critical Alerts
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-headline font-bold text-error">03</span>
                <span className="text-[10px] text-error">-5%</span>
              </div>
            </div>
            {/* Summary Card 3 */}
            <div className="bg-surface-container-high px-4 py-3 rounded-lg border border-outline-variant/10 min-w-[180px]">
              <p className="text-[9px] font-bold text-outline uppercase tracking-[0.1em] mb-1">
                System Uptime
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-headline font-bold text-on-surface">99.9%</span>
                <span className="text-[10px] text-secondary">Optimal</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area with Table and Preview */}
      <div className="flex-1 px-8 pb-8 flex flex-col lg:flex-row gap-6 overflow-hidden">
        
        {/* Data Table Container */}
        <div className="flex-1 bg-surface-container-lowest border border-outline-variant/10 rounded-xl flex flex-col overflow-hidden shadow-2xl">
          {/* Table Header / Filters */}
          <div className="p-4 border-b border-outline-variant/10 flex justify-between items-center bg-surface-container-low shrink-0">
            <div className="flex gap-2">
              <button className="px-4 py-1.5 bg-primary-container text-on-primary-container rounded text-[10px] font-bold tracking-widest uppercase">
                All Events
              </button>
              <button className="px-4 py-1.5 bg-surface-container-high text-outline hover:text-on-surface transition-colors rounded text-[10px] font-bold tracking-widest uppercase">
                Critical
              </button>
              <button className="px-4 py-1.5 bg-surface-container-high text-outline hover:text-on-surface transition-colors rounded text-[10px] font-bold tracking-widest uppercase">
                Warnings
              </button>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-bold text-outline uppercase tracking-widest">
                Showing 1-10 of 128
              </span>
              <div className="flex border border-outline-variant/20 rounded overflow-hidden">
                <button className="p-1 hover:bg-surface-variant transition-colors border-r border-outline-variant/20">
                  <span className="material-symbols-outlined text-sm">chevron_left</span>
                </button>
                <button className="p-1 hover:bg-surface-variant transition-colors">
                  <span className="material-symbols-outlined text-sm">chevron_right</span>
                </button>
              </div>
            </div>
          </div>

          {/* Scrollable Table Body */}
          <div className="flex-1 overflow-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none][scrollbar-width:none]">
            <table className="w-full text-left border-collapse">
              <thead className="sticky top-0 z-10 bg-surface-container-lowest border-b border-outline-variant/10">
                <tr>
                  <th className="px-6 py-4 text-[9px] font-black text-outline uppercase tracking-[0.2em]">Timestamp</th>
                  <th className="px-6 py-4 text-[9px] font-black text-outline uppercase tracking-[0.2em]">Asset ID</th>
                  <th className="px-6 py-4 text-[9px] font-black text-outline uppercase tracking-[0.2em]">Incident Type</th>
                  <th className="px-6 py-4 text-[9px] font-black text-outline uppercase tracking-[0.2em]">Magnitude</th>
                  <th className="px-6 py-4 text-[9px] font-black text-outline uppercase tracking-[0.2em]">Location</th>
                  <th className="px-6 py-4 text-[9px] font-black text-outline uppercase tracking-[0.2em]">Status</th>
                  <th className="px-6 py-4 text-[9px] font-black text-outline uppercase tracking-[0.2em] text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/5">
                
                {/* Row 1: Selected */}
                <tr className="bg-primary/10 border-l-2 !border-primary cursor-pointer transition-colors">
                  <td className="px-6 py-4 text-[11px] font-bold font-mono text-on-surface">14:32:05 UTC</td>
                  <td className="px-6 py-4 text-[11px] font-bold text-primary tracking-wider">#VX-9902</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-error text-lg">warning</span>
                      <span className="text-xs font-bold text-on-surface">Significant Impact</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs font-black text-error">4.8 G</td>
                  <td className="px-6 py-4 text-[10px] text-outline font-mono">48.1351, 11.5820</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-error/10 text-error border border-error/20 rounded text-[9px] font-black uppercase">
                      Flagged
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-1.5 hover:bg-surface-bright rounded transition-all">
                      <span className="material-symbols-outlined text-lg text-outline">visibility</span>
                    </button>
                  </td>
                </tr>

                {/* Row 2 */}
                <tr className="hover:bg-primary/5 border-l-2 border-transparent cursor-pointer transition-colors">
                  <td className="px-6 py-4 text-[11px] font-bold font-mono text-on-surface">12:15:44 UTC</td>
                  <td className="px-6 py-4 text-[11px] font-bold text-primary tracking-wider">#VX-9851</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-lg">error_outline</span>
                      <span className="text-xs font-bold text-on-surface">Minor Bump</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs font-black text-primary">1.2 G</td>
                  <td className="px-6 py-4 text-[10px] text-outline font-mono">52.5200, 13.4050</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-primary/10 text-primary border border-primary/20 rounded text-[9px] font-black uppercase">
                      Reviewed
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-1.5 hover:bg-surface-bright rounded transition-all">
                      <span className="material-symbols-outlined text-lg text-outline">visibility</span>
                    </button>
                  </td>
                </tr>

                {/* Row 3 */}
                <tr className="hover:bg-primary/5 border-l-2 border-transparent cursor-pointer transition-colors">
                  <td className="px-6 py-4 text-[11px] font-bold font-mono text-on-surface">09:40:12 UTC</td>
                  <td className="px-6 py-4 text-[11px] font-bold text-primary tracking-wider">#VX-9902</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-secondary text-lg">vibration</span>
                      <span className="text-xs font-bold text-on-surface">Elevated Vibration</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs font-black text-secondary">2.4 G</td>
                  <td className="px-6 py-4 text-[10px] text-outline font-mono">53.5511, 09.9937</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-secondary/10 text-secondary border border-secondary/20 rounded text-[9px] font-black uppercase">
                      In Progress
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-1.5 hover:bg-surface-bright rounded transition-all">
                      <span className="material-symbols-outlined text-lg text-outline">visibility</span>
                    </button>
                  </td>
                </tr>

                {/* Row 4 */}
                <tr className="hover:bg-primary/5 border-l-2 border-transparent cursor-pointer transition-colors">
                  <td className="px-6 py-4 text-[11px] font-bold font-mono text-on-surface">08:22:51 UTC</td>
                  <td className="px-6 py-4 text-[11px] font-bold text-primary tracking-wider">#VX-8812</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-lg">error_outline</span>
                      <span className="text-xs font-bold text-on-surface">Minor Bump</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs font-black text-primary">0.9 G</td>
                  <td className="px-6 py-4 text-[10px] text-outline font-mono">48.2082, 16.3738</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-primary/10 text-primary border border-primary/20 rounded text-[9px] font-black uppercase">
                      Reviewed
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-1.5 hover:bg-surface-bright rounded transition-all">
                      <span className="material-symbols-outlined text-lg text-outline">visibility</span>
                    </button>
                  </td>
                </tr>

                {/* Row 5 */}
                <tr className="hover:bg-primary/5 border-l-2 border-transparent cursor-pointer transition-colors">
                  <td className="px-6 py-4 text-[11px] font-bold font-mono text-on-surface">06:14:33 UTC</td>
                  <td className="px-6 py-4 text-[11px] font-bold text-primary tracking-wider">#VX-9905</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-secondary text-lg">vibration</span>
                      <span className="text-xs font-bold text-on-surface">Elevated Vibration</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs font-black text-secondary">2.1 G</td>
                  <td className="px-6 py-4 text-[10px] text-outline font-mono">51.5074, 0.1278</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-primary/10 text-primary border border-primary/20 rounded text-[9px] font-black uppercase">
                      Reviewed
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-1.5 hover:bg-surface-bright rounded transition-all">
                      <span className="material-symbols-outlined text-lg text-outline">visibility</span>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Details Preview Panel */}
        <div className="w-full lg:w-96 shrink-0 bg-surface-container border border-outline-variant/10 rounded-xl flex flex-col overflow-hidden shadow-2xl">
          <div className="p-5 border-b border-outline-variant/10 flex items-center justify-between shrink-0">
            <h3 className="font-headline font-bold text-sm text-on-surface uppercase tracking-widest">
              Event Detail
            </h3>
            <span className="px-2 py-0.5 bg-error text-on-error rounded text-[8px] font-black uppercase tracking-tighter">
              Selected
            </span>
          </div>
          
          <div className="flex-1 overflow-auto [&::-webkit-scrollbar]:hidden[-ms-overflow-style:none] [scrollbar-width:none]">
            {/* Map Snippet */}
            <div className="h-48 relative overflow-hidden shrink-0">
              <img 
                alt="Incident Map Location" 
                className="w-full h-full object-cover grayscale opacity-60 hover:grayscale-0 transition-all duration-700" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAJIsdGGBk9YwrSb-b0ZIeSXw723hTR09UoS72j2LQUxiH0TRv-tswrQK0VDL-GQwHU7phZXfuTvbZfzCJlKVVWkEfxHIaJu_Jp3ZZkoLrh5U1IFe23ZDp3lMiP6qNArRVJYssaK4x8kike6hbQef5UrCACtgnv0R6rnqBedS9yrpNyr_tHx0OCzSSXcfqwzqQv-AStKZixO8Ym6PCQ91TBgdPmP9hzyIJBJH_cdn3XMbBH3wooW_a-_rLLQ43vxNzUIlHCBqwhPbg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4">
                <p className="text-[10px] font-mono font-bold text-white bg-surface/80 px-2 py-1 rounded">
                  48.1351° N, 11.5820° E
                </p>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <p className="text-[9px] font-bold text-outline uppercase tracking-[0.2em] mb-2">
                  Primary Diagnosis
                </p>
                <h4 className="font-headline text-xl font-bold text-on-surface mb-2">
                  Significant Vertical Impact
                </h4>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Asset sustained severe g-force load on vertical axis during urban transit. Structural health check required for chassis #VX-9902.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-surface-container-low p-3 rounded border border-outline-variant/5">
                  <p className="text-[8px] font-bold text-outline uppercase mb-1">Peak Force</p>
                  <p className="text-lg font-headline font-bold text-error">4.8 G</p>
                </div>
                <div className="bg-surface-container-low p-3 rounded border border-outline-variant/5">
                  <p className="text-[8px] font-bold text-outline uppercase mb-1">Speed</p>
                  <p className="text-lg font-headline font-bold text-on-surface">82 KM/H</p>
                </div>
              </div>
              
              <div className="space-y-4 pt-4 border-t border-outline-variant/10">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-outline text-sm">route</span>
                    <span className="text-[10px] font-bold text-outline uppercase">Sector</span>
                  </div>
                  <span className="text-[10px] font-bold text-on-surface">Urban Loop S4</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-outline text-sm">settings_input_component</span>
                    <span className="text-[10px] font-bold text-outline uppercase">Sensor ID</span>
                  </div>
                  <span className="text-[10px] font-bold text-on-surface">IMU-ALPHA-09</span>
                </div>
              </div>
              
              <button className="w-full py-3 bg-primary text-on-primary font-bold text-[10px] uppercase tracking-widest rounded-lg hover:bg-primary-fixed-dim transition-colors mt-4">
                Open Full Investigation
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}