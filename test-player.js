/* SK Movies: legal/free open movies section. Direct media URLs avoid redirect failures. */
(function(){
  const legalMovies=[
    ['Big Buck Bunny','https://upload.wikimedia.org/wikipedia/commons/e/e7/Big_buck_bunny_720p_5mb.webm','CC BY-SA 4.0','🐰'],
    ['Elephants Dream','https://upload.wikimedia.org/wikipedia/commons/5/51/Elephants%20Dream%28HQ%29.webm','CC BY-SA 2.5','🐘'],
    ['Sintel','https://upload.wikimedia.org/wikipedia/commons/b/b6/Sintel%20webm%20extract.webm','CC BY 3.0','🐉'],
    ['Tears of Steel','https://upload.wikimedia.org/wikipedia/commons/e/ef/Tears%20of%20Steel%201080p.webm','CC BY 3.0','🤖'],
    ['Sita Sings the Blues','https://upload.wikimedia.org/wikipedia/commons/9/93/Sita%20Sings%20the%20Blues.webm','CC0 / Public Domain Dedication','🎨'],
    ['Night of the Living Dead','https://upload.wikimedia.org/wikipedia/commons/c/c1/Night%20of%20the%20Living%20Dead%20%281968%29.webm','Public domain (US)','🧟'],
    ['Spring','https://upload.wikimedia.org/wikipedia/commons/6/62/Spring%20-%20Blender%20Open%20Movie.webm','CC BY 4.0','🌲'],
    ['Cosmos Laundromat','https://upload.wikimedia.org/wikipedia/commons/7/70/Cosmos%20Laundromat%20-%20First%20Cycle%20-%20Official%20Blender%20Foundation%20release.webm','CC BY-SA 3.0','🐑'],
    ['Caminandes: Gran Dillama','https://upload.wikimedia.org/wikipedia/commons/2/29/Caminandes%2C%20Gran%20Dillama%20-%20Blender%20Foundation.webm','CC BY-SA 3.0','🦙'],
    ['Caminandes: Llamigos','https://upload.wikimedia.org/wikipedia/commons/4/47/Caminandes%203%20-%20Llamigos%20-%20Blender%20Animated%20Short.webm','CC BY 3.0','🦙']
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
    p.innerHTML='<div class="sk-legal-box"><button class="sk-legal-close" type="button" aria-label="Close">×</button><h2 id="sk-legal-title">Now Playing</h2><video id="sk-legal-video" controls playsinline preload="metadata"></video><p id="sk-legal-error" class="sk-legal-error"></p><p class="sk-legal-credit">Open/Creative Commons video • Source: Wikimedia Commons • License shown on the card.</p></div>';
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
    p.classList.add('show');
    v.onerror=()=>{err.textContent='Video source could not be loaded right now.';err.style.display='block'};
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
