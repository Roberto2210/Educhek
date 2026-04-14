/**
 * Check-in Escolar — Landing Page
 *
 * Dependencias: npm install lucide-react
 * Instrucciones:
 *   1. npm create vite@latest checkin-landing -- --template react
 *   2. cd checkin-landing && npm install lucide-react
 *   3. Reemplaza src/App.jsx con este archivo
 *   4. Vacía src/App.css (o elimínalo y quita el import en main.jsx)
 *   5. npm run dev
 */

import { useState, useEffect, useRef, useCallback } from 'react'
import {
  Camera, Shield, MessageCircle, BarChart2, FileSpreadsheet,
  Bell, Lock, Menu, X, Check, ChevronDown, Mail,
  Zap, Target, Smartphone, Monitor, AlertTriangle, Clock,
  CheckCircle, Star, Users, ArrowRight, Phone,
} from 'lucide-react'

// ─── CSS Global ───────────────────────────────────────────────────────────────

const css = `
@import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

:root {
  --bg:       #0A0F1C;
  --bg2:      #0D1423;
  --bg3:      #111827;
  --card:     rgba(255,255,255,0.04);
  --blue:     #00D4FF;
  --green:    #00E676;
  --red:      #FF4757;
  --text:     #F0F4FF;
  --muted:    #8B9CC8;
  --border:   rgba(255,255,255,0.08);
  --b-blue:   rgba(0,212,255,0.20);
  --b-green:  rgba(0,230,118,0.20);
  --glow-b:   0 0 28px rgba(0,212,255,0.22);
  --glow-g:   0 0 28px rgba(0,230,118,0.22);
  --r:        16px;
}

*,*::before,*::after { margin:0; padding:0; box-sizing:border-box; }
html { scroll-behavior:smooth; }
body {
  background:var(--bg);
  color:var(--text);
  font-family:'DM Sans',sans-serif;
  font-size:16px;
  line-height:1.6;
  overflow-x:hidden;
}
h1,h2,h3,h4 { font-family:'Sora',sans-serif; line-height:1.15; }
a { color:inherit; text-decoration:none; }
button { cursor:pointer; font-family:'DM Sans',sans-serif; }
::-webkit-scrollbar { width:5px; }
::-webkit-scrollbar-track { background:var(--bg); }
::-webkit-scrollbar-thumb { background:rgba(255,255,255,0.12); border-radius:3px; }

/* ── Keyframes ── */
@keyframes fadeUp   { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
@keyframes fadeIn   { from{opacity:0} to{opacity:1} }
@keyframes floatY   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
@keyframes pulseG   {
  0%,100%{ box-shadow:0 0 12px rgba(0,230,118,.35); }
  50%    { box-shadow:0 0 28px rgba(0,230,118,.75),0 0 55px rgba(0,230,118,.25); }
}
@keyframes pulseB   {
  0%,100%{ box-shadow:0 0 12px rgba(0,212,255,.35); }
  50%    { box-shadow:0 0 28px rgba(0,212,255,.75),0 0 55px rgba(0,212,255,.25); }
}
@keyframes blink    { 0%,100%{opacity:1} 50%{opacity:0} }
@keyframes meshBg   { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
@keyframes particle { 0%{transform:translateY(100vh) scale(.5);opacity:0} 8%{opacity:.7} 92%{opacity:.7} 100%{transform:translateY(-40px) scale(1.2);opacity:0} }
@keyframes drawLine { from{stroke-dashoffset:1200} to{stroke-dashoffset:0} }
@keyframes pop      { from{opacity:0;transform:scale(.85)} to{opacity:1;transform:scale(1)} }
@keyframes badgePop { 0%,100%{transform:translateX(-50%) scale(1)} 50%{transform:translateX(-50%) scale(1.06)} }
@keyframes scanPulse{ 0%,100%{opacity:.6} 50%{opacity:1} }

/* ── Scroll-triggered transitions ── */
.sa { opacity:0; transform:translateY(24px); transition:opacity .65s ease,transform .65s ease; }
.sa.in { opacity:1; transform:none; }
.sa.d1 { transition-delay:.08s; }
.sa.d2 { transition-delay:.16s; }
.sa.d3 { transition-delay:.24s; }
.sa.d4 { transition-delay:.32s; }
.sa.d5 { transition-delay:.40s; }
.sa.d6 { transition-delay:.48s; }
.sa.d7 { transition-delay:.56s; }
.sa.d8 { transition-delay:.64s; }

/* ── Layout ── */
.wrap { max-width:1200px; margin:0 auto; padding:0 24px; }
section { padding:100px 0; }
.glass {
  background:var(--card);
  backdrop-filter:blur(12px);
  -webkit-backdrop-filter:blur(12px);
  border:1px solid var(--border);
  border-radius:var(--r);
}
.tag {
  display:inline-flex; align-items:center; gap:7px;
  padding:5px 14px;
  background:rgba(0,212,255,.07);
  border:1px solid var(--b-blue);
  border-radius:100px;
  font-size:12px; color:var(--blue); font-weight:600;
  text-transform:uppercase; letter-spacing:.6px;
  margin-bottom:22px;
}
.sec-title { font-size:clamp(1.9rem,3.8vw,2.9rem); font-weight:700; margin-bottom:14px; }
.sec-sub   { font-size:1.05rem; color:var(--muted); max-width:540px; }

/* ── Buttons ── */
.btn {
  display:inline-flex; align-items:center; gap:8px;
  padding:13px 26px; border-radius:10px;
  font-size:15px; font-weight:600; border:none;
  transition:transform .18s ease,filter .18s ease;
}
.btn:hover { transform:translateY(-2px); }
.btn-green {
  background:var(--green); color:#051A0C;
  animation:pulseG 3s ease-in-out infinite;
}
.btn-green:hover { filter:brightness(1.1); }
.btn-blue {
  background:var(--blue); color:#00131A;
  animation:pulseB 3s ease-in-out infinite;
}
.btn-blue:hover { filter:brightness(1.1); }
.btn-outline {
  background:transparent; color:var(--text);
  border:1px solid var(--border);
}
.btn-outline:hover { border-color:var(--blue); color:var(--blue); }

/* ── NAVBAR ── */
.nav {
  position:fixed; top:0; left:0; right:0; z-index:900;
  padding:18px 0;
  transition:background .3s,backdrop-filter .3s,border .3s,padding .3s;
}
.nav.stuck {
  background:rgba(10,15,28,.88);
  backdrop-filter:blur(20px);
  -webkit-backdrop-filter:blur(20px);
  border-bottom:1px solid var(--border);
  padding:11px 0;
}
.nav-row { display:flex; align-items:center; justify-content:space-between; }
.logo {
  display:flex; align-items:center; gap:10px;
  font-family:'Sora',sans-serif; font-weight:700; font-size:17px;
}
.logo-icon {
  width:36px; height:36px; border-radius:9px;
  background:linear-gradient(135deg,var(--blue),var(--green));
  display:flex; align-items:center; justify-content:center;
  color:#0A0F1C;
}
.nav-links { display:flex; align-items:center; gap:34px; list-style:none; }
.nav-links a { font-size:14px; color:var(--muted); font-weight:500; transition:color .2s; }
.nav-links a:hover { color:var(--text); }
.ham {
  display:none; flex-direction:column; gap:5px;
  background:none; border:none; padding:3px;
}
.ham span { display:block; width:22px; height:2px; background:var(--text); border-radius:2px; transition:all .3s; }
.mob {
  display:none; position:fixed; inset:0; z-index:950;
  background:rgba(10,15,28,.97); backdrop-filter:blur(20px);
  flex-direction:column; align-items:center; justify-content:center; gap:28px;
}
.mob.open { display:flex; }
.mob a { font-family:'Sora',sans-serif; font-size:22px; font-weight:600; color:var(--text); transition:color .2s; }
.mob a:hover { color:var(--blue); }
.mob-close { position:absolute; top:18px; right:22px; background:none; border:none; color:var(--text); }
@media(max-width:768px) {
  .nav-links,.nav-cta { display:none; }
  .ham { display:flex; }
}

/* ── HERO ── */
.hero {
  min-height:100vh; display:flex; align-items:center;
  position:relative; overflow:hidden; padding-top:80px;
}
.hero-mesh {
  position:absolute; inset:0; pointer-events:none;
  background:
    radial-gradient(ellipse 80% 60% at 8% 42%,  rgba(0,212,255,.09) 0%, transparent 60%),
    radial-gradient(ellipse 55% 75% at 90% 60%, rgba(0,230,118,.07) 0%, transparent 60%),
    radial-gradient(ellipse 45% 40% at 50% 105%,rgba(0,212,255,.05) 0%, transparent 60%);
  background-size:300% 300%;
  animation:meshBg 14s ease infinite;
}
.hero-grid {
  display:grid; grid-template-columns:1fr 1fr;
  gap:56px; align-items:center; position:relative; z-index:1;
}
.hero-badge {
  display:inline-flex; align-items:center; gap:8px;
  padding:6px 14px;
  background:rgba(0,230,118,.07);
  border:1px solid var(--b-green);
  border-radius:100px; font-size:13px; color:var(--green);
  font-weight:500; margin-bottom:26px;
}
.badge-dot { width:7px; height:7px; border-radius:50%; background:var(--green); animation:blink 1.6s infinite; }
.hero-h1 { font-size:clamp(2.4rem,4.8vw,4rem); font-weight:800; margin-bottom:22px; }
.blue { color:var(--blue); }
.green { color:var(--green); }
.hero-sub { font-size:1.1rem; color:var(--muted); max-width:460px; line-height:1.75; margin-bottom:38px; }
.hero-btns { display:flex; gap:12px; flex-wrap:wrap; }

/* Particles */
.particles { position:absolute; inset:0; pointer-events:none; overflow:hidden; }
.pt {
  position:absolute; border-radius:50%;
  animation:particle linear infinite;
  opacity:0;
}

@media(max-width:1024px) { .hero-grid { grid-template-columns:1fr; gap:44px; } }

/* ── DASHBOARD MOCKUP ── */
.mock-wrap { animation:floatY 5s ease-in-out infinite; }
.mock {
  background:linear-gradient(145deg,#0C1630,#111D35);
  border:1px solid rgba(0,212,255,.14);
  border-radius:20px; overflow:hidden;
  box-shadow:0 24px 72px rgba(0,0,0,.55),0 0 0 1px rgba(255,255,255,.03),var(--glow-b);
  font-size:13px;
}
.mock-bar {
  background:rgba(0,212,255,.05);
  border-bottom:1px solid rgba(0,212,255,.11);
  padding:11px 16px;
  display:flex; align-items:center; justify-content:space-between;
}
.mock-dots { display:flex; gap:6px; }
.mock-dot { width:10px; height:10px; border-radius:50%; }
.mock-title {
  font-family:'Sora',sans-serif; font-size:11px;
  color:var(--blue); font-weight:700; letter-spacing:1.2px;
}
.mock-clock { font-size:11px; color:var(--muted); }
.mock-kpis {
  display:grid; grid-template-columns:repeat(3,1fr);
  background:var(--border);
  gap:1px; border-bottom:1px solid var(--border);
}
.mock-kpi { background:#0C1630; padding:13px 16px; text-align:center; }
.mock-kpi-n { font-family:'Sora',sans-serif; font-size:22px; font-weight:700; color:var(--blue); }
.mock-kpi-l { font-size:10px; color:var(--muted); text-transform:uppercase; letter-spacing:.5px; }
.mock-scan {
  margin:14px 16px 0;
  padding:11px 14px;
  background:rgba(0,230,118,.04);
  border:1px solid rgba(0,230,118,.14);
  border-radius:10px;
  display:flex; align-items:center; gap:10px;
}
.scan-dot { width:8px; height:8px; border-radius:50%; background:var(--green); animation:scanPulse 1.4s ease-in-out infinite; }
.scan-txt { font-size:12px; color:var(--green); font-weight:500; }
.mock-entries { padding:12px 16px 16px; display:flex; flex-direction:column; gap:7px; }
.mock-entry {
  display:flex; align-items:center; gap:10px;
  padding:9px 12px;
  background:rgba(255,255,255,.03);
  border:1px solid var(--border);
  border-radius:9px;
  transition:border-color .3s,background .3s;
}
.mock-entry.active { border-color:rgba(0,230,118,.3); background:rgba(0,230,118,.03); animation:pop .4s ease; }
.mock-av {
  width:32px; height:32px; border-radius:50%; flex-shrink:0;
  display:flex; align-items:center; justify-content:center;
  font-family:'Sora',sans-serif; font-size:11px; font-weight:700; color:#fff;
}
.mock-name { flex:1; font-weight:500; font-size:13px; }
.mock-time { font-size:11px; color:var(--muted); }
.mock-badge {
  font-size:10px; padding:3px 8px; border-radius:100px; font-weight:600;
}
.mock-badge.e { background:rgba(0,230,118,.13); color:var(--green); border:1px solid rgba(0,230,118,.25); }
.mock-badge.s { background:rgba(0,212,255,.12); color:var(--blue);  border:1px solid rgba(0,212,255,.22); }

/* ── STATS ── */
.stats-bar {
  padding:0;
  border-top:1px solid var(--border);
  border-bottom:1px solid var(--border);
  background:rgba(255,255,255,.015);
}
.stats-row { display:grid; grid-template-columns:repeat(4,1fr); }
.stat-item { padding:44px 24px; text-align:center; border-right:1px solid var(--border); }
.stat-item:last-child { border-right:none; }
.stat-n {
  font-family:'Sora',sans-serif;
  font-size:clamp(2.2rem,3.8vw,3.2rem); font-weight:800; line-height:1;
  background:linear-gradient(120deg,var(--blue),var(--green));
  -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
  margin-bottom:6px;
}
.stat-l { font-size:14px; color:var(--muted); font-weight:500; }
@media(max-width:720px) {
  .stats-row { grid-template-columns:repeat(2,1fr); }
  .stat-item { border-right:none; border-bottom:1px solid var(--border); }
  .stat-item:nth-child(odd) { border-right:1px solid var(--border); }
}

/* ── PROBLEM ── */
.prob-grid {
  display:grid; grid-template-columns:repeat(3,1fr); gap:20px; margin-top:52px;
}
.prob-card {
  padding:26px;
  background:rgba(255,71,87,.035);
  border:1px solid rgba(255,71,87,.14);
  border-radius:var(--r);
  transition:all .3s;
}
.prob-card:hover {
  background:rgba(255,71,87,.07);
  border-color:rgba(255,71,87,.3);
  transform:translateY(-4px);
}
.prob-icon {
  width:46px; height:46px; border-radius:11px;
  background:rgba(255,71,87,.1);
  display:flex; align-items:center; justify-content:center;
  color:#FF6878; margin-bottom:14px;
}
.prob-card h3 { font-size:15px; font-weight:700; margin-bottom:7px; }
.prob-card p  { font-size:13px; color:var(--muted); line-height:1.65; }
@media(max-width:960px) { .prob-grid { grid-template-columns:repeat(2,1fr); } }
@media(max-width:580px) { .prob-grid { grid-template-columns:1fr; } }

/* ── HOW IT WORKS ── */
.how-bg { background:var(--bg2); }
.steps-grid {
  display:grid; grid-template-columns:repeat(4,1fr); gap:20px; position:relative;
}
.step {
  padding:22px; background:var(--card); border:1px solid var(--border);
  border-radius:var(--r); text-align:center; position:relative;
  transition:border-color .3s,box-shadow .3s,transform .3s;
}
.step:hover { border-color:var(--b-blue); box-shadow:var(--glow-b); transform:translateY(-4px); }
.step-num {
  position:absolute; top:-9px; right:14px;
  width:20px; height:20px; border-radius:50%;
  background:linear-gradient(135deg,var(--blue),var(--green));
  font-family:'Sora',sans-serif; font-size:10px; font-weight:700; color:#0A0F1C;
  display:flex; align-items:center; justify-content:center;
}
.step-ic {
  width:52px; height:52px; border-radius:14px;
  background:rgba(0,212,255,.07); border:1px solid var(--b-blue);
  display:flex; align-items:center; justify-content:center;
  color:var(--blue); margin:0 auto 12px;
}
.step h3 { font-size:13px; font-weight:700; margin-bottom:5px; }
.step p  { font-size:12px; color:var(--muted); }
.connector { margin:6px 0; height:22px; }
.connector svg { width:100%; height:22px; }
.conn-path {
  stroke:url(#grad1); stroke-width:2; fill:none;
  stroke-dasharray:1200; stroke-dashoffset:1200;
  transition:stroke-dashoffset 2.2s ease;
}
.conn-path.drawn { stroke-dashoffset:0; }
@media(max-width:960px) { .steps-grid { grid-template-columns:repeat(2,1fr); } }
@media(max-width:580px) { .steps-grid { grid-template-columns:repeat(2,1fr); } }

/* ── FEATURES ── */
.feat-grid {
  display:grid; grid-template-columns:repeat(3,1fr); gap:22px; margin-top:52px;
}
.feat-card {
  padding:30px; background:var(--card); border:1px solid var(--border);
  border-radius:var(--r); transition:all .3s;
}
.feat-card:hover {
  border-color:var(--b-blue);
  background:rgba(0,212,255,.03);
  transform:translateY(-6px);
  box-shadow:var(--glow-b);
}
.feat-ic {
  width:54px; height:54px; border-radius:14px;
  display:flex; align-items:center; justify-content:center;
  margin-bottom:18px;
  transition:box-shadow .3s;
}
.feat-card:hover .feat-ic { box-shadow:0 0 18px rgba(0,212,255,.35); }
.feat-card h3 { font-size:17px; font-weight:700; margin-bottom:8px; }
.feat-card p  { font-size:13.5px; color:var(--muted); line-height:1.7; }
@media(max-width:960px) { .feat-grid { grid-template-columns:repeat(2,1fr); } }
@media(max-width:580px) { .feat-grid { grid-template-columns:1fr; } }

/* ── PRICING ── */
.price-bg { background:var(--bg2); }
.price-grid {
  display:grid; grid-template-columns:repeat(3,1fr);
  gap:22px; margin-top:52px; align-items:center;
}
.price-card {
  padding:34px; background:var(--card); border:1px solid var(--border);
  border-radius:18px; position:relative;
  transition:transform .3s,box-shadow .3s;
}
.price-card:hover { transform:translateY(-8px); box-shadow:0 20px 55px rgba(0,0,0,.3); }
.price-card.pop {
  border-color:var(--blue);
  background:rgba(0,212,255,.035);
  box-shadow:var(--glow-b);
  transform:scale(1.04);
}
.price-card.pop:hover { transform:scale(1.04) translateY(-8px); box-shadow:0 28px 70px rgba(0,212,255,.18); }
.pop-badge {
  position:absolute; top:-13px; left:50%;
  transform:translateX(-50%);
  padding:5px 20px;
  background:linear-gradient(135deg,var(--blue),#0099BB);
  border-radius:100px;
  font-family:'Sora',sans-serif; font-size:11px; font-weight:700;
  color:#00131A; white-space:nowrap;
  animation:badgePop 2.2s ease-in-out infinite;
}
.plan-tier {
  font-size:12px; font-weight:700; text-transform:uppercase;
  letter-spacing:.8px; color:var(--muted); margin-bottom:6px;
}
.plan-cap  { font-size:13px; color:var(--blue); margin-bottom:22px; }
.plan-price-row { margin-bottom:6px; }
.plan-amount { font-family:'Sora',sans-serif; font-size:2.8rem; font-weight:800; }
.plan-period { font-size:14px; color:var(--muted); }
.plan-inst {
  font-size:13px; color:var(--muted);
  margin-bottom:26px; padding-bottom:26px;
  border-bottom:1px solid var(--border);
}
.plan-inst em { color:var(--green); font-style:normal; font-weight:600; }
.plan-feats { list-style:none; display:flex; flex-direction:column; gap:11px; margin-bottom:30px; }
.plan-feats li { display:flex; align-items:center; gap:9px; font-size:13.5px; color:var(--muted); }
.plan-feats li svg { color:var(--green); flex-shrink:0; }
.price-note {
  text-align:center; margin-top:30px;
  font-size:13.5px; color:var(--muted);
}
.price-note em { color:var(--blue); font-style:normal; }
@media(max-width:1000px) {
  .price-grid { grid-template-columns:1fr; max-width:440px; margin-left:auto; margin-right:auto; }
  .price-card.pop { transform:none; }
  .price-card.pop:hover { transform:translateY(-8px); }
}

/* ── FAQ ── */
.faq-list {
  margin:50px auto 0; max-width:780px;
  display:flex; flex-direction:column; gap:10px;
}
.faq-item {
  background:var(--card); border:1px solid var(--border);
  border-radius:var(--r); overflow:hidden; transition:border-color .25s;
}
.faq-item.open { border-color:var(--b-blue); }
.faq-q {
  display:flex; align-items:center; justify-content:space-between;
  width:100%; padding:18px 22px; background:none; border:none;
  color:var(--text); font-size:14.5px; font-weight:600; text-align:left; gap:14px;
  transition:color .2s;
}
.faq-q:hover { color:var(--blue); }
.faq-chev { transition:transform .3s; color:var(--muted); flex-shrink:0; }
.faq-chev.r { transform:rotate(180deg); color:var(--blue); }
.faq-body {
  max-height:0; overflow:hidden;
  transition:max-height .4s ease,padding .3s;
}
.faq-body.open { max-height:220px; padding-bottom:18px; }
.faq-body p { padding:0 22px; font-size:13.5px; color:var(--muted); line-height:1.75; }

/* ── CTA FINAL ── */
.cta-wrap {
  padding:110px 0; position:relative; overflow:hidden;
}
.cta-bg {
  position:absolute; inset:0;
  background:linear-gradient(135deg,rgba(0,212,255,.1),rgba(0,230,118,.07),rgba(0,212,255,.05));
}
.cta-bg::before {
  content:''; position:absolute; inset:0;
  background:
    radial-gradient(ellipse 55% 80% at 15% 50%, rgba(0,212,255,.1) 0%, transparent 60%),
    radial-gradient(ellipse 55% 80% at 85% 50%, rgba(0,230,118,.08) 0%, transparent 60%);
}
.cta-inner { position:relative; z-index:1; text-align:center; max-width:680px; margin:0 auto; }
.cta-h2 { font-size:clamp(1.9rem,4vw,3.3rem); font-weight:800; margin-bottom:18px; }
.cta-sub { font-size:1.05rem; color:var(--muted); margin-bottom:44px; }
.cta-btns { display:flex; gap:14px; justify-content:center; flex-wrap:wrap; }
.cta-socials { display:flex; gap:14px; justify-content:center; margin-top:28px; flex-wrap:wrap; }
.social-chip {
  display:flex; align-items:center; gap:8px;
  padding:10px 20px; border-radius:9px;
  background:rgba(255,255,255,.05); border:1px solid var(--border);
  color:var(--muted); font-size:13.5px; font-weight:500;
  transition:all .2s; cursor:default;
}
.social-chip:hover { background:rgba(255,255,255,.09); color:var(--text); border-color:var(--b-blue); }

/* ── FOOTER ── */
.foot { background:var(--bg2); border-top:1px solid var(--border); padding:56px 0 28px; }
.foot-grid {
  display:grid; grid-template-columns:2fr 1fr 1fr; gap:48px; margin-bottom:44px;
}
.foot-brand p { font-size:13.5px; color:var(--muted); margin-top:12px; max-width:270px; line-height:1.75; }
.foot-col h4 {
  font-size:12px; font-weight:700; text-transform:uppercase;
  letter-spacing:.6px; color:var(--muted); margin-bottom:16px;
}
.foot-col ul { list-style:none; display:flex; flex-direction:column; gap:10px; }
.foot-col ul li a { font-size:13.5px; color:var(--muted); transition:color .2s; }
.foot-col ul li a:hover { color:var(--text); }
.foot-bottom {
  border-top:1px solid var(--border); padding-top:22px;
  display:flex; align-items:center; justify-content:space-between; gap:12px; flex-wrap:wrap;
}
.foot-bottom p { font-size:12.5px; color:var(--muted); }
.foot-bottom a { color:var(--blue); }
@media(max-width:720px) {
  .foot-grid { grid-template-columns:1fr; gap:28px; }
  .foot-bottom { flex-direction:column; text-align:center; }
}
`

