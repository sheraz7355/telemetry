import React, { useState, useEffect } from 'react';

export default function Admin() {
    const [stats, setStats] = useState(null);
    const [incidents, setIncidents] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                // Fetch all data concurrently for speed
                const [statsRes, incidentsRes, vehiclesRes] = await Promise.all([
                    fetch('http://127.0.0.1:8080/api/admin/stats'),
                    fetch('http://127.0.0.1:8080/api/admin/incidents'),
                    fetch('http://127.0.0.1:8080/api/admin/vehicles')
                ]);

                if (!statsRes.ok || !incidentsRes.ok || !vehiclesRes.ok) {
                    throw new Error('Failed to fetch one or more admin resources');
                }

                const statsData = await statsRes.json();
                const incidentsData = await incidentsRes.json();
                const vehiclesData = await vehiclesRes.json();

                setStats(statsData);
                setIncidents(incidentsData);
                setVehicles(vehiclesData);

            } catch (error) {
                console.error("Admin data fetch error:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAdminData();
    }, []);

    // Helper to format incident type based on G-Force
    const getIncidentType = (gForce) => {
        if (gForce > 3.4) return { text: 'Significant Impact', color: 'bg-error-container text-on-error-container', icon: 'emergency' };
        if (gForce > 1.8) return { text: 'Hard Braking / Vibration', color: 'bg-secondary-container/20 text-secondary', icon: 'minor_crash' };
        return { text: 'Nominal Event', color: 'bg-surface-container-high', icon: 'speed' };
    };

    if (isLoading) {
        return <div className="p-8 text-center text-primary animate-pulse font-bold tracking-widest">LOADING GLOBAL FLEET DATA...</div>;
    }

    return (
        <>
            <header className="mb-8 border-l-2 border-primary pl-6">
                <h1 className="text-3xl font-bold headline-font tracking-tight uppercase">GLOBAL FLEET OVERVIEW</h1>
                <p className="text-outline uppercase text-xs tracking-[0.2em] mt-1 font-label">Real-time Telemetry & Asset Surveillance</p>
            </header>

            <div className="grid grid-cols-12 gap-6">
                {/* Key Metrics (Real Data) */}
                <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
                    <div className="bg-surface-container p-6 rounded-lg">
                        <label className="text-[10px] uppercase tracking-[0.2em] text-outline font-label block mb-4">Total Fleet Assets</label>
                        <div className="flex items-end gap-3">
                            <span className="text-5xl font-bold headline-font text-primary tracking-tighter">{stats?.totalVehicles || 0}</span>
                            <span className="text-xs text-outline mb-2">REGISTERED UNITS</span>
                        </div>
                    </div>
                    <div className="bg-surface-container p-6 rounded-lg">
                        <label className="text-[10px] uppercase tracking-[0.2em] text-outline font-label block mb-4">Incident Summary</label>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium">Total High-G Events (`{'>'}`1.8g)</span>
                                <span className="text-lg font-bold headline-font text-secondary">{stats?.totalIncidents || 0}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium">Critical Impacts (`{'>'}`3.4g)</span>
                                <span className="text-lg font-bold headline-font text-error">{stats?.criticalAlerts || 0}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Registered Vehicles List (Replaces Heatmap) */}
                <div className="col-span-12 lg:col-span-8 bg-surface-container rounded-lg overflow-hidden min-h-[350px] flex flex-col">
                    <div className="p-6 border-b border-outline-variant/10">
                        <label className="text-[10px] uppercase tracking-[0.2em] text-outline font-label block mb-1">VEHICLE ROSTER</label>
                        <h2 className="text-xl font-bold headline-font">REGISTERED FLEET ASSETS</h2>
                    </div>
                    <div className="overflow-auto flex-1">
                        <table className="w-full text-left">
                            <thead className="sticky top-0 bg-surface-container-high">
                                <tr>
                                    <th className="px-6 py-3 text-[10px] font-bold text-outline uppercase tracking-widest font-label">Asset ID</th>
                                    <th className="px-6 py-3 text-[10px] font-bold text-outline uppercase tracking-widest font-label">Driver</th>
                                    <th className="px-6 py-3 text-[10px] font-bold text-outline uppercase tracking-widest font-label">Emergency Contact</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-outline-variant/10">
                                {vehicles.length > 0 ? vehicles.map(vehicle => (
                                    <tr key={vehicle.deviceId} className="hover:bg-surface-bright transition-colors">
                                        <td className="px-6 py-4 text-xs headline-font font-bold text-primary">{vehicle.deviceId}</td>
                                        <td className="px-6 py-4 text-sm text-on-surface">{vehicle.driverName}</td>
                                        <td className="px-6 py-4 text-xs font-mono text-outline">{vehicle.emergencyNumber}</td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="3" className="p-8 text-center text-outline">No vehicles registered yet.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Recent High-G Alerts Table (Real Data) */}
                <div className="col-span-12 bg-surface-container rounded-lg overflow-hidden">
                    <div className="px-6 py-5 border-b border-outline-variant/10">
                        <h2 className="text-xl font-bold headline-font">RECENT HIGH-G ALERTS (`{'>'}`1.8g)</h2>
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
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-outline-variant/10">
                                {incidents.length > 0 ? incidents.map(incident => {
                                    const eventType = getIncidentType(incident.imu.peak_g);
                                    return (
                                    <tr key={incident._id} className="hover:bg-surface-bright transition-colors group">
                                        <td className="px-6 py-4 text-xs font-medium tabular-nums text-on-surface-variant">
                                            {new Date(incident.timestamp).toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 text-xs headline-font font-bold text-primary">{incident.deviceId}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <span className={`material-symbols-outlined text-sm ${eventType.color.includes('text-') ? eventType.color : ''}`}>{eventType.icon}</span>
                                                <span className="text-xs font-semibold">{eventType.text}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`text-xs font-bold px-2 py-0.5 rounded ${eventType.color}`}>
                                                {incident.imu.peak_g.toFixed(3)}G
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-xs text-on-surface-variant font-mono">
                                            {incident.gps.latitude.toFixed(4)}°, {incident.gps.longitude.toFixed(4)}°
                                        </td>
                                    </tr>
                                    );
                                }) : (
                                    <tr>
                                        <td colSpan="5" className="p-8 text-center text-outline">No high-G incidents recorded recently.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}