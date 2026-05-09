import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, 
  Map as MapIcon, 
  Bell, 
  MessageSquare, 
  Menu, 
  Home, 
  Settings, 
  AlertTriangle, 
  BookOpen, 
  BarChart2, 
  User,
  Users,
  Search,
  WifiOff,
  Video,
  Mic,
  Send,
  MoreVertical,
  ChevronRight
} from 'lucide-react';
import { cn } from '../lib/utils';

type AppTab = 'home' | 'map' | 'panic' | 'chat' | 'edu' | 'stats';

export function AppMockup() {
  const [activeTab, setActiveTab] = useState<AppTab>('home');
  const [isEmergencyActive, setIsEmergencyActive] = useState(false);

  return (
    <div className="relative w-[320px] h-[640px] bg-bg-deep rounded-[3rem] border-[8px] border-white/10 shadow-2xl overflow-hidden ring-4 ring-zinc-900 mx-auto">
      {/* Status Bar */}
      <div className="h-10 bg-black/40 flex items-center justify-between px-6 pt-2">
        <span className="text-[10px] font-mono text-zinc-400">9:41</span>
        <div className="flex gap-1.5 items-center">
          <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
          <div className="w-5 h-2.5 border border-zinc-700 rounded-sm" />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="h-[calc(100%-80px)] overflow-y-auto overflow-x-hidden bg-[#0a0a0a]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            className="p-5 pt-2 min-h-full"
          >
            {activeTab === 'home' && <HomeScreen onPanic={() => setActiveTab('panic')} />}
            {activeTab === 'map' && <MapScreen />}
            {activeTab === 'panic' && <PanicScreen active={isEmergencyActive} onActivate={() => setIsEmergencyActive(true)} />}
            {activeTab === 'chat' && <ChatScreen />}
            {activeTab === 'edu' && <EduScreen />}
            {activeTab === 'stats' && <StatsScreen />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Nav */}
      <div className="absolute bottom-0 left-0 w-full h-16 bg-bg-card border-t border-white/5 flex items-center justify-around px-2">
        <NavButton active={activeTab === 'home'} icon={<Home />} onClick={() => setActiveTab('home')} label="Inicio" />
        <NavButton active={activeTab === 'map'} icon={<MapIcon />} onClick={() => setActiveTab('map')} label="Mapa" />
        <NavButton active={activeTab === 'panic'} icon={<Shield />} onClick={() => setActiveTab('panic')} label="SOS" variant="danger" />
        <NavButton active={activeTab === 'chat'} icon={<MessageSquare />} onClick={() => setActiveTab('chat')} label="Chat" />
        <NavButton active={activeTab === 'edu'} icon={<BookOpen />} onClick={() => setActiveTab('edu')} label="Guía" />
      </div>
    </div>
  );
}

function NavButton({ active, icon, onClick, label, variant = 'default' }: { active: boolean, icon: React.ReactNode, onClick: () => void, label: string, variant?: 'default' | 'danger' }) {
  return (
    <button onClick={onClick} className="flex flex-col items-center gap-1 group">
      <div className={cn(
        "p-2 rounded-xl transition-all",
        active && variant === 'default' && "bg-brand-primary/20 text-brand-primary",
        active && variant === 'danger' && "bg-brand-danger/20 text-brand-danger",
        !active && "text-zinc-500 group-hover:text-zinc-300"
      )}>
        {React.cloneElement(icon as React.ReactElement, { size: active ? 22 : 20 })}
      </div>
      <span className={cn("text-[9px] font-medium", active ? "text-brand-primary" : "text-zinc-600")}>{label}</span>
    </button>
  );
}

