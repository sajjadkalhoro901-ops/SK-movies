// SK Movies JavaScript

document.addEventListener("DOMContentLoaded", function () {
    console.log("SK Movies Website Loaded!");

    const buttons = document.querySelectorAll("button");

    buttons.forEach(button => {
        button.addEventListener("click", function () {
            alert("Trailer feature coming soon!");
        });
    });
});
