import React, { useState, useEffect } from 'react';

export default function Safety() {
  const [telemetry, setTelemetry] = useState(null);
  const[profile, setProfile] = useState(null);
  const [timer, setTimer] = useState(15); // 15-second countdown for emergency response

  const deviceId = "VX-9902"; // Ensure this matches your hardware

  // Fetch real-time data from backend
  useEffect(() => {
    // 1. Get the profile (to know who to call)
    fetch('http://127.0.0.1:8080/api/profile/latest')
      .then(res => res.json())
      .then(data => setProfile(data))
      .catch(err => console.error("Profile fetch error", err));

    // 2. Poll telemetry every 1 second
    const interval = setInterval(() => {
      fetch(`http://127.0.0.1:8080/api/telemetry/latest/${deviceId}`)
        .then(res => res.json())
        .then(data => setTelemetry(data))
        .catch(err => console.error("Telemetry fetch error", err));
    }, 1000);

    return () => clearInterval(interval);
  },[]);

  // Countdown timer logic when a crash is detected
  const isCrashed = telemetry && telemetry.imu.peak_g > 3.4;

  useEffect(() => {
    let countdownInterval;
    if (isCrashed && timer > 0) {
      countdownInterval = setInterval(() => setTimer(prev => prev - 1), 1000);
    } else if (!isCrashed) {
      setTimer(15); // Reset timer if no crash
    }
    return () => clearInterval(countdownInterval);
  },[isCrashed, timer]);

  // Format timer to MM:SS
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  // Prevent crash if data hasn't loaded yet
  if (!telemetry) {
    return (
      <div className="flex items-center justify-center min-h-screen text-primary animate-pulse font-bold tracking-widest uppercase">
        Establishing secure link to hardware...
      </div>
    );
  }

  return (
    <div className="p-8 flex-1 flex flex-col gap-6 max-w-[1600px] mx-auto w-full">
      
      {/* =========================================
          DYNAMIC ALERT BANNER (CRASH VS SAFE)
      ========================================= */}
      {isCrashed ? (
        <div className="w-full animate-pulse-red rounded-xl py-6 px-8 border border-error/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl shadow-error/10 bg-error/10">
          <div className="flex items-center gap-6">
            <div className="bg-error-container p-4 rounded-full">
              <span className="material-symbols-outlined text-4xl text-on-error-container" style={{ fontVariationSettings: "'FILL' 1" }}>
                warning
              </span>
            </div>
            <div>
              <h1 className="font-headline text-4xl font-black text-on-error-container tracking-tighter uppercase italic">
                CRASH DETECTED
              </h1>
              <p className="font-label text-error mt-1 tracking-[0.2em] font-semibold text-sm uppercase">
                UNIT: {deviceId} | IMPACT FORCE: {telemetry.imu.peak_g.toFixed(2)}G
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-surface/40 backdrop-blur-md px-6 py-3 rounded-lg border border-white/5">
              <div className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest mb-1 text-center">
                AUTO-CALL IN
              </div>
              <div className="font-headline text-3xl font-black text-on-surface text-center tabular-nums">
                {formatTime(timer)}
              </div>
            </div>
            <div className="flex gap-2">
              <button className="bg-surface-container-high hover:bg-surface-bright border border-outline-variant px-6 py-4 rounded-lg transition-all active:scale-95 group flex flex-col items-center">
                <span className="font-headline text-sm font-black text-primary tracking-tight">I'M OKAY</span>
                <span className="font-label text-[9px] text-on-surface-variant tracking-widest uppercase">DISMISS</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full rounded-xl py-6 px-8 border border-primary/20 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg bg-surface-container-lowest">
          <div className="flex items-center gap-6">
            <div className="bg-primary/20 p-4 rounded-full border border-primary/30">
              <span className="material-symbols-outlined text-4xl text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                verified_user
              </span>
            </div>
            <div>
              <h1 className="font-headline text-3xl font-black text-on-surface tracking-tighter uppercase">
                SYSTEM NOMINAL
              </h1>
              <p className="font-label text-primary mt-1 tracking-[0.2em] font-semibold text-xs uppercase">
                UNIT: {deviceId} | ACTIVE MONITORING ENGAGED
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="px-6 py-3 rounded-lg border border-white/5 bg-surface-container flex flex-col items-center">
              <span className="font-headline text-lg font-black text-on-surface">{telemetry.imu.peak_g.toFixed(2)}G</span>
              <span className="font-label text-[9px] text-outline tracking-widest uppercase">Current Load</span>
            </div>
          </div>
        </div>
      )}

      {/* Dashboard Grid */}
      <div className="grid grid-cols-12 gap-6 flex-1">
        
        {/* Left: Big Map View */}
        <div className="col-span-12 xl:col-span-8 flex flex-col gap-6">
          <div className={`bg-surface-container rounded-xl overflow-hidden border ${isCrashed ? 'border-error/50 shadow-error/20' : 'border-white/5'} flex flex-col h-full min-h-[500px] shadow-lg transition-colors duration-500`}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-outline-variant/20 bg-surface-container-high/50">
              <div className="flex items-center gap-2">
                <span className={`material-symbols-outlined ${isCrashed ? 'text-error' : 'text-primary'}`}>map</span>
                <span className="font-headline font-bold uppercase tracking-tight text-on-surface">
                  Tactical Incident Overlay
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className={`text-[10px] font-bold tracking-widest uppercase px-2 py-1 rounded ${isCrashed ? 'bg-error/20 text-error' : 'bg-primary/10 text-primary'}`}>
                  LIVE SATELLITE FEED
                </span>
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
                  {isCrashed && (
                    <>
                      <div className="absolute -inset-12 bg-error/10 rounded-full border border-error/20 animate-pulse" />
                      <div className="absolute -inset-6 bg-error/30 rounded-full animate-ping" />
                    </>
                  )}
                  <div className={`relative h-6 w-6 rounded-full border-[3px] border-white flex items-center justify-center ${isCrashed ? 'bg-error shadow-[0_0_20px_rgba(255,180,171,0.5)]' : 'bg-primary shadow-[0_0_20px_rgba(158,202,255,0.5)]'}`}>
                    <div className="w-1.5 h-1.5 bg-white rounded-full" />
                  </div>

                  {/* Popover data */}
                  <div className="absolute top-8 left-1/2 -translate-x-1/2 w-56 bg-surface-container-highest/90 backdrop-blur-xl border border-white/10 p-3 rounded-lg shadow-2xl pointer-events-none">
                    <div className={`text-[9px] font-bold uppercase tracking-widest mb-1 ${isCrashed ? 'text-error' : 'text-primary'}`}>
                      {isCrashed ? 'IMPACT ZONE' : 'CURRENT POSITION'}
                    </div>
                    <div className="text-[11px] text-on-surface font-mono font-medium leading-tight">
                      LAT: {telemetry.gps.latitude.toFixed(5)}°<br />
                      LON: {telemetry.gps.longitude.toFixed(5)}°
                    </div>
                  </div>
                </div>
              </div>

              {/* Map HUD details */}
              <div className="absolute bottom-6 left-6 flex flex-col gap-2">
                <div className="bg-surface-container-lowest/80 backdrop-blur-md px-4 py-2 rounded-lg border border-white/5">
                  <span className="font-label text-[10px] font-bold text-primary tracking-widest uppercase">
                    ALTITUDE: {telemetry.gps.altitude_m.toFixed(1)}M ASL
                  </span>
                </div>
                <div className="bg-surface-container-lowest/80 backdrop-blur-md px-4 py-2 rounded-lg border border-white/5">
                  <span className={`font-label text-[10px] font-bold tracking-widest uppercase ${telemetry.gps.fixed ? 'text-secondary-fixed-dim' : 'text-error'}`}>
                    SIGNAL: {telemetry.gps.fixed ? `${telemetry.gps.satellites} SATELLITES [LOCKED]` : 'NO FIX'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Status & Vitals */}
        <div className="col-span-12 xl:col-span-4 flex flex-col gap-6">
          {/* Vehicle Vitals - UPDATED TO REAL HARDWARE DATA */}
          <div className="bg-surface-container p-6 rounded-xl border border-white/5 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">analytics</span>
                <span className="font-headline font-bold uppercase tracking-tight text-on-surface text-sm">
                  Live Hardware Vitals
                </span>
              </div>
              {isCrashed && (
                <span className="px-2 py-0.5 bg-error/20 text-error text-[10px] font-bold rounded animate-pulse">
                  CRITICAL
                </span>
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-surface-container-low p-4 rounded-lg border border-white/5">
                <span className="font-label text-[10px] text-on-surface-variant tracking-widest uppercase block mb-1">
                  Peak G-Force
                </span>
                <div className="flex items-end justify-between">
                  <span className={`font-headline text-2xl font-bold ${isCrashed ? 'text-error' : 'text-on-surface'}`}>
                    {telemetry.imu.peak_g.toFixed(2)}
                  </span>
                  <span className="font-mono text-outline text-sm">G</span>
                </div>
              </div>
              <div className="bg-surface-container-low p-4 rounded-lg border border-white/5">
                <span className="font-label text-[10px] text-on-surface-variant tracking-widest uppercase block mb-1">
                  Velocity
                </span>
                <div className="flex items-end justify-between">
                  <span className="font-headline text-2xl font-bold text-on-surface">
                    {telemetry.gps.velocity_kmh.toFixed(1)}
                  </span>
                  <span className="font-mono text-primary text-sm">KM/H</span>
                </div>
              </div>
              <div className="bg-surface-container-low p-4 rounded-lg border border-white/5 col-span-2">
                <span className="font-label text-[10px] text-on-surface-variant tracking-widest uppercase block mb-1">
                  Live Acceleration (X / Y / Z)
                </span>
                <div className="flex items-center gap-2 mt-1">
                  <span className="font-mono text-lg font-bold text-secondary">
                    {telemetry.imu.accel_x.toFixed(3)}
                  </span>
                  <span className="text-outline">/</span>
                  <span className="font-mono text-lg font-bold text-secondary">
                    {telemetry.imu.accel_y.toFixed(3)}
                  </span>
                  <span className="text-outline">/</span>
                  <span className="font-mono text-lg font-bold text-secondary">
                    {telemetry.imu.accel_z.toFixed(3)}
                  </span>
                </div>
              </div>
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
              <div className={`flex items-start gap-4 p-4 bg-surface-container-low rounded border-l-4 shadow-sm transition-colors ${isCrashed ? 'border-error' : 'border-outline-variant/30 opacity-50'}`}>
                <div className={`${isCrashed ? 'bg-error/20' : 'bg-surface-variant'} p-2 rounded`}>
                  <span className={`material-symbols-outlined ${isCrashed ? 'text-error' : 'text-outline'}`}>contact_emergency</span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div className="font-headline text-sm font-bold text-on-surface">Automated Comms</div>
                    <span className={`text-[9px] font-bold uppercase tracking-tighter px-1.5 rounded ${isCrashed ? 'text-error bg-error/10' : 'text-outline bg-surface-variant'}`}>
                      {isCrashed ? 'ACTIVE' : 'STANDBY'}
                    </span>
                  </div>
                  <div className="text-[10px] text-on-surface-variant font-medium mt-1 uppercase tracking-tight">
                    {isCrashed && profile?.emergencyNumber ? `Calling: ${profile.emergencyNumber}` : 'Awaiting Impact Trigger'}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-surface-container-low rounded border-l-4 border-outline-variant/30 shadow-sm opacity-50">
                <div className="bg-surface-variant p-2 rounded">
                  <span className="material-symbols-outlined text-outline">local_police</span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div className="font-headline text-sm font-bold text-on-surface">Local PD Dispatch</div>
                    <span className="text-[9px] text-outline font-bold uppercase tracking-tighter bg-surface-variant px-1.5 rounded">STANDBY</span>
                  </div>
                  <div className="text-[10px] text-on-surface-variant font-medium mt-1 uppercase tracking-tight">
                    Requires manual escalation
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