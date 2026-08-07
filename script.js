const search = document.getElementById("search");

search.addEventListener("keyup", function () {

    let value = search.value.toLowerCase();

    let cards = document.querySelectorAll(".card");

    cards.forEach(card=>{

        let title = card.querySelector("h3").textContent.toLowerCase();

        if(title.includes(value)){
            card.style.display="block";
        }else{
            card.style.display="none";
        }

    });

});
