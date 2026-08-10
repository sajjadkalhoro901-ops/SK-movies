/* Poster fixes that stay compatible with the site's strict CSP. */
(function(){
  const ENDGAME='https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pbiy.jpg';
  function makeBigBuckPoster(){
    const svg='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 750"><defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#0b0b0b"/><stop offset="1" stop-color="#241010"/></linearGradient></defs><rect width="500" height="750" fill="url(#bg)"/><circle cx="250" cy="285" r="145" fill="#e50914" opacity=".12"/><ellipse cx="250" cy="330" rx="105" ry="125" fill="#eee"/><ellipse cx="195" cy="205" rx="42" ry="105" fill="#eee" transform="rotate(-15 195 205)"/><ellipse cx="305" cy="205" rx="42" ry="105" fill="#eee" transform="rotate(15 305 205)"/><circle cx="215" cy="315" r="10" fill="#111"/><circle cx="285" cy="315" r="10" fill="#111"/><ellipse cx="250" cy="355" rx="16" ry="11" fill="#e50914"/><path d="M235 375 Q250 390 265 375" fill="none" stroke="#111" stroke-width="5"/><text x="250" y="520" fill="#fff" font-family="Arial,sans-serif" font-size="38" font-weight="700" text-anchor="middle">BIG BUCK BUNNY</text><text x="250" y="558" fill="#e50914" font-family="Arial,sans-serif" font-size="18" font-weight="700" text-anchor="middle">OPEN MOVIE • CREATIVE COMMONS</text><text x="250" y="690" fill="#aaa" font-family="Arial,sans-serif" font-size="16" text-anchor="middle">Blender Foundation</text></svg>';
    return 'data:image/svg+xml;charset=UTF-8,'+encodeURIComponent(svg);
  }
  function fix(){
    document.querySelectorAll('.card').forEach(card=>{
      const title=card.querySelector('h3')?.textContent?.trim()||'';
      const img=card.querySelector('img');
      if(!img)return;
      if(title==='Avengers: Endgame') img.src=ENDGAME;
      if(title==='Big Buck Bunny — Test Movie') img.src=makeBigBuckPoster();
    });
  }
  fix();
  setTimeout(fix,700);
  setTimeout(fix,1800);
})();
