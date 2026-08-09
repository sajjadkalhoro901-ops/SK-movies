const search = document.getElementById("search");
const cards = Array.from(document.querySelectorAll(".card"));
const noResults = document.getElementById("no-results");

function filterMovies() {
    const value = search.value.toLowerCase().trim();
    let visible = 0;

    cards.forEach((card) => {
        const title = card.querySelector("h3").textContent.toLowerCase();
        const match = title.includes(value);
        card.hidden = !match;
        if (match) visible++;
    });

    noResults.hidden = visible !== 0;
}

search.addEventListener("input", filterMovies);

// Keep broken remote posters from showing a browser error icon.
document.querySelectorAll(".card img").forEach((img) => {
    img.addEventListener("error", () => {
        if (img.dataset.fallback) return;
        const title = img.alt.replace(/ poster$/i, "").replace(/[^a-z0-9 ]/gi, " ").trim().replace(/\s+/g, "+");
        img.dataset.fallback = "true";
        img.src = `https://placehold.co/500x750/151515/ff3333?text=${encodeURIComponent(title || "SK+Movies")}`;
    });
});
