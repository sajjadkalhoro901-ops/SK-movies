/* Turn anime cards into dedicated series pages. */
(function(){
  const animeNames=new Set(['One Piece','Naruto','Naruto: Shippuden','Demon Slayer: Kimetsu no Yaiba','Jujutsu Kaisen','Attack on Titan','Death Note','Dragon Ball','Dragon Ball Z','Dragon Ball Super','Solo Leveling','My Hero Academia','Hunter x Hunter','Bleach','Bleach: Thousand-Year Blood War','Black Clover','Fairy Tail','Tokyo Ghoul','Chainsaw Man','Blue Lock','Haikyu!!','Spy x Family','One Punch Man','Mob Psycho 100','Tokyo Revengers','The Seven Deadly Sins','Sword Art Online','Re:Zero - Starting Life in Another World','That Time I Got Reincarnated as a Slime','Overlord']);
  function setup(){
    document.querySelectorAll('.card').forEach(card=>{
      const title=card.querySelector('h3')?.textContent?.trim();
      if(!title||!animeNames.has(title)||card.dataset.seriesLinked)return;
      card.dataset.seriesLinked='1';
      card.style.cursor='pointer';
      card.setAttribute('role','link');
      card.setAttribute('tabindex','0');
      const open=()=>{location.href='series.html?title='+encodeURIComponent(title)};
      card.addEventListener('click',e=>{if(e.target.closest('a,button'))return;open()});
      card.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&!e.target.closest('a,button')){e.preventDefault();open()}});
      card.querySelectorAll('.anime-watch,.anime-free').forEach(btn=>{btn.onclick=()=>open()});
    });
  }
  setup();setTimeout(setup,800);setTimeout(setup,2000);
})();
