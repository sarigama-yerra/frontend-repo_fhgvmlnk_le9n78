import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import Spline from '@splinetool/react-spline';
import ParticlesBackground from './components/ParticlesBackground';
import GlowButton from './components/GlowButton';
import HolographicCard from './components/HolographicCard';
import NeonBadge from './components/NeonBadge';
import SparklineChart from './components/SparklineChart';
import { Leaf, Gauge, Car, TrendingUp } from 'lucide-react';

function Currency({ value }) {
  return <span className="tabular-nums">€{value.toFixed(2)}</span>;
}

export default function App() {
  const [pickup, setPickup] = useState('Paris, FR');
  const [dropoff, setDropoff] = useState('CDG Airport');
  const [distance, setDistance] = useState(28);
  const [passengers, setPassengers] = useState(2);

  const estimate = useMemo(() => {
    const base = 12; // base eco-premium
    const perKm = 1.8; // €/km
    const pax = Math.max(1, passengers);
    const price = base + distance * perKm + (pax - 1) * 2;
    const co2SavedKg = distance * 0.14 * 0.6; // assume 60% saved vs solo ride
    return { price, co2SavedKg };
  }, [distance, passengers]);

  const spark1 = useMemo(() => Array.from({ length: 20 }, () => 40 + Math.random() * 60), []);
  const spark2 = useMemo(() => Array.from({ length: 20 }, () => 20 + Math.random() * 30), []);
  const spark3 = useMemo(() => Array.from({ length: 20 }, () => 60 + Math.random() * 20), []);

  return (
    <div className="relative min-h-screen bg-[#0A0E27] text-white overflow-hidden">
      <ParticlesBackground />

      {/* Hero 3D Spline */}
      <div className="absolute inset-0 z-0 opacity-70">
        <Spline scene="https://prod.spline.design/4Zh-Q6DWWp5yPnQf/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Top gradient glow overlays */}
      <div className="pointer-events-none absolute -top-40 -right-40 w-[60rem] h-[60rem] rounded-full opacity-30 blur-3xl bg-[radial-gradient(circle_at_center,#8B5CF6,transparent_60%)]" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 w-[60rem] h-[60rem] rounded-full opacity-30 blur-3xl bg-[radial-gradient(circle_at_center,#00D9FF,transparent_60%)]" />

      {/* Header */}
      <header className="relative z-10 backdrop-blur-xl/0">
        <div className="mx-auto max-w-7xl px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 grid place-items-center shadow-[0_0_20px_rgba(0,217,255,0.35)]">
              <Leaf className="w-5 h-5 text-[#00D9FF]" />
            </div>
            <div>
              <div className="text-sm uppercase tracking-widest text-white/70">Green'Bee</div>
              <div className="text-xs text-white/50">The best way to be</div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <NeonBadge color="cyan">Eco-premium</NeonBadge>
            <NeonBadge color="violet">24/7</NeonBadge>
            <NeonBadge color="rose">Carbon Smart</NeonBadge>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 pt-8 pb-6 md:pt-16">
        <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.05]"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00D9FF] via-[#8B5CF6] to-[#FF006E] drop-shadow-[0_0_20px_rgba(0,217,255,0.35)]">
                THE BEST WAY TO BE
              </span>
            </motion.h1>
            <p className="mt-4 text-white/70 max-w-xl">
              Chauffeur premium éco-responsable. Service haute technologie, discret et durable.
              Réservez en quelques secondes et suivez vos économies de CO₂.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <GlowButton>Réserver maintenant</GlowButton>
              <button className="px-5 py-3 rounded-xl border border-white/15 text-white/80 hover:text-white hover:shadow-[0_0_25px_rgba(139,92,246,0.35)] transition-colors">Découvrir</button>
            </div>
          </div>

          {/* Booking Card */}
          <HolographicCard className="lg:ml-auto w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Réservation instantanée</h3>
              <NeonBadge color="cyan" className="text-xs">Eco • Premium</NeonBadge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="text-sm text-white/70">Départ</label>
                <input value={pickup} onChange={e=>setPickup(e.target.value)}
                  className="mt-1 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#00D9FF]/60 focus:border-transparent placeholder:text-white/40" placeholder="Adresse de départ" />
              </div>
              <div>
                <label className="text-sm text-white/70">Arrivée</label>
                <input value={dropoff} onChange={e=>setDropoff(e.target.value)}
                  className="mt-1 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/60 focus:border-transparent placeholder:text-white/40" placeholder="Adresse d'arrivée" />
              </div>
              <div>
                <label className="text-sm text-white/70">Distance (km)</label>
                <input type="number" value={distance} min={1} max={250} onChange={e=>setDistance(Number(e.target.value))}
                  className="mt-1 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#00D9FF]/60" />
              </div>
              <div>
                <label className="text-sm text-white/70">Passagers</label>
                <input type="number" value={passengers} min={1} max={6} onChange={e=>setPassengers(Number(e.target.value))}
                  className="mt-1 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FF006E]/60" />
              </div>
            </div>

            <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-3">
              <HolographicCard hover={false} className="p-4">
                <div className="flex items-center gap-3">
                  <Car className="w-5 h-5 text-[#00D9FF]" />
                  <div className="text-sm text-white/70">Estimation</div>
                </div>
                <div className="mt-2 text-2xl font-bold"><Currency value={estimate.price} /></div>
              </HolographicCard>
              <HolographicCard hover={false} className="p-4">
                <div className="flex items-center gap-3">
                  <Leaf className="w-5 h-5 text-[#8B5CF6]" />
                  <div className="text-sm text-white/70">CO₂ économisé</div>
                </div>
                <div className="mt-2 text-2xl font-bold">{estimate.co2SavedKg.toFixed(1)} kg</div>
              </HolographicCard>
              <HolographicCard hover={false} className="p-4">
                <div className="flex items-center gap-3">
                  <Gauge className="w-5 h-5 text-[#FF006E]" />
                  <div className="text-sm text-white/70">Confort</div>
                </div>
                <div className="mt-2 text-2xl font-bold">XL Premium</div>
              </HolographicCard>
            </div>

            <div className="mt-5 flex justify-end">
              <GlowButton className="px-6">Confirmer</GlowButton>
            </div>
          </HolographicCard>
        </div>
      </section>

      {/* KPIs */}
      <section className="relative z-10 pb-16">
        <div className="mx-auto max-w-7xl px-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <HolographicCard>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-white/70">BeePoints</div>
                <div className="mt-1 text-2xl font-bold">12,480</div>
              </div>
              <TrendingUp className="text-[#00D9FF]" />
            </div>
            <div className="mt-2">
              <SparklineChart data={spark1} colorFrom="#00D9FF" colorTo="#8B5CF6" />
            </div>
          </HolographicCard>

          <HolographicCard>
            <div className="text-sm text-white/70">CO₂ total économisé</div>
            <div className="mt-1 text-2xl font-bold">1.2 t</div>
            <div className="mt-2">
              <SparklineChart data={spark2} colorFrom="#8B5CF6" colorTo="#FF006E" />
            </div>
          </HolographicCard>

          <HolographicCard>
            <div className="text-sm text-white/70">Trajets ce mois</div>
            <div className="mt-1 text-2xl font-bold">48</div>
            <div className="mt-2">
              <SparklineChart data={spark3} colorFrom="#00D9FF" colorTo="#FF006E" />
            </div>
          </HolographicCard>

          <HolographicCard>
            <div className="text-sm text-white/70">Note moyenne</div>
            <div className="mt-1 text-2xl font-bold">4.9/5</div>
            <div className="mt-2 text-xs text-white/60">Basé sur 320 avis</div>
          </HolographicCard>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 bg-black/10">
        <div className="mx-auto max-w-7xl px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-white/60 text-sm">© {new Date().getFullYear()} Green'Bee • The best way to be</div>
          <div className="flex items-center gap-3 text-xs text-white/50">
            <span>Eco</span>
            <span className="w-1 h-1 rounded-full bg-white/30" />
            <span>Premium</span>
            <span className="w-1 h-1 rounded-full bg-white/30" />
            <span>AI</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
