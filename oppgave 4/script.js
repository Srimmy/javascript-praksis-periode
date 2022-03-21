formEl = document.getElementById("form");


formEl.addEventListener("submit", function(e) {
    document.getElementById("text").innerHTML = "Hei jeg heter " + formEl.navn.value + " og er " + formEl.alder.value + " år gammel. Jeg liker " + formEl.drikke.value + " best.";
    console.log(formEl.drikke)
    e.preventDefault();
})