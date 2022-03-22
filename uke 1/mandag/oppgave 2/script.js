formEl = document.getElementById("form");

addEventListener("submit", function(e) {
    this.document.getElementById("text").innerHTML = "Hei jeg heter "+ formEl.navn.value;
    e.preventDefault();
})