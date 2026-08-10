/* SK Movies: legal/free open movies section. Uses Wikimedia Commons open-movie files with stable Special:Redirect URLs. */
(function(){
  const legalMovies=[
    ['Big Buck Bunny','https://commons.wikimedia.org/wiki/Special:Redirect/file/Big_buck_bunny_720p_5mb.webm','CC BY-SA 4.0 • Wikimedia Commons','🐰'],
    ['Sintel','https://commons.wikimedia.org/wiki/Special:Redirect/file/Sintel_webm_extract.webm','CC BY 3.0 • Blender Foundation','🐉'],
    ['Elephants Dream','https://commons.wikimedia.org/wiki/Special:Redirect/file/Elephants_Dream%28HQ%29.webm','CC BY-SA 2.5 • Blender Foundation','🐘'],
    ['Tears of Steel','https://commons.wikimedia.org/wiki/Special:Redirect/file/Tears_of_Steel_1080p.webm','CC BY 3.0 • Blender Foundation','🤖']
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
    p.innerHTML='<div class="sk-legal-box"><button class="sk-legal-close" type="button" aria-label="Close">×</button><h2 id="sk-legal-title">Now Playing</h2><video id="sk-legal-video" controls playsinline preload="metadata"></video><p id="sk-legal-error" class="sk-legal-error"></p><p class="sk-legal-credit">Open movie • Source: Wikimedia Commons • License/attribution shown on the card.</p></div>';
    document.body.appendChild(p);
    const close=()=>{const v=document.getElementById('sk-legal-video');v.pause();v.removeAttribute('src');v.load();p.classList.remove('show')};
    p.querySelector('.sk-legal-close').onclick=close;
    p.addEventListener('click',e=>{if(e.target===p)close()});
    return p;
  }

  function play(movie){
    const p=player(),v=document.getElementById('sk-legal-video'),err=document.getElementById('sk-legal-error');
    document.getElementById('sk-legal-title').textContent='▶ '+movie[0];
    err.style.display='none';err.textContent='';
    p.classList.add('show');
    v.pause();v.removeAttribute('src');v.load();
    v.onerror=()=>{err.textContent='Video source could not be reached. Check your internet connection and try again.';err.style.display='block'};
    v.onloadedmetadata=()=>{err.style.display='none'};
    v.src=movie[1];
    v.load();
  }

  function init(){
    const grid=document.querySelector('.movies');
    if(!grid)return;
    if(!document.getElementById('sk-legal-section')){
      const section=document.createElement('section');
      section.id='sk-legal-section';section.className='sk-legal-section';
      section.innerHTML='<div class="sk-legal-head"><div><span class="eyebrow">FREE • LEGAL • OPEN MOVIES</span><h2>🎬 Watch Free Movies</h2></div><p>4 verified open movies • play directly here</p></div><div class="sk-legal-grid"></div>';
      const cards=section.querySelector('.sk-legal-grid');
      legalMovies.forEach(movie=>{
        const card=document.createElement('article');card.className='sk-legal-card';
        card.innerHTML='<div class="sk-legal-art"><div>'+movie[3]+'</div><span>OPEN MOVIE</span></div><div class="sk-legal-body"><h3>'+esc(movie[0])+'</h3><p class="sk-legal-meta">'+esc(movie[2])+'</p><button class="sk-legal-watch" type="button">▶ Watch Here</button></div>';
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
