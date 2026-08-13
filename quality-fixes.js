/* SK Movies reliability fixes: broken posters, legal availability links and safer UX. */
(function(){
  const localPosters={
    'Doctor Strange':'images/strange.jpg'
  };
  const clean=s=>String(s||'').replace(/[&<>\"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[m]));
  function fallback(title){
    const svg='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 750"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#080808"/><stop offset="1" stop-color="#26090b"/></linearGradient></defs><rect width="500" height="750" fill="url(#g)"/><circle cx="250" cy="275" r="145" fill="#e50914" opacity=".12"/><text x="250" y="300" fill="#fff" font-family="Arial,sans-serif" font-size="30" font-weight="700" text-anchor="middle">SK MOVIES</text><text x="250" y="365" fill="#ff3340" font-family="Arial,sans-serif" font-size="20" font-weight="700" text-anchor="middle">'+clean(title).slice(0,34)+'</text><text x="250" y="690" fill="#777" font-family="Arial,sans-serif" font-size="15" text-anchor="middle">Poster unavailable</text></svg>';
    return 'data:image/svg+xml;charset=UTF-8,'+encodeURIComponent(svg);
  }
  function fixImages(){
    document.querySelectorAll('.card img').forEach(img=>{
      const card=img.closest('.card');
      const title=card?.querySelector('h3')?.textContent?.trim()||'';
      if(localPosters[title] && !img.dataset.localFixed){img.src=localPosters[title];img.dataset.localFixed='1';}
      if(!img.dataset.skErrorBound){
        img.dataset.skErrorBound='1';
        img.addEventListener('error',()=>{if(img.dataset.skFallback)return;img.dataset.skFallback='1';img.classList.add('poster-fallback');img.src=fallback(title);}, {once:true});
      }
    });
  }
  function addLegalLinks(){
    document.querySelectorAll('.card').forEach(card=>{
      const title=card.querySelector('h3')?.textContent?.trim()||'';
      const row=card.querySelector('.btn-row');
      if(!row || !title || card.querySelector('.legal-availability-btn') || card.querySelector('.anime-watch'))return;
      const a=document.createElement('a');
      a.className='legal-availability-btn';
      a.href='https://www.justwatch.com/pk/search?q='+encodeURIComponent(title);
      a.target='_blank';
      a.rel='noopener noreferrer';
      a.textContent='📺 Legal Availability';
      row.appendChild(a);
    });
  }
  function run(){fixImages();addLegalLinks();}
  run();
  [400,900,1800,3500,6000].forEach(t=>setTimeout(run,t));
  new MutationObserver(run).observe(document.body,{childList:true,subtree:true});
})();
