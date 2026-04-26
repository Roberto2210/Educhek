import { useState, useEffect, useRef } from 'react'
import {
  Camera, Shield, MessageCircle, FileSpreadsheet,
  Bell, Lock, X, Check, ChevronDown, Mail,
  Zap, Target, Smartphone, Monitor,
  CheckCircle, ArrowRight, Quote,
} from 'lucide-react'
import logoImg from './assets/logo.png'
import inicioImg from './assets/inicio.png'

// ─── CSS ──────────────────────────────────────────────────────────────────────

const css = `
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&family=Manrope:wght@400;500;600;700&display=swap');

:root {
  --green:  #B7F52A;
  --orange: #FF6A00;
  --purple: #9B8BEF;
  --blue1:  #0459D4;
  --blue2:  #006EDC;
  --blue3:  #12008F;
  --white:  #FFFFFF;
  --gray:   #F3F3F3;
  --text:   #FFFFFF;
  --muted:  #8DA4E8;
  --border: rgba(255,255,255,0.14);
  --card-shadow: 0 8px 40px rgba(0,0,0,0.22);
  --green-glow: 0 0 40px rgba(183,245,42,.22);
  --r: 10px;
}

*,*::before,*::after { margin:0; padding:0; box-sizing:border-box; }
html { scroll-behavior:smooth; }
body {
  background: linear-gradient(135deg, #0459D4 0%, #006EDC 45%, #12008F 100%);
  background-attachment: fixed;
  color: var(--text);
  font-family:'Manrope',sans-serif;
  font-size:16px;
  line-height:1.6;
  overflow-x:hidden;
}
h1,h2,h3 { font-family:'Barlow Condensed',sans-serif; line-height:1.02; text-transform:uppercase; }
a { color:inherit; text-decoration:none; }
button { cursor:pointer; font-family:'Manrope',sans-serif; }
::-webkit-scrollbar { width:4px; }
::-webkit-scrollbar-track { background:#0459D4; }
::-webkit-scrollbar-thumb { background:rgba(255,255,255,.3); border-radius:2px; }

/* ── Keyframes ── */
@keyframes fadeUp    { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
@keyframes fadeIn    { from{opacity:0} to{opacity:1} }
@keyframes floatY    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
@keyframes blink     { 0%,100%{opacity:1} 50%{opacity:0} }
@keyframes ticker    { from{transform:translateX(0)} to{transform:translateX(-50%)} }
@keyframes pop       { from{opacity:0;transform:scale(.88)} to{opacity:1;transform:scale(1)} }
@keyframes greenPulse{ 0%,100%{box-shadow:0 0 18px rgba(183,245,42,.35)} 50%{box-shadow:0 0 44px rgba(183,245,42,.7),0 0 90px rgba(183,245,42,.15)} }
@keyframes scanPulse { 0%,100%{opacity:.4} 50%{opacity:1} }
@keyframes particle  { 0%{transform:translateY(100vh);opacity:0} 8%{opacity:.55} 92%{opacity:.55} 100%{transform:translateY(-60px);opacity:0} }
@keyframes drawLine  { from{stroke-dashoffset:1200} to{stroke-dashoffset:0} }

/* ── Scroll animations ── */
.sa { opacity:0; transform:translateY(26px); transition:opacity .6s ease, transform .6s ease; }
.sa.in { opacity:1; transform:none; }
.sa.d1{transition-delay:.07s} .sa.d2{transition-delay:.14s} .sa.d3{transition-delay:.21s}
.sa.d4{transition-delay:.28s} .sa.d5{transition-delay:.35s} .sa.d6{transition-delay:.42s}
.sa.d7{transition-delay:.49s} .sa.d8{transition-delay:.56s}

/* ── Layout ── */
.wrap { max-width:1200px; margin:0 auto; padding:0 28px; }
section { padding:96px 0; }

/* ── Eyebrow labels ── */
.eyebrow {
  display:inline-flex; align-items:center; gap:8px;
  font-size:11px; font-weight:700;
  text-transform:uppercase; letter-spacing:2.5px; color:var(--green);
  margin-bottom:18px; font-family:'Manrope',sans-serif;
}
.eyebrow-dot { width:6px; height:6px; border-radius:50%; background:var(--green); animation:blink 1.6s infinite; }
.lime { color:var(--green); }

/* ── Buttons ── */
.btn {
  display:inline-flex; align-items:center; gap:9px;
  padding:14px 28px; border-radius:6px;
  font-size:13px; font-weight:700; border:none; letter-spacing:.6px;
  transition:all .2s ease; text-transform:uppercase;
}
.btn-lime { background:var(--green); color:#000; animation:greenPulse 3s ease-in-out infinite; }
.btn-lime:hover { transform:translateY(-2px) scale(1.02); filter:brightness(1.08); }
.btn-outline { background:transparent; color:#fff; border:1.5px solid rgba(255,255,255,.4); }
.btn-outline:hover { border-color:var(--green); color:var(--green); transform:translateY(-2px); }
.btn-ghost { background:rgba(183,245,42,.12); color:var(--green); border:1.5px solid rgba(183,245,42,.3); }
.btn-ghost:hover { background:rgba(183,245,42,.2); transform:translateY(-2px); }

/* ── NAVBAR ── */
.nav { position:fixed; top:0; left:0; right:0; z-index:900; padding:20px 0; transition:all .3s ease; }
.nav.stuck { background:rgba(4,89,212,.88); backdrop-filter:blur(20px); border-bottom:1px solid rgba(255,255,255,.12); padding:13px 0; }
.nav-row { display:flex; align-items:center; justify-content:space-between; }
.logo { display:flex; align-items:center; gap:10px; font-family:'Barlow Condensed',sans-serif; font-weight:900; font-size:21px; text-transform:uppercase; letter-spacing:.5px; color:#fff; }
.nav-links { display:flex; align-items:center; gap:36px; list-style:none; }
.nav-links a { font-size:11px; color:rgba(255,255,255,.65); font-weight:700; text-transform:uppercase; letter-spacing:1.5px; transition:color .2s; }
.nav-links a:hover { color:#fff; }
.ham { display:none; flex-direction:column; gap:5px; background:none; border:none; padding:4px; }
.ham span { display:block; width:22px; height:1.5px; background:#fff; border-radius:2px; transition:all .3s; }
.mob { display:none; position:fixed; inset:0; z-index:950; background:#0459D4; flex-direction:column; align-items:center; justify-content:center; gap:30px; }
.mob.open { display:flex; }
.mob a { font-family:'Barlow Condensed',sans-serif; font-size:30px; font-weight:900; color:#fff; text-transform:uppercase; letter-spacing:1px; transition:color .2s; }
.mob a:hover { color:var(--green); }
.mob-close { position:absolute; top:20px; right:24px; background:none; border:none; color:#fff; }
@media(max-width:768px) { .nav-links,.nav-cta { display:none; } .ham { display:flex; } }

/* ── HERO ── */
.hero { min-height:100vh; display:flex; align-items:center; position:relative; overflow:hidden; padding-top:90px; }
.hero-noise {
  position:absolute; inset:0; pointer-events:none;
  background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.04'/%3E%3C/svg%3E");
  background-size:200px 200px; opacity:.6;
}
.hero-orb { position:absolute; border-radius:50%; pointer-events:none; }
.hero-orb-l { width:560px; height:560px; left:-180px; top:50%; transform:translateY(-50%); background:radial-gradient(circle, rgba(255,255,255,.1) 0%, transparent 68%); }
.hero-orb-r { width:380px; height:380px; right:-80px; top:25%; background:radial-gradient(circle, rgba(183,245,42,.14) 0%, transparent 68%); }
.hero-grid { display:grid; grid-template-columns:1fr 1fr; gap:64px; align-items:center; position:relative; z-index:1; padding:40px 0 64px; }
.hero-pretag { display:inline-flex; align-items:center; gap:8px; padding:6px 14px; background:rgba(183,245,42,.12); border:1px solid rgba(183,245,42,.3); border-radius:4px; font-size:11px; color:var(--green); font-weight:700; text-transform:uppercase; letter-spacing:1.5px; margin-bottom:22px; }
.badge-dot { width:6px; height:6px; border-radius:50%; background:var(--green); animation:blink 1.6s infinite; }
.hero-h1 { font-size:clamp(3rem,6vw,5.5rem); font-weight:900; margin-bottom:22px; line-height:.97; color:#fff; }
.hero-sub { font-size:1.05rem; color:var(--muted); max-width:440px; line-height:1.8; margin-bottom:38px; }
.hero-btns { display:flex; gap:12px; flex-wrap:wrap; margin-bottom:46px; }
.hero-proof { display:flex; align-items:center; gap:20px; padding-top:24px; border-top:1px solid rgba(255,255,255,.18); }
.proof-num { font-family:'Barlow Condensed',sans-serif; font-size:2rem; font-weight:900; color:var(--green); line-height:1; }
.proof-txt { font-size:12px; color:var(--muted); font-weight:500; }
.proof-div { width:1px; height:34px; background:rgba(255,255,255,.18); }

/* Particles */
.particles { position:absolute; inset:0; pointer-events:none; overflow:hidden; }
.pt { position:absolute; border-radius:50%; animation:particle linear infinite; opacity:0; }

@media(max-width:1024px) { .hero-grid { grid-template-columns:1fr; gap:48px; } .hero-h1 { font-size:clamp(2.8rem,8vw,4.5rem); } }

/* ── DASHBOARD MOCKUP ── */
.mock-wrap { animation:floatY 5.5s ease-in-out infinite; position:relative; }
.mock-wrap::before { content:''; position:absolute; inset:-24px; border-radius:50%; background:radial-gradient(ellipse at center, rgba(183,245,42,.1) 0%, transparent 70%); pointer-events:none; }
.mock { background:#060D24; border:1px solid rgba(183,245,42,.22); border-radius:14px; overflow:hidden; box-shadow:0 32px 80px rgba(0,0,0,.5), 0 0 0 1px rgba(255,255,255,.02); font-size:13px; }
.mock-bar { background:rgba(183,245,42,.04); border-bottom:1px solid rgba(183,245,42,.12); padding:11px 16px; display:flex; align-items:center; justify-content:space-between; }
.mock-dots { display:flex; gap:6px; }
.mock-dot { width:9px; height:9px; border-radius:50%; }
.mock-title { font-family:'Barlow Condensed',sans-serif; font-size:11px; color:var(--green); font-weight:900; letter-spacing:2.5px; text-transform:uppercase; }
.mock-clock { font-size:11px; color:var(--muted); }
.mock-kpis { display:grid; grid-template-columns:repeat(3,1fr); background:rgba(183,245,42,.06); gap:1px; border-bottom:1px solid rgba(183,245,42,.1); }
.mock-kpi { background:#060D24; padding:14px 16px; text-align:center; }
.mock-kpi-n { font-family:'Barlow Condensed',sans-serif; font-size:24px; font-weight:900; color:var(--green); line-height:1; }
.mock-kpi-l { font-size:10px; color:var(--muted); text-transform:uppercase; letter-spacing:.8px; margin-top:2px; }
.mock-scan { margin:12px 14px 0; padding:10px 12px; background:rgba(183,245,42,.04); border:1px solid rgba(183,245,42,.18); border-radius:6px; display:flex; align-items:center; gap:10px; }
.scan-dot { width:7px; height:7px; border-radius:50%; background:var(--green); animation:scanPulse 1.4s ease-in-out infinite; }
.scan-txt { font-size:11px; color:var(--green); font-weight:700; letter-spacing:.3px; }
.mock-entries { padding:10px 14px 14px; display:flex; flex-direction:column; gap:6px; }
.mock-entry { display:flex; align-items:center; gap:10px; padding:9px 11px; background:rgba(255,255,255,.03); border:1px solid rgba(255,255,255,.05); border-radius:7px; transition:all .3s; color:#fff; }
.mock-entry.active { border-color:rgba(183,245,42,.3); background:rgba(183,245,42,.05); animation:pop .35s ease; }
.mock-av { width:30px; height:30px; border-radius:50%; flex-shrink:0; display:flex; align-items:center; justify-content:center; font-family:'Barlow Condensed',sans-serif; font-size:11px; font-weight:900; color:#fff; }
.mock-name { flex:1; font-weight:600; font-size:12.5px; }
.mock-time { font-size:10px; color:var(--muted); }
.mock-badge { font-size:10px; padding:3px 8px; border-radius:4px; font-weight:700; text-transform:uppercase; letter-spacing:.5px; }
.mock-badge.e { background:rgba(183,245,42,.12); color:var(--green); border:1px solid rgba(183,245,42,.25); }
.mock-badge.s { background:rgba(255,106,0,.1); color:#FF9040; border:1px solid rgba(255,106,0,.2); }

/* ── TICKER ── */
.ticker-wrap { border-top:1px solid rgba(255,255,255,.1); border-bottom:1px solid rgba(255,255,255,.1); background:rgba(255,255,255,.05); padding:15px 0; overflow:hidden; }
.ticker-inner { display:flex; width:max-content; animation:ticker 30s linear infinite; }
.ticker-item { display:flex; align-items:center; gap:10px; padding:0 40px; white-space:nowrap; font-family:'Barlow Condensed',sans-serif; font-size:15px; font-weight:700; color:rgba(255,255,255,.6); text-transform:uppercase; letter-spacing:1.5px; }
.ticker-sep { color:var(--green); font-size:20px; line-height:1; }

/* ── STATS ── */
.stats-section { padding:80px 0; }
.stats-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:16px; }
.stat-card { padding:36px 24px; text-align:center; background:rgba(255,255,255,.1); backdrop-filter:blur(10px); border:1px solid rgba(255,255,255,.18); border-radius:var(--r); position:relative; overflow:hidden; transition:all .3s; }
.stat-card::after { content:''; position:absolute; bottom:0; left:0; right:0; height:3px; background:var(--green); transform:scaleX(0); transform-origin:left; transition:transform .4s ease; }
.stat-card:hover { background:rgba(255,255,255,.16); border-color:rgba(183,245,42,.4); }
.stat-card:hover::after { transform:scaleX(1); }
.stat-n { font-family:'Barlow Condensed',sans-serif; font-size:clamp(2.8rem,4.5vw,4rem); font-weight:900; line-height:1; color:var(--green); display:block; margin-bottom:8px; }
.stat-l { font-size:13px; color:rgba(255,255,255,.7); font-weight:500; }
@media(max-width:720px) { .stats-grid { grid-template-columns:repeat(2,1fr); } }

/* ── PROBLEM ── */
.prob-section { background:rgba(0,0,0,.14); position:relative; overflow:hidden; }
.prob-bg-num { position:absolute; right:-10px; top:50%; transform:translateY(-50%); font-family:'Barlow Condensed',sans-serif; font-size:300px; font-weight:900; color:rgba(255,255,255,.04); line-height:1; pointer-events:none; user-select:none; }
.prob-layout { display:grid; grid-template-columns:1fr 1.4fr; gap:72px; align-items:start; }
.prob-title { font-size:clamp(2.4rem,4vw,3.8rem); font-weight:900; line-height:.97; margin-bottom:18px; color:#fff; }
.sec-sub { font-size:1rem; color:var(--muted); line-height:1.8; }
.prob-list { display:flex; flex-direction:column; gap:10px; }
.prob-item { display:flex; align-items:flex-start; gap:18px; padding:20px 22px; background:#fff; border-radius:var(--r); box-shadow:var(--card-shadow); transition:all .28s; }
.prob-item:hover { transform:translateX(5px) translateY(-2px); box-shadow:0 12px 48px rgba(0,0,0,.3); }
.prob-num { font-family:'Barlow Condensed',sans-serif; font-size:2rem; font-weight:900; color:rgba(183,245,42,.5); line-height:1; min-width:46px; transition:color .28s; }
.prob-item:hover .prob-num { color:var(--green); }
.prob-content h3 { font-size:15px; font-weight:700; margin-bottom:4px; font-family:'Manrope',sans-serif; text-transform:none; letter-spacing:0; color:#000; }
.prob-content p { font-size:13.5px; color:#555; line-height:1.65; }
@media(max-width:900px) { .prob-layout { grid-template-columns:1fr; gap:40px; } }

/* ── HOW IT WORKS ── */
.how-section { position:relative; }
.how-header { text-align:center; margin-bottom:64px; }
.how-title { font-size:clamp(2.2rem,4vw,3.5rem); font-weight:900; color:#fff; }
.steps-timeline { display:grid; grid-template-columns:repeat(4,1fr); position:relative; gap:0; }
.steps-timeline::before { content:''; position:absolute; top:40px; left:calc(100% / 8); width:calc(100% - 100% / 4); height:2px; background:linear-gradient(90deg, var(--green), rgba(183,245,42,.15)); }
.step-item { padding:0 16px; text-align:center; }
.step-num-wrap { width:42px; height:42px; border-radius:50%; background:rgba(255,255,255,.12); border:2px solid var(--green); display:flex; align-items:center; justify-content:center; margin:0 auto 18px; font-family:'Barlow Condensed',sans-serif; font-size:16px; font-weight:900; color:var(--green); position:relative; z-index:1; transition:all .3s; }
.step-item:hover .step-num-wrap { background:var(--green); color:#000; box-shadow:var(--green-glow); }
.step-item h3 { font-family:'Manrope',sans-serif; font-size:14px; font-weight:700; text-transform:none; letter-spacing:0; margin-bottom:6px; color:#fff; }
.step-item p { font-size:12px; color:var(--muted); line-height:1.65; }
.conn-svg { margin:20px 0; height:24px; }
.conn-path { stroke:url(#howGrad); stroke-width:1.5; fill:none; stroke-dasharray:1200; stroke-dashoffset:1200; transition:stroke-dashoffset 2.4s ease; }
.conn-path.drawn { stroke-dashoffset:0; }
@media(max-width:900px) { .steps-timeline { grid-template-columns:repeat(2,1fr); gap:32px; } .steps-timeline::before { display:none; } }
@media(max-width:540px) { .steps-timeline { grid-template-columns:1fr; } }

/* ── FEATURES ── */
.feat-section { background:rgba(0,0,0,.12); }
.feat-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:16px; margin-top:52px; }
.feat-card { padding:32px; background:#fff; border-radius:var(--r); box-shadow:var(--card-shadow); transition:all .28s; position:relative; overflow:hidden; }
.feat-card::before { content:''; position:absolute; top:0; left:0; width:4px; height:0; background:var(--orange); transition:height .4s ease; }
.feat-card:hover::before { height:100%; }
.feat-card:hover { transform:translateY(-6px); box-shadow:0 16px 56px rgba(0,0,0,.3); }
.feat-ic { width:50px; height:50px; border-radius:10px; display:flex; align-items:center; justify-content:center; margin-bottom:18px; }
.feat-card h3 { font-size:17px; font-weight:900; margin-bottom:10px; color:#000; }
.feat-card p { font-size:13.5px; color:#555; line-height:1.7; font-family:'Manrope',sans-serif; text-transform:none; letter-spacing:0; }
@media(max-width:960px) { .feat-grid { grid-template-columns:repeat(2,1fr); } }
@media(max-width:580px) { .feat-grid { grid-template-columns:1fr; } }

/* ── TESTIMONIALS ── */
.testi-section { position:relative; overflow:hidden; }
.testi-bg { position:absolute; inset:0; background:radial-gradient(ellipse 55% 60% at 10% 50%, rgba(255,255,255,.05) 0%, transparent 60%), radial-gradient(ellipse 40% 60% at 90% 50%, rgba(183,245,42,.04) 0%, transparent 60%); pointer-events:none; }
.testi-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:16px; margin-top:52px; }
.testi-card { padding:30px; background:#fff; border-radius:var(--r); box-shadow:var(--card-shadow); transition:all .28s; }
.testi-card:hover { transform:translateY(-5px); box-shadow:0 16px 56px rgba(0,0,0,.28); }
.testi-quote { color:var(--green); margin-bottom:16px; }
.testi-text { font-size:14px; color:#333; line-height:1.8; margin-bottom:22px; font-style:italic; }
.testi-author { display:flex; align-items:center; gap:12px; }
.testi-av { width:38px; height:38px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-family:'Barlow Condensed',sans-serif; font-size:14px; font-weight:900; color:#fff; flex-shrink:0; }
.testi-name { font-size:13px; font-weight:700; color:#000; }
.testi-role { font-size:12px; color:#777; }
@media(max-width:860px) { .testi-grid { grid-template-columns:1fr; } }

/* ── PRICING ── */
.price-section { background:rgba(0,0,0,.14); }
.price-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:16px; margin-top:52px; align-items:center; }
.price-card { padding:36px; background:#fff; border-left:4px solid transparent; border-radius:12px; position:relative; transition:all .28s; box-shadow:var(--card-shadow); }
.price-card:hover { transform:translateY(-6px); box-shadow:0 16px 56px rgba(0,0,0,.3); border-left-color:var(--orange); }
.price-card.pop { border-left:4px solid var(--green); box-shadow:0 0 40px rgba(183,245,42,.22), var(--card-shadow); }
.price-card.pop:hover { border-left-color:var(--green); }
.pop-label { position:absolute; top:-11px; left:28px; padding:4px 14px; background:var(--green); color:#000; border-radius:4px; font-family:'Barlow Condensed',sans-serif; font-size:11px; font-weight:900; text-transform:uppercase; letter-spacing:1px; }
.plan-tier { font-family:'Barlow Condensed',sans-serif; font-size:11px; font-weight:900; text-transform:uppercase; letter-spacing:2.5px; color:#777; margin-bottom:4px; }
.plan-cap { font-size:13px; color:var(--blue1); margin-bottom:20px; font-weight:600; }
.plan-amount { font-family:'Barlow Condensed',sans-serif; font-size:3.2rem; font-weight:900; line-height:1; color:#000; }
.plan-period { font-size:14px; color:#777; }
.plan-inst { font-size:13px; color:#777; margin:8px 0 24px; padding-bottom:24px; border-bottom:1px solid #eee; }
.plan-inst em { color:var(--blue1); font-style:normal; font-weight:700; }
.plan-feats { list-style:none; display:flex; flex-direction:column; gap:10px; margin-bottom:28px; }
.plan-feats li { display:flex; align-items:center; gap:10px; font-size:13.5px; color:#555; }
.plan-feats li svg { color:var(--blue1); flex-shrink:0; }
.price-note { text-align:center; margin-top:28px; font-size:13px; color:rgba(255,255,255,.65); }
.price-note em { color:var(--green); font-style:normal; }
@media(max-width:1000px) { .price-grid { grid-template-columns:1fr; max-width:440px; margin-left:auto; margin-right:auto; } }

/* ── FAQ ── */
.faq-list { margin:52px auto 0; max-width:800px; display:flex; flex-direction:column; gap:8px; }
.faq-item { background:#fff; border-radius:var(--r); overflow:hidden; box-shadow:0 4px 20px rgba(0,0,0,.15); transition:all .25s; }
.faq-item.open { box-shadow:0 4px 24px rgba(183,245,42,.25); }
.faq-q { display:flex; align-items:center; justify-content:space-between; width:100%; padding:18px 22px; background:none; border:none; color:#000; font-size:14.5px; font-weight:600; text-align:left; gap:14px; transition:color .2s; }
.faq-q:hover { color:var(--blue1); }
.faq-chev { transition:transform .3s; color:#aaa; flex-shrink:0; }
.faq-chev.r { transform:rotate(180deg); color:var(--blue1); }
.faq-body { max-height:0; overflow:hidden; transition:max-height .4s ease, padding .3s; }
.faq-body.open { max-height:240px; padding-bottom:18px; }
.faq-body p { padding:0 22px; font-size:13.5px; color:#555; line-height:1.75; }

/* ── CTA FINAL ── */
.cta-section { position:relative; overflow:hidden; background:rgba(0,0,0,.2); border-top:1px solid rgba(255,255,255,.1); }
.cta-grid-bg { position:absolute; inset:0; background-image:linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px); background-size:52px 52px; opacity:.5; pointer-events:none; }
.cta-orb { position:absolute; width:700px; height:700px; left:50%; top:50%; transform:translate(-50%,-50%); background:radial-gradient(circle, rgba(183,245,42,.08) 0%, transparent 60%); pointer-events:none; }
.cta-inner { position:relative; z-index:1; text-align:center; max-width:720px; margin:0 auto; padding:110px 0; }
.cta-h2 { font-size:clamp(2.4rem,5.5vw,4.6rem); font-weight:900; margin-bottom:18px; line-height:.97; color:#fff; }
.cta-sub { font-size:1.05rem; color:var(--muted); margin-bottom:44px; }
.cta-btns { display:flex; gap:14px; justify-content:center; flex-wrap:wrap; margin-bottom:32px; }
.cta-chips { display:flex; gap:10px; justify-content:center; flex-wrap:wrap; }
.chip { display:flex; align-items:center; gap:8px; padding:9px 18px; border-radius:6px; background:rgba(255,255,255,.08); border:1px solid rgba(255,255,255,.15); color:rgba(255,255,255,.65); font-size:13px; font-weight:600; transition:all .2s; }
.chip:hover { background:rgba(183,245,42,.1); color:var(--green); border-color:rgba(183,245,42,.3); }

/* ── FOOTER ── */
.foot { background:rgba(0,0,0,.25); border-top:1px solid rgba(255,255,255,.1); padding:56px 0 28px; }
.foot-grid { display:grid; grid-template-columns:2fr 1fr 1fr; gap:48px; margin-bottom:44px; }
.foot-brand p { font-size:13.5px; color:var(--muted); margin-top:12px; max-width:270px; line-height:1.75; }
.foot-col h4 { font-family:'Barlow Condensed',sans-serif; font-size:12px; font-weight:900; text-transform:uppercase; letter-spacing:2px; color:#fff; margin-bottom:16px; }
.foot-col ul { list-style:none; display:flex; flex-direction:column; gap:10px; }
.foot-col ul li a { font-size:13.5px; color:var(--muted); transition:color .2s; }
.foot-col ul li a:hover { color:var(--green); }
.foot-bottom { border-top:1px solid rgba(255,255,255,.1); padding-top:22px; display:flex; align-items:center; justify-content:space-between; gap:12px; flex-wrap:wrap; }
.foot-bottom p { font-size:12.5px; color:var(--muted); }
.foot-bottom a { color:var(--green); }
@media(max-width:720px) { .foot-grid { grid-template-columns:1fr; gap:28px; } .foot-bottom { flex-direction:column; text-align:center; } }
`

