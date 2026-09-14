(()=>{"use strict";
const qs=(s,c=document)=>c.querySelector(s),qsa=(s,c=document)=>[...c.querySelectorAll(s)];
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const header=qs('.site-header');
addEventListener('scroll',()=>header?.classList.toggle('scrolled',scrollY>24),{passive:true});
const menu=qs('.menu'),nav=qs('.navlinks');
menu?.addEventListener('click',()=>{const open=nav?.classList.toggle('open');menu.setAttribute('aria-expanded',String(!!open))});
qsa('.navlinks a').forEach(a=>a.addEventListener('click',()=>nav?.classList.remove('open')));

/* Progressive enhancement: text is readable before JS. Motion only adds a small transform. */
if(!reduce&&'IntersectionObserver' in window){
 const els=qsa('.reveal,.process-card,.proof-item,.timeline-card,.capability,.media-panel');
 els.forEach(el=>el.classList.add('motion-reveal'));
 const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');io.unobserve(e.target)}}),{threshold:.08,rootMargin:'0px 0px -3% 0px'});
 els.forEach(el=>io.observe(el));
}

/* Service slider: one inexpensive timer, paused when tab is hidden. */
const cards=qsa('.service-card'),dots=qsa('.dot'),bar=qs('.service-progress span');
let cur=0,timer=null,paused=false,preloadTimer=null;const SLIDE_MS=7000;
function preloadNext(){clearTimeout(preloadTimer);if(!cards.length||cards.length<2)return;preloadTimer=setTimeout(()=>{const next=(cur+1)%cards.length;const img=qs('img',cards[next]);const src=img?.currentSrc||img?.src;if(!src)return;const warm=new Image();warm.decoding='async';warm.src=src},650)}
function show(i){if(!cards.length)return;cur=(i+cards.length)%cards.length;cards.forEach((c,n)=>{c.classList.toggle('active',n===cur);c.setAttribute('aria-hidden',String(n!==cur))});dots.forEach((d,n)=>d.classList.toggle('active',n===cur));if(bar&&!reduce){bar.style.transition='none';bar.style.width='0%';requestAnimationFrame(()=>{bar.style.transition=`width ${SLIDE_MS-250}ms linear`;bar.style.width='100%'})}preloadNext()}
function restart(){clearInterval(timer);if(!paused&&!reduce&&!document.hidden&&cards.length>1)timer=setInterval(()=>show(cur+1),SLIDE_MS)}
qs('.slider-next')?.addEventListener('click',()=>{show(cur+1);restart()});
qs('.slider-prev')?.addEventListener('click',()=>{show(cur-1);restart()});
dots.forEach((d,i)=>d.addEventListener('click',()=>{show(i);restart()}));
qs('.pause')?.addEventListener('click',e=>{paused=!paused;e.currentTarget.textContent=paused?'▶':'Ⅱ';e.currentTarget.setAttribute('aria-label',paused?'Resume automatic rotation':'Pause automatic rotation');restart()});
document.addEventListener('visibilitychange',restart);show(0);restart();

/* Appointment modal */
const modal=qs('#appointmentModal');
function openModal(){if(!modal)return;modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.classList.add('modal-open');setTimeout(()=>qs('input[name="name"]',modal)?.focus(),40)}
function closeModal(){modal?.classList.remove('open');modal?.setAttribute('aria-hidden','true');document.body.classList.remove('modal-open')}
qsa('[data-book]').forEach(b=>b.addEventListener('click',e=>{e.preventDefault();openModal()}));
qsa('[data-modal-close]').forEach(b=>b.addEventListener('click',closeModal));
addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});

/* WhatsApp concierge */
const waBtn=qs('.wa-launcher'),waPanel=qs('.wa-panel');
waBtn?.addEventListener('click',()=>{const open=waPanel?.classList.toggle('open');waBtn.setAttribute('aria-expanded',String(!!open))});
const sendWA=t=>window.open('https://wa.me/966549187860?text='+encodeURIComponent(t),'_blank','noopener');
qsa('.wa-option').forEach(b=>b.addEventListener('click',()=>sendWA(b.dataset.message||b.textContent.trim())));
qs('.wa-custom')?.addEventListener('submit',e=>{e.preventDefault();const input=qs('input',e.currentTarget),v=input?.value.trim();if(v)sendWA('Hello ABUHANI.TECH, '+v)});
})();