function HomeScreen({ onPanic }: { onPanic: () => void }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h2 className="text-xl font-bold">Hola, Líder</h2>
          <p className="text-xs text-zinc-500">Tu integridad es nuestra prioridad</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center border border-zinc-700">
          <User className="w-5 h-5" />
        </div>
      </div>

      <div className="p-4 bg-brand-primary/10 border border-brand-primary/30 rounded-2xl">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-mono text-brand-primary border border-brand-primary/50 px-2 py-0.5 rounded uppercase">Estado Seguro</span>
          <WifiOff className="w-3 h-3 text-zinc-500" />
        </div>
        <p className="text-xs text-zinc-300 leading-snug font-medium">Ubicación actual: <span className="text-white">Santander de Quilichao, Cauca</span></p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 bg-zinc-800/50 rounded-xl border border-zinc-700/50">
          <Bell className="w-4 h-4 text-brand-warning mb-2" />
          <h4 className="text-[10px] font-bold text-zinc-400 uppercase">Alertas Cercanas</h4>
          <p className="text-sm font-bold">3 Activas</p>
        </div>
        <div className="p-3 bg-zinc-800/50 rounded-xl border border-zinc-700/50">
          <Shield className="w-4 h-4 text-brand-primary mb-2" />
          <h4 className="text-[10px] font-bold text-zinc-400 uppercase">Red de Apoyo</h4>
          <p className="text-sm font-bold">8 En línea</p>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider px-1">Acciones Rápidas</h3>
        <button onClick={onPanic} className="w-full p-4 bg-zinc-800 rounded-xl flex items-center gap-3 border border-zinc-700 hover:bg-zinc-700 transition-colors">
          <div className="p-2 bg-brand-danger/20 rounded-lg text-brand-danger"><AlertTriangle size={18} /></div>
          <div className="text-left">
            <h4 className="text-sm font-bold">Reportar Incidente</h4>
            <p className="text-[10px] text-zinc-400">Envío de evidencia multimedia</p>
          </div>
        </button>
        <button className="w-full p-4 bg-zinc-800 rounded-xl flex items-center gap-3 border border-zinc-700 hover:bg-zinc-700 transition-colors">
          <div className="p-2 bg-brand-primary/20 rounded-lg text-brand-primary"><Video size={18} /></div>
          <div className="text-left">
            <h4 className="text-sm font-bold">Transmisión Segura</h4>
            <p className="text-[10px] text-zinc-400">Stream directo a la Defensoría</p>
          </div>
        </button>
      </div>
    </div>
  );
}

