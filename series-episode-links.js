/* Official episode links for series pages. No unauthorized video files are hosted here. */
(function(){
  const params=new URLSearchParams(location.search);
  const title=params.get('title')||'';
  const official={
    'Naruto':'https://www.crunchyroll.com/series/GY9PJ5KWR/naruto',
    'Naruto: Shippuden':'https://www.crunchyroll.com/series/GYQ4MW246/naruto-shippuden'
  };
  const firstEpisode={
    'Naruto':'https://www.crunchyroll.com/watch/GYK5PJV7R/enter-naruto-uzumaki',
    'Naruto: Shippuden':'https://www.crunchyroll.com/watch/GRWEX4QMR/homecoming'
  };
  function fix(){
    if(!official[title]) return;
    document.querySelectorAll('#episode-grid .episode-btn').forEach((btn,i)=>{
      const n=i+1;
      btn.onclick=function(){
        const url=n===1?firstEpisode[title]:official[title];
        window.open(url,'_blank','noopener,noreferrer');
      };
      btn.title=n===1?'Open Episode 1 on Crunchyroll':'Open official episode list on Crunchyroll';
    });
    const legal=document.querySelector('.legal-note');
    if(legal) legal.textContent='Episodes open the official Crunchyroll viewing page. Availability and playback may depend on your country and account.';
  }
  setTimeout(fix,50);setTimeout(fix,500);setTimeout(fix,1200);
})();
