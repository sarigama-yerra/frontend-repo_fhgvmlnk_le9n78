import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import HolographicCard from '../components/HolographicCard';
import NeonBadge from '../components/NeonBadge';
import GlowButton from '../components/GlowButton';
import ParticlesBackground from '../components/ParticlesBackground';
import { BarChart3, Users2, Leaf, TrendingUp, RefreshCw, Car, ShieldCheck, LayoutGrid } from 'lucide-react';

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

function Shimmer({ className = '' }) {
  return (
    <div className={`relative overflow-hidden rounded-xl bg-white/5 ${className}`}>
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <style>
        {`@keyframes shimmer { 100% { transform: translateX(100%); } }`}
      </style>
      <div className="h-full" />
    </div>
  );
}

function Kpi({ icon: Icon, label, value, sub }) {
  return (
    <HolographicCard>
      <div className="flex items-start justify-between">
        <div>
          <div className="text-sm text-white/70">{label}</div>
          <div className="mt-1 text-2xl font-bold">{value}</div>
          {sub && <div className="mt-1 text-xs text-white/60">{sub}</div>}
        </div>
        <div className="p-2 rounded-lg bg-white/5 border border-white/10">
          <Icon className="w-5 h-5 text-[#00D9FF]" />
        </div>
      </div>
    </HolographicCard>
  );
}

function Table({ columns, data, loading }) {
  if (loading) {
    return (
      <div className="space-y-3">
        <Shimmer className="h-12" />
        <Shimmer className="h-12" />
        <Shimmer className="h-12" />
      </div>
    );
  }
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="text-left text-white/60">
            {columns.map((c) => (
              <th key={c.key} className="py-3 pr-6 font-medium">{c.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx} className="border-t border-white/10 hover:bg-white/[0.03] transition-colors">
              {columns.map((c) => (
                <td key={c.key} className="py-3 pr-6 whitespace-nowrap text-white/80">{c.render ? c.render(row[c.key], row) : row[c.key]}</td>
              ))}
            </tr>
          ))}
          {data.length === 0 && (
            <tr>
              <td className="py-6 text-white/50" colSpan={columns.length}>Aucune donnée</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default function Admin() {
  const [kpis, setKpis] = useState(null);
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');

  const loadData = async () => {
    try {
      setError('');
      setLoading(true);
      const [kpiRes, ridesRes] = await Promise.all([
        fetch(`${API_BASE}/kpis`).then(r => r.json()),
        fetch(`${API_BASE}/rides`).then(r => r.json()),
      ]);
      setKpis(kpiRes);
      setRides(Array.isArray(ridesRes) ? ridesRes.slice(0, 8) : []);
    } catch (e) {
      setError('Impossible de charger les données.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  const columns = useMemo(() => ([
    { key: 'id', title: 'ID' },
    { key: 'pickup', title: 'Départ' },
    { key: 'dropoff', title: 'Arrivée' },
    { key: 'distance_km', title: 'Km', render: (v) => <span className="tabular-nums">{Number(v || 0).toFixed(1)}</span> },
    { key: 'price_eur', title: 'Prix', render: (v) => <span className="tabular-nums">€{Number(v || 0).toFixed(2)}</span> },
    { key: 'co2_saved_kg', title: 'CO₂', render: (v) => <span className="tabular-nums">{Number(v || 0).toFixed(1)} kg</span> },
    { key: 'status', title: 'Statut', render: (v) => <NeonBadge color={v === 'completed' ? 'cyan' : v === 'canceled' ? 'rose' : 'violet'}>{v || '—'}</NeonBadge> },
  ]), []);

  const refresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  return (
    <div className="relative min-h-screen bg-[#0A0E27] text-white">
      <ParticlesBackground />

      {/* Layout */}
      <div className="relative z-10 flex">
        {/* Sidebar */}
        <aside className="hidden md:block w-64 min-h-screen border-r border-white/10 bg-white/5 backdrop-blur-xl">
          <div className="px-6 py-6 flex items-center gap-3 border-b border-white/10">
            <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 grid place-items-center shadow-[0_0_20px_rgba(0,217,255,0.35)]">
              <ShieldCheck className="w-5 h-5 text-[#00D9FF]" />
            </div>
            <div>
              <div className="text-sm uppercase tracking-widest text-white/70">Admin</div>
              <div className="text-xs text-white/50">Green'Bee</div>
            </div>
          </div>
          <nav className="px-4 py-4 space-y-2">
            <a className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white/10 border border-white/10" href="#">
              <LayoutGrid className="w-4 h-4 text-[#8B5CF6]" />
              <span className="text-sm">Tableau de bord</span>
            </a>
            <a className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5" href="#">
              <Users2 className="w-4 h-4 text-[#00D9FF]" />
              <span className="text-sm">Utilisateurs</span>
            </a>
            <a className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5" href="#">
              <Car className="w-4 h-4 text-[#FF006E]" />
              <span className="text-sm">Trajets</span>
            </a>
          </nav>
        </aside>

        {/* Main */}
        <main className="flex-1 min-w-0">
          {/* Header */}
          <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between bg-white/5 backdrop-blur-xl">
            <div>
              <h1 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#00D9FF] via-[#8B5CF6] to-[#FF006E]">Tableau de bord Admin</h1>
              <p className="text-xs text-white/60 mt-1">Pilotage temps‑réel des indicateurs clés</p>
            </div>
            <div className="flex items-center gap-3">
              <NeonBadge color="cyan">Temps réel</NeonBadge>
              <GlowButton onClick={refresh} className="flex items-center gap-2">
                <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
                Actualiser
              </GlowButton>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* KPIs */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {loading || !kpis ? (
                <>
                  <Shimmer className="h-28" />
                  <Shimmer className="h-28" />
                  <Shimmer className="h-28" />
                  <Shimmer className="h-28" />
                </>
              ) : (
                <>
                  <Kpi icon={BarChart3} label="Trajets (total)" value={kpis.total_rides} sub={`Mois: ${kpis.monthly_rides}`} />
                  <Kpi icon={TrendingUp} label="Note moyenne" value={`${kpis.avg_rating}/5`} sub="Satisfaction client" />
                  <Kpi icon={Leaf} label="CO₂ économisé" value={`${kpis.total_co2_saved_kg} kg`} sub="Impact écologique" />
                  <Kpi icon={Users2} label="BeePoints" value={kpis.beeps_points} sub="Fidélité cumulée" />
                </>
              )}
            </div>

            {/* Recent Rides */}
            <HolographicCard>
              <div className="flex items-center justify-between mb-3">
                <div className="text-lg font-semibold">Trajets récents</div>
                <NeonBadge color="violet">Live</NeonBadge>
              </div>
              <Table
                loading={loading}
                columns={columns}
                data={rides}
              />
            </HolographicCard>

            {/* System */}
            {error && (
              <div className="text-rose-400 text-sm">{error}</div>
            )}
            <div className="grid md:grid-cols-2 gap-6">
              <HolographicCard>
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm text-white/70">Sécurité et conformité</div>
                  <ShieldCheck className="w-4 h-4 text-[#00D9FF]" />
                </div>
                <div className="text-white/80 text-sm">Toutes les opérations sont conformes et auditées. Chiffrement en transit et au repos, logs signés.</div>
              </HolographicCard>
              <HolographicCard>
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm text-white/70">Disponibilité</div>
                  <TrendingUp className="w-4 h-4 text-[#8B5CF6]" />
                </div>
                <div className="text-white/80 text-sm">SLA 99.9%. Redondance multi‑zone. Monitoring actif et alerting intelligent.</div>
              </HolographicCard>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
