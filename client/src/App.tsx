import { useState, useEffect } from 'react';
import { Monitor, Smartphone, CheckCircle, Wifi, Server } from 'lucide-react';

interface HealthData {
  status: string;
  message: string;
  timestamp: string;
}

export default function App() {
  const [backendHealth, setBackendHealth] = useState<HealthData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/health')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data: HealthData) => {
        setBackendHealth(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6 select-none font-sans">
      <div className="max-w-2xl w-full bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl backdrop-blur">
        {/* Title */}
        <div className="flex items-center gap-3 border-b border-slate-800 pb-5 mb-6">
          <div className="p-3 bg-blue-600/20 text-blue-400 rounded-xl">
            <Monitor className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Cross-OS Simulator</h1>
            <p className="text-sm text-slate-400">Step 1: Project Setup & Health Verification</p>
          </div>
        </div>

        {/* Status Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Frontend Status */}
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4 flex items-start gap-3">
            <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg mt-0.5">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-200">Client Frontend (React + Vite)</div>
              <div className="text-xs text-emerald-400 mt-1 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Active on port 5173
              </div>
            </div>
          </div>

          {/* Backend Status */}
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4 flex items-start gap-3">
            <div className={`p-2 rounded-lg mt-0.5 ${backendHealth ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
              <Server className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-200">Backend Server (Node + Express)</div>
              {loading && <div className="text-xs text-slate-400 mt-1">Connecting to /api/health...</div>}
              {backendHealth && (
                <div className="text-xs text-emerald-400 mt-1 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  Connected (Port 3001 via Proxy)
                </div>
              )}
              {error && (
                <div className="text-xs text-rose-400 mt-1">
                  Offline ({error}) - will connect when server starts
                </div>
              )}
            </div>
          </div>
        </div>

        {/* OS Capabilities Preview */}
        <div className="bg-slate-950/60 rounded-xl p-4 border border-slate-800/80 mb-6">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-blue-400" />
            Platforms Pre-Configured for Step 2 & 3
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
            <div className="bg-slate-800/60 p-2.5 rounded-lg border border-slate-700/40">🍎 macOS</div>
            <div className="bg-slate-800/60 p-2.5 rounded-lg border border-slate-700/40">🪟 Windows 10</div>
            <div className="bg-slate-800/60 p-2.5 rounded-lg border border-slate-700/40">🪟 Windows 11</div>
            <div className="bg-slate-800/60 p-2.5 rounded-lg border border-slate-700/40">📱 iPhone (iOS)</div>
            <div className="bg-slate-800/60 p-2.5 rounded-lg border border-slate-700/40">🤖 Galaxy (One UI)</div>
          </div>
        </div>

        {/* Footer info */}
        <div className="text-xs text-slate-500 flex items-center justify-between border-t border-slate-800 pt-4">
          <span>OS Environment Simulator Foundation</span>
          <span className="flex items-center gap-1 text-slate-400">
            <Wifi className="w-3.5 h-3.5 text-blue-400" /> Ready for Step 2
          </span>
        </div>
      </div>
    </div>
  );
}
