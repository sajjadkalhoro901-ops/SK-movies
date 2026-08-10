/* SK Movies: legal/free open movies section. Uses verified Blender Video MP4 sources. */
(function(){
  const legalMovies=[
    ['Big Buck Bunny','https://video.blender.org/static/webseed/bf1f3fb5-b119-4f9f-9930-8e20e892b898-720.mp4','Blender Open Movie','🐰'],
    ['Elephants Dream','https://video.blender.org/static/webseed/cccc3e60-0291-4ecc-aa56-39b2e2c7d0d5-720.mp4','Blender Open Movie','🐘'],
    ['Sintel','https://video.blender.org/static/webseed/0eb052d0-fd51-43e6-aa33-ecdbf77a5d40-720.mp4','Blender Open Movie','🐉'],
    ['Tears of Steel','https://video.blender.org/static/webseed/8533ea43-4271-4a57-9694-e9d0b35e1aa1-720.mp4','Blender Open Movie','🤖'],
    ['Cosmos Laundromat','https://video.blender.org/static/webseed/f507dfdc-e73e-45a4-9778-d758cbe1ce96-720.mp4','Blender Open Movie','🐑'],
    ['Spring','https://video.blender.org/static/webseed/3d95fb3d-c866-42c8-9db1-fe82f48ccb95-720.mp4','Blender Open Movie','🌲'],
    ['Caminandes: Gran Dillama','https://video.blender.org/static/webseed/fb70d459-48d2-4db5-adba-813c84f9200a-720.mp4','Blender Open Movie','🦙'],
    ['Caminandes: Llamigos','https://video.blender.org/static/webseed/23f3ef79-15dc-44c5-aa45-cf92e78a4509-720.mp4','Blender Open Movie','🦙'],
    ['Coffee Run','https://video.blender.org/static/webseed/ff8fe61b-026f-4f07-b66b-2a790d6f6ab1-720.mp4','Blender Open Movie','☕'],
    ['Glass Half','https://video.blender.org/static/webseed/64222c8a-c4c7-4b3b-9850-7fb2078edcf6-720.mp4','Blender Open Movie','🥛'],
    ['Agent 327: Operation Barbershop','https://video.blender.org/static/webseed/264ff760-803e-430e-8d81-15648e904183-720.mp4','Blender Open Movie','🕵️'],
    ['Sprite Fright','https://video.blender.org/download/videos/a69d68a5-a0e0-4a80-9d66-49f093c97aaf-720.mp4','Blender Open Movie','👻']
  ];
  const esc=s=>String(s).replace(/[&<>\"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[m]));

  function removeBrokenEpisodeUi(){
    const bad=['Episode list unavailable','Episode playback requires an authorized video source'];
    document.querySelectorAll('body *').forEach(el=>{
      if(el.children.length>0)return;
      const t=(el.textContent||'').trim();
      if(!bad.some(x=>t.includes(x)))return;
      let box=el;
      for(let i=0;i<5&&box.parentElement;i++){
        const cs=getComputedStyle(box);
        if(cs.position==='fixed'||cs.position==='absolute'||box.tagName==='DIALOG'){box=box.parentElement;break}
        box=box.parentElement;
      }
      if(box&&box.id!=='sk-legal-section')box.remove();
    });
  }

  function removeMisleadingFreeButtons(){
    document.querySelectorAll('.card').forEach(card=>card.querySelectorAll('a,button').forEach(btn=>{if((btn.textContent||'').trim().toLowerCase()==='free')btn.remove()}));
  }

  function player(){
    let p=document.getElementById('sk-legal-player');
    if(p)return p;
    p=document.createElement('div');p.id='sk-legal-player';p.className='sk-legal-player';
    p.innerHTML='<div class="sk-legal-box"><button class="sk-legal-close" type="button" aria-label="Close">×</button><h2 id="sk-legal-title">Now Playing</h2><video id="sk-legal-video" controls playsinline preload="metadata" crossorigin="anonymous"></video><p id="sk-legal-error" class="sk-legal-error"></p><p class="sk-legal-credit">Open Movie • Source: Blender Video. Licensing/attribution belongs to the original film.</p></div>';
    document.body.appendChild(p);
    const close=()=>{const v=document.getElementById('sk-legal-video');v.pause();v.removeAttribute('src');v.load();p.classList.remove('show')};
    p.querySelector('.sk-legal-close').onclick=close;
    p.addEventListener('click',e=>{if(e.target===p)close()});
    return p;
  }

  function play(movie){
    const p=player(),v=document.getElementById('sk-legal-video'),err=document.getElementById('sk-legal-error');
    document.getElementById('sk-legal-title').textContent='▶ '+movie[0];
    err.style.display='none';
    err.textContent='';
    p.classList.add('show');
    v.pause();
    v.removeAttribute('src');
    v.load();
    v.onerror=()=>{err.textContent='Video source is unavailable right now. Please try again.';err.style.display='block'};
    v.src=movie[1];
    v.load();
    const start=()=>{v.play().catch(()=>{err.textContent='Tap the ▶ play button once to start the video.';err.style.display='block'})};
    if(v.readyState>=2)start();else v.oncanplay=start;
  }

  function init(){
    const grid=document.querySelector('.movies');
    if(!grid)return;
    if(!document.getElementById('sk-legal-section')){
      const section=document.createElement('section');
      section.id='sk-legal-section';section.className='sk-legal-section';
      section.innerHTML='<div class="sk-legal-head"><div><span class="eyebrow">FREE • LEGAL • OPEN MOVIES</span><h2>🎬 Watch Free Movies</h2></div><p>12 titles • play directly here</p></div><div class="sk-legal-grid"></div>';
      const cards=section.querySelector('.sk-legal-grid');
      legalMovies.forEach(movie=>{
        const card=document.createElement('article');card.className='sk-legal-card';
        card.innerHTML='<div class="sk-legal-art"><div>'+movie[3]+'</div><span>OPEN MOVIE</span></div><div class="sk-legal-body"><h3>'+esc(movie[0])+'</h3><p class="sk-legal-meta">Open Movie • Blender</p><button class="sk-legal-watch" type="button">▶ Watch Here</button></div>';
        card.querySelector('button').onclick=()=>play(movie);
        cards.appendChild(card);
      });
      grid.parentElement.insertBefore(section,grid);
    }
    removeMisleadingFreeButtons();
    removeBrokenEpisodeUi();
  }

  setTimeout(init,400);setTimeout(init,1200);setTimeout(init,2500);setTimeout(init,5000);
  const observer=new MutationObserver(()=>{removeMisleadingFreeButtons();removeBrokenEpisodeUi()});
  observer.observe(document.body,{childList:true,subtree:true});
})();
