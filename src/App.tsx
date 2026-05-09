/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, 
  Map as MapIcon, 
  Bell, 
  Users, 
  Lock, 
  FileText, 
  Database, 
  Cpu, 
  Activity, 
  MessageSquare,
  AlertCircle,
  Eye,
  ChevronRight,
  ChevronLeft,
  BookOpen,
  Info
} from 'lucide-react';
import { cn } from './lib/utils';
import { AppMockup } from './components/AppMockup';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { id: 'hero', component: <HeroSlide next={() => setCurrentSlide(1)} /> },
    { id: 'problem', component: <ProblemSlide /> },
    { id: 'objectives', component: <ObjectivesSlide /> },
    { id: 'mockup', component: <MockupSlide /> },
    { id: 'features', component: <FeaturesSlide /> },
    { id: 'impact', component: <ImpactSlide /> },
    { id: 'engineering', component: <EngineeringSlide /> },
    { id: 'conclusion', component: <ConclusionSlide reset={() => setCurrentSlide(0)} /> },
  ];

  return (
    <div className="relative min-h-screen w-full bg-zinc-950 overflow-hidden font-sans">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="h-screen w-full"
        >
          {slides[currentSlide].component}
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 z-50">
        <button 
          onClick={() => setCurrentSlide(prev => Math.max(0, prev - 1))}
          className={cn(
            "p-2 rounded-full border border-zinc-800 bg-zinc-900/50 backdrop-blur hover:bg-zinc-800 transition-opacity",
            currentSlide === 0 && "opacity-0 pointer-events-none"
          )}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        
        <div className="flex gap-2">
          {slides.map((_, idx) => (
            <div 
              key={idx} 
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                currentSlide === idx ? "w-8 bg-brand-primary" : "bg-zinc-800"
              )}
            />
          ))}
        </div>

        <button 
          onClick={() => setCurrentSlide(prev => Math.min(slides.length - 1, prev + 1))}
          className={cn(
            "p-2 rounded-full border border-zinc-800 bg-zinc-900/50 backdrop-blur hover:bg-zinc-800 transition-opacity",
            currentSlide === slides.length - 1 && "opacity-0 pointer-events-none"
          )}
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Logo / Badge */}
      <div className="fixed top-8 left-8 z-50 flex items-center gap-4">
        <div className="w-10 h-10 bg-brand-primary rounded-lg flex items-center justify-center font-bold text-2xl shadow-[0_0_20px_rgba(220,38,38,0.3)]">
          A
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight uppercase leading-tight">Alerta Líder</h1>
          <p className="text-[10px] text-brand-primary font-bold tracking-[0.1em] uppercase leading-tight">Defensa y Territorio</p>
        </div>
      </div>

      {/* Footer Decorative */}
      <div className="fixed bottom-4 left-8 right-8 z-50 flex justify-between text-[10px] text-zinc-600 font-mono pointer-events-none">
        <div className="uppercase tracking-widest flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-brand-primary rounded-full animate-pulse" />
          Protocolo v2.04 // Cifrado AES-256
        </div>
        <div className="uppercase tracking-widest">
          CUN • Ingeniería de Sistemas • 2026
        </div>
      </div>
    </div>
  );
}

function HeroSlide({ next }: { next: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center h-full px-4 text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
        className="mb-8 p-6 bg-brand-primary/10 rounded-full"
      >
        <Shield className="w-24 h-24 text-brand-primary" />
      </motion.div>
      <motion.h1 
        className="text-7xl md:text-9xl font-black tracking-tighter mb-4"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        ALERTA LÍDER
      </motion.h1>
      <motion.p 
        className="text-xl md:text-2xl text-zinc-400 max-w-2xl mb-12 font-light italic"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        "La tecnología al servicio de quienes defienden la vida y el territorio"
      </motion.p>
      <motion.button 
        onClick={next}
        className="btn-primary flex items-center gap-3 px-8 py-4 text-lg"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Iniciar Presentación <ChevronRight className="w-5 h-5" />
      </motion.button>
    </div>
  );
}

