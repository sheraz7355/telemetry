import React, { useState, useEffect } from 'react';

export default function Dashboard() {
  const [telemetry, setTelemetry] = useState(null);
  const [latency, setLatency] = useState(0);
  const deviceId = "VX-9902"; // The car we are monitoring

  useEffect(() => {
    // Fetch data every 1 second
    const interval = setInterval(async () => {
      try {
        const response = await fetch(`http://localhost:5005/api/telemetry/latest/${deviceId}`);
        if (response.ok) {
          const data = await response.json();
          setTelemetry(data);

          // CALCULATE LATENCY: Current Time - Time data was saved in MongoDB
          if (data && data.timestamp) {
            const dataTime = new Date(data.timestamp).getTime();
            const currentTime = new Date().getTime();
            setLatency(currentTime - dataTime);
          }
        }
      } catch (error) {
        console.error("Error fetching telemetry");
      }
    }, 1000); // 1000ms = 1 second

    return () => clearInterval(interval);
  },[]);

  if (!telemetry) return <div className="text-white p-8 text-center animate-pulse">Waiting for hardware data...</div>;

  return (
    <div className="p-8 max-w-[1600px] mx-auto w-full text-white">
      <h1 className="text-3xl font-black uppercase mb-8">Live Telemetry: {deviceId}</h1>
      
      {/* Top Status Bar */}
      <div className="flex gap-4 mb-8">
        <div className={`px-4 py-2 rounded font-bold text-xs ${telemetry.gps.fixed ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
          GPS: {telemetry.gps.fixed ? 'FIXED' : 'SEARCHING'}
        </div>
        <div className="px-4 py-2 bg-surface-container-high rounded font-bold text-xs text-primary">
          SATELLITES: {telemetry.gps.satellites}
        </div>
        <div className="px-4 py-2 bg-surface-container-high rounded font-bold text-xs text-secondary border border-secondary/30">
          LATENCY: {latency} ms
        </div>
      </div>

      {/* Grid of REAL Hardware Data */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        
        {/* Peak G-Force */}
        <div className={`p-6 rounded-xl border ${telemetry.imu.peak_g > 3.4 ? 'bg-red-500/20 border-red-500' : 'bg-surface-container border-white/5'}`}>
          <p className="text-xs text-outline uppercase tracking-widest mb-2">Peak G-Force</p>
          <p className={`text-4xl font-bold ${telemetry.imu.peak_g > 3.4 ? 'text-red-500 animate-pulse' : 'text-white'}`}>
            {telemetry.imu.peak_g.toFixed(3)} <span className="text-sm">g</span>
          </p>
          {telemetry.imu.peak_g > 3.4 && <p className="text-xs text-red-500 font-bold mt-2">CRASH DETECTED</p>}
        </div>

        {/* Velocity */}
        <div className="bg-surface-container p-6 rounded-xl border border-white/5">
          <p className="text-xs text-outline uppercase tracking-widest mb-2">Velocity</p>
          <p className="text-4xl font-bold text-primary">
            {telemetry.gps.velocity_kmh.toFixed(1)} <span className="text-sm text-outline">km/h</span>
          </p>
        </div>

        {/* Acceleration X/Y/Z */}
        <div className="bg-surface-container p-6 rounded-xl border border-white/5 col-span-2">
          <p className="text-xs text-outline uppercase tracking-widest mb-2">Real-Time Accel (X / Y / Z)</p>
          <p className="text-3xl font-mono text-secondary">
            {telemetry.imu.accel_x.toFixed(3)} / {telemetry.imu.accel_y.toFixed(3)} / {telemetry.imu.accel_z.toFixed(3)}
          </p>
        </div>

        {/* Altitude */}
        <div className="bg-surface-container p-6 rounded-xl border border-white/5">
          <p className="text-xs text-outline uppercase tracking-widest mb-2">Altitude</p>
          <p className="text-2xl font-bold">
            {telemetry.gps.altitude_m.toFixed(1)} <span className="text-sm text-outline">m</span>
          </p>
        </div>

        {/* Location (Lat/Lon) */}
        <div className="bg-surface-container p-6 rounded-xl border border-white/5 col-span-2">
          <p className="text-xs text-outline uppercase tracking-widest mb-2">Live Coordinates</p>
          <p className="text-2xl font-mono">
            {telemetry.gps.latitude.toFixed(6)}, {telemetry.gps.longitude.toFixed(6)}
          </p>
        </div>

      </div>
    </div>
  );
}