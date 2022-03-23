formEl = document.getElementById("form");

formEl.addEventListener("submit", function(e) {
    e.preventDefault();
    document.getElementById("text").innerHTML = "Hei jeg heter " + formEl.navn.value + " og er " + form.alder.value + " år gammel";
})