const GlobalStyles = () => <style dangerouslySetInnerHTML={{ __html: css }} />

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

const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: `${(i * 5.6) % 100}%`,
  size: `${1.5 + (i % 3)}px`,
  dur:  `${10 + (i % 6) * 1.8}s`,
  delay:`${(i * 0.65) % 9}s`,
  color: i % 3 === 0 ? '#B7F52A' : i % 3 === 1 ? 'rgba(255,255,255,.35)' : 'rgba(155,139,239,.5)',
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
  { name: 'Sofía Ramírez',  init: 'SR', color: '#6D28D9', time: '08:14', type: 'e' },
  { name: 'Carlos Mendoza', init: 'CM', color: '#0E7490', time: '08:19', type: 'e' },
  { name: 'Ana García',     init: 'AG', color: '#B45309', time: '08:25', type: 'e' },
  { name: 'Luis Torres',    init: 'LT', color: '#065F46', time: '14:02', type: 's' },
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
          <div className="mock-title">Check-in Escolar</div>
          <div className="mock-clock">{clock}</div>
        </div>
        <div className="mock-kpis">
          <div className="mock-kpi"><div className="mock-kpi-n">23</div><div className="mock-kpi-l">Presentes</div></div>
          <div className="mock-kpi"><div className="mock-kpi-n">2</div><div className="mock-kpi-l">Ausentes</div></div>
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
    const h = () => setStuck(window.scrollY > 50)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])

  return (
    <>
      <nav className={`nav ${stuck ? 'stuck' : ''}`}>
        <div className="wrap">
          <div className="nav-row">
            <a href="#inicio" className="logo">
              <img src={logoImg} alt="Check-in Escolar" style={{ height: 34, width: 'auto', display: 'block' }} />
              Check-in Escolar
            </a>
            <ul className="nav-links">
              {NAV_ITEMS.map(([l, h]) => <li key={l}><a href={h}>{l}</a></li>)}
            </ul>
            <a href="#precios" className="btn btn-lime nav-cta" style={{ padding: '10px 20px', fontSize: '12px' }}>
              Demo gratuita
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
        <a href="#precios" className="btn btn-lime" onClick={() => setMob(false)}>
          Demo gratuita
        </a>
      </div>
    </>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="hero" id="inicio">
      <div className="hero-noise" />
      <div className="hero-orb hero-orb-l" />
      <div className="hero-orb hero-orb-r" />
      <Particles />
      <div className="wrap">
        <div className="hero-grid">
          <div>
            <h1 className="hero-h1" style={{ animation: 'fadeUp .65s .1s ease both' }}>
              Tu escuela<br />
              siempre sabe<br />
              <span className="lime">quién llegó.</span>
            </h1>
            <p className="hero-sub" style={{ animation: 'fadeUp .65s .2s ease both' }}>
              Reconocimiento facial que notifica a los padres en segundos.
              Sin que el maestro mueva un dedo.
            </p>
            <div className="hero-btns" style={{ animation: 'fadeUp .65s .3s ease both' }}>
              <a href="#precios"       className="btn btn-lime"><Zap size={14} /> Ver demo gratuita</a>
              <a href="#como-funciona" className="btn btn-outline">Cómo funciona <ArrowRight size={14} /></a>
            </div>
            <div className="hero-proof" style={{ animation: 'fadeUp .65s .42s ease both' }}>
              <div>
                <div className="proof-num">500+</div>
                <div className="proof-txt">Alumnos registrados</div>
              </div>
              <div className="proof-div" />
              <div>
                <div className="proof-num">2 seg</div>
                <div className="proof-txt">Reconocimiento</div>
              </div>
              <div className="proof-div" />
              <div>
                <div className="proof-num">100%</div>
                <div className="proof-txt">Notificaciones</div>
              </div>
            </div>
          </div>
          <div style={{ animation: 'fadeIn .9s .35s ease both, floatY 5.5s 1s ease-in-out infinite' }}>
            <img
              src={inicioImg}
              alt="Panel de reconocimiento facial"
              style={{ width: '100%', height: 'auto', objectFit: 'contain', display: 'block', borderRadius: '20px' }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Ticker ───────────────────────────────────────────────────────────────────

const TICKER_ITEMS = [
  { text: 'Reconocimiento en 2 segundos' },
  { text: 'Notificación WhatsApp instantánea' },
  { text: 'Panel web en tiempo real' },
  { text: 'Sin instalación compleja' },
  { text: 'Datos 100% locales' },
  { text: 'Alertas automáticas de ausencia' },
  { text: 'Reportes Excel con un clic' },
  { text: 'Soporte técnico incluido' },
]

function TickerBar() {
  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS]
  return (
    <div className="ticker-wrap">
      <div className="ticker-inner">
        {doubled.map((item, i) => (
          <div key={i} className="ticker-item">
            <span className="ticker-sep">◆</span>
            {item.text}
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Stats ────────────────────────────────────────────────────────────────────

function StatItem({ val, suffix, label, go }) {
  const n = useCounter(val, 2100, go)
  return (
    <div className="stat-card">
      <span className="stat-n">{n}{suffix}</span>
      <div className="stat-l">{label}</div>
    </div>
  )
}

function Stats() {
  const [ref, vis] = useInView(0.2)
  return (
    <section className="stats-section" ref={ref}>
      <div className="wrap">
        <div className="stats-grid">
          <StatItem val={500} suffix="+"    label="Alumnos registrados"      go={vis} />
          <StatItem val={2}   suffix=" seg" label="Tiempo de reconocimiento"  go={vis} />
          <StatItem val={100} suffix="%"    label="Notificaciones entregadas" go={vis} />
          <StatItem val={0}   suffix=""     label="Llamadas manuales por día" go={vis} />
        </div>
      </div>
    </section>
  )
}

// ─── Problem ──────────────────────────────────────────────────────────────────

const PROBLEMS = [
  { title: 'Tiempo perdido en clase',        desc: 'Pasar lista en cada aula consume 5–10 minutos diarios de clase productiva.' },
  { title: 'Padres se enteran tarde',         desc: 'Las familias descubren horas después si su hijo no llegó a la escuela.' },
  { title: 'Sin evidencia del momento',       desc: 'No existe registro visual de quién entró ni a qué hora exactamente.' },
  { title: 'Reportes que tardan horas',       desc: 'Generar un historial mensual de asistencia requiere trabajo manual tedioso.' },
  { title: 'Nadie alerta si no llega',        desc: 'Si el alumno no aparece, el sistema no hace nada. El director tampoco.' },
]

function Problem() {
  const [ref, vis] = useInView()
  return (
    <section id="problema" className="prob-section">
      <div className="prob-bg-num" aria-hidden="true">01</div>
      <div className="wrap" ref={ref}>
        <div className="prob-layout">
          <div>
            <div className={`eyebrow sa ${vis ? 'in' : ''}`}>
              <div className="eyebrow-dot" /> El problema
            </div>
            <h2 className={`prob-title sa ${vis ? 'in d1' : ''}`}>
              Pasar lista<br />
              a mano es<br />
              del siglo pasado
            </h2>
            <p className={`sec-sub sa ${vis ? 'in d2' : ''}`}>
              Las escuelas modernas merecen procesos automáticos
              que ahorren tiempo y tranquilicen a los padres de familia.
            </p>
          </div>
          <div className="prob-list">
            {PROBLEMS.map((p, i) => (
              <div key={p.title} className={`prob-item sa ${vis ? `in d${i + 1}` : ''}`}>
                <div className="prob-num">{String(i + 1).padStart(2, '0')}</div>
                <div className="prob-content">
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── How It Works ─────────────────────────────────────────────────────────────

const STEPS = [
  { ic: <Camera size={18} />,       title: 'Alumno llega',        desc: 'Pasa frente a la cámara en la entrada de la escuela' },
  { ic: <Zap size={18} />,          title: 'Detección facial',    desc: 'El sistema detecta el rostro en menos de 1 segundo' },
  { ic: <Target size={18} />,       title: 'Identificación',      desc: 'Compara con la base de datos y reconoce al alumno' },
  { ic: <CheckCircle size={18} />,  title: 'Registro automático', desc: 'Guarda nombre, hora exacta y foto del momento' },
  { ic: <MessageCircle size={18} />, title: 'WhatsApp a papás',   desc: '"Tu hijo llegó a las 08:14 ✅" — mensaje inmediato' },
  { ic: <Smartphone size={18} />,   title: 'Foto a Telegram',     desc: 'El administrador recibe la foto al instante' },
  { ic: <Monitor size={18} />,      title: 'Panel actualizado',   desc: 'Dashboard web refleja la asistencia en tiempo real' },
  { ic: <Bell size={18} />,         title: 'Alerta si no llega',  desc: 'Si pasa la hora límite, notifica automáticamente' },
]

function HowItWorks() {
  const [ref, vis] = useInView(0.08)
  return (
    <section id="como-funciona" className="how-section" ref={ref}>
      <div className="wrap">
        <div className="how-header">
          <div className={`eyebrow sa ${vis ? 'in' : ''}`} style={{ justifyContent: 'center', display: 'flex' }}>
            <div className="eyebrow-dot" /> Flujo del sistema
          </div>
          <h2 className={`how-title sa ${vis ? 'in d1' : ''}`}>
            Del portón a WhatsApp<br />
            <span className="lime">en menos de 2 segundos</span>
          </h2>
        </div>

        <div className={`steps-timeline sa ${vis ? 'in d2' : ''}`}>
          {STEPS.slice(0, 4).map((s, i) => (
            <div key={s.title} className="step-item">
              <div className="step-num-wrap">{i + 1}</div>
              <div style={{ color: 'var(--lime)', textAlign: 'center', marginBottom: 12 }}>{s.ic}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>

        <div className={`conn-svg sa ${vis ? 'in d3' : ''}`} style={{ margin: '20px 0' }}>
          <svg viewBox="0 0 1200 24" preserveAspectRatio="none" height="24" width="100%">
            <defs>
              <linearGradient id="howGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%"   stopColor="#C8FF00" />
                <stop offset="100%" stopColor="rgba(200,255,0,.15)" />
              </linearGradient>
            </defs>
            <path
              d="M0 12 Q300 3, 600 12 Q900 21, 1200 12"
              className={`conn-path ${vis ? 'drawn' : ''}`}
            />
          </svg>
        </div>

        <div className={`steps-timeline sa ${vis ? 'in d4' : ''}`}>
          {STEPS.slice(4).map((s, i) => (
            <div key={s.title} className="step-item">
              <div className="step-num-wrap" style={{ borderColor: 'rgba(200,255,0,.4)', color: 'rgba(200,255,0,.6)' }}>{i + 5}</div>
              <div style={{ color: 'rgba(200,255,0,.6)', textAlign: 'center', marginBottom: 12 }}>{s.ic}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Features ─────────────────────────────────────────────────────────────────

const FEATURES = [
  { ic: <Camera size={22} />,          title: 'Reconocimiento Facial',    desc: 'Detección automática al pasar frente a la cámara. Compatible con cámaras IP WiFi y USB. Reconexión automática ante fallos.', c: '#9B8BEF', bg: 'rgba(155,139,239,.1)',  b: 'rgba(155,139,239,.22)' },
  { ic: <MessageCircle size={22} />,   title: 'Notificaciones WhatsApp',  desc: 'Mensaje instantáneo al teléfono de mamá o papá en el momento exacto en que el alumno registra su entrada.', c: '#B7F52A', bg: 'rgba(183,245,42,.1)', b: 'rgba(183,245,42,.22)' },
  { ic: <Monitor size={22} />,         title: 'Panel Web Tiempo Real',    desc: 'Dashboard con estadísticas del día, actividad reciente y gestión completa de alumnos desde cualquier navegador.', c: '#0459D4', bg: 'rgba(4,89,212,.1)', b: 'rgba(4,89,212,.22)' },
  { ic: <FileSpreadsheet size={22} />, title: 'Reportes Excel',           desc: 'Exporta el historial de asistencia con un clic en formato .xlsx. Filtrable por fecha y alumno. Compatible con Google Sheets.', c: '#9B8BEF', bg: 'rgba(155,139,239,.1)',  b: 'rgba(155,139,239,.22)' },
  { ic: <Bell size={22} />,            title: 'Alertas Proactivas',       desc: 'Si un alumno no llega antes de su hora límite, el sistema notifica automáticamente al administrador.', c: '#FF6A00', bg: 'rgba(255,106,0,.1)',  b: 'rgba(255,106,0,.22)' },
  { ic: <Lock size={22} />,            title: 'Datos 100% Locales',       desc: 'Toda la información se almacena en la computadora de la escuela. No se suben fotos a internet. Privacidad garantizada.', c: '#0459D4', bg: 'rgba(4,89,212,.1)', b: 'rgba(4,89,212,.22)' },
]

function Features() {
  const [ref, vis] = useInView()
  return (
    <section id="caracteristicas" className="feat-section">
      <div className="wrap" ref={ref}>
        <div className={`sa ${vis ? 'in' : ''}`}>
          <div className="eyebrow"><div className="eyebrow-dot" /> Características</div>
          <h2 style={{ fontSize: 'clamp(2rem,3.8vw,3.2rem)', fontWeight: 900, marginBottom: 8 }}>
            Todo lo que tu escuela necesita
          </h2>
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

// ─── Testimonials ─────────────────────────────────────────────────────────────

const TESTIMONIALS = [
  {
    text: '"Antes tardábamos casi 15 minutos pasando lista. Ahora los papás reciben el mensaje antes de que yo llegue a mi salón. Es impresionante."',
    name: 'Profra. Elena Vásquez',
    role: 'Directora, Primaria Benito Juárez — Monterrey',
    init: 'EV', color: '#6D28D9',
  },
  {
    text: '"El primer día que un papá me llamó para agradecerme por el mensaje de WhatsApp, supe que esto iba a cambiar la relación con toda la comunidad escolar."',
    name: 'Lic. Rodrigo Salinas',
    role: 'Director Administrativo, Colegio del Valle — CDMX',
    init: 'RS', color: '#0E7490',
  },
  {
    text: '"La instalación fue rápida y el sistema lleva 4 meses sin un solo fallo. El soporte responde en minutos por WhatsApp. Totalmente recomendado."',
    name: 'Mtra. Carmen Fuentes',
    role: 'Subdirectora, Instituto Américas — Guadalajara',
    init: 'CF', color: '#065F46',
  },
]

function Testimonials() {
  const [ref, vis] = useInView()
  return (
    <section className="testi-section" id="testimonios">
      <div className="testi-bg" />
      <div className="wrap" ref={ref}>
        <div className={`sa ${vis ? 'in' : ''}`} style={{ textAlign: 'center' }}>
          <div className="eyebrow" style={{ justifyContent: 'center', display: 'flex' }}>
            <div className="eyebrow-dot" /> Directores que ya lo usan
          </div>
          <h2 style={{ fontSize: 'clamp(2rem,3.8vw,3.2rem)', fontWeight: 900 }}>
            Escuelas que dejaron de<br />
            <span className="lime">pasar lista a mano</span>
          </h2>
        </div>
        <div className="testi-grid">
          {TESTIMONIALS.map((t, i) => (
            <div key={t.name} className={`testi-card sa ${vis ? `in d${i + 1}` : ''}`}>
              <div className="testi-quote"><Quote size={24} /></div>
              <p className="testi-text">{t.text}</p>
              <div className="testi-author">
                <div className="testi-av" style={{ background: t.color }}>{t.init}</div>
                <div>
                  <div className="testi-name">{t.name}</div>
                  <div className="testi-role">{t.role}</div>
                </div>
              </div>
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
    <section id="precios" className="price-section">
      <div className="wrap" ref={ref}>
        <div className={`sa ${vis ? 'in' : ''}`} style={{ textAlign: 'center' }}>
          <div className="eyebrow" style={{ justifyContent: 'center', display: 'flex' }}>
            <div className="eyebrow-dot" /> Precios
          </div>
          <h2 style={{ fontSize: 'clamp(2rem,3.8vw,3.2rem)', fontWeight: 900, marginBottom: 10 }}>
            Invierte menos de lo que crees
          </h2>
          <p className="sec-sub" style={{ margin: '0 auto' }}>
            Instalación rápida, soporte incluido, sin contratos largos ni sorpresas.
          </p>
        </div>
        <div className="price-grid">
          {PLANS.map((p, i) => (
            <div key={p.tier} className={`price-card ${p.pop ? 'pop' : ''} sa ${vis ? `in d${i + 1}` : ''}`}>
              {p.pop && <div className="pop-label">⚡ Más popular</div>}
              <div className="plan-tier">{p.tier}</div>
              <div className="plan-cap">{p.cap}</div>
              <div>
                <span className="plan-amount">{p.price}</span>
                <span className="plan-period"> MXN/mes</span>
              </div>
              <div className="plan-inst">Instalación única: <em>{p.inst} MXN</em></div>
              <ul className="plan-feats">
                {p.feats.map(f => <li key={f}><Check size={13} /> {f}</li>)}
              </ul>
              <a
                href="#contacto"
                className={`btn ${p.pop ? 'btn-lime' : 'btn-outline'}`}
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
    a: 'El sistema detecta y registra alumnos al pasar de uno en uno o en pequeños grupos, sin límite técnico de alumnos registrados en la base de datos.' },
  { q: '¿Qué sucede si la cámara falla o se va la luz?',
    a: 'El sistema tiene reconexión automática. Al recuperarse la cámara o el suministro eléctrico, retoma el funcionamiento inmediatamente sin pérdida de datos históricos.' },
  { q: '¿Puedo usar la cámara que ya tiene la escuela?',
    a: 'Si la escuela cuenta con una cámara USB compatible o una cámara IP con soporte RTSP, se puede evaluar la integración sin costo adicional durante la visita de instalación.' },
  { q: '¿La mensualidad incluye soporte y actualizaciones?',
    a: 'Sí. Todas las mejoras y nuevas funciones se incluyen en la mensualidad activa. El soporte técnico está disponible por WhatsApp en horario de lunes a viernes.' },
  { q: '¿Puedo cancelar el servicio cuando quiera?',
    a: 'El servicio opera mes a mes. Puedes cancelar con 15 días de aviso previo. Los datos históricos quedan disponibles para exportar antes del cierre.' },
]

function FAQ() {
  const [open, setOpen] = useState(null)
  const [ref, vis] = useInView()
  return (
    <section id="faq">
      <div className="wrap" ref={ref}>
        <div className={`sa ${vis ? 'in' : ''}`} style={{ textAlign: 'center' }}>
          <div className="eyebrow" style={{ justifyContent: 'center', display: 'flex' }}>
            <div className="eyebrow-dot" /> Preguntas frecuentes
          </div>
          <h2 style={{ fontSize: 'clamp(2rem,3.8vw,3.2rem)', fontWeight: 900 }}>
            Resolvemos tus dudas
          </h2>
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
    <section id="contacto" className="cta-section">
      <div className="cta-grid-bg" />
      <div className="cta-orb" />
      <div className="wrap" ref={ref}>
        <div className={`cta-inner sa ${vis ? 'in' : ''}`}>
          <div className="eyebrow" style={{ justifyContent: 'center', display: 'flex', marginBottom: 22 }}>
            <div className="eyebrow-dot" /> Empieza hoy
          </div>
          <h2 className="cta-h2">
            ¿Tu escuela todavía<br />
            <span className="lime">pasa lista a mano?</span>
          </h2>
          <p className="cta-sub">
            Instalación en 2 días. Sin contratos. Sin sorpresas.
          </p>
          <div className="cta-btns">
            <a href="https://wa.me/521XXXXXXXXXX" className="btn btn-lime">
              <Zap size={14} /> Solicitar instalación
            </a>
            <a href="mailto:contacto@checkinescolar.mx" className="btn btn-outline">
              <Mail size={14} /> Enviar correo
            </a>
          </div>
          <div className="cta-chips">
            <div className="chip"><MessageCircle size={14} style={{ color: '#25D366' }} /> WhatsApp directo</div>
            <div className="chip"><Smartphone size={14} style={{ color: '#229ED9' }} /> Telegram</div>
            <div className="chip"><Shield size={14} style={{ color: 'var(--lime)' }} /> Sin compromiso</div>
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
              <img src={logoImg} alt="Check-in Escolar" style={{ height: 34, width: 'auto', display: 'block' }} />
              Check-in Escolar
            </div>
            <p>Sistema de asistencia por reconocimiento facial. Tecnología accesible para instituciones educativas mexicanas.</p>
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
        <TickerBar />
        <Stats />
        <Problem />
        <HowItWorks />
        <Features />
        <Testimonials />
        <Pricing />
        <FAQ />
        <CTAFinal />
      </main>
      <Footer />
    </>
  )
}
