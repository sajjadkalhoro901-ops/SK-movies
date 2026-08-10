/* SK Movies: legal/free open movies section. All sources are openly licensed and played inside the site. */
(function(){
  const FILE_BASE='https://commons.wikimedia.org/wiki/Special:Redirect/file/';
  const legalMovies=[
    ['Big Buck Bunny','Big_buck_bunny_720p_5mb.webm','CC BY-SA 4.0','🐰'],
    ['Elephants Dream','Elephants_Dream(HQ).webm','CC BY-SA 2.5','🐘'],
    ['Sintel','Sintel_webm_extract.webm','CC BY 3.0','🐉'],
    ['Tears of Steel','Tears_of_Steel_1080p.webm','CC BY 3.0','🤖'],
    ['Cosmos Laundromat','Cosmos_Laundromat_-_First_Cycle_-_Official_Blender_Foundation_release.webm','CC BY-SA 3.0','🐑'],
    ['Caminandes: Gran Dillama','Caminandes,_Gran_Dillama_-_Blender_Foundation.webm','CC BY-SA 3.0','🦙'],
    ['Spring','Spring_-_Blender_Open_Movie.webm','CC BY 4.0','🌲'],
    ['Agent 327','Agent_327_-_A_feature_film_in_progress.webm','CC BY 3.0','🕵️'],
    ['Coffee Run','Coffee_Run_-_Blender_Open_Movie-full_movie.webm','CC BY 4.0','☕'],
    ['Charge','Charge_-_Blender_Open_Movie-full_movie.webm','CC BY 4.0','⚡']
  ];

  const esc=s=>String(s).replace(/[&<>\"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[m]));
  const src=file=>FILE_BASE+encodeURIComponent(file);

  function addStyles(){
    if(document.getElementById('sk-legal-styles'))return;
    const s=document.createElement('style');s.id='sk-legal-styles';
    s.textContent=`
      .sk-legal-section{margin:22px 0 34px;padding:0 2px}
      .sk-legal-head{display:flex;justify-content:space-between;align-items:end;gap:12px;margin-bottom:16px}
      .sk-legal-head h2{margin:4px 0 0;font-size:28px}
      .sk-legal-head p{margin:0;color:#999;font-size:13px}
      .sk-legal-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px}
      .sk-legal-card{background:#121212;border:1px solid #292929;border-radius:12px;overflow:hidden;box-shadow:0 8px 24px rgba(0,0,0,.22)}
      .sk-legal-art{height:190px;display:flex;align-items:center;justify-content:center;flex-direction:column;background:radial-gradient(circle at 50% 35%,#431016 0,#18090b 45%,#0c0c0c 100%);font-size:58px}
      .sk-legal-art span{font-size:11px;letter-spacing:2px;color:#ff3440;margin-top:8px;font-weight:800;text-transform:uppercase}
      .sk-legal-body{padding:13px}
      .sk-legal-body h3{margin:0 0 7px;font-size:17px;line-height:1.2}
      .sk-legal-meta{margin:0 0 11px;color:#999;font-size:12px}
      .sk-legal-watch{width:100%;border:0;border-radius:8px;background:#e50914;color:#fff;padding:10px;font-weight:800;cursor:pointer}
      .sk-legal-watch:active{transform:scale(.98)}
      .sk-legal-player{display:none;position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,.94);padding:14px;align-items:center;justify-content:center}
      .sk-legal-player.show{display:flex}
      .sk-legal-box{width:min(1000px,100%);max-height:95vh;overflow:auto;background:#111;border:1px solid #333;border-radius:14px;padding:14px;position:relative}
      .sk-legal-box h2{margin:0 45px 10px;font-size:22px}
      .sk-legal-box video{display:block;width:100%;max-height:70vh;background:#000;border-radius:9px}
      .sk-legal-close{position:absolute;right:10px;top:9px;width:38px;height:38px;border:0;border-radius:50%;background:#272727;color:#fff;font-size:24px;cursor:pointer}
      .sk-legal-credit{margin:10px 0 0;color:#888;font-size:12px}
      @media(max-width:900px){.sk-legal-grid{grid-template-columns:repeat(3,minmax(0,1fr))}}
      @media(max-width:650px){.sk-legal-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.sk-legal-art{height:150px;font-size:45px}.sk-legal-body{padding:10px}.sk-legal-body h3{font-size:15px}.sk-legal-head h2{font-size:23px}}
    `;
    document.head.appendChild(s);
  }

  function removeBrokenEpisodeUi(){
    const bad=['Episode list unavailable','Episode playback requires an authorized video source'];
    document.querySelectorAll('body *').forEach(el=>{
      if(el.children.length>0)return;
      const t=(el.textContent||'').trim();
      if(!bad.some(x=>t.includes(x)))return;
      let box=el;
      for(let i=0;i<5 && box.parentElement;i++){
        const cs=getComputedStyle(box);
        if(cs.position==='fixed'||cs.position==='absolute'||box.tagName==='DIALOG'){box=box.parentElement;break}
        box=box.parentElement;
      }
      if(box && box.id!=='sk-legal-section')box.remove();
    });
  }

  function removeMisleadingFreeButtons(){
    document.querySelectorAll('.card').forEach(card=>{
      card.querySelectorAll('a,button').forEach(btn=>{
        if((btn.textContent||'').trim().toLowerCase()==='free')btn.remove();
      });
    });
  }

  function player(){
    let p=document.getElementById('sk-legal-player');
    if(p)return p;
    p=document.createElement('div');p.id='sk-legal-player';p.className='sk-legal-player';
    p.innerHTML='<div class="sk-legal-box"><button class="sk-legal-close" type="button" aria-label="Close">×</button><h2 id="sk-legal-title"></h2><video id="sk-legal-video" controls playsinline preload="metadata"></video><p class="sk-legal-credit">Open/Creative Commons video • Source: Wikimedia Commons • License shown on the card.</p></div>';
    document.body.appendChild(p);
    const close=()=>{const v=document.getElementById('sk-legal-video');v.pause();v.removeAttribute('src');v.load();p.classList.remove('show')};
    p.querySelector('.sk-legal-close').onclick=close;
    p.addEventListener('click',e=>{if(e.target===p)close()});
    return p;
  }

  function play(movie){
    const p=player(),v=document.getElementById('sk-legal-video');
    document.getElementById('sk-legal-title').textContent=movie[0];
    v.src=src(movie[1]);
    p.classList.add('show');
    v.play().catch(()=>{});
  }

  function init(){
    const grid=document.querySelector('.movies');
    if(!grid)return;
    addStyles();
    if(!document.getElementById('sk-legal-section')){
      const section=document.createElement('section');
      section.id='sk-legal-section';section.className='sk-legal-section';
      section.innerHTML='<div class="sk-legal-head"><div><span class="eyebrow">FREE • LEGAL • OPEN MOVIES</span><h2>🎬 Watch Free Movies</h2></div><p>10 titles • play directly here</p></div><div class="sk-legal-grid"></div>';
      const cards=section.querySelector('.sk-legal-grid');
      legalMovies.forEach(movie=>{
        const card=document.createElement('article');card.className='sk-legal-card';
        card.innerHTML='<div class="sk-legal-art"><div>'+movie[3]+'</div><span>Open Movie</span></div><div class="sk-legal-body"><h3>'+esc(movie[0])+'</h3><p class="sk-legal-meta">Creative Commons • '+esc(movie[2])+'</p><button class="sk-legal-watch" type="button">▶ Watch Here</button></div>';
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
