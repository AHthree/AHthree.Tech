
const menu=document.querySelector('.menu'), links=document.querySelector('.navlinks');
if(menu&&links){menu.addEventListener('click',()=>{const open=links.classList.toggle('open');menu.setAttribute('aria-expanded',open)});links.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>links.classList.remove('open')))}
const els=document.querySelectorAll('.reveal');
if('IntersectionObserver' in window){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});els.forEach(e=>io.observe(e))}else{els.forEach(e=>e.classList.add('in'))}
const form=document.querySelector('#consultationForm');
if(form){form.addEventListener('submit',e=>{e.preventDefault();const d=new FormData(form);const msg=`Hello AHthree.tech, I'd like a consultation.%0A%0AName: ${encodeURIComponent(d.get('name'))}%0AEmail: ${encodeURIComponent(d.get('email'))}%0AService: ${encodeURIComponent(d.get('service'))}%0AMessage: ${encodeURIComponent(d.get('message'))}`;window.open(`https://wa.me/966549187860?text=${msg}`,'_blank')})}
