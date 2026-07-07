/* ═══════════════════════════════════════════════════════════════
   BOVI-GEST · JavaScript principal
   - Three.js Hero (DNA double hélice)
   - Vidéo vache hero
   - Scroll 3D animations
   - Tilt cards
   - Fix plein écran vidéo
═══════════════════════════════════════════════════════════════ */

/* ════ 1. THREE.JS HERO — DNA ════ */
(function(){
  const canvas = document.getElementById('hero-canvas');
  if(!canvas || typeof THREE === 'undefined') return;
  const hero = document.getElementById('hero');

  const renderer = new THREE.WebGLRenderer({canvas, alpha:true, antialias:false});
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
  renderer.setClearColor(0x000000, 0);

  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 300);
  camera.position.set(-3, 3, 30);

  function resize(){
    if(!hero) return;
    const w = hero.offsetWidth, h = hero.offsetHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w/h;
    camera.updateProjectionMatrix();
  }
  resize();
  let rT; window.addEventListener('resize',()=>{clearTimeout(rT);rT=setTimeout(resize,200);});

  scene.add(new THREE.AmbientLight(0x1A2B3C, 1.0));
  const sun = new THREE.DirectionalLight(0xffffff, 1.2);
  sun.position.set(8,14,10); scene.add(sun);
  const dL1 = new THREE.PointLight(0x00CCFF, 2.0, 50);
  dL1.position.set(4,6,4); scene.add(dL1);
  const dL2 = new THREE.PointLight(0x00FF88, 1.2, 40);
  dL2.position.set(0,-4,2); scene.add(dL2);

  const TURNS=3.5, STEPS=80, RAD=2.6, H=20;
  function hPts(off){
    const p=[];
    for(let i=0;i<=STEPS;i++){
      const a=(i/STEPS)*Math.PI*2*TURNS+off;
      p.push(new THREE.Vector3(Math.cos(a)*RAD,(i/STEPS)*H-H/2,Math.sin(a)*RAD));
    }
    return p;
  }
  const mS1=new THREE.MeshPhongMaterial({color:0x00B4D8,emissive:0x004466,shininess:80,transparent:true,opacity:.92});
  const mS2=new THREE.MeshPhongMaterial({color:0x0096C7,emissive:0x003355,shininess:80,transparent:true,opacity:.88});
  const mR =new THREE.MeshPhongMaterial({color:0x00FF88,emissive:0x00AA44,shininess:100});

  const dnaGrp=new THREE.Group();
  dnaGrp.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(hPts(0)),70,.22,7,false),mS1));
  dnaGrp.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(hPts(Math.PI)),70,.22,7,false),mS2));
  const sG=new THREE.SphereGeometry(.16,6,6);
  for(let i=2;i<=STEPS-2;i+=4){
    const t=i/STEPS,a=t*Math.PI*2*TURNS,y=t*H-H/2;
    const p1=new THREE.Vector3(Math.cos(a)*RAD,y,Math.sin(a)*RAD);
    const p2=new THREE.Vector3(Math.cos(a+Math.PI)*RAD,y,Math.sin(a+Math.PI)*RAD);
    const dir=p2.clone().sub(p1).normalize();
    const rng=new THREE.Mesh(new THREE.CylinderGeometry(.09,.09,p1.distanceTo(p2),5),mR);
    rng.position.copy(p1.clone().add(p2).multiplyScalar(.5));
    rng.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),dir);
    dnaGrp.add(rng);
    const s1=new THREE.Mesh(sG,new THREE.MeshPhongMaterial({color:0x00FF99,emissive:0x007744}));
    const s2=s1.clone(); s1.position.copy(p1); s2.position.copy(p2); dnaGrp.add(s1,s2);
  }
  dnaGrp.position.set(-4, 0, -2);
  scene.add(dnaGrp);

  const tG=new THREE.PlaneGeometry(120,120,20,20);
  const tP=tG.attributes.position.array;
  for(let i=0;i<tP.length;i+=3) tP[i+1]=Math.sin(tP[i]*.1)*1.1+Math.cos(tP[i+2]*.09)*.8;
  tG.computeVertexNormals();
  const ter=new THREE.Mesh(tG,new THREE.MeshBasicMaterial({color:0x1A4D32,wireframe:true,transparent:true,opacity:.11}));
  ter.rotation.x=-Math.PI/2.1; ter.position.set(0,-13,0); scene.add(ter);

  const N=280,pA=new Float32Array(N*3);
  for(let i=0;i<N;i++){pA[i*3]=(Math.random()-.5)*100;pA[i*3+1]=Math.random()*28-6;pA[i*3+2]=(Math.random()-.5)*60;}
  const ptG=new THREE.BufferGeometry(); ptG.setAttribute('position',new THREE.BufferAttribute(pA,3));
  scene.add(new THREE.Points(ptG,new THREE.PointsMaterial({color:0xF0A830,size:.09,transparent:true,opacity:.25})));

  let mx=0,my=0,lastM=0,scrollY=0,t=0,last=0,vis=true;
  const INT=1000/30;
  document.addEventListener('mousemove',e=>{const n=Date.now();if(n-lastM<60)return;lastM=n;mx=(e.clientX/innerWidth-.5)*2;my=(e.clientY/innerHeight-.5)*2;},{passive:true});
  window.addEventListener('scroll',()=>{scrollY=window.scrollY;},{passive:true});

  function animate(ts){
    if(!vis){requestAnimationFrame(animate);return;}
    if(ts-last<INT){requestAnimationFrame(animate);return;}
    last=ts-(ts-last)%INT; t+=.014;
    dnaGrp.rotation.y=t*.9;
    dL1.position.set(Math.cos(t*.4)*10-4,5,Math.sin(t*.4)*10-2);
    camera.position.x+=(mx*3-camera.position.x)*.04;
    camera.position.y+=(3-my*2-camera.position.y-scrollY*.005)*.04;
    camera.lookAt(0,0,0);
    renderer.render(scene,camera);
    requestAnimationFrame(animate);
  }
  new IntersectionObserver(([e])=>{vis=e.isIntersecting;}).observe(hero);
  requestAnimationFrame(animate);
})();

