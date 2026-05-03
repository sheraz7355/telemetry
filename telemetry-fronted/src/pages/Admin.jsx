export default function Admin() {
  return (
    <>
      {/* Page Header */}
      <header className="mb-8 border-l-2 border-primary pl-6">
        <h1 className="text-3xl font-bold headline-font tracking-tight uppercase">GLOBAL FLEET OVERVIEW</h1>
        <p className="text-outline uppercase text-xs tracking-[0.2em] mt-1 font-label">Real-time Telemetry & Asset Surveillance</p>
      </header>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-12 gap-6">
        {/* Key Metrics (Column 1-4) */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
          {/* Vehicle Count Card */}
          <div className="bg-surface-container p-6 rounded-lg relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <span className="material-symbols-outlined text-6xl">local_shipping</span>
            </div>
            <label className="text-[10px] uppercase tracking-[0.2em] text-outline font-label block mb-4">Total Fleet Assets</label>
            <div className="flex items-end gap-3">
              <span className="text-5xl font-bold headline-font text-primary tracking-tighter">1,284</span>
              <span className="text-xs text-outline mb-2">ACTIVE UNITS</span>
            </div>
            <div className="mt-6 flex gap-4">
              <div className="flex flex-col">
                <span className="text-xs text-outline font-label uppercase">Inactive</span>
                <span className="text-lg font-medium headline-font">42</span>
              </div>
              <div className="flex flex-col border-l border-outline-variant pl-4">
                <span className="text-xs text-outline font-label uppercase">In Shop</span>
                <span className="text-lg font-medium headline-font text-secondary">18</span>
              </div>
            </div>
          </div>

          {/* System Health Status */}
          <div className="bg-surface-container p-6 rounded-lg">
            <label className="text-[10px] uppercase tracking-[0.2em] text-outline font-label block mb-6">System Integrity</label>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(158,202,255,0.6)]"></span>
                  <span className="text-sm font-medium">Uplink Connectivity</span>
                </div>
                <span className="text-xs headline-font text-primary">99.8%</span>
              </div>
              <div className="w-full bg-surface-container-lowest h-1.5 rounded-full overflow-hidden">
                <div className="bg-primary h-full w-[99.8%]"></div>
              </div>
              <div className="flex justify-between items-center pt-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-secondary shadow-[0_0_8px_rgba(255,223,158,0.6)]"></span>
                  <span className="text-sm font-medium">Database Latency</span>
                </div>
                <span className="text-xs headline-font text-secondary">12ms</span>
              </div>
              <div className="w-full bg-surface-container-lowest h-1.5 rounded-full overflow-hidden">
                <div className="bg-secondary h-full w-[35%]"></div>
              </div>
              <div className="flex justify-between items-center pt-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-error shadow-[0_0_8px_rgba(255,180,171,0.6)]"></span>
                  <span className="text-sm font-medium">Sensor Anomalies</span>
                </div>
                <span className="text-xs headline-font text-error">Critical (2)</span>
              </div>
              <div className="w-full bg-surface-container-lowest h-1.5 rounded-full overflow-hidden">
                <div className="bg-error h-full w-[12%]"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Heatmap Visualization (Column 5-12) */}
        <div className="col-span-12 lg:col-span-8 bg-surface-container rounded-lg overflow-hidden relative min-h-[400px]">
          <div className="absolute inset-0 z-0 bg-cover bg-center opacity-40 grayscale contrast-125" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCar_tlPCeBvj_7z5kjjq4PQtlbjE7ybthbDpO7bJRRkUQ4rtysBh57aGIJf_1w1DXIZ9D51Ff0wAyf8Y6n8T8F4rBLEQ7rIjydGcnfut7XPtSUEgU5nNw-ksWrF41H7bQUhQpz4YDsR7ykyQsED-kK3aS6_uGDCYgJZGlVfsh5TSn6181OAvaJ6MPzYxPlpbRghRhYLH6UlZNxIUYdaL3tkstR9-cPvsqiDSyYNuHdue9EArrM1ZpIUun0WMgt9F-Wjxr74WkpNSU')" }}></div>
          <div className="absolute inset-0 bg-gradient-to-t from-surface-container via-transparent to-transparent"></div>
          <div className="relative z-10 p-6 flex flex-col h-full">
            <div className="flex justify-between items-start">
              <div>
                <label className="text-[10px] uppercase tracking-[0.2em] text-outline font-label block mb-1">INCIDENT HEATMAP</label>
                <h2 className="text-xl font-bold headline-font">METRO SECTOR GRID 07</h2>
              </div>
              <div className="bg-surface-container-high/60 backdrop-blur-md p-2 rounded flex gap-2">
                <button className="px-3 py-1 bg-primary text-on-primary text-[10px] font-bold uppercase rounded">Real-time</button>
                <button className="px-3 py-1 text-on-surface text-[10px] font-bold uppercase rounded hover:bg-surface-variant">24h History</button>
              </div>
            </div>
            {/* Floating Telemetry Chips */}
            <div className="mt-auto flex flex-wrap gap-3">
              <div className="bg-surface-container-high/80 backdrop-blur-lg px-4 py-2 rounded-lg border border-outline-variant/20 flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-sm">speed</span>
                <div className="flex flex-col">
                  <span className="text-[10px] text-outline font-label uppercase">Avg Fleet Velocity</span>
                  <span className="text-sm font-bold headline-font">42.4 MPH</span>
                </div>
              </div>
              <div className="bg-surface-container-high/80 backdrop-blur-lg px-4 py-2 rounded-lg border border-outline-variant/20 flex items-center gap-3">
                <span className="material-symbols-outlined text-secondary text-sm">warning</span>
                <div className="flex flex-col">
                  <span className="text-[10px] text-outline font-label uppercase">Pending Alerts</span>
                  <span className="text-sm font-bold headline-font">14 EVENTS</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent High-G Alerts Table (Full Width) */}
        <div className="col-span-12 bg-surface-container rounded-lg overflow-hidden">
          <div className="px-6 py-5 border-b border-outline-variant/10 flex justify-between items-center">
            <div>
              <label className="text-[10px] uppercase tracking-[0.2em] text-outline font-label block mb-1">Incident Registry</label>
              <h2 className="text-xl font-bold headline-font">RECENT HIGH-G ALERTS</h2>
            </div>
            <button className="text-primary text-xs font-bold uppercase tracking-wider flex items-center gap-2 hover:underline">
              Export Log <span className="material-symbols-outlined text-sm">download</span>
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-lowest">
                  <th className="px-6 py-3 text-[10px] font-bold text-outline uppercase tracking-widest font-label">Timestamp</th>
                  <th className="px-6 py-3 text-[10px] font-bold text-outline uppercase tracking-widest font-label">Asset ID</th>
                  <th className="px-6 py-3 text-[10px] font-bold text-outline uppercase tracking-widest font-label">Event Type</th>
                  <th className="px-6 py-3 text-[10px] font-bold text-outline uppercase tracking-widest font-label">Magnitude</th>
                  <th className="px-6 py-3 text-[10px] font-bold text-outline uppercase tracking-widest font-label">Location</th>
                  <th className="px-6 py-3 text-[10px] font-bold text-outline uppercase tracking-widest font-label">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                {/* Row 1 */}
                <tr className="hover:bg-surface-bright transition-colors group">
                  <td className="px-6 py-4 text-xs font-medium tabular-nums text-on-surface-variant">14:22:15.04</td>
                  <td className="px-6 py-4 text-xs headline-font font-bold text-primary">#VX-9902</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-error text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>emergency</span>
                      <span className="text-xs font-semibold">Lateral Impact</span>
                    </div>
                  </td>
                  <td className="px-6 py-4"><span className="text-xs font-bold bg-error-container text-on-error-container px-2 py-0.5 rounded">4.2G</span></td>
                  <td className="px-6 py-4 text-xs text-on-surface-variant">41.8781° N, 87.6298° W</td>
                  <td className="px-6 py-4"><span className="text-[10px] font-bold uppercase tracking-widest text-secondary">Reviewing</span></td>
                </tr>
                {/* Row 2 */}
                <tr className="hover:bg-surface-bright transition-colors group">
                  <td className="px-6 py-4 text-xs font-medium tabular-nums text-on-surface-variant">14:19:42.21</td>
                  <td className="px-6 py-4 text-xs headline-font font-bold text-primary">#VX-1205</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-secondary text-sm">minor_crash</span>
                      <span className="text-xs font-semibold">Hard Braking</span>
                    </div>
                  </td>
                  <td className="px-6 py-4"><span className="text-xs font-bold bg-secondary-container/20 text-secondary px-2 py-0.5 rounded">1.8G</span></td>
                  <td className="px-6 py-4 text-xs text-on-surface-variant">41.8819° N, 87.6231° W</td>
                  <td className="px-6 py-4"><span className="text-[10px] font-bold uppercase tracking-widest text-outline">Logged</span></td>
                </tr>
                {/* Row 3 */}
                <tr className="hover:bg-surface-bright transition-colors group">
                  <td className="px-6 py-4 text-xs font-medium tabular-nums text-on-surface-variant">14:05:11.88</td>
                  <td className="px-6 py-4 text-xs headline-font font-bold text-primary">#VX-4421</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-error text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
                      <span className="text-xs font-semibold">Vertical Oscillation</span>
                    </div>
                  </td>
                  <td className="px-6 py-4"><span className="text-xs font-bold bg-error-container text-on-error-container px-2 py-0.5 rounded">3.1G</span></td>
                  <td className="px-6 py-4 text-xs text-on-surface-variant">41.8755° N, 87.6244° W</td>
                  <td className="px-6 py-4"><span className="text-[10px] font-bold uppercase tracking-widest text-error">Escalated</span></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 bg-surface-container-lowest/50 text-center">
            <button className="text-[10px] font-bold uppercase tracking-[0.2em] text-outline hover:text-primary transition-colors">Load Extended Telemetry Logs</button>
          </div>
        </div>
      </div>
    </>
  );
}