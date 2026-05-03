import React from 'react';

export default function Safety() {
  return (
    <div className="p-8 flex-1 flex flex-col gap-6 max-w-[1600px] mx-auto w-full">
      {/* Alert Banner */}
      <div className="w-full animate-pulse-red rounded-xl py-6 px-8 border border-error/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl shadow-error/10">
        <div className="flex items-center gap-6">
          <div className="bg-error-container p-4 rounded-full">
            <span
              className="material-symbols-outlined text-4xl text-on-error-container"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              warning
            </span>
          </div>
          <div>
            <h1 className="font-headline text-4xl font-black text-on-error-container tracking-tighter uppercase italic">
              CRASH DETECTED
            </h1>
            <p className="font-label text-error mt-1 tracking-[0.2em] font-semibold text-sm uppercase">
              UNIT: INTERCEPTOR-09 | IMPACT FORCE: 4.2G | SECTOR 7G
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-surface/40 backdrop-blur-md px-6 py-3 rounded-lg border border-white/5">
            <div className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest mb-1 text-center">
              TIMER REMAINING
            </div>
            <div className="font-headline text-3xl font-black text-on-surface text-center tabular-nums">
              15:00
            </div>
          </div>
          <div className="flex gap-2">
            <button className="bg-surface-container-high hover:bg-surface-bright border border-outline-variant px-6 py-4 rounded-lg transition-all active:scale-95 group flex flex-col items-center">
              <span className="font-headline text-sm font-black text-primary tracking-tight">
                I'M OKAY
              </span>
              <span className="font-label text-[9px] text-on-surface-variant tracking-widest uppercase">
                DISMISS
              </span>
            </button>
            <button className="bg-gradient-to-br from-error-container to-on-error hover:brightness-110 px-8 py-4 rounded-lg transition-all active:scale-95 flex items-center gap-4 border border-error/50">
              <span
                className="material-symbols-outlined text-2xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                call
              </span>
              <span className="font-headline text-lg font-black text-on-error-container tracking-tight">
                OPEN COMMS
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-12 gap-6 flex-1">
        
        {/* Left: Big Map View */}
        <div className="col-span-12 xl:col-span-8 flex flex-col gap-6">
          <div className="bg-surface-container rounded-xl overflow-hidden border border-white/5 flex flex-col h-full min-h-[500px] shadow-lg">
            <div className="flex items-center justify-between px-6 py-4 border-b border-outline-variant/20 bg-surface-container-high/50">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">map</span>
                <span className="font-headline font-bold uppercase tracking-tight text-on-surface">
                  Tactical Incident Overlay
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-bold text-primary tracking-widest uppercase px-2 py-1 bg-primary/10 rounded">
                  LIVE SATELLITE FEED
                </span>
                <div className="flex gap-1">
                  <button className="p-1 hover:bg-white/10 rounded">
                    <span className="material-symbols-outlined text-sm">zoom_in</span>
                  </button>
                  <button className="p-1 hover:bg-white/10 rounded">
                    <span className="material-symbols-outlined text-sm">zoom_out</span>
                  </button>
                  <button className="p-1 hover:bg-white/10 rounded">
                    <span className="material-symbols-outlined text-sm">layers</span>
                  </button>
                </div>
              </div>
            </div>
            
            <div className="relative flex-1">
              {/* Map Background Layer */}
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDaR0bJ-xbn2mcHq7HBj2zgt828pr8V81JECZ0kelkY9dG6olM7xvphzb4i2AQyv5GAzYX0qethC9bwA8C3FZG9es9JtX9hLXhoIPw0gVMZErXxgxECdSDOSYiIYkPQIsTtKkQgdzd83GJWfLZw_Y95SyWul8EwHMSqvTYpVBTtW40mA0xTif8GxrccpFTG4BwjOnR5tCl9uaqSrQLlxH5DJl_MTC5kHAKbP17lvNpFAyjuZZNTVv57roHosHv18SY7eaOXTT1JEZ4')",
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
              <div className="absolute inset-0 bg-[#0c0e11]/20 backdrop-brightness-75 mix-blend-overlay" />

              {/* Location Marker & HUD */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <div className="absolute -inset-12 bg-error/10 rounded-full border border-error/20 animate-pulse" />
                  <div className="absolute -inset-6 bg-error/30 rounded-full animate-ping" />
                  <div className="relative bg-error h-6 w-6 rounded-full border-[3px] border-white shadow-[0_0_20px_rgba(255,180,171,0.5)] flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-white rounded-full" />
                  </div>

                  {/* Popover data */}
                  <div className="absolute top-8 left-1/2 -translate-x-1/2 w-48 bg-surface-container-highest/90 backdrop-blur-xl border border-white/10 p-3 rounded-lg shadow-2xl pointer-events-none">
                    <div className="text-[9px] font-bold text-error uppercase tracking-widest mb-1">
                      IMPACT ZONE ALPHA
                    </div>
                    <div className="text-[11px] text-on-surface font-medium leading-tight">
                      LAT: 34.0522° N<br />LON: 118.2437° W
                    </div>
                    <div className="mt-2 h-1 bg-surface-variant rounded-full overflow-hidden">
                      <div className="h-full bg-primary w-2/3" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Map HUD details */}
              <div className="absolute bottom-6 left-6 flex flex-col gap-2">
                <div className="bg-surface-container-lowest/80 backdrop-blur-md px-4 py-2 rounded-lg border border-white/5">
                  <span className="font-label text-[10px] font-bold text-primary tracking-widest uppercase">
                    ALTITUDE: 142M ASL | HEADING: 284° NW
                  </span>
                </div>
                <div className="bg-surface-container-lowest/80 backdrop-blur-md px-4 py-2 rounded-lg border border-white/5">
                  <span className="font-label text-[10px] font-bold text-secondary-fixed-dim tracking-widest uppercase">
                    SIGNAL: 5G MIL-SPEC [ENCRYPTED]
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Status & Vitals */}
        <div className="col-span-12 xl:col-span-4 flex flex-col gap-6">
          {/* Vehicle Vitals */}
          <div className="bg-surface-container p-6 rounded-xl border border-white/5 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">analytics</span>
                <span className="font-headline font-bold uppercase tracking-tight text-on-surface text-sm">
                  Critical Vehicle Vitals
                </span>
              </div>
              <span className="px-2 py-0.5 bg-error/20 text-error text-[10px] font-bold rounded">
                MALFUNCTION
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-surface-container-low p-4 rounded-lg border border-white/5">
                <span className="font-label text-[10px] text-on-surface-variant tracking-widest uppercase block mb-1">
                  Engine Health
                </span>
                <div className="flex items-end justify-between">
                  <span className="font-headline text-2xl font-bold text-error">14%</span>
                  <span className="material-symbols-outlined text-error text-sm">engine</span>
                </div>
              </div>
              <div className="bg-surface-container-low p-4 rounded-lg border border-white/5">
                <span className="font-label text-[10px] text-on-surface-variant tracking-widest uppercase block mb-1">
                  Fuel Status
                </span>
                <div className="flex items-end justify-between">
                  <span className="font-headline text-2xl font-bold text-on-surface">82%</span>
                  <span className="material-symbols-outlined text-primary text-sm">local_gas_station</span>
                </div>
              </div>
              <div className="bg-surface-container-low p-4 rounded-lg border border-white/5">
                <span className="font-label text-[10px] text-on-surface-variant tracking-widest uppercase block mb-1">
                  Cabin PSI
                </span>
                <div className="flex items-end justify-between">
                  <span className="font-headline text-2xl font-bold text-on-surface">14.7</span>
                  <span className="material-symbols-outlined text-primary text-sm">air</span>
                </div>
              </div>
              <div className="bg-surface-container-low p-4 rounded-lg border border-white/5">
                <span className="font-label text-[10px] text-on-surface-variant tracking-widest uppercase block mb-1">
                  Impact G-Force
                </span>
                <div className="flex items-end justify-between">
                  <span className="font-headline text-2xl font-bold text-error">4.2G</span>
                  <span className="material-symbols-outlined text-error text-sm">hardware</span>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-surface-container-lowest rounded-lg border border-white/5 border-l-4 border-error">
              <div className="flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-error text-xs">report</span>
                <span className="font-label text-[10px] font-bold text-on-surface uppercase tracking-widest">
                  Diagnostic Report
                </span>
              </div>
              <p className="text-[10px] text-on-surface-variant leading-relaxed">
                System-wide critical failure detected in front-end sensor array. Airbag deployment confirmed. Battery fire suppression active.
              </p>
            </div>
          </div>

          {/* Dispatch Status */}
          <div className="bg-surface-container p-6 rounded-xl border border-white/5 shadow-lg flex-1">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">broadcast_on_home</span>
                <span className="font-headline font-bold uppercase tracking-tight text-on-surface text-sm">
                  Emergency Response Chain
                </span>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-surface-container-low rounded border-l-4 border-primary shadow-sm">
                <div className="bg-primary/20 p-2 rounded">
                  <span className="material-symbols-outlined text-primary">contact_emergency</span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div className="font-headline text-sm font-bold text-on-surface">Emergency Contacts</div>
                    <span className="text-[9px] text-primary font-bold uppercase tracking-tighter bg-primary/10 px-1.5 rounded">QUEUED</span>
                  </div>
                  <div className="text-[10px] text-on-surface-variant font-medium mt-1 uppercase tracking-tight">
                    Notification Pending (T-15s)
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-surface-container-low rounded border-l-4 border-secondary-container shadow-sm">
                <div className="bg-secondary-container/20 p-2 rounded">
                  <span className="material-symbols-outlined text-secondary-container">local_police</span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div className="font-headline text-sm font-bold text-on-surface">Local PD Dispatch</div>
                    <span className="text-[9px] text-secondary-container font-bold uppercase tracking-tighter bg-secondary-container/10 px-1.5 rounded">CONNECTED</span>
                  </div>
                  <div className="text-[10px] text-on-surface-variant font-medium mt-1 uppercase tracking-tight">
                    LA County Division Central - Unit 4B Rerouting
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-surface-container-low rounded border-l-4 border-error shadow-sm">
                <div className="bg-error/20 p-2 rounded">
                  <span className="material-symbols-outlined text-error">medical_services</span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div className="font-headline text-sm font-bold text-on-surface">EMS Air Ambulance</div>
                    <span className="text-[9px] text-error font-bold uppercase tracking-tighter bg-error/10 px-1.5 rounded">STANDBY</span>
                  </div>
                  <div className="text-[10px] text-on-surface-variant font-medium mt-1 uppercase tracking-tight">
                    ETA 8 MIN - Helipad 4 Clearance Pending
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}