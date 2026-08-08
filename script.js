const search = document.getElementById("search");
const cards = document.querySelectorAll(".card");

search.addEventListener("input", function () {
    const value = search.value.toLowerCase().trim();

    cards.forEach(function (card) {
        const title = card.querySelector("h3").textContent.toLowerCase();

        if (title.includes(value)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
});
