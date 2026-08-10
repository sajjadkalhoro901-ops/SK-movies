(function(){
  const VIDEO='https://archive.org/download/BigBuckBunny_328/BigBuckBunny_512kb.mp4';
  function init(){
    const grid=document.querySelector('.movies');
    if(!grid||document.getElementById('sk-test-movie'))return;
    const c=document.createElement('article');
    c.id='sk-test-movie';
    c.className='card';
    c.innerHTML='<img loading="lazy" alt="Big Buck Bunny"><div class="card-body"><h3>Big Buck Bunny — Test Movie</h3><p class="meta">Legal test video • Creative Commons</p><div class="btn-row"><button class="watch-btn" type="button" style="grid-column:1/-1">▶ Watch Direct</button></div></div>';
    c.querySelector('button').onclick=()=>{
      const w=window.open(VIDEO,'_blank','noopener,noreferrer');
      if(!w) location.href=VIDEO;
    };
    grid.prepend(c);
  }
  setTimeout(init,500);
  setTimeout(init,2000);
})();
