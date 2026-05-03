import React, { useState, useEffect, useMemo } from 'react';

export default function History() {
  const [historyData, setHistoryData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const deviceId = "VX-9902"; // The car we want to see history for

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8080/api/telemetry/history/${deviceId}`);
        if (response.ok) {
          const data = await response.json();
          setHistoryData(data);
        }
      } catch (error) {
        console.error("Failed to fetch history data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchHistory();
  }, []);

  // Calculate REAL stats from the fetched data
  const peakGForce = useMemo(() => {
    if (historyData.length === 0) return 0;
    return Math.max(...historyData.map(log => log.imu.peak_g));
  }, [historyData]);

  const avgVelocity = useMemo(() => {
    if (historyData.length === 0) return 0;
    const totalVelocity = historyData.reduce((sum, log) => sum + log.gps.velocity_kmh, 0);
    return totalVelocity / historyData.length;
  }, [historyData]);

  if (isLoading) {
    return <div className="p-8 text-center text-primary animate-pulse">LOADING PERFORMANCE ARCHIVES...</div>;
  }

  return (
    <div className="p-8 max-w-[1600px] mx-auto space-y-8 w-full">
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-6">
        <div className="space-y-1">
          <p className="font-label text-xs uppercase tracking-[0.2em] text-outline">
            Historical System Analytics
          </p>
          <h2 className="font-headline text-4xl font-bold tracking-tight text-on-surface">
            PERFORMANCE ARCHIVES
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* REAL Average Velocity Card */}
        <div className="bg-surface-container p-6 rounded-2xl border border-white/5">
          <p className="font-label text-[10px] font-bold tracking-[0.2em] text-outline uppercase mb-4">
            Average Velocity
          </p>
          <div className="flex items-baseline gap-2">
            <span className="font-headline text-5xl font-bold text-primary">{avgVelocity.toFixed(1)}</span>
            <span className="font-label text-sm text-outline">KM/H</span>
          </div>
        </div>

        {/* REAL Peak G-Force Card */}
        <div className="bg-surface-container p-6 rounded-2xl border border-white/5">
          <p className="font-label text-[10px] font-bold tracking-[0.2em] text-outline uppercase mb-4">
            Peak G-Force (Last 50 logs)
          </p>
          <div className="flex items-baseline gap-2">
            <span className="font-headline text-5xl font-bold text-secondary">{peakGForce.toFixed(3)}</span>
            <span className="font-label text-sm text-outline">G</span>
          </div>
        </div>
        
        {/* Log Count Card */}
        <div className="bg-surface-container p-6 rounded-2xl border border-white/5">
          <p className="font-label text-[10px] font-bold tracking-[0.2em] text-outline uppercase mb-4">
            Total Logs Retrieved
          </p>
          <div className="flex items-baseline gap-2">
            <span className="font-headline text-5xl font-bold">{historyData.length}</span>
            <span className="font-label text-sm text-outline">entries</span>
          </div>
        </div>
      </div>

      {/* Detailed Log Section */}
      <div className="bg-surface-container rounded-2xl border border-white/5 overflow-hidden">
        <div className="p-8 border-b border-white/5">
          <h3 className="font-headline text-xl font-bold tracking-tight">RECENT TELEMETRY LOGS</h3>
          <p className="text-xs text-outline mt-1 uppercase tracking-widest">Live data received from hardware</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low border-b border-white/5">
                <th className="px-6 py-4 text-[10px] font-bold text-outline uppercase tracking-widest">Timestamp</th>
                <th className="px-6 py-4 text-[10px] font-bold text-outline uppercase tracking-widest">Peak G-Force</th>
                <th className="px-6 py-4 text-[10px] font-bold text-outline uppercase tracking-widest">Velocity</th>
                <th className="px-6 py-4 text-[10px] font-bold text-outline uppercase tracking-widest">Location (Lat, Lng)</th>
                <th className="px-6 py-4 text-[10px] font-bold text-outline uppercase tracking-widest text-center">GPS Fix</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {historyData.length > 0 ? historyData.map((log) => (
                <tr key={log._id} className="hover:bg-surface-bright transition-colors group cursor-pointer">
                  <td className="px-6 py-4 text-xs text-outline-variant font-medium">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                  <td className={`px-6 py-4 text-sm font-bold font-mono ${log.imu.peak_g > 3.4 ? 'text-error' : 'text-on-surface'}`}>
                    {log.imu.peak_g.toFixed(3)} G
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-primary">
                    {log.gps.velocity_kmh.toFixed(1)} KM/H
                  </td>
                  <td className="px-6 py-4 text-xs font-mono text-outline">
                    {log.gps.latitude.toFixed(4)}, {log.gps.longitude.toFixed(4)}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-2 py-1 text-[9px] font-black uppercase rounded ${log.gps.fixed ? 'bg-primary/10 text-primary' : 'bg-error/10 text-error'}`}>
                      {log.gps.fixed ? 'YES' : 'NO'}
                    </span>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-outline">No historical data found for this device.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}