/* ════ 2. SCROLL 3D ANIMATIONS ════ */
(function(){
  const rules=[
    ['.benefit-card','scroll-3d'],['.obj-card','scroll-3d'],['.mod-card','scroll-3d'],
    ['.kpi-card','scroll-3d'],['.kpi-sec','scroll-3d'],['.pricing-card','scroll-3d'],
    ['.arch-col','scroll-3d'],['.faq-item','scroll-3d'],
    ['.problem-box','scroll-3d-left'],['.solution-box','scroll-3d-right'],
    ['.impact-item','scroll-3d'],['.section-header','scroll-3d'],['.obj-banner','scroll-3d'],
  ];
  rules.forEach(([sel,cls])=>document.querySelectorAll(sel).forEach(el=>{el.classList.remove('fade-in','visible');el.classList.add(cls);}));
  const io=new IntersectionObserver(entries=>{
    entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});
  },{threshold:.1,rootMargin:'0px 0px -30px 0px'});
  document.querySelectorAll('.scroll-3d,.scroll-3d-left,.scroll-3d-right').forEach(el=>io.observe(el));
})();

/* ════ 3. TILT 3D CARDS ════ */
(function(){
  let tT;
  document.querySelectorAll('.mod-card,.benefit-card,.obj-card,.kpi-card,.pricing-card,.kpi-sec').forEach(card=>{
    card.addEventListener('mousemove',e=>{
      if(tT)return; tT=requestAnimationFrame(()=>{tT=null;
        const r=card.getBoundingClientRect();
        card.style.transform=`perspective(700px) rotateX(${-((e.clientY-r.top)/r.height-.5)*12}deg) rotateY(${((e.clientX-r.left)/r.width-.5)*12}deg) translateY(-5px)`;
      });
    },{passive:true});
    card.addEventListener('mouseleave',()=>{cancelAnimationFrame(tT);tT=null;card.style.transform='';});
  });
})();