const GlobalStyles = () => (
  <style dangerouslySetInnerHTML={{ __html: css }} />
)

// ─── Hooks ────────────────────────────────────────────────────────────────────

function useInView(threshold = 0.12) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, visible]
}

function useCounter(target, duration = 2200, go = false) {
  const [n, setN] = useState(0)
  const ran = useRef(false)
  useEffect(() => {
    if (!go || ran.current) return
    ran.current = true
    let cur = 0
    const step = target / (duration / 16)
    const t = setInterval(() => {
      cur += step
      if (cur >= target) { setN(target); clearInterval(t) }
      else setN(Math.floor(cur))
    }, 16)
    return () => clearInterval(t)
  }, [go, target, duration])
  return n
}

// ─── Particles ────────────────────────────────────────────────────────────────

const PARTICLES = Array.from({ length: 22 }, (_, i) => ({
  id: i,
  left:  `${(i * 4.5) % 100}%`,
  size:  `${2 + (i % 3)}px`,
  dur:   `${9 + (i % 7) * 1.5}s`,
  delay: `${(i * 0.7) % 8}s`,
  color: i % 3 === 0 ? '#00E676' : i % 3 === 1 ? '#00D4FF' : 'rgba(255,255,255,.45)',
}))

const Particles = () => (
  <div className="particles" aria-hidden="true">
    {PARTICLES.map(p => (
      <div key={p.id} className="pt" style={{
        left: p.left, width: p.size, height: p.size,
        background: p.color, animationDuration: p.dur, animationDelay: p.delay,
      }} />
    ))}
  </div>
)

