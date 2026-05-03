import React from 'react';

export default function History() {
  return (
    <div className="p-8 max-w-[1600px] mx-auto space-y-8 w-full">
      
      {/* Header Section */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-6">
        <div className="space-y-1">
          <p className="font-label text-xs uppercase tracking-[0.2em] text-outline">
            Comprehensive System Analytics
          </p>
          <h2 className="font-headline text-4xl font-bold tracking-tight text-on-surface">
            PERFORMANCE ARCHIVES
          </h2>
        </div>
        
        <div className="flex flex-wrap items-center gap-4 bg-surface-container-lowest p-1.5 rounded-xl border border-white/5">
          <button className="px-6 py-2.5 text-xs font-bold font-label tracking-widest rounded-lg bg-primary text-on-primary shadow-lg shadow-primary/20 transition-all active:scale-95">
            LAST 24H
          </button>
          <button className="px-6 py-2.5 text-xs font-bold font-label tracking-widest rounded-lg text-outline hover:bg-surface-container-high hover:text-on-surface transition-all">
            WEEK
          </button>
          <button className="px-6 py-2.5 text-xs font-bold font-label tracking-widest rounded-lg text-outline hover:bg-surface-container-high hover:text-on-surface transition-all">
            MONTH
          </button>
          <div className="h-4 w-px bg-outline-variant/30 mx-2"></div>
          <button className="px-6 py-2.5 text-xs font-bold font-label tracking-widest rounded-lg text-outline hover:bg-surface-container-high hover:text-on-surface transition-all flex items-center gap-2">
            <span className="material-symbols-outlined text-sm" data-icon="calendar_today">
              calendar_today
            </span>
            CUSTOM RANGE
          </button>
        </div>
      </div>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        
        {/* Left Stats Column */}
        <div className="xl:col-span-3 space-y-6">
          <div className="bg-surface-container p-6 rounded-2xl border border-white/5 hover:border-primary/30 transition-all group">
            <div className="flex justify-between items-start mb-6">
              <span className="font-label text-[10px] font-bold tracking-[0.2em] text-outline uppercase">
                Average Velocity
              </span>
              <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <span className="material-symbols-outlined text-primary text-xl" data-icon="speed">
                  speed
                </span>
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-headline text-5xl font-bold">64.2</span>
              <span className="font-label text-sm text-outline">KM/H</span>
            </div>
            <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-sm" data-icon="trending_up">
                  trending_up
                </span>
                <span className="text-xs text-secondary font-medium">+2.4% vs last period</span>
              </div>
              <span className="text-[10px] text-outline-variant uppercase">Updated 2m ago</span>
            </div>
          </div>

          <div className="bg-surface-container p-6 rounded-2xl border border-white/5 hover:border-secondary/30 transition-all group">
            <div className="flex justify-between items-start mb-6">
              <span className="font-label text-[10px] font-bold tracking-[0.2em] text-outline uppercase">
                Peak G-Force
              </span>
              <div className="p-2 rounded-lg bg-secondary/10 group-hover:bg-secondary/20 transition-colors">
                <span className="material-symbols-outlined text-secondary text-xl" data-icon="bolt">
                  bolt
                </span>
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-headline text-5xl font-bold">0.82</span>
              <span className="font-label text-sm text-outline">G</span>
            </div>
            <div className="mt-6 pt-6 border-t border-white/5">
              <div className="flex items-center gap-2 text-error">
                <span className="material-symbols-outlined text-sm" data-icon="warning">
                  warning
                </span>
                <span className="text-xs font-medium">Threshold Alert: Sector 4 Heavy Lateral</span>
              </div>
            </div>
          </div>

          <div className="bg-surface-container p-6 rounded-2xl border border-white/5 hover:border-outline-variant/30 transition-all group">
            <div className="flex justify-between items-start mb-6">
              <span className="font-label text-[10px] font-bold tracking-[0.2em] text-outline uppercase">
                Total Range
              </span>
              <div className="p-2 rounded-lg bg-surface-container-high group-hover:bg-surface-container-highest transition-colors">
                <span className="material-symbols-outlined text-outline text-xl" data-icon="route">
                  route
                </span>
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-headline text-5xl font-bold">1,248</span>
              <span className="font-label text-sm text-outline">KM</span>
            </div>
            <div className="mt-6 text-xs text-outline-variant uppercase tracking-wider">
              Historical Logging Active
            </div>
          </div>
        </div>

        {/* Center Chart Column */}
        <div className="xl:col-span-9 bg-surface-container rounded-2xl border border-white/5 p-8 relative overflow-hidden flex flex-col">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
            <div>
              <h3 className="font-headline text-2xl font-bold text-on-surface">SPEED & ACCELERATION TRENDS</h3>
              <p className="text-xs text-outline mt-1 uppercase tracking-[0.15em]">
                Synchronized High-Frequency Telemetry Stream
              </p>
            </div>
            <div className="flex items-center gap-6 bg-surface-container-lowest px-4 py-2 rounded-lg border border-white/5">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-primary shadow-[0_0_8px_rgba(158,202,255,0.4)]"></span>
                <span className="text-xs font-bold tracking-widest text-outline">VELOCITY (KM/H)</span>
              </div>
              <div className="h-4 w-px bg-outline-variant/30"></div>
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-secondary shadow-[0_0_8px_rgba(255,223,158,0.4)]"></span>
                <span className="text-xs font-bold tracking-widest text-outline">ACCELERATION (G)</span>
              </div>
            </div>
          </div>

          {/* Visual Representation of Large Chart */}
          <div className="flex-1 min-h-[400px] relative w-full mt-4">
            {/* Replaced .chart-gradient with Tailwind gradient classes */}
            <div className="absolute inset-0 bg-gradient-to-b from-primary/15 to-transparent opacity-20"></div>
            
            <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 1000 200">
              {/* High Resolution Speed Line */}
              <path 
                d="M0,160 Q25,150 50,155 T100,140 T150,170 T200,110 T250,130 T300,90 T350,120 T400,150 T450,80 T500,40 T550,110 T600,140 T650,70 T700,90 T750,150 T800,130 T850,110 T900,140 T950,120 T1000,100" 
                fill="none" 
                stroke="#9ecaff" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="4" 
              />
              {/* Secondary Accel Line */}
              <path 
                d="M0,180 Q50,175 100,185 T200,160 T300,175 T400,140 T500,165 T600,175 T700,130 T800,155 T900,170 T1000,180" 
                fill="none" 
                opacity="0.8" 
                stroke="#ffdf9e" 
                strokeDasharray="6 4" 
                strokeWidth="2" 
              />
            </svg>

            {/* Highlighting Marker */}
            <div className="absolute left-[50%] top-0 bottom-0 w-px bg-white/20 flex items-center justify-center">
              <div className="absolute top-[40px] -translate-x-1/2 bg-surface-container-highest px-3 py-1.5 rounded-md border border-white/10 shadow-xl whitespace-nowrap">
                <p className="text-[10px] font-bold text-primary">124 KM/H</p>
                <p className="text-[9px] text-outline">0.45 G</p>
              </div>
              <div className="w-2 h-2 rounded-full bg-primary absolute top-[40px] -translate-x-1/2 ring-4 ring-primary/20"></div>
            </div>

            {/* X-Axis Labels */}
            <div className="absolute -bottom-8 w-full flex justify-between text-[11px] font-bold text-outline-variant tracking-widest px-2">
              <span>00:00</span>
              <span>03:00</span>
              <span>06:00</span>
              <span>09:00</span>
              <span>12:00</span>
              <span>15:00</span>
              <span>18:00</span>
              <span>21:00</span>
              <span>23:59</span>
            </div>

            {/* Grid Lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-5">
              <div className="w-full h-px bg-outline"></div>
              <div className="w-full h-px bg-outline"></div>
              <div className="w-full h-px bg-outline"></div>
              <div className="w-full h-px bg-outline"></div>
              <div className="w-full h-px bg-outline"></div>
            </div>
          </div>

          {/* Enhanced Info Grid for Desktop */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            <div className="bg-surface-container-high p-5 rounded-xl border border-white/5 hover:bg-surface-container-highest transition-colors">
              <p className="text-[10px] font-bold text-outline mb-2 uppercase tracking-widest">Idle Time</p>
              <p className="font-headline text-2xl font-bold">12.4%</p>
              <div className="mt-2 h-1 w-full bg-[#111316] rounded-full overflow-hidden">
                <div className="h-full bg-outline w-[12.4%]"></div>
              </div>
            </div>
            
            <div className="bg-surface-container-high p-5 rounded-xl border border-white/5 hover:bg-surface-container-highest transition-colors">
              <p className="text-[10px] font-bold text-outline mb-2 uppercase tracking-widest">Hard Braking</p>
              <p className="font-headline text-2xl font-bold">03 <span className="text-sm font-normal text-outline">INC</span></p>
              <p className="mt-2 text-[10px] text-error font-medium uppercase tracking-tighter">Above Average</p>
            </div>
            
            <div className="bg-surface-container-high p-5 rounded-xl border border-white/5 hover:bg-surface-container-highest transition-colors">
              <p className="text-[10px] font-bold text-outline mb-2 uppercase tracking-widest">Efficiency</p>
              <p className="font-headline text-2xl font-bold">92<span className="text-sm font-normal text-outline">/100</span></p>
              <div className="mt-2 h-1 w-full bg-[#111316] rounded-full overflow-hidden">
                <div className="h-full bg-primary w-[92%]"></div>
              </div>
            </div>
            
            <div className="bg-surface-container-high p-5 rounded-xl border border-white/5 hover:bg-surface-container-highest transition-colors">
              <p className="text-[10px] font-bold text-outline mb-2 uppercase tracking-widest">Avg Temp</p>
              <p className="font-headline text-2xl font-bold">94°C</p>
              <p className="mt-2 text-[10px] text-primary font-medium uppercase tracking-tighter">Optimal Range</p>
            </div>
            
            <div className="bg-surface-container-high p-5 rounded-xl border border-white/5 hover:bg-surface-container-highest transition-colors">
              <p className="text-[10px] font-bold text-outline mb-2 uppercase tracking-widest">Fuel Flow</p>
              <p className="font-headline text-2xl font-bold">8.2 <span className="text-sm font-normal text-outline">L/H</span></p>
              <p className="mt-2 text-[10px] text-secondary font-medium uppercase tracking-tighter">Normal</p>
            </div>
            
            <div className="bg-surface-container-high p-5 rounded-xl border border-white/5 hover:bg-surface-container-highest transition-colors">
              <p className="text-[10px] font-bold text-outline mb-2 uppercase tracking-widest">Tire Wear</p>
              <p className="font-headline text-2xl font-bold">0.12 <span className="text-sm font-normal text-outline">MM</span></p>
              <p className="mt-2 text-[10px] text-outline font-medium uppercase tracking-tighter">Stage 1</p>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Log Section */}
      <div className="bg-surface-container rounded-2xl border border-white/5 overflow-hidden">
        <div className="p-8 border-b border-white/5 flex items-center justify-between">
          <div>
            <h3 className="font-headline text-xl font-bold tracking-tight">RECENT TRIP LOGS</h3>
            <p className="text-xs text-outline mt-1 uppercase tracking-widest">Detailed Event Historical Record</p>
          </div>
          <div className="flex gap-2">
            <button className="p-2 rounded-lg bg-surface-container-high text-outline hover:text-on-surface transition-colors">
              <span className="material-symbols-outlined text-xl" data-icon="filter_list">
                filter_list
              </span>
            </button>
            <button className="p-2 rounded-lg bg-surface-container-high text-outline hover:text-on-surface transition-colors">
              <span className="material-symbols-outlined text-xl" data-icon="download">
                download
              </span>
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low border-b border-white/5">
                <th className="px-8 py-4 text-[10px] font-bold text-outline uppercase tracking-widest">Date / Time</th>
                <th className="px-8 py-4 text-[10px] font-bold text-outline uppercase tracking-widest">Route / Assignment</th>
                <th className="px-8 py-4 text-[10px] font-bold text-outline uppercase tracking-widest">Distance</th>
                <th className="px-8 py-4 text-[10px] font-bold text-outline uppercase tracking-widest">Duration</th>
                <th className="px-8 py-4 text-[10px] font-bold text-outline uppercase tracking-widest">Fuel Consumption</th>
                <th className="px-8 py-4 text-[10px] font-bold text-outline uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              
              {/* Table Entry 1 */}
              <tr className="hover:bg-surface-bright transition-colors group cursor-pointer">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className="text-center w-10">
                      <p className="text-[9px] font-bold text-outline uppercase">OCT</p>
                      <p className="font-headline text-lg font-bold leading-none">24</p>
                    </div>
                    <div className="text-xs text-outline-variant font-medium">14:20:05</div>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <div>
                    <p className="text-sm font-bold text-on-surface">Highway Transit - Westbound</p>
                    <p className="text-[10px] text-outline mt-0.5">TRIP-ID: 98422-AX</p>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <span className="text-sm font-medium text-on-surface">42.5 KM</span>
                </td>
                <td className="px-8 py-6">
                  <span className="text-sm font-medium text-on-surface">34 MINS</span>
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-primary">-4.2L</span>
                    <span className="text-[10px] text-outline uppercase">Optimal</span>
                  </div>
                </td>
                <td className="px-8 py-6 text-right">
                  <button className="p-2 rounded-lg text-outline group-hover:text-primary transition-colors">
                    <span className="material-symbols-outlined" data-icon="open_in_new">
                      open_in_new
                    </span>
                  </button>
                </td>
              </tr>
              
              {/* Table Entry 2 */}
              <tr className="hover:bg-surface-bright transition-colors group cursor-pointer bg-surface-container-low/30">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className="text-center w-10">
                      <p className="text-[9px] font-bold text-outline uppercase">OCT</p>
                      <p className="font-headline text-lg font-bold leading-none">23</p>
                    </div>
                    <div className="text-xs text-outline-variant font-medium">08:15:22</div>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <div>
                    <p className="text-sm font-bold text-on-surface">Urban Commute - Downtown</p>
                    <p className="text-[10px] text-outline mt-0.5">TRIP-ID: 98419-BC</p>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <span className="text-sm font-medium text-on-surface">12.8 KM</span>
                </td>
                <td className="px-8 py-6">
                  <span className="text-sm font-medium text-on-surface">28 MINS</span>
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-primary">-1.8L</span>
                    <span className="text-[10px] text-outline uppercase">High Traffic</span>
                  </div>
                </td>
                <td className="px-8 py-6 text-right">
                  <button className="p-2 rounded-lg text-outline group-hover:text-primary transition-colors">
                    <span className="material-symbols-outlined" data-icon="open_in_new">
                      open_in_new
                    </span>
                  </button>
                </td>
              </tr>
              
              {/* Table Entry 3 */}
              <tr className="hover:bg-surface-bright transition-colors group cursor-pointer">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className="text-center w-10">
                      <p className="text-[9px] font-bold text-outline uppercase">OCT</p>
                      <p className="font-headline text-lg font-bold leading-none">22</p>
                    </div>
                    <div className="text-xs text-outline-variant font-medium">17:45:10</div>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <div>
                    <p className="text-sm font-bold text-on-surface">Long Range Deployment</p>
                    <p className="text-[10px] text-outline mt-0.5">TRIP-ID: 98394-XY</p>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <span className="text-sm font-medium text-on-surface">214.0 KM</span>
                </td>
                <td className="px-8 py-6">
                  <span className="text-sm font-medium text-on-surface">156 MINS</span>
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-primary">-18.4L</span>
                    <span className="text-[10px] text-outline uppercase">Efficiency Mod</span>
                  </div>
                </td>
                <td className="px-8 py-6 text-right">
                  <button className="p-2 rounded-lg text-outline group-hover:text-primary transition-colors">
                    <span className="material-symbols-outlined" data-icon="open_in_new">
                      open_in_new
                    </span>
                  </button>
                </td>
              </tr>

            </tbody>
          </table>
        </div>
        
        <button className="w-full py-6 bg-surface-container-low hover:bg-surface-container-high text-xs font-bold tracking-[0.3em] text-outline hover:text-on-surface transition-all border-t border-white/5 uppercase">
          Load Historical Archives (2023 - 2024)
        </button>
      </div>

    </div>
  );
}