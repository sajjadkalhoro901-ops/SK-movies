(function(){
  const data={
    'One Piece':{year:'1999',genre:'Action / Adventure',rating:'9.0',episodes:1171,poster:'',source:'https://www.justwatch.com/pk/search?q=One%20Piece'},
    'Naruto':{year:'2002',genre:'Action / Adventure',rating:'8.4',episodes:220,poster:'https://image.tmdb.org/t/p/w500/xd9t3R4pX5fVfJj1mY8gQv5g3dT.jpg',source:'https://www.viz.com/anime/tv-show/naruto-video/video-unit/1'},
    'Naruto: Shippuden':{year:'2007',genre:'Action / Adventure',rating:'8.7',episodes:500,poster:'https://image.tmdb.org/t/p/w500/qOxedwaJzdms2alAmIEHEnDeDzg.jpg',source:'https://www.viz.com/anime/tv-show/naruto-shippuden-video/video-unit/9'},
    'Demon Slayer: Kimetsu no Yaiba':{year:'2019',genre:'Action / Fantasy',rating:'8.6',episodes:55,poster:'https://image.tmdb.org/t/p/w500/xUfRZu2mi8jH6SzQEJGP6tjBuYj.jpg',source:'https://www.justwatch.com/pk/search?q=Demon%20Slayer'},
    'Jujutsu Kaisen':{year:'2020',genre:'Action / Fantasy',rating:'8.5',episodes:47,poster:'',source:'https://www.justwatch.com/pk/search?q=Jujutsu%20Kaisen'},
    'Attack on Titan':{year:'2013',genre:'Action / Drama',rating:'9.1',episodes:89,poster:'',source:'https://www.justwatch.com/pk/search?q=Attack%20on%20Titan'},
    'Death Note':{year:'2006',genre:'Mystery / Thriller',rating:'8.9',episodes:37,poster:'',source:'https://www.justwatch.com/pk/search?q=Death%20Note'},
    'Dragon Ball':{year:'1986',genre:'Action / Fantasy',rating:'8.5',episodes:153,poster:'',source:'https://www.justwatch.com/pk/search?q=Dragon%20Ball'},
    'Dragon Ball Z':{year:'1989',genre:'Action / Fantasy',rating:'8.8',episodes:291,poster:'',source:'https://www.justwatch.com/pk/search?q=Dragon%20Ball%20Z'},
    'Dragon Ball Super':{year:'2015',genre:'Action / Fantasy',rating:'8.3',episodes:131,poster:'',source:'https://www.justwatch.com/pk/search?q=Dragon%20Ball%20Super'},
    'Solo Leveling':{year:'2024',genre:'Action / Fantasy',rating:'8.8',episodes:25,poster:'',source:'https://www.justwatch.com/pk/search?q=Solo%20Leveling'},
    'My Hero Academia':{year:'2016',genre:'Action / Superhero',rating:'8.0',episodes:170,poster:'',source:'https://www.justwatch.com/pk/search?q=My%20Hero%20Academia'},
    'Hunter x Hunter':{year:'2011',genre:'Action / Adventure',rating:'9.0',episodes:148,poster:'',source:'https://www.justwatch.com/pk/search?q=Hunter%20x%20Hunter'},
    'Bleach':{year:'2004',genre:'Action / Fantasy',rating:'8.2',episodes:366,poster:'',source:'https://www.justwatch.com/pk/search?q=Bleach'},
    'Bleach: Thousand-Year Blood War':{year:'2022',genre:'Action / Fantasy',rating:'9.0',episodes:40,poster:'',source:'https://www.justwatch.com/pk/search?q=Bleach%20Thousand-Year%20Blood%20War'},
    'Black Clover':{year:'2017',genre:'Action / Fantasy',rating:'8.2',episodes:170,poster:'',source:'https://www.justwatch.com/pk/search?q=Black%20Clover'},
    'Fairy Tail':{year:'2009',genre:'Action / Fantasy',rating:'7.9',episodes:328,poster:'',source:'https://www.justwatch.com/pk/search?q=Fairy%20Tail'},
    'Tokyo Ghoul':{year:'2014',genre:'Action / Horror',rating:'7.7',episodes:48,poster:'',source:'https://www.justwatch.com/pk/search?q=Tokyo%20Ghoul'},
    'Chainsaw Man':{year:'2022',genre:'Action / Horror',rating:'8.4',episodes:12,poster:'',source:'https://www.justwatch.com/pk/search?q=Chainsaw%20Man'},
    'Blue Lock':{year:'2022',genre:'Sports / Drama',rating:'8.2',episodes:38,poster:'',source:'https://www.justwatch.com/pk/search?q=Blue%20Lock'},
    'Haikyu!!':{year:'2014',genre:'Sports / Comedy',rating:'8.7',episodes:85,poster:'',source:'https://www.justwatch.com/pk/search?q=Haikyu'},
    'Spy x Family':{year:'2022',genre:'Comedy / Action',rating:'8.4',episodes:37,poster:'',source:'https://www.justwatch.com/pk/search?q=Spy%20x%20Family'},
    'One Punch Man':{year:'2015',genre:'Action / Comedy',rating:'8.7',episodes:24,poster:'',source:'https://www.justwatch.com/pk/search?q=One%20Punch%20Man'},
    'Mob Psycho 100':{year:'2016',genre:'Action / Comedy',rating:'8.6',episodes:37,poster:'',source:'https://www.justwatch.com/pk/search?q=Mob%20Psycho%20100'},
    'Tokyo Revengers':{year:'2021',genre:'Action / Drama',rating:'7.8',episodes:50,poster:'',source:'https://www.justwatch.com/pk/search?q=Tokyo%20Revengers'},
    'The Seven Deadly Sins':{year:'2014',genre:'Action / Fantasy',rating:'7.8',episodes:100,poster:'',source:'https://www.justwatch.com/pk/search?q=The%20Seven%20Deadly%20Sins'},
    'Sword Art Online':{year:'2012',genre:'Action / Fantasy',rating:'7.5',episodes:96,poster:'',source:'https://www.justwatch.com/pk/search?q=Sword%20Art%20Online'},
    'Re:Zero - Starting Life in Another World':{year:'2016',genre:'Fantasy / Drama',rating:'8.1',episodes:50,poster:'',source:'https://www.justwatch.com/pk/search?q=Re%3AZero'},
    'That Time I Got Reincarnated as a Slime':{year:'2018',genre:'Fantasy / Adventure',rating:'8.0',episodes:72,poster:'',source:'https://www.justwatch.com/pk/search?q=That%20Time%20I%20Got%20Reincarnated%20as%20a%20Slime'},
    'Overlord':{year:'2015',genre:'Fantasy / Action',rating:'7.9',episodes:52,poster:'',source:'https://www.justwatch.com/pk/search?q=Overlord'}
  };
  const q=new URLSearchParams(location.search).get('title');
  const title=q?decodeURIComponent(q):''; const item=data[title]; const root=document.getElementById('series-content');
  function safe(s){return String(s).replace(/[&<>\"']/g,'')}
  function episodeUrl(n){
    if(title==='Naruto'){
      const part=Math.min(8,Math.floor((n-1)/28)+1);
      const urls={1:'https://www.viz.com/anime/tv-show/naruto-video/video-unit/1',2:'https://www.viz.com/anime/tv-show/naruto-video/video-unit/2',3:'https://www.viz.com/anime/tv-show/naruto-video/video-unit/3',4:'https://www.viz.com/anime/tv-show/naruto-video/video-unit/4',5:'https://www.viz.com/anime/tv-show/naruto-video/video-unit/5',6:'https://www.viz.com/anime/tv-show/naruto-video/video-unit/6',7:'https://www.viz.com/anime/tv-show/naruto-video/video-unit/7',8:'https://www.viz.com/anime/tv-show/naruto-video/video-unit/8'};
      return urls[part];
    }
    if(title==='Naruto: Shippuden'){
      const part=Math.min(18,Math.floor((n-1)/27)+1); return 'https://www.viz.com/anime/tv-show/naruto-shippuden-video/video-unit/'+(part+8);
    }
    return item.source;
  }
  if(!item){root.innerHTML='<div class="empty-series"><h1>Series not found</h1><p>Please go back and select an anime series.</p></div>';return}
  const poster=item.poster?`<img class="series-poster" src="${item.poster}" alt="${safe(title)} poster">`:'<div class="series-poster"></div>';
  root.innerHTML=`<section class="series-hero">${poster}<div class="series-info"><span class="eyebrow">SK MOVIES • SERIES</span><h1>${safe(title)}</h1><p>${safe(item.year)} • ${safe(item.genre)} • ⭐ ${safe(item.rating)}/10</p><span class="series-count">${item.episodes} Episodes</span></div></section><section class="player-box" id="series-player"><h3 id="player-title">Episode</h3><video id="series-video" controls playsinline></video></section><div class="episode-head"><div><span class="eyebrow">EPISODES</span><h2>All Episodes</h2></div><a class="watch-btn" href="${item.source}" target="_blank" rel="noopener noreferrer">📺 Legal Viewing Options</a></div><div class="episode-grid" id="episode-grid"></div><p class="legal-note">Episode buttons open an authorized/official viewing source. SK Movies does not host or provide unauthorized copies of copyrighted episodes.</p>`;
  const grid=document.getElementById('episode-grid');
  for(let i=1;i<=item.episodes;i++){
    const b=document.createElement('button'); b.className='episode-btn'; b.type='button'; b.innerHTML='Episode '+i+'<small>▶ Watch</small>';
    b.onclick=()=>{const url=episodeUrl(i);window.open(url,'_blank','noopener,noreferrer')}; grid.appendChild(b);
  }
})();
