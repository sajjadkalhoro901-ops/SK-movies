/* SK Movies: legal/free open movies section. Sources are openly licensed/public-domain works. */
(function(){
  const BASE='https://commons.wikimedia.org/wiki/Special:Redirect/file/';
  const legalMovies=[
    ['Big Buck Bunny',['Big_buck_bunny_720p_5mb.webm','Big_Buck_Bunny_alt.webm'],'CC BY-SA 4.0','🐰'],
    ['Elephants Dream',['Elephants_Dream(HQ).webm'],'CC BY-SA 2.5','🐘'],
    ['Sintel',['Sintel_movie_-_Blender_Fondation.ogv'],'CC BY 3.0','🐉'],
    ['Tears of Steel',['Tears_of_Steel_1080p.webm'],'CC BY 3.0','🤖'],
    ['Sita Sings the Blues',['Sita_Sings_the_Blues.webm'],'Creative Commons free-culture release','🎨'],
    ['Night of the Living Dead',['Night_of_the_Living_Dead_(1968_film).webm'],'Public domain','🧟'],
    ['Spring',['Spring_-_Blender_Open_Movie.webm'],'CC BY 4.0','🌲'],
    ['Cosmos Laundromat',['Cosmos_Laundromat_-_First_Cycle_-_Official_Blender_Foundation_release.webm'],'CC BY 4.0','🐑'],
    ['Caminandes: Gran Dillama',['Caminandes%2C_Gran_Dillama_-_Blender_Foundation.webm'],'CC BY-SA 3.0','🦙'],
    ['Caminandes: Llamigos',['Caminandes_3_-_Llamigos_-_Blender_Animated_Short.webm'],'CC BY 3.0','🦙']
  ];
  const esc=s=>String(s).replace(/[&<>\"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[m]));
  const src=file=>file.includes('%')?BASE+file:BASE+encodeURIComponent(file);

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
    p.innerHTML='<div class="sk-legal-box"><button class="sk-legal-close" type="button" aria-label="Close">×</button><h2 id="sk-legal-title">Now Playing</h2><video id="sk-legal-video" controls playsinline preload="metadata"></video><p id="sk-legal-error" class="sk-legal-error"></p><p class="sk-legal-credit">Open/Creative Commons video • Source: Wikimedia Commons • License shown on the card.</p></div>';
    document.body.appendChild(p);
    const close=()=>{const v=document.getElementById('sk-legal-video');v.pause();v.removeAttribute('src');v.load();p.classList.remove('show')};
    p.querySelector('.sk-legal-close').onclick=close;
    p.addEventListener('click',e=>{if(e.target===p)close()});
    return p;
  }

  function play(movie){
    const p=player(),v=document.getElementById('sk-legal-video'),err=document.getElementById('sk-legal-error');
    const title=document.getElementById('sk-legal-title');
    title.textContent='▶ '+movie[0];
    p.classList.add('show');
    let index=0;
    const next=()=>{
      if(index>=movie[1].length){err.textContent='This legal source is temporarily unavailable. Please try the title again later.';err.style.display='block';return}
      err.style.display='none';
      v.src=src(movie[1][index++]);v.load();
      v.play().catch(()=>{});
    };
    v.onerror=next;
    next();
  }

  function init(){
    const grid=document.querySelector('.movies');
    if(!grid)return;
    if(!document.getElementById('sk-legal-section')){
      const section=document.createElement('section');
      section.id='sk-legal-section';section.className='sk-legal-section';
      section.innerHTML='<div class="sk-legal-head"><div><span class="eyebrow">FREE • LEGAL • OPEN MOVIES</span><h2>🎬 Watch Free Movies</h2></div><p>10 titles • play directly here</p></div><div class="sk-legal-grid"></div>';
      const cards=section.querySelector('.sk-legal-grid');
      legalMovies.forEach(movie=>{
        const card=document.createElement('article');card.className='sk-legal-card';
        card.innerHTML='<div class="sk-legal-art"><div>'+movie[3]+'</div><span>Open Movie</span></div><div class="sk-legal-body"><h3>'+esc(movie[0])+'</h3><p class="sk-legal-meta">Open/Creative Commons • '+esc(movie[2])+'</p><button class="sk-legal-watch" type="button">▶ Watch Here</button></div>';
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
