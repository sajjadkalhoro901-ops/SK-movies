/* SK Movies: legal/open movie library using Wikimedia Commons media. */
(function(){
  const C='https://commons.wikimedia.org/wiki/Special:Redirect/file/';
  const legalMovies=[
    ['Big Buck Bunny','Big_buck_bunny_720p_5mb.webm','CC BY-SA 4.0 • Blender Foundation','🐰'],
    ['Elephants Dream','Elephants_Dream%28HQ%29.webm','CC BY-SA 2.5 • Blender Foundation','🐘'],
    ['Sintel','Sintel_movie_-_Blender_Fondation.ogv','CC BY 3.0 • Blender Foundation','🐉'],
    ['Tears of Steel','Tears_of_Steel_1080p.webm','CC BY 3.0 • Blender Foundation','🤖'],
    ['Cosmos Laundromat','Cosmos_Laundromat_-_First_Cycle_-_Official_Blender_Foundation_release.webm','CC BY-SA 3.0 • Blender Foundation','🐑'],
    ['Spring','Spring_-_Blender_Open_Movie.webm','CC BY 4.0 • Blender Foundation','🌲'],
    ['Caminandes: Gran Dillama','Caminandes%2C_Gran_Dillama_-_Blender_Foundation.webm','Open Movie • Blender Foundation','🦙'],
    ['Caminandes: Short Movie','Caminandes_-_Short_Movie.ogv','Open Movie • Blender Foundation','🦙'],
    ['Coffee Run','Coffee_Run_-_Blender_Open_Movie-full_movie.webm','CC BY 4.0 • Blender Foundation','☕'],
    ['Glass Half','Glass_Half_-_Blender_Open_Movie-full_movie.webm','CC BY 4.0 • Blender Foundation','🥛'],
    ['Agent 327','Agent_327_-_A_feature_film_in_progress.webm','CC BY 3.0 • Blender','🕵️'],
    ['Sprite Fright','Sprite_Fright_-_Blender_Open_Movie-full_movie.webm','CC BY 4.0 • Blender Studio','👻']
  ].map(m=>[m[0],C+m[1],m[2],m[3]]);

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
    document.querySelectorAll('.card').forEach(card=>card.querySelectorAll('a,button').forEach(btn=>{
      if((btn.textContent||'').trim().toLowerCase()==='free')btn.remove();
    }));
  }

  function player(){
    let p=document.getElementById('sk-legal-player');
    if(p)return p;
    p=document.createElement('div');p.id='sk-legal-player';p.className='sk-legal-player';
    p.innerHTML='<div class="sk-legal-box"><button class="sk-legal-close" type="button" aria-label="Close">×</button><h2 id="sk-legal-title">Now Playing</h2><video id="sk-legal-video" controls playsinline preload="metadata"></video><p id="sk-legal-error" class="sk-legal-error"></p><p class="sk-legal-credit">Open movie • Hosted by Wikimedia Commons • License and attribution are shown on each title.</p></div>';
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
    v.onerror=()=>{err.textContent='This legal source is temporarily unavailable. Please try again later.';err.style.display='block'};
    v.onloadedmetadata=()=>{err.style.display='none'};
    v.src=movie[1];
    v.load();
    v.play().catch(()=>{});
  }

  function init(){
    const grid=document.querySelector('.movies');
    if(!grid)return;
    if(!document.getElementById('sk-legal-section')){
      const section=document.createElement('section');
      section.id='sk-legal-section';section.className='sk-legal-section';
      section.innerHTML='<div class="sk-legal-head"><div><span class="eyebrow">FREE • LEGAL • OPEN MOVIES</span><h2>🎬 Watch Free Movies</h2><p class="sk-legal-sub">Open-license films that can play directly on SK Movies.</p></div><span class="sk-legal-count">12 titles</span></div><div class="sk-legal-grid"></div>';
      const cards=section.querySelector('.sk-legal-grid');
      legalMovies.forEach(movie=>{
        const card=document.createElement('article');card.className='sk-legal-card';
        card.innerHTML='<div class="sk-legal-art"><div>'+movie[3]+'</div><span>OPEN MOVIE</span></div><div class="sk-legal-body"><h3>'+esc(movie[0])+'</h3><p class="sk-legal-meta">'+esc(movie[2])+'</p><button class="sk-legal-watch" type="button">▶ Watch Now</button></div>';
        card.querySelector('button').onclick=()=>play(movie);
        cards.appendChild(card);
      });
      grid.parentElement.insertBefore(section,grid);
    }
    removeMisleadingFreeButtons();
    removeBrokenEpisodeUi();
  }

  setTimeout(init,300);setTimeout(init,1000);setTimeout(init,2500);setTimeout(init,5000);
  const observer=new MutationObserver(()=>{removeMisleadingFreeButtons();removeBrokenEpisodeUi()});
  observer.observe(document.body,{childList:true,subtree:true});
})();
