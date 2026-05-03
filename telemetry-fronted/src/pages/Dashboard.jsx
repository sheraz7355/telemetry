export default function Dashboard() {
  return (
    <>
      {/* Hero Section: Full Width Map */}
      <section className="relative h-[65vh] w-full overflow-hidden mb-12">
        <div className="absolute inset-0 z-0">
          <img className="w-full h-full object-cover grayscale brightness-[0.3] contrast-125" alt="aerial map" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDy_JJysWqm1N7Zr6M5GiuJKI25jrp3inRhgwiZ4d_cY88gm4fnAQ1PKbP65ELbC-ive8ZYPs8AOVXDgcR1Ra14hW9GYzuJ5FTd7ZZWnucLOiRCoa1NvWxthz3HAbyKzvqsMyhxg32ni-os12cB-Axr9bHmdZoqnstZFDOdHyCqIYPo6KSf7MRq3bs5MXFISmMMMHdQGG_-RODyn7wDxyg6e9WRj3hUONx6iMpxehLQkRitqwTy-htnmfXINSEaRd0IruBZNB5RPko"/>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e11] via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0c0e11]/50 via-transparent to-transparent"></div>
        </div>
        <div className="relative z-10 h-full p-8 flex flex-col">
          {/* Status & Connectivity HUD */}
          <div className="flex justify-between items-start">
            <div className="flex gap-4">
              <div className="bg-surface-container/80 backdrop-blur-md px-5 py-3 rounded border border-outline-variant/20 flex items-center gap-4 shadow-xl">
                <span className="material-symbols-outlined text-primary text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>satellite_alt</span>
                <div className="flex flex-col">
                  <span className="font-label text-[10px] tracking-widest font-black uppercase text-on-surface-variant">GPS SIGNAL</span>
                  <span className="text-xs font-bold text-primary">STABLE / 12 SATS</span>
                </div>
              </div>
              <div className="bg-surface-container/80 backdrop-blur-md px-5 py-3 rounded border border-outline-variant/20 flex items-center gap-4 shadow-xl">
                <span className="material-symbols-outlined text-secondary text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>wifi_tethering</span>
                <div className="flex flex-col">
                  <span className="font-label text-[10px] tracking-widest font-black uppercase text-on-surface-variant">NETWORK</span>
                  <span className="text-xs font-bold text-secondary">4G LTE CONNECTED</span>
                </div>
              </div>
            </div>
            <div className="bg-surface-container-high/90 backdrop-blur-xl p-5 rounded border border-primary/20 text-right shadow-2xl">
              <p className="font-label text-[10px] tracking-[0.3em] font-black text-primary mb-1 uppercase">CURRENT POSITION</p>
              <p className="font-headline text-2xl font-black tracking-tight text-white">SANTA MONICA PIER</p>
              <p className="font-mono text-[10px] text-on-surface-variant opacity-70 mt-1">34.0102° N, 118.4961° W</p>
            </div>
          </div>
          
          {/* Central Speedometer */}
          <div className="flex-1 flex flex-col items-center justify-center -mt-12">
            <div className="relative flex flex-col items-center group cursor-default">
              <div className="absolute -inset-24 bg-primary/10 blur-[100px] rounded-full group-hover:bg-primary/20 transition-all duration-700"></div>
              <h1 className="font-headline text-[180px] font-black leading-none tracking-tighter text-white drop-shadow-[0_0_50px_rgba(158,202,255,0.4)] relative">65</h1>
              <div className="flex items-center gap-4 relative">
                <div className="h-px w-12 bg-primary/30"></div>
                <span className="font-headline text-3xl font-black tracking-[0.8em] text-primary uppercase">MPH</span>
                <div className="h-px w-12 bg-primary/30"></div>
              </div>
            </div>
          </div>
          
          {/* Bottom Stats */}
          <div className="grid grid-cols-4 gap-6 max-w-4xl mx-auto w-full">
            <div className="flex flex-col items-center border-l border-white/10 px-6">
              <span className="text-[9px] font-black tracking-widest text-on-surface-variant uppercase mb-1">Elevation</span>
              <span className="font-headline text-xl font-bold">14 FT</span>
            </div>
            <div className="flex flex-col items-center border-l border-white/10 px-6">
              <span className="text-[9px] font-black tracking-widest text-on-surface-variant uppercase mb-1">Heading</span>
              <span className="font-headline text-xl font-bold">NW 284°</span>
            </div>
            <div className="flex flex-col items-center border-l border-white/10 px-6">
              <span className="text-[9px] font-black tracking-widest text-on-surface-variant uppercase mb-1">Accuracy</span>
              <span className="font-headline text-xl font-bold">± 2.4M</span>
            </div>
            <div className="flex flex-col items-center border-l border-white/10 px-6">
              <span className="text-[9px] font-black tracking-widest text-on-surface-variant uppercase mb-1">Latency</span>
              <span className="font-headline text-xl font-bold text-emerald-500">22MS</span>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Metrics Grid */}
      <section className="max-w-screen-2xl mx-auto p-8 grid grid-cols-12 gap-8 -mt-20 relative z-20">
        
        {/* G-Force */}
        <div className="col-span-12 lg:col-span-4 bg-surface-container p-8 rounded border border-white/5 shadow-2xl flex flex-col gap-8">
          <div>
            <span className="font-label text-[11px] tracking-widest font-black text-on-surface-variant uppercase block mb-6">REAL-TIME ACCELERATION</span>
            <div className="relative w-48 h-48 mx-auto">
              <svg className="w-full h-full transform -rotate-90">
                <circle className="text-surface-container-highest" cx="96" cy="96" fill="transparent" r="90" stroke="currentColor" strokeWidth="2"></circle>
                <circle className="text-primary" cx="96" cy="96" fill="transparent" r="90" stroke="currentColor" strokeDasharray="565" strokeDashoffset="180" strokeLinecap="round" strokeWidth="6"></circle>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-headline text-5xl font-black">1.2</span>
                <span className="font-label text-[10px] font-black text-on-surface-variant tracking-[0.2em] mt-2">G-FORCE</span>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-end border-t border-white/5 pt-6">
            <div className="space-y-1">
              <div className="text-[10px] font-bold tracking-widest text-outline uppercase">Lateral Peak</div>
              <div className="font-headline text-lg font-bold">0.84 G</div>
            </div>
            <div className="flex gap-1.5 h-12 items-end">
              <div className="w-1.5 bg-primary/20 h-4"></div>
              <div className="w-1.5 bg-primary/40 h-8"></div>
              <div className="w-1.5 bg-primary/60 h-10"></div>
              <div className="w-1.5 bg-primary h-12"></div>
              <div className="w-1.5 bg-primary/50 h-6"></div>
              <div className="w-1.5 bg-primary/30 h-9"></div>
            </div>
          </div>
        </div>

        {/* Vital Systems Dashboard */}
        <div className="col-span-12 lg:col-span-4 bg-surface-container-high p-8 rounded border border-white/5 shadow-2xl flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-8">
              <span className="font-label text-[11px] tracking-widest font-black text-on-surface-variant uppercase">CRITICAL SYSTEM STATUS</span>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-emerald-500 uppercase">All Systems Nominal</span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_12px_#10b981]"></span>
              </div>
            </div>
            <div className="space-y-8">
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs font-bold tracking-wider uppercase opacity-80">
                  <span>Engine Temperature</span>
                  <span className="font-headline text-xl text-white">194°F</span>
                </div>
                <div className="w-full h-2 bg-surface-container-highest rounded-full overflow-hidden">
                  <div className="bg-primary h-full w-[65%]"></div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs font-bold tracking-wider uppercase opacity-80">
                  <span>Oil Pressure</span>
                  <span className="font-headline text-xl text-white">32 PSI</span>
                </div>
                <div className="w-full h-2 bg-surface-container-highest rounded-full overflow-hidden">
                  <div className="bg-secondary-fixed-dim h-full w-[45%]"></div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs font-bold tracking-wider uppercase opacity-80">
                  <span>Brake Fluid Integrity</span>
                  <span className="font-headline text-xl text-white">98%</span>
                </div>
                <div className="w-full h-2 bg-surface-container-highest rounded-full overflow-hidden">
                  <div className="bg-primary h-full w-[98%]"></div>
                </div>
              </div>
            </div>
          </div>
          <button className="w-full mt-8 bg-primary-container text-on-primary-container font-headline font-black text-[10px] py-4 rounded tracking-[0.2em] uppercase hover:brightness-110 hover:shadow-lg transition-all active:scale-95">INITIATE FULL SYSTEM DIAGNOSTICS</button>
        </div>

        {/* Live Telemetry Stream */}
        <div className="col-span-12 lg:col-span-4 bg-surface-container-lowest p-8 rounded border border-white/5 shadow-2xl h-[450px] flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <span className="font-label text-[11px] tracking-widest font-black text-on-surface-variant uppercase">LIVE LOG STREAM</span>
            <span className="font-mono text-[9px] text-primary px-2 py-1 bg-primary/10 rounded">RT_MODE_V3</span>
          </div>
          <div className="flex-1 space-y-3 font-mono text-[11px] overflow-y-auto custom-scrollbar pr-4">
            <div className="flex gap-4 border-l-2 border-primary pl-4 py-2 bg-primary/5">
              <span className="text-outline">14:20:01</span>
              <span className="text-on-surface">DRIVE_MODE_SPORT_ACTIVATED</span>
            </div>
            {/* Repeated simulated logs */}
            <div className="flex gap-4 border-l-2 border-transparent pl-4 py-2 hover:bg-white/5 transition-colors"><span className="text-outline">14:19:58</span><span className="text-on-surface">THROTTLE_POS_85%</span></div>
            <div className="flex gap-4 border-l-2 border-transparent pl-4 py-2 hover:bg-white/5 transition-colors"><span className="text-outline">14:19:55</span><span className="text-on-surface">SUSPENSION_ADAPT_FIRM</span></div>
            <div className="flex gap-4 border-l-2 border-error pl-4 py-2 bg-error-container/10"><span className="text-error">14:19:50</span><span className="text-error font-bold">BRAKE_WEAR_WARNING_L1</span></div>
            <div className="flex gap-4 border-l-2 border-transparent pl-4 py-2"><span className="text-outline">14:19:42</span><span className="text-on-surface">GEAR_SHIFT_P3_D4</span></div>
            <div className="flex gap-4 border-l-2 border-transparent pl-4 py-2"><span className="text-outline">14:19:38</span><span className="text-on-surface">AUTO_STEER_ENGAGED_NAV_WP2</span></div>
            <div className="flex gap-4 border-l-2 border-transparent pl-4 py-2"><span className="text-outline">14:19:35</span><span className="text-on-surface">TORQUE_VECTORING_ACTIVE</span></div>
          </div>
        </div>
      </section>

      {/* Bottom Action Grid */}
      <section className="max-w-screen-2xl mx-auto px-8 pb-12 grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { icon: 'tire_repair', label: 'Tire Pressure', val: '34.2', unit: 'PSI' },
          { icon: 'local_gas_station', label: 'Fuel Level', val: '78', unit: '%' },
          { icon: 'battery_charging_full', label: 'Battery Voltage', val: '14.2', unit: 'V' },
          { icon: 'eco', label: 'System Efficiency', val: '94', unit: '%' }
        ].map((item, idx) => (
          <div key={idx} className="bg-surface-container p-6 rounded border border-white/5 flex items-center gap-6 hover:bg-surface-bright hover:border-primary/30 transition-all cursor-pointer group shadow-lg">
            <div className="p-4 bg-surface-container-highest rounded group-hover:bg-primary/20 transition-colors">
              <span className="material-symbols-outlined text-primary scale-125">{item.icon}</span>
            </div>
            <div>
              <div className="font-label text-[10px] font-black text-on-surface-variant uppercase tracking-widest mb-1">{item.label}</div>
              <div className="font-headline font-bold text-2xl">{item.val} <span className="text-xs text-outline font-body">{item.unit}</span></div>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}