// src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { LineChart, XAxis, YAxis, Line, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


// Re-usable chart component
const LiveChart = ({ data }) => {
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#1E2023] border border-white/10 rounded-lg p-3 shadow-2xl">
          <div className="text-[#9ECAFF] font-bold text-xs">{payload[0].value.toFixed(1)} KM/H</div>
          <div className="text-[#FFDF9E] text-[10px] mt-1">{payload[1].value.toFixed(3)} G</div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-surface-container rounded-2xl border border-white/5 p-8 mt-6">
      <h3 className="font-headline text-2xl font-bold text-on-surface mb-8">LIVE VELOCITY & G-FORCE (LAST 30 SEC)</h3>
      <div style={{ width: '100%', height: '400px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="0" vertical={false} stroke="#282A2D" />
            <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: '#434652', fontSize: 11 }} />
            <YAxis yAxisId="left" hide={true} domain={[0, 'dataMax + 20']} />
            <YAxis yAxisId="right" orientation="right" hide={true} domain={[0, 'dataMax + 1']} />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(158, 202, 255, 0.2)', strokeWidth: 1 }} />
            <Line yAxisId="left" type="monotone" dataKey="velocity" stroke="#9ECAFF" strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
            <Line yAxisId="right" type="monotone" dataKey="gForce" stroke="#FFDF9E" strokeWidth={2} strokeDasharray="5 5" dot={false} activeDot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default function Dashboard() {
  const [telemetry, setTelemetry] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [latency, setLatency] = useState(0);
  const deviceId = "VX-9902"; // The car we want to monitor

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8080/api/telemetry/latest/${deviceId}`);
        if (response.ok) {
          const data = await response.json();
          setTelemetry(data);

          if (data && data.timestamp) {
            setLatency(new Date().getTime() - new Date(data.timestamp).getTime());
          }

          if (data) {
            const newPoint = {
              time: new Date(data.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
              velocity: data.gps.velocity_kmh,
              gForce: data.imu.peak_g
            };
            setChartData(prevData => [...prevData, newPoint].slice(-30));
          }
        }
      } catch (error) { console.error("Error fetching telemetry"); }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!telemetry) return <div className="text-white p-8 text-center animate-pulse">Waiting for hardware data...</div>;

  return (
    <div className="p-8 max-w-[1600px] mx-auto w-full text-white">
      <h1 className="text-3xl font-black uppercase mb-8">Live Telemetry: {deviceId}</h1>
      
      <div className="flex gap-4 mb-8">
        <div className={`px-4 py-2 rounded font-bold text-xs ${telemetry.gps.fixed ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
          GPS: {telemetry.gps.fixed ? 'FIXED' : 'SEARCHING'}
        </div>
        <div className="px-4 py-2 bg-surface-container-high rounded font-bold text-xs text-primary">
          SATELLITES: {telemetry.gps.satellites}
        </div>
        <div className="px-4 py-2 bg-surface-container-high rounded font-bold text-xs text-secondary border border-secondary/30">
          LATENCY: {latency > 3000 ? "OFFLINE" : `${latency} ms`}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className={`p-6 rounded-xl border ${telemetry.imu.peak_g > 3.4 ? 'bg-red-500/20 border-red-500' : 'bg-surface-container border-white/5'}`}>
          <p className="text-xs text-outline uppercase tracking-widest mb-2">Peak G-Force</p>
          <p className={`text-4xl font-bold ${telemetry.imu.peak_g > 3.4 ? 'text-red-500 animate-pulse' : 'text-white'}`}>
            {telemetry.imu.peak_g.toFixed(3)} <span className="text-sm">g</span>
          </p>
          {telemetry.imu.peak_g > 3.4 && <p className="text-xs text-red-500 font-bold mt-2">CRASH DETECTED</p>}
        </div>

        <div className="bg-surface-container p-6 rounded-xl border border-white/5">
          <p className="text-xs text-outline uppercase tracking-widest mb-2">Velocity</p>
          <p className="text-4xl font-bold text-primary">
            {telemetry.gps.velocity_kmh.toFixed(1)} <span className="text-sm text-outline">km/h</span>
          </p>
        </div>

        <div className="bg-surface-container p-6 rounded-xl border border-white/5 col-span-2">
          <p className="text-xs text-outline uppercase tracking-widest mb-2">Real-Time Accel (X / Y / Z)</p>
          <p className="text-3xl font-mono text-secondary">
            {telemetry.imu.accel_x.toFixed(3)} / {telemetry.imu.accel_y.toFixed(3)} / {telemetry.imu.accel_z.toFixed(3)}
          </p>
        </div>
        
        <div className="bg-surface-container p-6 rounded-xl border border-white/5 col-span-full">
            <p className="text-xs text-outline uppercase tracking-widest mb-2">Live Coordinates</p>
            <div className="flex items-center gap-4">
                <span className="text-2xl font-mono">{telemetry.gps.latitude.toFixed(6)}, {telemetry.gps.longitude.toFixed(6)}</span>
                <a href={`https://www.google.com/maps?q=${telemetry.gps.latitude},${telemetry.gps.longitude}`} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg text-outline hover:text-primary hover:bg-surface-container-high transition-colors">
                    <span className="material-symbols-outlined">open_in_new</span>
                </a>
            </div>
        </div>
      </div>
      
      {/* RENDER THE CHART */}
      <LiveChart data={chartData} />
    </div>
  );
}