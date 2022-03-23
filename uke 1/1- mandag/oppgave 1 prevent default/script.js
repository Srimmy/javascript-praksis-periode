document.getElementById("form").addEventListener("submit", function (e) {

    let data = form.elements;
    console.log("Hei jeg heter " + form.navn.value)
    e.preventDefault(); // stopper form fra å bli submitta
    document.getElementById("text").innerHTML = "Hei jeg heter " + form.navn.value + " og er "+ form.alder.value + " år gammel";
});
