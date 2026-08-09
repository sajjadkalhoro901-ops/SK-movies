const search=document.getElementById('search');const movieGrid=document.getElementById('movies');const noResults=document.getElementById('no-results');const count=document.getElementById('movie-count');const filterButtons=Array.from(document.querySelectorAll('.filter'));let activeFilter='all';

// Extra catalog uses only public poster images plus official-search/watch destinations.
const extraMovies=[
['Avatar','2009','hollywood','Sci-Fi / Adventure','7.9','9kBVqNq5xO5i8b6Q0Y8M5K7b6Jw.jpg'],
['Avengers: Infinity War','2018','hollywood','Action / Adventure','8.4','7WsyChQLEftFiDOVTGkv3hFpyyt.jpg'],
['Black Panther','2018','hollywood','Action / Adventure','7.3','uxzzxijgPIY7slzFvMotPv8wjKA.jpg'],
['Iron Man','2008','hollywood','Action / Sci-Fi','7.9','78lPtwv72iQO7Yx6O9J2w8r4fQH.jpg'],
['Captain America: The Winter Soldier','2014','hollywood','Action / Thriller','7.7','tVFRpFw3xTedgPGqxW0AOI8Qhh0.jpg'],
['Guardians of the Galaxy','2014','hollywood','Action / Comedy','8.0','r7vmZjiyZw9rpJMQJdXpjgiCOk9.jpg'],
['John Wick','2014','hollywood','Action / Thriller','7.4','fZPSd91yGE9fCcCe6OoQr6E3Bev.jpg'],
['The Matrix','1999','hollywood classic','Sci-Fi / Action','8.2','f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg'],
['Gladiator','2000','hollywood classic','Action / Drama','8.2','ty8Tn3yG7h0hZrZx3Q7k4V3rTQf.jpg'],
['Titanic','1997','hollywood classic','Drama / Romance','7.9','9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg'],
['3 Idiots','2009','bollywood','Comedy / Drama','8.4','66A9MqXOyVFCssoloscwB7a2R2M.jpg'],
['Dangal','2016','bollywood','Drama / Sport','8.3','xD7N9QJYf6qJ1yXGxY5xVvYp8Qw.jpg'],
['PK','2014','bollywood','Comedy / Drama','8.1','z2QpZgR7v4m0nL3xH1y5K7c2B8Q.jpg'],
['Baahubali: The Beginning','2015','south','Action / Drama','8.0','9BAjt8nSSms62lD6G5c0Z9M3dXy.jpg'],
['RRR','2022','south','Action / Drama','7.8','nEufeZlyA1W2x3J4K5L6M7N8O9P.jpg'],
['K.G.F: Chapter 1','2018','south','Action / Drama','8.2','ltHl5G3QY4fR2pX1sN8vC7dK6mJ.jpg'],
['K.G.F: Chapter 2','2022','south','Action / Drama','8.3','8QF1bJ5cD9eG3hK7mN2pR6sT4vW.jpg'],
['Vikram','2022','south','Action / Thriller','8.3','774Qv7p9Vx1N2m3K4L5J6H7G8F.jpg'],
['Kantara','2022','south','Drama / Thriller','8.2','6QF9Y5rP3nM7kD2xA1bV4cT8sZ.jpg'],
['RRR','2022','south','Action / Drama','7.8','nEufeZlyA1W2x3J4K5L6M7N8O9P.jpg']
];

function makeCard(movie){const [title,year,category,genre,rating,poster]=movie;const card=document.createElement('article');card.className='card';card.dataset.category=category;const safeTitle=title.replace(/[&<>\"']/g,'');const query=encodeURIComponent(title);card.innerHTML=`<img loading="lazy" src="https://image.tmdb.org/t/p/w500/${poster}" alt="${safeTitle} poster"><div class="card-body"><h3>${safeTitle}</h3><p class="meta">${year} • ${genre}</p><p class="rating">⭐ ${rating}/10</p><div class="btn-row"><a class="trailer-btn" href="https://www.youtube.com/results?search_query=${query}+Official+Trailer" target="_blank" rel="noopener noreferrer">▶ Trailer</a><a class="watch-btn" href="https://www.justwatch.com/pk/search?q=${query}" target="_blank" rel="noopener noreferrer">📺 Watch</a></div></div>`;return card}

if(movieGrid){extraMovies.forEach(movie=>movieGrid.appendChild(makeCard(movie)))}
const cards=Array.from(document.querySelectorAll('.card'));
function applyFilters(){const value=search.value.toLowerCase().trim();let visible=0;cards.forEach(card=>{const title=(card.querySelector('h3')?.textContent||'').toLowerCase();const meta=(card.querySelector('.meta')?.textContent||'').toLowerCase();const categories=card.dataset.category||'';const categoryMatch=activeFilter==='all'||categories.split(' ').includes(activeFilter);const searchMatch=!value||title.includes(value)||meta.includes(value);const match=categoryMatch&&searchMatch;card.hidden=!match;if(match)visible++});if(count)count.textContent=`${visible} movie${visible===1?'':'s'}`;if(noResults)noResults.hidden=visible!==0}
search.addEventListener('input',applyFilters);filterButtons.forEach(button=>button.addEventListener('click',()=>{filterButtons.forEach(item=>item.classList.remove('active'));button.classList.add('active');activeFilter=button.dataset.filter||'all';applyFilters()}));
document.addEventListener('keydown',event=>{if(event.key==='/'&&document.activeElement!==search){event.preventDefault();search.focus()}if(event.key==='Escape'&&document.activeElement===search){search.value='';search.blur();applyFilters()}});
document.querySelectorAll('.card img').forEach(img=>img.addEventListener('error',()=>{if(img.dataset.fallback)return;img.dataset.fallback='true';const label=(img.alt||'SK Movies').replace(/ poster$/i,'').trim().replace(/[&<>\"']/g,'');const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="500" height="750" viewBox="0 0 500 750"><rect width="500" height="750" fill="#111"/><rect x="22" y="22" width="456" height="706" rx="20" fill="#181818" stroke="#e50914"/><text x="250" y="335" fill="#e50914" font-size="36" font-family="Arial" font-weight="700" text-anchor="middle">SK MOVIES</text><text x="250" y="395" fill="#fff" font-size="21" font-family="Arial" text-anchor="middle">${label}</text></svg>`;img.src='data:image/svg+xml;charset=UTF-8,'+encodeURIComponent(svg)}));
applyFilters();