/* Dedicated anime/series navigation. Capture phase prevents the old modal from opening. */
(function(){
  const names=new Set(['One Piece','Naruto','Naruto: Shippuden','Demon Slayer: Kimetsu no Yaiba','Jujutsu Kaisen','Attack on Titan','Death Note','Dragon Ball','Dragon Ball Z','Dragon Ball Super','Solo Leveling','My Hero Academia','Hunter x Hunter','Bleach','Bleach: Thousand-Year Blood War','Black Clover','Fairy Tail','Tokyo Ghoul','Chainsaw Man','Blue Lock','Haikyu!!','Spy x Family','One Punch Man','Mob Psycho 100','Tokyo Revengers','The Seven Deadly Sins','Sword Art Online','Re:Zero - Starting Life in Another World','That Time I Got Reincarnated as a Slime','Overlord']);
  function go(title){location.assign('series.html?title='+encodeURIComponent(title))}
  function hideOldModal(){const m=document.getElementById('anime-episodes-modal');if(m){m.classList.remove('show');m.style.display='none'}}
  function setup(){
    hideOldModal();
    document.querySelectorAll('.card').forEach(card=>{
      const title=card.querySelector('h3')?.textContent?.trim();
      if(!title||!names.has(title))return;
      card.dataset.seriesLinked='1';card.style.cursor='pointer';
      card.querySelectorAll('.anime-watch,.anime-free').forEach(btn=>{btn.removeAttribute('onclick');btn.type='button'})
    });
  }
  document.addEventListener('click',function(e){
    const card=e.target.closest('.card');if(!card)return;
    const title=card.querySelector('h3')?.textContent?.trim();if(!title||!names.has(title))return;
    e.preventDefault();e.stopPropagation();if(e.stopImmediatePropagation)e.stopImmediatePropagation();go(title);
  },true);
  setup();setTimeout(setup,300);setTimeout(setup,1000);setTimeout(setup,2000);
})();
