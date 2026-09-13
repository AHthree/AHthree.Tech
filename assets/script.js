
(()=>{"use strict";
const qs=(s,c=document)=>c.querySelector(s), qsa=(s,c=document)=>[...c.querySelectorAll(s)];
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const pre=qs('#preloader');document.body.classList.add('loading');addEventListener('load',()=>setTimeout(()=>{pre?.classList.add('done');document.body.classList.remove('loading')},380));
const header=qs('.site-header');addEventListener('scroll',()=>header?.classList.toggle('scrolled',scrollY>24),{passive:true});
const menu=qs('.menu'), nav=qs('.navlinks');menu?.addEventListener('click',()=>{const o=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(o))});qsa('.navlinks a').forEach(a=>a.addEventListener('click',()=>nav?.classList.remove('open')));
// Ambient canvas with parallax star/particle field
const canvas=qs('#space'),ctx=canvas?.getContext('2d');let W=innerWidth,H=innerHeight,dpr=Math.min(devicePixelRatio||1,2),pts=[],mx=W/2,my=H/2;
function resize(){if(!ctx)return;W=innerWidth;H=innerHeight;dpr=Math.min(devicePixelRatio||1,2);canvas.width=W*dpr;canvas.height=H*dpr;canvas.style.width=W+'px';canvas.style.height=H+'px';ctx.setTransform(dpr,0,0,dpr,0,0);pts=Array.from({length:Math.min(260,Math.max(90,Math.floor(W/5)))},()=>({x:Math.random()*W,y:Math.random()*H,z:.18+Math.random()*.82,r:.2+Math.random()*1.25,p:Math.random()*6.28}))}
function paint(t=0){if(!ctx)return;ctx.clearRect(0,0,W,H);for(const p of pts){p.y+=.025+p.z*.045;if(p.y>H+4)p.y=-4;const x=p.x+(mx-W/2)*.009*p.z,y=p.y+(my-H/2)*.009*p.z;ctx.beginPath();ctx.arc(x,y,p.r*p.z,0,6.29);ctx.fillStyle=`rgba(233,221,182,${.12+.38*p.z})`;ctx.fill()}if(!reduced)requestAnimationFrame(paint)}addEventListener('resize',resize);addEventListener('pointermove',e=>{mx=e.clientX;my=e.clientY},{passive:true});resize();paint();
// Reveal observer
const reveals=qsa('.reveal');if('IntersectionObserver'in window&&!reduced){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.1});reveals.forEach(x=>io.observe(x))}else reveals.forEach(x=>x.classList.add('in'));
// Service slider — cinematic automatic presentation
const cards=qsa('.service-card'),dots=qsa('.dot');
let cur=0,timer=null,paused=false;
const bar=qs('.service-progress span');
const SLIDE_MS=5600;

function show(i, direction=1){
  if(!cards.length)return;
  const previous=cur;
  cur=(i+cards.length)%cards.length;
  cards.forEach((c,n)=>{
    c.classList.toggle('active',n===cur);
    c.dataset.direction=direction>0?'next':'prev';
  });
  dots.forEach((d,n)=>d.classList.toggle('active',n===cur));
  if(bar){
    bar.style.transition='none';
    bar.style.width='0%';
    requestAnimationFrame(()=>{
      bar.style.transition=`width ${SLIDE_MS-250}ms linear`;
      bar.style.width='100%';
    });
  }
}

function auto(){
  clearInterval(timer);
  if(!reduced&&!paused) timer=setInterval(()=>show(cur+1,1),SLIDE_MS);
}

qs('.slider-next')?.addEventListener('click',()=>{
  show(cur+1,1); auto();
});
qs('.slider-prev')?.addEventListener('click',()=>{
  show(cur-1,-1); auto();
});
dots.forEach((d,i)=>d.addEventListener('click',()=>{
  show(i,i>=cur?1:-1); auto();
}));

const pause=qs('.pause');
pause?.addEventListener('click',()=>{
  paused=!paused;
  pause.textContent=paused?'▶':'Ⅱ';
  pause.setAttribute('aria-label',paused?'Resume automatic rotation':'Pause automatic rotation');
  auto();
});

/* Deliberately no mouseenter/mouseleave pause:
   the six-slide presentation keeps running while the visitor explores. */
show(0,1);
auto();
// Magnetic subtle button motion on pointer-capable devices
if(matchMedia('(pointer:fine)').matches&&!reduced){qsa('.btn').forEach(b=>{b.addEventListener('pointermove',e=>{const r=b.getBoundingClientRect(),x=(e.clientX-r.left-r.width/2)*.08,y=(e.clientY-r.top-r.height/2)*.08;b.style.transform=`translate(${x}px,${y}px)`});b.addEventListener('pointerleave',()=>b.style.transform='')})}
// Appointment modal shared by all pages
const modal=qs('#appointmentModal');function openModal(){if(!modal)return;modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.classList.add('modal-open');setTimeout(()=>qs('input[name="name"]',modal)?.focus(),120)}function closeModal(){modal?.classList.remove('open');modal?.setAttribute('aria-hidden','true');document.body.classList.remove('modal-open')}
qsa('[data-book]').forEach(b=>b.addEventListener('click',e=>{e.preventDefault();openModal()}));qsa('[data-modal-close]').forEach(b=>b.addEventListener('click',closeModal));addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});
// WhatsApp concierge: on-site guided quick replies -> WhatsApp prefilled chat.
const waBtn=qs('.wa-launcher'),waPanel=qs('.wa-panel');waBtn?.addEventListener('click',()=>{const o=waPanel.classList.toggle('open');waBtn.setAttribute('aria-expanded',String(o))});
function sendWA(text){window.open('https://wa.me/966549187860?text='+encodeURIComponent(text),'_blank','noopener')}
qsa('.wa-option').forEach(b=>b.addEventListener('click',()=>sendWA(b.dataset.message||b.textContent.trim())));const waForm=qs('.wa-custom');waForm?.addEventListener('submit',e=>{e.preventDefault();const input=qs('input',waForm),v=input?.value.trim();if(v)sendWA('Hello ABUHANI.TECH, '+v)});
})();
