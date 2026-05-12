import React, { useState, useEffect } from 'react';
import { Play, Square, ChevronDown, CheckCircle, Search, Settings } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine, Cell } from 'recharts';

export default function App() {
  const [isAttacking, setIsAttacking] = useState(false);
  const [selectedDefense, setSelectedDefense] = useState('Feature Squeezing');
  
  // Controller State
  const [recall, setRecall] = useState(0.98);
  const [precision, setPrecision] = useState(0.95);
  const [intensity, setIntensity] = useState(10);
  const [totalAttacks, setTotalAttacks] = useState(0);
  const [droppedEvents, setDroppedEvents] = useState(0);
  const [defenseMechanism, setDefenseMechanism] = useState('Baseline');
  
  // Historical Data for Line Chart
  const [chartData, setChartData] = useState(() => 
    Array.from({ length: 40 }, (_, i) => ({
      time: i,
      recall: 0.98 * 100,
      intensity: 10
    }))
  );

  // Notable Events for Bar Chart
  const [urgencyData, setUrgencyData] = useState([
    { name: 'Critical', count: 0, fill: '#d32f2f' },
    { name: 'High', count: 2, fill: '#f57c00' },
    { name: 'Medium', count: 15, fill: '#fbc02d' },
    { name: 'Low', count: 42, fill: '#388e3c' }
  ]);

  // Event Logs
  const [logs, setLogs] = useState([
    { id: 1, time: new Date().toLocaleTimeString(), rule_name: 'System Initialized', src: '127.0.0.1', count: 1 }
  ]);

  const addLog = (rule_name, src, isCritical = false) => {
    setLogs(prev => [{
      id: Date.now() + Math.random(),
      time: new Date().toLocaleTimeString(),
      rule_name,
      src,
      count: 1,
      isCritical
    }, ...prev].slice(0, 12));
  };

  // Heartbeat & Attack Simulation Effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAttacking) {
        // Safe Mode
        const newRecall = Math.min(1.0, Math.max(0.95, recall + (Math.random() * 0.02 - 0.01)));
        setRecall(newRecall);
        setPrecision(Math.min(1.0, Math.max(0.92, precision + (Math.random() * 0.02 - 0.01))));
        setIntensity(10);
        if (defenseMechanism !== 'Baseline') setDefenseMechanism('Baseline');
        
        // Random background events
        if (Math.random() > 0.8) {
           setUrgencyData(prev => {
             const nd = prev.map(item => ({...item}));
             nd[3].count += 1; // Low
             return nd;
           });
        }

        setChartData(prev => {
          const nextTime = prev[prev.length - 1].time + 1;
          return [...prev.slice(1), { time: nextTime, recall: newRecall * 100, intensity: 10 }];
        });

      } else {
        // Attack Mode
        setTotalAttacks(prev => prev + Math.floor(Math.random() * 5) + 2);
        
        let newRecall = recall;
        let newIntensity = intensity;

        if (recall > 0.65 && intensity < 30) {
          newRecall = recall - 0.12; 
          setUrgencyData(prev => { const nd = prev.map(i => ({...i})); nd[1].count += 4; return nd; }); // High urgency
          if (Math.random() > 0.5) addLog('Unusual Volume of Outbound Traffic', '192.168.1.104', true);
        } else if (recall <= 0.65 && intensity < 80) {
          newIntensity = 85;
          setDefenseMechanism(selectedDefense);
          setUrgencyData(prev => { const nd = prev.map(i => ({...i})); nd[0].count += 2; return nd; }); // Critical urgency
          addLog(`Recall Threshold Exceeded. ${selectedDefense} Activated.`, 'System', true);
        } else if (intensity >= 80 && recall < 0.92) {
           newRecall = recall + 0.08;
           setDroppedEvents(prev => prev + 12);
           if (Math.random() > 0.7) addLog(`${selectedDefense} Dropped Malicious Probes`, '192.168.1.104');
        } else if (intensity >= 80 && recall >= 0.92) {
           newRecall = Math.min(1.0, Math.max(0.90, recall + (Math.random() * 0.04 - 0.02)));
           setDroppedEvents(prev => prev + Math.floor(Math.random() * 3));
        }

        setRecall(newRecall);
        setPrecision(newRecall * 0.95 + 0.05); 
        setIntensity(newIntensity);

        setChartData(prev => {
          const nextTime = prev[prev.length - 1].time + 1;
          return [...prev.slice(1), { time: nextTime, recall: newRecall * 100, intensity: newIntensity }];
        });
      }
    }, 1200);

    return () => clearInterval(interval);
  }, [isAttacking, recall, precision, intensity, defenseMechanism, selectedDefense]);

  const handleSimulateAttack = () => {
    setIsAttacking(!isAttacking);
    if (!isAttacking) {
      addLog('Black-Box Probing Attack Initiated', 'External Network', true);
    } else {
      addLog('Simulation Halted', 'Admin');
    }
  };

  const KeyIndicator = ({ title, value, subtext, trend, isAlert }) => (
    <div className="flex-1 border-r border-siem-border p-3 flex flex-col justify-between min-h-[90px]">
      <div className="text-[11px] font-bold text-siem-text-muted uppercase tracking-wide">{title}</div>
      <div className="flex items-end justify-between mt-2">
        <div className={`text-3xl font-light ${isAlert ? 'text-siem-red' : 'text-siem-text-light'}`}>
          {value}
        </div>
        {trend && (
          <div className={`text-sm font-bold ${trend > 0 ? (isAlert ? 'text-siem-red' : 'text-siem-green') : 'text-siem-text-muted'}`}>
            {trend > 0 ? '↗' : '↘'} {trend > 0 ? '+' : ''}{trend}
          </div>
        )}
      </div>
      <div className="text-[10px] text-siem-text-muted mt-1">{subtext}</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-siem-bg text-siem-text-main flex flex-col font-sans overflow-hidden">
      


      {/* Tier 2 App Nav */}
      <div className="bg-[#1a1a1a] h-10 flex items-center px-4 justify-between text-[13px] border-b border-siem-border">
        <div className="flex items-center space-x-6">
          <span className="text-white font-semibold cursor-pointer border-b-2 border-siem-blue h-10 flex items-center">Security Posture</span>
        </div>

      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        
        {/* Dashboard Header & Controls */}
        <div className="flex justify-between items-end mb-2">
           <h1 className="text-2xl text-white font-medium">Security Posture</h1>
           
           {/* Dense Simulation Control */}
           <div className="flex items-center space-x-2 bg-siem-panel border border-siem-border p-1 rounded-sm text-xs">
              <span className="px-2 text-siem-text-muted">Targeted Attack: Black-Box Probing</span>
              <span className="px-2 text-siem-text-muted border-l border-[#444] pl-3">Controller Defense:</span>
              <select 
                className="bg-[#111] border border-[#444] text-white px-2 py-1 outline-none"
                value={selectedDefense}
                onChange={(e) => setSelectedDefense(e.target.value)}
                disabled={isAttacking}
              >
                <option value="Feature Squeezing">Feature Squeezing</option>
                <option value="Adaptive Feature Poisoning">Adaptive Feature Poisoning</option>
                <option value="Randomized Smoothing">Randomized Smoothing</option>
              </select>
              <button 
                onClick={handleSimulateAttack}
                className={`flex items-center space-x-1 px-3 py-1 text-white border ml-2 ${
                  isAttacking ? 'bg-[#444] border-[#555] hover:bg-[#555]' : 'bg-siem-green border-[#2e7d32] hover:bg-[#43a047]'
                }`}
              >
                {isAttacking ? <Square className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                <span>{isAttacking ? 'Stop' : 'Execute'}</span>
              </button>
           </div>
        </div>

        {/* Key Indicators Row */}
        <div className="bg-siem-panel border border-siem-border flex">
          <KeyIndicator 
            title="Attack Notables" 
            value={totalAttacks} 
            subtext="Total Count" 
            trend={isAttacking ? 12 : 0} 
            isAlert={isAttacking} 
          />
          <KeyIndicator 
            title="Events Dropped" 
            value={droppedEvents} 
            subtext="By Controller Defense" 
            trend={isAttacking ? 5 : 0} 
          />
          <KeyIndicator 
            title="System Recall" 
            value={`${(recall * 100).toFixed(1)}%`} 
            subtext="Current Detection Rate" 
            trend={isAttacking ? (recall < 0.8 ? -15 : 5) : 0} 
            isAlert={recall < 0.8}
          />
          <KeyIndicator 
            title="System Precision" 
            value={`${(precision * 100).toFixed(1)}%`} 
            subtext="Accuracy" 
          />
          <KeyIndicator 
            title="Defense Mechanism" 
            value={defenseMechanism} 
            subtext={intensity > 50 ? "Active Intervention" : "Monitoring"} 
            isAlert={intensity > 50}
          />
          <div className="flex-1 p-3 flex flex-col justify-between min-h-[90px]">
             <div className="text-[11px] font-bold text-siem-text-muted uppercase tracking-wide">Intensity</div>
             <div className="flex items-center space-x-2 mt-2">
                <div className="text-3xl font-light text-siem-text-light">{intensity}</div>
                <div className="text-xs text-siem-text-muted">%</div>
             </div>
             <div className="h-1.5 w-full bg-[#111] mt-2 border border-[#333]">
                <div className="h-full bg-siem-blue transition-all duration-300" style={{ width: `${intensity}%` }}></div>
             </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-64">
           
           {/* Bar Chart Panel */}
           <div className="bg-siem-panel border border-siem-border flex flex-col">
              <div className="px-3 py-2 border-b border-siem-border text-xs font-bold text-[#eee]">Notable Events By Urgency</div>
              <div className="flex-1 p-2 pt-4">
                 <ResponsiveContainer width="100%" height="100%">
                   <BarChart data={urgencyData} layout="vertical" margin={{ top: 0, right: 30, left: 0, bottom: 0 }}>
                     <CartesianGrid strokeDasharray="1 1" stroke="#333" horizontal={true} vertical={true} />
                     <XAxis type="number" tick={{ fill: '#888', fontSize: 10 }} stroke="#333" />
                     <YAxis dataKey="name" type="category" tick={{ fill: '#ccc', fontSize: 11 }} width={60} stroke="#333" />
                     <Tooltip 
                       cursor={{ fill: '#333' }}
                       contentStyle={{ backgroundColor: '#111', border: '1px solid #444', borderRadius: 0, color: '#fff', fontSize: '11px' }} 
                     />
                     <Bar dataKey="count" isAnimationActive={false}>
                       {urgencyData.map((entry, index) => (
                         <Cell key={`cell-${index}`} fill={entry.fill} />
                       ))}
                     </Bar>
                   </BarChart>
                 </ResponsiveContainer>
              </div>
           </div>

           {/* Line Chart Panel (The Novelty) */}
           <div className="bg-siem-panel border border-siem-border flex flex-col">
              <div className="px-3 py-2 border-b border-siem-border text-xs font-bold text-[#eee] flex justify-between">
                <span>Controller Events Over Time</span>
                <span className="text-[#888] font-normal">Real-time</span>
              </div>
              <div className="flex-1 p-2 pt-4 pb-2">
                 <ResponsiveContainer width="100%" height="100%">
                   <LineChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                     <CartesianGrid strokeDasharray="1 1" stroke="#333" vertical={true} />
                     <XAxis dataKey="time" hide />
                     <YAxis yAxisId="left" domain={[0, 100]} tick={{ fill: '#888', fontSize: 10 }} stroke="#333" />
                     <YAxis yAxisId="right" orientation="right" domain={[0, 100]} tick={{ fill: '#888', fontSize: 10 }} stroke="#333" />
                     <Tooltip 
                        contentStyle={{ backgroundColor: '#111', border: '1px solid #444', borderRadius: 0, color: '#fff', fontSize: '11px' }}
                        labelStyle={{ display: 'none' }}
                        isAnimationActive={false}
                     />
                     <Legend wrapperStyle={{ fontSize: '11px', color: '#ccc', paddingBottom: '0px' }} iconType="plainline" />
                     <Line 
                       yAxisId="left" type="linear" dataKey="recall" name="Recall (%)"
                       stroke="#1976d2" strokeWidth={1.5} dot={false} isAnimationActive={false}
                     />
                     <Line 
                       yAxisId="right" type="stepAfter" dataKey="intensity" name="Intensity (%)"
                       stroke="#f57c00" strokeWidth={1.5} dot={false} isAnimationActive={false}
                     />
                   </LineChart>
                 </ResponsiveContainer>
              </div>
           </div>
        </div>

        {/* Tables Row */}
        <div className="grid grid-cols-1 gap-4">
           <div className="bg-siem-panel border border-siem-border flex flex-col h-64 overflow-hidden">
              <div className="px-3 py-2 border-b border-siem-border text-xs font-bold text-[#eee]">Top Notable Events / Logs</div>
              <div className="flex-1 overflow-auto">
                 <table className="w-full text-left text-xs">
                    <thead className="bg-[#1a1a1a] text-siem-text-muted sticky top-0 border-b border-siem-border">
                       <tr>
                          <th className="py-2 px-3 font-normal cursor-pointer hover:text-white">time ↕</th>
                          <th className="py-2 px-3 font-normal cursor-pointer hover:text-white">rule_name ↕</th>
                          <th className="py-2 px-3 font-normal cursor-pointer hover:text-white">src ↕</th>
                          <th className="py-2 px-3 font-normal text-right cursor-pointer hover:text-white">count ↕</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-siem-border">
                       {logs.map((log) => (
                          <tr key={log.id} className="hover:bg-[#2a2a2a]">
                             <td className="py-1.5 px-3 text-[#999] whitespace-nowrap">{log.time}</td>
                             <td className={`py-1.5 px-3 font-medium ${log.isCritical ? 'text-siem-red' : 'text-siem-blue'}`}>
                                {log.rule_name}
                             </td>
                             <td className="py-1.5 px-3 text-[#ccc] font-mono">{log.src}</td>
                             <td className="py-1.5 px-3 text-right text-siem-text-light">{log.count}</td>
                          </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}
