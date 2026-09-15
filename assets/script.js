(function(){
  "use strict";
  document.documentElement.classList.add("js");

  function revealPage(){ document.body.classList.add("loaded"); }
  if(document.readyState === "loading") document.addEventListener("DOMContentLoaded", function(){ setTimeout(revealPage, 180); });
  else setTimeout(revealPage, 180);

  var menu=document.querySelector(".menu");
  var links=document.querySelector(".navlinks");
  if(menu && links){
    menu.addEventListener("click",function(){
      var open=links.classList.toggle("open");
      menu.setAttribute("aria-expanded", String(open));
      menu.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    });
    links.querySelectorAll("a").forEach(function(a){a.addEventListener("click",function(){
      links.classList.remove("open");
      menu.setAttribute("aria-expanded","false");
      menu.setAttribute("aria-label","Open navigation");
    });});
  }

  var reduce=window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var reveals=document.querySelectorAll(".reveal");
  if(!reduce && "IntersectionObserver" in window){
    var io=new IntersectionObserver(function(entries){ entries.forEach(function(e){
      if(e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); }
    });},{threshold:.08,rootMargin:"0px 0px -40px"});
    reveals.forEach(function(el){io.observe(el);});
  } else { reveals.forEach(function(el){el.classList.add("in");}); }

  // True video-on-intent loading: no video bytes are requested until play is requested.
  document.querySelectorAll("video[data-lazy-video]").forEach(function(video){
    var loaded=false;
    function loadVideo(){
      if(loaded) return;
      var source=video.querySelector("source[data-src]");
      if(source){ source.src=source.getAttribute("data-src"); source.removeAttribute("data-src"); }
      loaded=true;
      video.load();
    }
    video.addEventListener("play",function(){ loadVideo(); },{once:true});
    video.addEventListener("pointerdown",loadVideo,{once:true});
  });

  // Active navigation state.
  var path=location.pathname.replace(/\/+$/, "/");
  document.querySelectorAll(".navlinks a[data-nav]").forEach(function(a){
    try{ var u=new URL(a.href, location.href); if(u.pathname===path) a.classList.add("active"); }catch(e){}
  });
})();
