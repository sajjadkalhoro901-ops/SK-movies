/* Final navigation cleanup: remove the old fake episode player and use dedicated series pages. */
(function(){
  const anime=new Set(['One Piece','Naruto','Naruto: Shippuden','Demon Slayer: Kimetsu no Yaiba','Jujutsu Kaisen','Attack on Titan','Death Note','Dragon Ball','Dragon Ball Z','Dragon Ball Super','Solo Leveling','My Hero Academia','Hunter x Hunter','Bleach','Bleach: Thousand-Year Blood War','Black Clover','Fairy Tail','Tokyo Ghoul','Chainsaw Man','Blue Lock','Haikyu!!','Spy x Family','One Punch Man','Mob Psycho 100','Tokyo Revengers','The Seven Deadly Sins','Sword Art Online','Re:Zero - Starting Life in Another World','That Time I Got Reincarnated as a Slime','Overlord']);
  function clean(){
    const old=document.getElementById('anime-episodes-modal');
    if(old) old.remove();
    document.querySelectorAll('.card').forEach(card=>{
      const title=card.querySelector('h3')?.textContent?.trim();
      if(!title||!anime.has(title)) return;
      const url='series.html?title='+encodeURIComponent(title);
      card.querySelectorAll('.anime-watch,.anime-free').forEach(btn=>{
        const clone=btn.cloneNode(true); clone.textContent='📺 Episodes';
        clone.onclick=(e)=>{e.preventDefault();e.stopPropagation();location.href=url};
        btn.replaceWith(clone);
      });
    });
  }
  clean(); setTimeout(clean,300); setTimeout(clean,1000); setTimeout(clean,2200);
})();