// ─── Dashboard Mockup ─────────────────────────────────────────────────────────

const STUDENTS = [
  { name: 'Sofía Ramírez',  init: 'SR', color: '#7C3AED', time: '08:14', type: 'e' },
  { name: 'Carlos Mendoza', init: 'CM', color: '#0891B2', time: '08:19', type: 'e' },
  { name: 'Ana García',     init: 'AG', color: '#DC2626', time: '08:25', type: 'e' },
  { name: 'Luis Torres',    init: 'LT', color: '#059669', time: '14:02', type: 's' },
]

function DashboardMockup() {
  const [active, setActive] = useState(0)
  const [clock, setClock] = useState(() =>
    new Date().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })
  )
  useEffect(() => {
    const t1 = setInterval(() => setActive(a => (a + 1) % STUDENTS.length), 2600)
    const t2 = setInterval(() =>
      setClock(new Date().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })), 30000)
    return () => { clearInterval(t1); clearInterval(t2) }
  }, [])

  return (
    <div className="mock-wrap">
      <div className="mock">
        <div className="mock-bar">
          <div className="mock-dots">
            <div className="mock-dot" style={{ background: '#FF5F57' }} />
            <div className="mock-dot" style={{ background: '#FFBD2E' }} />
            <div className="mock-dot" style={{ background: '#28CA41' }} />
          </div>
          <div className="mock-title">CHECK-IN ESCOLAR</div>
          <div className="mock-clock">{clock}</div>
        </div>

        <div className="mock-kpis">
          <div className="mock-kpi"><div className="mock-kpi-n">23</div><div className="mock-kpi-l">Presentes</div></div>
          <div className="mock-kpi"><div className="mock-kpi-n">2</div> <div className="mock-kpi-l">Ausentes</div></div>
          <div className="mock-kpi"><div className="mock-kpi-n">25</div><div className="mock-kpi-l">Total</div></div>
        </div>

        <div className="mock-scan">
          <div className="scan-dot" />
          <div className="scan-txt">Sistema activo · Cámara principal</div>
        </div>

        <div className="mock-entries">
          {STUDENTS.map((s, i) => (
            <div key={s.name} className={`mock-entry ${i === active ? 'active' : ''}`}>
              <div className="mock-av" style={{ background: s.color }}>{s.init}</div>
              <div className="mock-name">{s.name}</div>
              <div className="mock-time">{s.time}</div>
              <div className={`mock-badge ${s.type}`}>
                {s.type === 'e' ? '✓ Entrada' : '↗ Salida'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  ['Características', '#caracteristicas'],
  ['Cómo funciona',   '#como-funciona'],
  ['Precios',         '#precios'],
  ['Contacto',        '#contacto'],
]

function Navbar() {
  const [stuck, setStuck] = useState(false)
  const [mob,   setMob]   = useState(false)

  useEffect(() => {
    const h = () => setStuck(window.scrollY > 48)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])

  return (
    <>
      <nav className={`nav ${stuck ? 'stuck' : ''}`}>
        <div className="wrap">
          <div className="nav-row">
            <a href="#inicio" className="logo">
              <div className="logo-icon"><Camera size={17} /></div>
              Check-in Escolar
            </a>
            <ul className="nav-links">
              {NAV_ITEMS.map(([l, h]) => <li key={l}><a href={h}>{l}</a></li>)}
            </ul>
            <a href="#precios" className="btn btn-green nav-cta" style={{ padding: '9px 20px', fontSize: '13.5px' }}>
              Solicitar Demo
            </a>
            <button className="ham" onClick={() => setMob(true)} aria-label="Menú">
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>

      <div className={`mob ${mob ? 'open' : ''}`}>
        <button className="mob-close" onClick={() => setMob(false)}><X size={26} /></button>
        {NAV_ITEMS.map(([l, h]) => (
          <a key={l} href={h} onClick={() => setMob(false)}>{l}</a>
        ))}
        <a href="#precios" className="btn btn-green" onClick={() => setMob(false)}>
          Solicitar Demo
        </a>
      </div>
    </>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="hero" id="inicio">
      <div className="hero-mesh" />
      <Particles />
      <div className="wrap">
        <div className="hero-grid">
          <div>
            <div className="hero-badge" style={{ animation: 'fadeUp .6s ease both' }}>
              <div className="badge-dot" />
              Sistema activo en escuelas de México
            </div>
            <h1 className="hero-h1" style={{ animation: 'fadeUp .7s .1s ease both' }}>
              Tu escuela siempre sabe<br />
              <span className="blue">quién llegó.</span>{' '}
              <span className="green">Al instante.</span>
            </h1>
            <p className="hero-sub" style={{ animation: 'fadeUp .7s .2s ease both' }}>
              Sistema de asistencia por reconocimiento facial. Notifica a los padres
              en segundos, sin que el maestro haga nada.
            </p>
            <div className="hero-btns" style={{ animation: 'fadeUp .7s .3s ease both' }}>
              <a href="#precios"       className="btn btn-green"><Zap size={15} /> Ver Demo Gratuita</a>
              <a href="#como-funciona" className="btn btn-outline">Cómo funciona →</a>
            </div>
          </div>
          <div style={{ animation: 'fadeIn .9s .35s ease both' }}>
            <DashboardMockup />
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Stats ────────────────────────────────────────────────────────────────────

function StatItem({ val, suffix, label, go }) {
  const n = useCounter(val, 2100, go)
  return (
    <div className="stat-item">
      <div className="stat-n">{n}{suffix}</div>
      <div className="stat-l">{label}</div>
    </div>
  )
}

function Stats() {
  const [ref, vis] = useInView(0.2)
  return (
    <div className="stats-bar" ref={ref}>
      <div className="stats-row">
        <StatItem val={500} suffix="+"   label="Alumnos registrados"       go={vis} />
        <StatItem val={2}   suffix=" seg" label="Tiempo de reconocimiento"  go={vis} />
        <StatItem val={100} suffix="%"   label="Notificaciones entregadas"  go={vis} />
        <StatItem val={0}   suffix=""    label="Llamadas manuales por día"  go={vis} />
      </div>
    </div>
  )
}

// ─── Problem ──────────────────────────────────────────────────────────────────

const PROBLEMS = [
  { icon: <Clock size={20} />,         title: 'Tiempo perdido',           desc: 'Pasar lista en cada aula consume 5–10 minutos diarios de clase productiva.' },
  { icon: <Phone size={20} />,         title: 'Comunicación tardía',      desc: 'Los padres se enteran horas después si su hijo no llegó a la escuela.' },
  { icon: <Camera size={20} />,        title: 'Sin evidencia fotográfica', desc: 'No existe registro visual de quién entró ni a qué hora exactamente.' },
  { icon: <FileSpreadsheet size={20}/>, title: 'Reportes lentos',          desc: 'Generar un reporte mensual de asistencia toma horas de trabajo manual.' },
  { icon: <Bell size={20} />,          title: 'Sin alertas proactivas',    desc: 'Nadie avisa automáticamente si un alumno no llegó pasada la hora límite.' },
]

function Problem() {
  const [ref, vis] = useInView()
  return (
    <section id="problema">
      <div className="wrap" ref={ref}>
        <div className={`sa ${vis ? 'in' : ''}`}>
          <div className="tag"><AlertTriangle size={11} /> El problema</div>
          <h2 className="sec-title">Pasar lista en papel<br />es del siglo pasado</h2>
          <p className="sec-sub">Las escuelas modernas necesitan procesos automáticos que ahorren tiempo y tranquilicen a los padres.</p>
        </div>
        <div className="prob-grid">
          {PROBLEMS.map((p, i) => (
            <div key={p.title} className={`prob-card sa ${vis ? `in d${i + 1}` : ''}`}>
              <div className="prob-icon">{p.icon}</div>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── How it Works ─────────────────────────────────────────────────────────────

const STEPS = [
  { ic: <Camera size={20} />,      title: 'Alumno llega',       desc: 'Pasa frente a la cámara en la entrada de la escuela' },
  { ic: <Zap size={20} />,         title: 'Detección facial',   desc: 'El sistema detecta el rostro en menos de 1 segundo' },
  { ic: <Target size={20} />,      title: 'Identificación',     desc: 'Compara con la base de datos y reconoce al alumno' },
  { ic: <CheckCircle size={20} />, title: 'Registro automático',desc: 'Guarda nombre, hora exacta, tipo y foto del momento' },
  { ic: <MessageCircle size={20}/>, title: 'WhatsApp a papás',  desc: '"Tu hijo llegó a las 08:14 ✅" — mensaje inmediato' },
  { ic: <Smartphone size={20} />,  title: 'Foto a Telegram',    desc: 'El administrador recibe la foto del registro al instante' },
  { ic: <Monitor size={20} />,     title: 'Panel actualizado',  desc: 'El dashboard web refleja la asistencia en tiempo real' },
  { ic: <Bell size={20} />,        title: 'Alerta si no llega', desc: 'Si pasa la hora límite, el sistema notifica automáticamente' },
]

function HowItWorks() {
  const [ref, vis] = useInView(0.08)
  return (
    <section id="como-funciona" className="how-bg">
      <div className="wrap" ref={ref}>
        <div style={{ textAlign: 'center' }}>
          <div className={`tag sa ${vis ? 'in' : ''}`} style={{ margin: '0 auto 22px' }}>
            <Zap size={11} /> Flujo del sistema
          </div>
          <h2 className={`sec-title sa ${vis ? 'in d1' : ''}`}>
            Del portón a WhatsApp<br />
            <span className="blue">en menos de 2 segundos</span>
          </h2>
        </div>

        <div style={{ marginTop: '52px' }}>
          <div className="steps-grid">
            {STEPS.slice(0, 4).map((s, i) => (
              <div key={s.title} className={`step sa ${vis ? `in d${i + 1}` : ''}`}>
                <div className="step-num">{i + 1}</div>
                <div className="step-ic">{s.ic}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="connector">
            <svg viewBox="0 0 1200 22" preserveAspectRatio="none">
              <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%"   stopColor="#00D4FF" />
                  <stop offset="100%" stopColor="#00E676" />
                </linearGradient>
              </defs>
              <path
                d="M0 11 Q300 2, 600 11 Q900 20, 1200 11"
                className={`conn-path ${vis ? 'drawn' : ''}`}
              />
            </svg>
          </div>

          <div className="steps-grid">
            {STEPS.slice(4).map((s, i) => (
              <div key={s.title} className={`step sa ${vis ? `in d${i + 5}` : ''}`}>
                <div className="step-num">{i + 5}</div>
                <div className="step-ic">{s.ic}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Features ─────────────────────────────────────────────────────────────────

const FEATURES = [
  { ic: <Camera size={22} />,         title: 'Reconocimiento Facial',       desc: 'Detección automática al pasar frente a la cámara. Compatible con cámara IP WiFi y USB. Reconexión automática ante fallos.', c: '#00D4FF', bg: 'rgba(0,212,255,.07)',   b: 'rgba(0,212,255,.18)' },
  { ic: <MessageCircle size={22} />,  title: 'Notificaciones WhatsApp',     desc: 'Mensaje instantáneo al teléfono de mamá o papá en el momento exacto en que el alumno registra su entrada.', c: '#25D366', bg: 'rgba(37,211,102,.07)',  b: 'rgba(37,211,102,.18)' },
  { ic: <Monitor size={22} />,        title: 'Panel Web en Tiempo Real',    desc: 'Dashboard con estadísticas del día, actividad reciente y gestión completa de alumnos desde cualquier navegador.', c: '#818CF8', bg: 'rgba(129,140,248,.07)', b: 'rgba(129,140,248,.18)' },
  { ic: <FileSpreadsheet size={22} />,title: 'Reportes Excel',              desc: 'Exporta el historial de asistencia con un clic en formato .xlsx. Filtrable por fecha y alumno. Compatible con Google Sheets.', c: '#34D399', bg: 'rgba(52,211,153,.07)',  b: 'rgba(52,211,153,.18)' },
  { ic: <Bell size={22} />,           title: 'Alertas Proactivas',          desc: 'Si un alumno no llega antes de su hora límite configurada, el sistema notifica automáticamente al administrador.', c: '#FBBF24', bg: 'rgba(251,191,36,.07)',  b: 'rgba(251,191,36,.18)' },
  { ic: <Lock size={22} />,           title: 'Datos 100% Seguros',          desc: 'Toda la información se almacena localmente en la escuela. No se suben fotos a internet. Privacidad total garantizada.', c: '#F87171', bg: 'rgba(248,113,113,.07)', b: 'rgba(248,113,113,.18)' },
]

function Features() {
  const [ref, vis] = useInView()
  return (
    <section id="caracteristicas">
      <div className="wrap" ref={ref}>
        <div className={`sa ${vis ? 'in' : ''}`}>
          <div className="tag"><Star size={11} /> Características</div>
          <h2 className="sec-title">Todo lo que tu escuela necesita</h2>
          <p className="sec-sub">Tecnología profesional, simple de usar, sin infraestructura compleja.</p>
        </div>
        <div className="feat-grid">
          {FEATURES.map((f, i) => (
            <div key={f.title} className={`feat-card sa ${vis ? `in d${i + 1}` : ''}`}>
              <div className="feat-ic" style={{ background: f.bg, border: `1px solid ${f.b}`, color: f.c }}>
                {f.ic}
              </div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Pricing ──────────────────────────────────────────────────────────────────

const PLANS = [
  {
    tier: 'Plan Básico', cap: 'Hasta 80 alumnos',
    price: '$600', inst: '$2,500', pop: false,
    feats: [
      'Reconocimiento facial ilimitado',
      'Notificaciones WhatsApp',
      'Panel de administración web',
      'Historial y reportes Excel',
      'Soporte técnico incluido',
      'Actualizaciones del sistema',
    ],
  },
  {
    tier: 'Plan Estándar', cap: 'Hasta 200 alumnos',
    price: '$900', inst: '$3,500', pop: true,
    feats: [
      'Todo lo del Plan Básico',
      'Alertas proactivas por Telegram',
      'Foto al administrador en tiempo real',
      'Hora límite de llegada por alumno',
      'Soporte prioritario',
      'Capacitación incluida',
    ],
  },
  {
    tier: 'Plan Institucional', cap: 'Alumnos ilimitados',
    price: '$1,400', inst: '$5,000', pop: false,
    feats: [
      'Todo lo del Plan Estándar',
      'Sin límite de alumnos',
      'Múltiples puntos de acceso',
      'Integración personalizada',
      'Soporte 24/7',
      'Contrato anual disponible',
    ],
  },
]

function Pricing() {
  const [ref, vis] = useInView(0.08)
  return (
    <section id="precios" className="price-bg">
      <div className="wrap" ref={ref}>
        <div className={`sa ${vis ? 'in' : ''}`} style={{ textAlign: 'center' }}>
          <div className="tag" style={{ margin: '0 auto 22px' }}><BarChart2 size={11} /> Precios</div>
          <h2 className="sec-title">Invierte menos de lo que crees</h2>
          <p className="sec-sub" style={{ margin: '0 auto' }}>Instalación rápida, soporte incluido, sin contratos largos ni sorpresas.</p>
        </div>
        <div className="price-grid">
          {PLANS.map((p, i) => (
            <div key={p.tier} className={`price-card ${p.pop ? 'pop' : ''} sa ${vis ? `in d${i + 1}` : ''}`}>
              {p.pop && <div className="pop-badge">⚡ Más popular</div>}
              <div className="plan-tier">{p.tier}</div>
              <div className="plan-cap">{p.cap}</div>
              <div className="plan-price-row">
                <span className="plan-amount">{p.price}</span>
                <span className="plan-period"> MXN/mes</span>
              </div>
              <div className="plan-inst">Instalación única: <em>{p.inst} MXN</em></div>
              <ul className="plan-feats">
                {p.feats.map(f => <li key={f}><Check size={13} /> {f}</li>)}
              </ul>
              <a
                href="#contacto"
                className={`btn ${p.pop ? 'btn-blue' : 'btn-outline'}`}
                style={{ width: '100%', justifyContent: 'center' }}
              >
                {p.pop ? 'Empezar ahora' : 'Solicitar información'}
              </a>
            </div>
          ))}
        </div>
        <p className="price-note">
          📷 Cámara IP disponible a <em>$550 MXN</em> &nbsp;·&nbsp;
          10% de descuento con <em>pago anual anticipado</em>
        </p>
      </div>
    </section>
  )
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────

const FAQS = [
  { q: '¿Qué pasa si un alumno usa cubrebocas o lentes oscuros?',
    a: 'El sistema puede no reconocerlo en ese caso. Recomendamos que los alumnos pasen sin cubrebocas frente a la cámara. En situaciones especiales, el personal puede registrar la entrada manualmente desde el panel web.' },
  { q: '¿Los datos de los alumnos están seguros?',
    a: 'Sí, completamente. Toda la información (fotos, nombres, teléfonos) se almacena únicamente en la computadora de la escuela. No se envía a ningún servidor externo. Firmamos acuerdo de confidencialidad.' },
  { q: '¿Cuántos alumnos puede reconocer al mismo tiempo?',
    a: 'El sistema está optimizado para el flujo normal de una entrada escolar. Detecta y registra alumnos al pasar de uno en uno o en pequeños grupos, sin límite técnico de alumnos registrados en la base de datos.' },
  { q: '¿Qué sucede si la cámara falla o se va la luz?',
    a: 'El sistema tiene reconexión automática. Al recuperarse la cámara o el suministro eléctrico, retoma el funcionamiento inmediatamente sin pérdida de datos históricos.' },
  { q: '¿Puedo usar la cámara que ya tiene la escuela?',
    a: 'Si la escuela cuenta con una cámara USB compatible o una cámara IP con soporte RTSP, se puede evaluar la integración sin costo adicional durante la visita de instalación.' },
  { q: '¿La mensualidad incluye soporte y actualizaciones?',
    a: 'Sí. Todas las mejoras, correcciones y nuevas funciones del software se incluyen en la mensualidad activa. El soporte técnico está disponible por WhatsApp en horario de lunes a viernes.' },
  { q: '¿Puedo cancelar el servicio cuando quiera?',
    a: 'El servicio opera mes a mes. Puedes cancelar con 15 días de aviso previo. Los datos históricos de la escuela quedan disponibles para exportar antes del cierre.' },
]

function FAQ() {
  const [open, setOpen] = useState(null)
  const [ref, vis] = useInView()
  return (
    <section id="faq">
      <div className="wrap" ref={ref}>
        <div className={`sa ${vis ? 'in' : ''}`} style={{ textAlign: 'center' }}>
          <div className="tag" style={{ margin: '0 auto 22px' }}><Shield size={11} /> Preguntas frecuentes</div>
          <h2 className="sec-title">Resolvemos tus dudas</h2>
        </div>
        <div className="faq-list">
          {FAQS.map((f, i) => (
            <div key={i} className={`faq-item ${open === i ? 'open' : ''} sa ${vis ? `in d${Math.min(i + 1, 8)}` : ''}`}>
              <button className="faq-q" onClick={() => setOpen(open === i ? null : i)}>
                {f.q}
                <ChevronDown size={16} className={`faq-chev ${open === i ? 'r' : ''}`} />
              </button>
              <div className={`faq-body ${open === i ? 'open' : ''}`}>
                <p>{f.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── CTA Final ────────────────────────────────────────────────────────────────

function CTAFinal() {
  const [ref, vis] = useInView()
  return (
    <section id="contacto" className="cta-wrap">
      <div className="cta-bg" />
      <div className="wrap" ref={ref}>
        <div className={`cta-inner sa ${vis ? 'in' : ''}`}>
          <h2 className="cta-h2">
            ¿Tu escuela todavía<br />
            <span className="blue">pasa lista a mano?</span>
          </h2>
          <p className="cta-sub">Modernízate hoy. Instalación en 2 días. Sin contratos largos.</p>
          <div className="cta-btns">
            <a href="https://wa.me/521XXXXXXXXXX" className="btn btn-green">
              <Zap size={15} /> Solicitar instalación ahora
            </a>
            <a href="mailto:contacto@checkinescolar.mx" className="btn btn-outline">
              Enviar correo
            </a>
          </div>
          <div className="cta-socials">
            <div className="social-chip">
              <MessageCircle size={15} style={{ color: '#25D366' }} /> WhatsApp directo
            </div>
            <div className="social-chip">
              <Smartphone size={15} style={{ color: '#229ED9' }} /> Telegram
            </div>
            <div className="social-chip">
              <Mail size={15} style={{ color: 'var(--blue)' }} /> Email
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot-grid">
          <div className="foot-brand">
            <div className="logo">
              <div className="logo-icon"><Camera size={16} /></div>
              Check-in Escolar
            </div>
            <p>Sistema de asistencia escolar por reconocimiento facial. Tecnología accesible para instituciones educativas mexicanas.</p>
          </div>
          <div className="foot-col">
            <h4>Producto</h4>
            <ul>
              <li><a href="#caracteristicas">Características</a></li>
              <li><a href="#como-funciona">Cómo funciona</a></li>
              <li><a href="#precios">Precios</a></li>
              <li><a href="#faq">Preguntas frecuentes</a></li>
            </ul>
          </div>
          <div className="foot-col">
            <h4>Contacto</h4>
            <ul>
              <li><a href="#">WhatsApp</a></li>
              <li><a href="#">Telegram</a></li>
              <li><a href="#">Correo electrónico</a></li>
              <li><a href="#">México</a></li>
            </ul>
          </div>
        </div>
        <div className="foot-bottom">
          <p>© 2026 Check-in Escolar. Todos los derechos reservados.</p>
          <p>Datos almacenados localmente en tu escuela · <a href="#">Política de privacidad</a></p>
        </div>
      </div>
    </footer>
  )
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <>
      <GlobalStyles />
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Problem />
        <HowItWorks />
        <Features />
        <Pricing />
        <FAQ />
        <CTAFinal />
      </main>
      <Footer />
    </>
  )
}