function MapScreen() {
  return (
    <div className="h-full flex flex-col gap-4">
      <div className="relative flex-grow bg-zinc-800 rounded-2xl overflow-hidden border border-zinc-700 min-h-[350px]">
        {/* Mock Map Background */}
        <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/-76.48,3.01,11,0/320x400?access_token=pk.eyJ1IjoiYm90LWNyZWF0b3IiLCJhIjoiY2t4bTh4eW1hMDFsZDJubzR0Z2NrbG1zciJ9.xxx')] bg-cover bg-center" />
        
        {/* Heatmap Overlay */}
        <div className="absolute inset-0 bg-brand-danger/20 mix-blend-overlay" />

        {/* Floating Controls */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <button className="p-2 bg-zinc-900 rounded-lg border border-zinc-700 shadow-xl"><Search size={16} /></button>
          <button className="p-2 bg-zinc-900 rounded-lg border border-zinc-700 shadow-xl"><Settings size={16} /></button>
        </div>

        {/* Map Markers */}
        <div className="absolute top-[40%] left-[30%] animate-pulse">
           <div className="w-4 h-4 bg-brand-danger rounded-full ring-4 ring-brand-danger/30" />
        </div>
        <div className="absolute bottom-[20%] right-[40%]">
           <div className="w-4 h-4 bg-brand-warning rounded-full ring-4 ring-brand-warning/30" />
        </div>
      </div>

      <div className="p-3 bg-zinc-800 rounded-xl flex items-center gap-4">
        <div className="p-2 bg-brand-danger/20 rounded-full text-brand-danger"><AlertTriangle size={16} /></div>
        <div>
          <h4 className="text-xs font-bold text-white">Alerta de Riesgo en Zona</h4>
          <p className="text-[10px] text-zinc-400">Presencia de grupos armados reportada hace 15m.</p>
        </div>
      </div>
    </div>
  );
}

function PanicScreen({ active, onActivate }: { active: boolean, onActivate: () => void }) {
  return (
    <div className="h-full flex flex-col items-center justify-center space-y-8 py-10">
      {!active ? (
        <>
          <div className="text-center animate-bounce mb-4">
            <h2 className="text-2xl font-black text-brand-danger tracking-tighter">BÖTON DE PÁNICO</h2>
            <p className="text-zinc-500 text-xs">Mantén presionado por 3 segundos</p>
          </div>
          
          <motion.button 
            onLongPress={onActivate}
            onPointerDown={onActivate} // For demo simulation
            className="w-48 h-48 rounded-full bg-brand-danger flex items-center justify-center border-[12px] border-zinc-800 shadow-[0_0_50px_rgba(239,68,68,0.4)] relative group"
            whileTap={{ scale: 0.9 }}
          >
            <Shield size={64} className="text-white" />
            <div className="absolute inset-0 rounded-full border-4 border-brand-danger animate-ping opacity-20" />
          </motion.button>

          <p className="text-zinc-400 text-[10px] text-center max-w-[200px]">
            Al activar, se enviará tu ubicación, audio ambiental y video a la central de emergencia.
          </p>
        </>
      ) : (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-6"
        >
          <div className="w-20 h-20 bg-brand-danger rounded-full flex items-center justify-center mx-auto animate-pulse">
            <Bell size={40} className="text-white" />
          </div>
          <h2 className="text-3xl font-black text-brand-danger">ALERTA ENVIADA</h2>
          <div className="space-y-2">
            <div className="flex items-center gap-2 justify-center text-sm text-brand-primary">
              <div className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" />
              Sincronizando con Defensoría...
            </div>
            <div className="flex items-center gap-2 justify-center text-sm text-brand-primary">
              <div className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" />
              Transmitiendo audio en vivo...
            </div>
          </div>
          <div className="p-4 bg-zinc-800 rounded-2xl border border-brand-danger/30">
            <p className="text-xs font-mono text-zinc-400 uppercase mb-2">Protocolo de Evidencia</p>
            <div className="flex justify-center gap-2">
              <div className="w-2 h-8 bg-brand-danger rounded-full animate-bounce delay-75" />
              <div className="w-2 h-8 bg-brand-danger rounded-full animate-bounce delay-150" />
              <div className="w-2 h-8 bg-brand-danger rounded-full animate-bounce delay-300" />
              <div className="w-2 h-8 bg-brand-danger rounded-full animate-bounce delay-75" />
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

function ChatScreen() {
  const messages = [
    { sender: 'AI Shield', text: 'Analizando condiciones en el Cauca... Nivel de riesgo medio.', time: '14:20' },
    { sender: 'Organización ONU', text: 'Recibimos tu actualización. Mantente en zona segura.', time: '14:21' },
    { sender: 'Tú', text: 'Entendido. Estoy en la vereda El Retiro.', time: '14:25', isOwn: true },
    { sender: 'AI Shield', text: 'Se ha detectado movimiento inusual 2km al norte.', time: '14:26' },
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4 border-b border-zinc-800 pb-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-brand-primary/20 rounded-full flex items-center justify-center text-brand-primary">
            <Shield size={16} />
          </div>
          <div>
            <h4 className="text-xs font-bold">Red de Apoyo</h4>
            <p className="text-[8px] text-brand-primary uppercase">Conexión Cifrada</p>
          </div>
        </div>
        <MoreVertical size={16} className="text-zinc-500" />
      </div>

      <div className="flex-grow space-y-4 mb-4 overflow-y-auto pr-1">
        {messages.map((m, i) => (
          <div key={i} className={cn("flex flex-col", m.isOwn ? "items-end" : "items-start")}>
            <div className={cn(
              "max-w-[80%] p-3 rounded-2xl text-[10px] leading-relaxed",
              m.isOwn ? "bg-brand-primary text-white" : "bg-zinc-800 text-zinc-300"
            )}>
              {!m.isOwn && <span className="block font-bold text-[8px] text-zinc-500 mb-1 uppercase tracking-tight">{m.sender}</span>}
              {m.text}
            </div>
            <span className="text-[8px] text-zinc-600 mt-1">{m.time}</span>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <div className="flex-grow bg-zinc-800 rounded-xl px-4 py-3 border border-zinc-700 flex items-center">
          <input type="text" placeholder="Escribe un mensaje..." className="bg-transparent text-[10px] w-full outline-none" />
          <Mic size={14} className="text-zinc-500" />
        </div>
        <button className="p-3 bg-brand-primary rounded-xl flex items-center justify-center text-white">
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}

function EduScreen() {
  const sections = [
    { title: 'Tus Derechos', icon: <ScaleIcon />, items: ['Derecho a la vida', 'Libertad de asociación', 'Participación política'] },
    { title: 'Autoprotección', icon: <Shield />, items: ['Estrategias de repliegue', 'Comunicación segura', 'Manejo de amenazas'] },
    { title: 'Entidades', icon: <Users />, items: ['Defensoría del Pueblo', 'Fiscalía General', 'Misión de la ONU'] }
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-black mb-4">Módulo Educativo</h2>
      <div className="p-4 bg-zinc-800 border-l-4 border-brand-primary rounded-r-xl mb-6">
        <p className="text-[10px] text-zinc-400 uppercase font-bold mb-1">Cápsula del día</p>
        <p className="text-xs font-medium">Cómo reconocer el seguimiento en zonas rurales y urbanas.</p>
      </div>
      
      <div className="space-y-3">
        {sections.map((s, i) => (
          <details key={i} className="group overflow-hidden bg-zinc-900 border border-zinc-800 rounded-xl">
             <summary className="list-none p-4 cursor-pointer flex items-center justify-between hover:bg-zinc-800 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="text-brand-primary">{s.icon}</div>
                  <span className="text-sm font-bold">{s.title}</span>
                </div>
                <ChevronRight size={14} className="group-open:rotate-90 transition-transform" />
             </summary>
             <div className="p-4 pt-0 space-y-2">
               {s.items.map((item, j) => (
                 <div key={j} className="flex items-center gap-2 text-xs text-zinc-400">
                    <div className="w-1 h-1 bg-zinc-600 rounded-full" />
                    {item}
                 </div>
               ))}
             </div>
          </details>
        ))}
      </div>
    </div>
  );
}

function StatsScreen() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold mb-2">Panel Territorial</h2>
      <div className="grid grid-cols-2 gap-3">
         <div className="p-3 bg-brand-danger/10 border border-brand-danger/20 rounded-xl">
            <h4 className="text-[8px] font-bold text-zinc-500 uppercase mb-1">Amenazas Hoy</h4>
            <p className="text-lg font-black text-brand-danger">12</p>
         </div>
         <div className="p-3 bg-brand-primary/10 border border-brand-primary/20 rounded-xl">
            <h4 className="text-[8px] font-bold text-zinc-500 uppercase mb-1">Zonas Seguras</h4>
            <p className="text-lg font-black text-brand-primary">45</p>
         </div>
      </div>

      <div className="p-4 bg-zinc-800 rounded-2xl border border-zinc-700">
        <h4 className="text-[10px] font-bold uppercase text-zinc-500 mb-4">Estado del Riesgo Semanal</h4>
        <div className="h-32 w-full flex items-end justify-around gap-2 px-2">
           {[40, 70, 45, 90, 65, 30, 50].map((h, i) => (
             <div key={i} className="flex-grow flex flex-col items-center gap-2">
                <div 
                  className={cn("w-full rounded-t-sm transition-all duration-1000 bg-brand-primary/40")} 
                  style={{ height: `${h}%` }}
                />
                <span className="text-[6px] text-zinc-600">D{i+1}</span>
             </div>
           ))}
        </div>
      </div>

      <div className="p-4 bg-zinc-900 rounded-2xl border border-zinc-800">
         <h4 className="text-[10px] font-bold uppercase text-zinc-500 mb-2">IA Insights</h4>
         <p className="text-[10px] text-zinc-300 italic">"Se observa un decremento del 5% en hostilidades en el sector norte respecto a la semana pasada."</p>
      </div>
    </div>
  );
}

function ScaleIcon(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
      <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
      <path d="M7 21h10" />
      <path d="M12 3v18" />
      <path d="M3 7h18" />
    </svg>
  );
}