function ProblemSlide() {
  const data = [
    { year: '2020', cases: 182 },
    { year: '2021', cases: 171 },
    { year: '2022', cases: 215 },
    { year: '2023', cases: 188 },
    { year: '2024 (H1)', cases: 92 },
  ];

  return (
    <div className="max-w-6xl mx-auto h-full flex flex-col justify-center px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <div className="text-brand-danger flex items-center gap-2 mb-4 font-mono text-sm uppercase tracking-widest">
            <AlertCircle className="w-4 h-4" /> Contexto Nacional
          </div>
          <h2 className="text-5xl font-bold mb-6">Crisis de líderes en Colombia</h2>
          <div className="space-y-4 text-zinc-400 text-lg leading-relaxed">
            <p>
              Colombia enfrenta una crisis sistemática de violencia contra quienes defienden los derechos humanos y el medio ambiente.
            </p>
            <p>
              Departamentos como <span className="text-white font-semibold">Cauca, Antioquia, Nariño y Putumayo</span> concentran el mayor número de amenazas y homicidios, afectando la democracia y la cohesión social.
            </p>
            <div className="p-4 bg-zinc-900 border-l-4 border-brand-danger rounded-r-lg">
              <p className="text-sm font-mono text-brand-danger mb-1">DATO CRÍTICO</p>
              <p className="text-white">Cada 48 horas un líder social es asesinado o amenazado en zonas de conflicto.</p>
            </div>
          </div>
        </div>
        <div className="glass-card p-8 h-[400px]">
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Activity className="w-5 h-5 text-brand-danger" /> Casos anuales (Líderes asesinados)
          </h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#27272a" />
              <XAxis dataKey="year" stroke="#71717a" />
              <YAxis stroke="#71717a" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#18181b', border: '1px solid #3f3f46' }}
                itemStyle={{ color: '#ef4444' }}
              />
              <Bar dataKey="cases" fill="#ef4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function ObjectivesSlide() {
  const objectives = [
    { 
      icon: <Users />, 
      title: "Protección Colectiva", 
      desc: "Crear una red de seguridad digital para comunidades vulnerables." 
    },
    { 
      icon: <Bell />, 
      title: "Respuesta Inmediata", 
      desc: "Reducir los tiempos de reacción de las autoridades y ONG de DDHH." 
    },
    { 
      icon: <Lock />, 
      title: "举报 Seguro", 
      desc: "Garantizar el anonimato y la integridad de quienes denuncian." 
    },
    { 
      icon: <Activity />, 
      title: "Ciudadanía Activa", 
      desc: "Fortalecer la participación democrática mediante tecnología." 
    }
  ];

  return (
    <div className="max-w-6xl mx-auto h-full flex flex-col justify-center px-8">
      <h2 className="text-5xl font-bold mb-12 text-center">Objetivos Estratégicos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {objectives.map((obj, i) => (
          <motion.div 
            key={i}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-6 flex flex-col items-center text-center hover:border-brand-primary/50 transition-colors group"
          >
            <div className="w-16 h-16 bg-zinc-800 rounded-2xl flex items-center justify-center mb-6 text-brand-primary group-hover:scale-110 transition-transform">
              {obj.icon}
            </div>
            <h3 className="text-xl font-bold mb-3">{obj.title}</h3>
            <p className="text-zinc-400 text-sm">{obj.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function MockupSlide() {
  return (
    <div className="h-full w-full flex items-center justify-center px-4 md:px-20">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center w-full max-w-7xl">
        <div className="lg:col-span-1 space-y-6">
          <div className="text-brand-primary flex items-center gap-2 font-mono text-sm uppercase tracking-widest">
            <Eye className="w-4 h-4" /> Live Demo
          </div>
          <h2 className="text-5xl font-bold leading-tight">Interfaz de Usuario</h2>
          <p className="text-zinc-400 text-lg">
            Diseñada para la simplicidad y efectividad en situaciones de alto estrés. La interfaz prioriza las acciones críticas.
          </p>
          <ul className="space-y-4">
            <li className="flex items-center gap-3 text-zinc-300">
              <div className="w-6 h-6 rounded-full bg-brand-primary/20 flex items-center justify-center text-brand-primary text-xs font-bold">1</div>
              Botón de Pánico Instantáneo
            </li>
            <li className="flex items-center gap-3 text-zinc-300">
              <div className="w-6 h-6 rounded-full bg-brand-primary/20 flex items-center justify-center text-brand-primary text-xs font-bold">2</div>
              Mapa de Riesgo en Tiempo Real
            </li>
            <li className="flex items-center gap-3 text-zinc-300">
              <div className="w-6 h-6 rounded-full bg-brand-primary/20 flex items-center justify-center text-brand-primary text-xs font-bold">3</div>
              Reportes con Evidencia Encriptada
            </li>
          </ul>
        </div>
        <div className="lg:col-span-2 flex justify-center">
          <AppMockup />
        </div>
      </div>
    </div>
  );
}

function FeaturesSlide() {
  const features = [
    { title: "Geolocalización Inversa", desc: "Ubicación precisa incluso en zonas rurales sin señal GPS completa." },
    { title: "IA de Riesgo", desc: "Algoritmos que analizan patrones de amenazas para predecir zonas calientes." },
    { title: "Cifrado Militar", desc: "Tecnología Zero-Knowledge para proteger identidades de informantes." },
    { title: "Modo Offline", desc: "Capacidad de almacenar denuncias localmente y enviarlas automáticamente al detectar red." },
    { title: "Red de Aliados", desc: "Integración directa con Defensoría, Cruz Roja y Brigadas Territoriales." },
    { title: "Evidencia Multimedia", desc: "Carga automática de clips de audio y video a la nube segura en segundos." }
  ];

  return (
    <div className="max-w-6xl mx-auto h-full flex flex-col justify-center px-8">
      <h2 className="text-5xl font-bold mb-12">Core Tecnológico</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <div key={i} className="p-6 border border-zinc-800 rounded-xl hover:bg-zinc-900 transition-colors">
            <h3 className="text-brand-primary font-bold mb-2 flex items-center gap-2">
              <div className="w-1 h-4 bg-brand-primary" /> {f.title}
            </h3>
            <p className="text-zinc-400 text-sm">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ImpactSlide() {
  return (
    <div className="max-w-6xl mx-auto h-full flex flex-col justify-center px-8">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-bold mb-6">Impacto Social y Democrático</h2>
        <p className="text-zinc-400 text-xl max-w-3xl mx-auto">
          Transformando el miedo en acción coordinada para fortalecer el tejido social colombiano.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="glass-card p-8 border-t-4 border-brand-primary">
          <h4 className="text-2xl font-bold mb-4 uppercase tracking-tight">Visibilización</h4>
          <p className="text-zinc-400">Reduce el subregistro de amenazas, convirtiendo casos aislados en datos nacionales irrefutables.</p>
        </div>
        <div className="glass-card p-8 border-t-4 border-brand-primary">
          <h4 className="text-2xl font-bold mb-4 uppercase tracking-tight">Democracia</h4>
          <p className="text-zinc-400">Protege a quienes ejercen la participación ciudadana en territorios donde el estado no llega.</p>
        </div>
        <div className="glass-card p-8 border-t-4 border-brand-primary">
          <h4 className="text-2xl font-bold mb-4 uppercase tracking-tight">Empoderamiento</h4>
          <p className="text-zinc-400">Acelera la respuesta internacional y local mediante canales de comunicación blindados.</p>
        </div>
      </div>
    </div>
  );
}

function EngineeringSlide() {
  const stacks = [
    { icon: <Cpu />, label: "Inteligencia Artificial", detail: "NLP para análisis de texto en amenazas y modelos predictivos de riesgo territorial." },
    { icon: <Database />, label: "Big Data & Análisis", detail: "Procesamiento de grandes volúmenes de reportes geolocalizados para inteligencia social." },
    { icon: <Lock />, label: "Ciberseguridad", detail: "Protocolos de encripción end-to-end y protocolos de borrado remoto en caso de captura." },
    { icon: <Users />, label: "Arquitectura Cloud", detail: "Infraestructura escalable y resiliente diseñada para alta disponibilidad 24/7." }
  ];

  return (
    <div className="max-w-6xl mx-auto h-full flex flex-col justify-center px-8">
      <h2 className="text-5xl font-bold mb-4">Rol de la Ingeniería de Sistemas</h2>
      <p className="text-zinc-400 mb-12 text-lg">Un sistema robusto requiere los más altos estándares técnicos.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {stacks.map((s, i) => (
          <div key={i} className="flex gap-6 p-6 glass-card group">
            <div className="w-14 h-14 bg-zinc-800 rounded-xl flex items-center justify-center text-brand-primary shrink-0 group-hover:bg-brand-primary group-hover:text-white transition-colors">
              {s.icon}
            </div>
            <div>
              <h4 className="text-xl font-bold mb-2">{s.label}</h4>
              <p className="text-zinc-400 text-sm">{s.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ConclusionSlide({ reset }: { reset: () => void }) {
  return (
    <div className="h-full flex flex-col items-center justify-center bg-zinc-950 px-8 text-center relative">
      <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-primary rounded-full blur-[120px]" />
      </div>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="z-10"
      >
        <h2 className="text-6xl md:text-8xl font-black mb-8">LA VIDA NO TIENE PRECIO</h2>
        <p className="text-2xl text-zinc-400 max-w-4xl mx-auto mb-16 leading-relaxed">
          "Alerta Líder" no es solo una aplicación; es un escudo digital para quienes tienen el valor de alzar su voz en nombre de los demás. La tecnología debe ser el martillo que rompa las cadenas del miedo.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          <button onClick={reset} className="btn-primary">
            Volver al Inicio
          </button>
          <div className="text-zinc-500 font-mono text-sm">
            Propuesta Académica • Formación Ciudadana • Ingeniería de Sistemas
          </div>
        </div>
      </motion.div>
    </div>
  );
}
