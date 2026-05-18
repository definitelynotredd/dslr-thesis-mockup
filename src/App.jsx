import React, { useState, useEffect } from 'react';
import { Play, Square, ChevronDown, CheckCircle, Search, Settings } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine, Cell } from 'recharts';

const ResearchEvaluation = () => {
  const barData = [
    { name: 'AFP', base: 0.82, controlled: 0.93 },
    { name: 'RS', base: 0.80, controlled: 0.91 },
    { name: 'FS', base: 0.84, controlled: 0.92 }
  ];

  const lineData = [
    { batch: 'B1', recall: 0.81 },
    { batch: 'B2', recall: 0.79 },
    { batch: 'B3', recall: 0.76 },
    { batch: 'B4', recall: 0.88 },
    { batch: 'B5', recall: 0.92 },
    { batch: 'B6', recall: 0.93 },
    { batch: 'B7', recall: 0.92 },
  ];

  return (
    <div className="space-y-4 animate-fadeIn">
      {/* 1. Page Header */}
      <div className="flex justify-between items-end mb-2">
        <div>
          <h1 className="text-2xl text-white font-medium">Research Evaluation</h1>
          <p className="text-sm text-siem-text-muted mt-1">This page shows how the prototype answers the Statement of the Problem using simulated experiment results.</p>
        </div>
        <div className="bg-[#1976d2] bg-opacity-20 text-[#64b5f6] border border-[#1976d2] px-3 py-1 rounded text-xs font-semibold">
          Prototype Mode: Simulated Data
        </div>
      </div>

      {/* 2. Statement of the Problem Summary Card */}
      <div className="bg-siem-panel border border-siem-border p-4">
        <h2 className="text-sm font-bold text-white mb-2">Statement of the Problem Summary</h2>
        <p className="text-sm text-siem-text-muted leading-relaxed">
          Perturbation-based intrusion detection defenses can reduce the reliability of attacker feedback during black-box probing, but excessive perturbation may also reduce the system’s ability to detect attack samples. This study aims to produce and evaluate a recall-aware controller that adjusts the perturbation intensity of Adaptive Feature Poisoning, Randomized Smoothing, and Feature Squeezing based on recent attack-detection performance. The study measures the performance of these defenses before and after applying the controller using Precision, Attack Recall, and F1-Score.
        </p>
      </div>

      {/* 3. Research Question Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-siem-panel border border-siem-border p-4 flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-sm font-bold text-siem-blue">RQ1</h3>
            <span className="text-[10px] bg-[#333] text-[#ccc] px-2 py-0.5 rounded">Descriptive Result</span>
          </div>
          <p className="text-xs text-white mb-3 flex-1">What is the performance of the base defense mechanisms under black-box probing attacks in terms of Precision, Attack Recall, and F1-Score?</p>
          <div className="text-[11px] text-siem-text-muted border-t border-siem-border pt-2">
            <span className="font-semibold text-[#aaa]">How the app answers it:</span> The app displays the simulated metric results of Adaptive Feature Poisoning, Randomized Smoothing, and Feature Squeezing using fixed perturbation intensity.
          </div>
        </div>
        <div className="bg-siem-panel border border-siem-border p-4 flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-sm font-bold text-siem-blue">RQ2</h3>
            <span className="text-[10px] bg-[#333] text-[#ccc] px-2 py-0.5 rounded">Descriptive Result</span>
          </div>
          <p className="text-xs text-white mb-3 flex-1">What is the performance of the controller-augmented defense mechanisms under black-box probing attacks in terms of Precision, Attack Recall, and F1-Score?</p>
          <div className="text-[11px] text-siem-text-muted border-t border-siem-border pt-2">
            <span className="font-semibold text-[#aaa]">How the app answers it:</span> The app displays the simulated metric results of the same three defense mechanisms after the recall-aware controller is activated.
          </div>
        </div>
        <div className="bg-siem-panel border border-siem-border p-4 flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-sm font-bold text-siem-blue">RQ3</h3>
            <span className="text-[10px] bg-[#1b5e20] text-[#81c784] border border-[#2e7d32] px-2 py-0.5 rounded">Paired t-Test</span>
          </div>
          <p className="text-xs text-white mb-3 flex-1">Is there a significant difference in the performance of each perturbation-based defense mechanism before and after applying the recall-aware controller in terms of Precision, Attack Recall, and F1-Score?</p>
          <div className="text-[11px] text-siem-text-muted border-t border-siem-border pt-2">
            <span className="font-semibold text-[#aaa]">How the app answers it:</span> The app compares each base defense with its controller-augmented version using simulated paired t-test results.
          </div>
        </div>
      </div>

      {/* 4. Main Results Table */}
      <div className="bg-siem-panel border border-siem-border overflow-hidden">
        <div className="px-4 py-3 border-b border-siem-border text-sm font-bold text-white">Main Results Table (Simulated)</div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#1a1a1a] text-siem-text-muted border-b border-siem-border">
              <tr>
                <th className="py-2 px-4 font-normal">Defense Configuration</th>
                <th className="py-2 px-4 font-normal">Attack Scenario</th>
                <th className="py-2 px-4 font-normal">Controller Status</th>
                <th className="py-2 px-4 font-normal">Controlled Parameter</th>
                <th className="py-2 px-4 font-normal text-right">Precision</th>
                <th className="py-2 px-4 font-normal text-right">Attack Recall</th>
                <th className="py-2 px-4 font-normal text-right">F1-Score</th>
                <th className="py-2 px-4 font-normal">Paired t-Test Result</th>
                <th className="py-2 px-4 font-normal">SOP Link</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-siem-border text-[#ccc]">
              <tr className="hover:bg-[#2a2a2a]">
                <td className="py-2 px-4">Adaptive Feature Poisoning</td>
                <td className="py-2 px-4">Silent Probing</td>
                <td className="py-2 px-4 text-siem-text-muted">Not Active</td>
                <td className="py-2 px-4 font-mono text-[10px]">Fixed εbase</td>
                <td className="py-2 px-4 text-right">0.91</td>
                <td className="py-2 px-4 text-right">0.82</td>
                <td className="py-2 px-4 text-right">0.86</td>
                <td className="py-2 px-4 text-siem-text-muted">N/A</td>
                <td className="py-2 px-4"><span className="bg-[#333] text-xs px-1.5 py-0.5 rounded">RQ1</span></td>
              </tr>
              <tr className="hover:bg-[#2a2a2a]">
                <td className="py-2 px-4 text-white font-medium">Adaptive Feature Poisoning + Recall-Aware Controller</td>
                <td className="py-2 px-4">Silent Probing</td>
                <td className="py-2 px-4 text-siem-green">Active</td>
                <td className="py-2 px-4 font-mono text-[10px]">Dynamic εbase</td>
                <td className="py-2 px-4 text-right">0.89</td>
                <td className="py-2 px-4 text-right text-siem-blue font-bold">0.93</td>
                <td className="py-2 px-4 text-right">0.91</td>
                <td className="py-2 px-4 text-siem-green">p = 0.031, Reject H₀</td>
                <td className="py-2 px-4 space-x-1 whitespace-nowrap">
                  <span className="bg-[#333] text-xs px-1.5 py-0.5 rounded inline-block">RQ2</span>
                  <span className="bg-[#333] text-xs px-1.5 py-0.5 rounded inline-block">RQ3</span>
                </td>
              </tr>
              <tr className="hover:bg-[#2a2a2a]">
                <td className="py-2 px-4">Randomized Smoothing</td>
                <td className="py-2 px-4">Surrogate Transferability</td>
                <td className="py-2 px-4 text-siem-text-muted">Not Active</td>
                <td className="py-2 px-4 font-mono text-[10px]">Fixed σ</td>
                <td className="py-2 px-4 text-right">0.88</td>
                <td className="py-2 px-4 text-right">0.80</td>
                <td className="py-2 px-4 text-right">0.84</td>
                <td className="py-2 px-4 text-siem-text-muted">N/A</td>
                <td className="py-2 px-4"><span className="bg-[#333] text-xs px-1.5 py-0.5 rounded">RQ1</span></td>
              </tr>
              <tr className="hover:bg-[#2a2a2a]">
                <td className="py-2 px-4 text-white font-medium">Randomized Smoothing + Recall-Aware Controller</td>
                <td className="py-2 px-4">Surrogate Transferability</td>
                <td className="py-2 px-4 text-siem-green">Active</td>
                <td className="py-2 px-4 font-mono text-[10px]">Dynamic σ</td>
                <td className="py-2 px-4 text-right">0.86</td>
                <td className="py-2 px-4 text-right text-siem-blue font-bold">0.91</td>
                <td className="py-2 px-4 text-right">0.88</td>
                <td className="py-2 px-4 text-siem-green">p = 0.044, Reject H₀</td>
                <td className="py-2 px-4 space-x-1 whitespace-nowrap">
                  <span className="bg-[#333] text-xs px-1.5 py-0.5 rounded inline-block">RQ2</span>
                  <span className="bg-[#333] text-xs px-1.5 py-0.5 rounded inline-block">RQ3</span>
                </td>
              </tr>
              <tr className="hover:bg-[#2a2a2a]">
                <td className="py-2 px-4">Feature Squeezing</td>
                <td className="py-2 px-4">Decision-Boundary Attack</td>
                <td className="py-2 px-4 text-siem-text-muted">Not Active</td>
                <td className="py-2 px-4 font-mono text-[10px]">Fixed squeezing_intensity</td>
                <td className="py-2 px-4 text-right">0.90</td>
                <td className="py-2 px-4 text-right">0.84</td>
                <td className="py-2 px-4 text-right">0.87</td>
                <td className="py-2 px-4 text-siem-text-muted">N/A</td>
                <td className="py-2 px-4"><span className="bg-[#333] text-xs px-1.5 py-0.5 rounded">RQ1</span></td>
              </tr>
              <tr className="hover:bg-[#2a2a2a]">
                <td className="py-2 px-4 text-white font-medium">Feature Squeezing + Recall-Aware Controller</td>
                <td className="py-2 px-4">Decision-Boundary Attack</td>
                <td className="py-2 px-4 text-siem-green">Active</td>
                <td className="py-2 px-4 font-mono text-[10px]">Dynamic squeezing_intensity</td>
                <td className="py-2 px-4 text-right">0.88</td>
                <td className="py-2 px-4 text-right text-siem-blue font-bold">0.92</td>
                <td className="py-2 px-4 text-right">0.90</td>
                <td className="py-2 px-4 text-[#888]">p = 0.052, Do not reject H₀</td>
                <td className="py-2 px-4 space-x-1 whitespace-nowrap">
                  <span className="bg-[#333] text-xs px-1.5 py-0.5 rounded inline-block">RQ2</span>
                  <span className="bg-[#333] text-xs px-1.5 py-0.5 rounded inline-block">RQ3</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. RQ Answer Summary Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#111] border border-[#333] p-4 rounded-sm">
          <h4 className="text-xs font-bold text-white mb-1">RQ1 Answer</h4>
          <p className="text-[11px] text-[#aaa]">The base defense mechanisms produced simulated Precision, Attack Recall, and F1-Score values under black-box probing scenarios. These values represent the performance of the defenses before applying the recall-aware controller.</p>
        </div>
        <div className="bg-[#111] border border-[#333] p-4 rounded-sm">
          <h4 className="text-xs font-bold text-white mb-1">RQ2 Answer</h4>
          <p className="text-[11px] text-[#aaa]">The controller-augmented defense mechanisms produced simulated metric values after dynamic perturbation intensity adjustment. The results show how the defenses perform when recent Attack Recall is used as feedback.</p>
        </div>
        <div className="bg-[#111] border border-[#333] p-4 rounded-sm">
          <h4 className="text-xs font-bold text-white mb-1">RQ3 Answer</h4>
          <p className="text-[11px] text-[#aaa]">The paired t-test results compare each base defense with its controller-augmented version. A p-value less than or equal to 0.05 indicates a statistically significant difference. A p-value greater than 0.05 indicates insufficient evidence to conclude a significant difference.</p>
        </div>
      </div>

      {/* 6. Visuals */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-64">
        {/* Bar Chart */}
        <div className="bg-siem-panel border border-siem-border flex flex-col">
          <div className="px-3 py-2 border-b border-siem-border text-xs font-bold text-[#eee]">Attack Recall Comparison</div>
          <div className="flex-1 p-2 pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="1 1" stroke="#333" vertical={false} />
                <XAxis dataKey="name" tick={{ fill: '#888', fontSize: 11 }} stroke="#333" />
                <YAxis domain={[0, 1]} tick={{ fill: '#888', fontSize: 11 }} stroke="#333" />
                <Tooltip
                  cursor={{ fill: '#222' }}
                  contentStyle={{ backgroundColor: '#111', border: '1px solid #444', borderRadius: 0, color: '#fff', fontSize: '11px' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', color: '#ccc' }} />
                <Bar dataKey="base" name="Base Defense" fill="#555" />
                <Bar dataKey="controlled" name="Controller-Augmented" fill="#1976d2" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Line Chart */}
        <div className="bg-siem-panel border border-siem-border flex flex-col">
          <div className="px-3 py-2 border-b border-siem-border text-xs font-bold text-[#eee]">Simulated Rolling Attack Recall (Recent Batches)</div>
          <div className="flex-1 p-2 pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="1 1" stroke="#333" vertical={false} />
                <XAxis dataKey="batch" tick={{ fill: '#888', fontSize: 11 }} stroke="#333" />
                <YAxis domain={[0.7, 1]} tick={{ fill: '#888', fontSize: 11 }} stroke="#333" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#111', border: '1px solid #444', borderRadius: 0, color: '#fff', fontSize: '11px' }}
                />
                <ReferenceLine x="B4" stroke="#f57c00" strokeDasharray="3 3" label={{ position: 'top', value: 'Controller Activated', fill: '#f57c00', fontSize: 10 }} />
                <Line type="monotone" dataKey="recall" name="Recall" stroke="#1976d2" strokeWidth={2} dot={{ r: 3, fill: '#1976d2' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 8. Important Label */}
      <div className="mt-8 mb-4 border-t border-siem-border pt-4 text-center">
        <p className="text-[11px] text-[#888] italic">
          "These values are simulated for prototype demonstration only. The final thesis results will be generated from controlled offline experiments using batch-level evaluation records."
        </p>
      </div>
    </div>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState('Monitoring');
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
            const nd = prev.map(item => ({ ...item }));
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
          setUrgencyData(prev => { const nd = prev.map(i => ({ ...i })); nd[1].count += 4; return nd; }); // High urgency
          if (Math.random() > 0.5) addLog('Unusual Volume of Outbound Traffic', '192.168.1.104', true);
        } else if (recall <= 0.65 && intensity < 80) {
          newIntensity = 85;
          setDefenseMechanism(selectedDefense);
          setUrgencyData(prev => { const nd = prev.map(i => ({ ...i })); nd[0].count += 2; return nd; }); // Critical urgency
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
          <span
            className={`font-semibold cursor-pointer h-10 flex items-center ${activeTab === 'Monitoring' ? 'text-white border-b-2 border-siem-blue' : 'text-siem-text-muted hover:text-white'}`}
            onClick={() => setActiveTab('Monitoring')}
          >
            Security Posture
          </span>
          <span
            className={`font-semibold cursor-pointer h-10 flex items-center ${activeTab === 'Research Evaluation' ? 'text-white border-b-2 border-siem-blue' : 'text-siem-text-muted hover:text-white'}`}
            onClick={() => setActiveTab('Research Evaluation')}
          >
            Research Evaluation
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {activeTab === 'Monitoring' ? (
          <>
            {/* Dashboard Header & Controls */}
            <div className="flex justify-between items-end mb-2">
              <div className="flex items-center space-x-4">
                <h1 className="text-2xl text-white font-medium">Security Posture</h1>
                <div className={`px-3 py-1 rounded text-xs font-bold uppercase tracking-wider border flex items-center space-x-2 ${isAttacking
                    ? 'bg-[#4a0f0f] text-[#ff7979] border-[#d32f2f]'
                    : 'bg-[#0f3a15] text-[#81c784] border-[#2e7d32]'
                  }`}>
                  <div className={`w-2 h-2 rounded-full ${isAttacking ? 'bg-[#ff7979] animate-pulse' : 'bg-[#81c784]'}`}></div>
                  <span>{isAttacking ? 'Under Attack' : 'Traffic: Benign'}</span>
                </div>
              </div>

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
                  className={`flex items-center space-x-1 px-3 py-1 text-white border ml-2 ${isAttacking ? 'bg-[#444] border-[#555] hover:bg-[#555]' : 'bg-siem-green border-[#2e7d32] hover:bg-[#43a047]'
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
          </>
        ) : (
          <ResearchEvaluation />
        )}
      </div>
    </div>
  );
}