/* ════ 4. FIX VIDÉO PLEIN ÉCRAN ════ */
(function(){
  function apply(){
    const vid=document.getElementById('dashboardVideo');
    if(!vid)return;
    let el=vid.parentElement;
    while(el&&el!==document.body){
      const cs=getComputedStyle(el);
      if(cs.overflow==='hidden'||cs.overflow==='clip')el.style.overflow='visible';
      if(cs.contain&&cs.contain!=='none')el.style.contain='none';
      el=el.parentElement;
    }
    ['fullscreenchange','webkitfullscreenchange'].forEach(ev=>document.addEventListener(ev,()=>{
      const fs=!!(document.fullscreenElement||document.webkitFullscreenElement);
      vid.style.maxHeight=fs?'none':'68vh';
    },{passive:true}));
  }
  const btn=document.getElementById('kpiTableauBtn');
  if(btn)btn.addEventListener('click',()=>setTimeout(apply,200));
  window.addEventListener('load',()=>setTimeout(apply,400),{once:true});
})();

/* ════ 6. PAGE TRANSITION VEIL ════
   Covers the page on load then fades away; fades back in before following
   a link to another page (e.g. back to NAVIONE). Plain opacity fade with a
   fixed timeout-driven navigation, so it can never get stuck covering. */
(function(){
  const veil=document.getElementById('pageTransition');
  if(!veil)return;
  const HOLD=650; // lets the mark + progress bar fill before the browser navigates

  setTimeout(()=>veil.classList.add('hidden'),150);

  document.querySelectorAll('a[href]').forEach(link=>{
    const href=link.getAttribute('href');
    if(!href||href.startsWith('#')||link.target==='_blank')return;
    if(/^(https?:)?\/\//.test(href)||href.startsWith('mailto:')||href.startsWith('tel:'))return;
    link.addEventListener('click',e=>{
      if(e.defaultPrevented||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;
      e.preventDefault();
      veil.classList.remove('hidden');
      veil.classList.add('leaving');
      setTimeout(()=>{window.location.href=link.href;},HOLD);
    });
  });
})();

/* ════ 7. ANIMATED PARTICLE-NETWORK BACKGROUND ════
   Fixed canvas behind the whole page: dots drift slowly and connect with
   faint lines when close together. Paused when the tab isn't visible and
   skipped entirely for prefers-reduced-motion. */
(function(){
  const canvas=document.getElementById('bgParticles');
  if(!canvas||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const ctx=canvas.getContext('2d');
  const COLORS=['#3B4EFF','#6E7BFF','#F2A93B'];
  const LINK_DIST=140;
  let particles=[],w,h,raf;

  function resize(){
    w=canvas.width=innerWidth;
    h=canvas.height=innerHeight;
    const count=Math.min(90,Math.round((w*h)/18000));
    particles=Array.from({length:count},()=>({
      x:Math.random()*w,y:Math.random()*h,
      vx:(Math.random()-.5)*.35,vy:(Math.random()-.5)*.35,
      r:Math.random()*1.6+.6,
      color:COLORS[Math.floor(Math.random()*COLORS.length)]
    }));
  }

  function step(){
    ctx.clearRect(0,0,w,h);
    particles.forEach(p=>{
      p.x+=p.vx;p.y+=p.vy;
      if(p.x<0||p.x>w)p.vx*=-1;
      if(p.y<0||p.y>h)p.vy*=-1;
      ctx.beginPath();
      ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle=p.color;
      ctx.globalAlpha=.7;
      ctx.fill();
    });
    ctx.globalAlpha=1;
    for(let i=0;i<particles.length;i++){
      for(let j=i+1;j<particles.length;j++){
        const a=particles[i],b=particles[j];
        const dx=a.x-b.x,dy=a.y-b.y;
        const dist=Math.sqrt(dx*dx+dy*dy);
        if(dist<LINK_DIST){
          ctx.beginPath();
          ctx.moveTo(a.x,a.y);
          ctx.lineTo(b.x,b.y);
          ctx.strokeStyle='rgba(110,123,255,'+(1-dist/LINK_DIST)*.25+')';
          ctx.lineWidth=1;
          ctx.stroke();
        }
      }
    }
    raf=requestAnimationFrame(step);
  }

  document.addEventListener('visibilitychange',()=>{
    if(document.hidden){cancelAnimationFrame(raf);}
    else{raf=requestAnimationFrame(step);}
  });

  let rT;
  addEventListener('resize',()=>{clearTimeout(rT);rT=setTimeout(resize,200);});
  resize();
  step();
})();
