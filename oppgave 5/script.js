formEl = document.getElementById("form");

//arrays for dynamisk JS
drikker = [
    "lunkent vann",
    "kaldt vann",
    "varmt vann",
]

matretter = [
    "banan",
    "potet",
    "mennesker",
    "manum01",
    "pistol",
]

//lager alle input i følge arrayen drikker
for( i = 0; i < drikker.length; i++) {
    formEl.innerHTML +=  '<input type="radio" name="drikke" value="'+drikker[i]+'" required> ' + drikker[i];
}
//lager alle input for arrayen matretter
for( i = 0; i < matretter.length; i++) {
    formEl.innerHTML += '<div class="row"><input type="checkbox" name="mat" value="'+matretter[i]+'"> '+matretter[i]+'</div>'
}
//lager submit button
formEl.innerHTML += '<input type="submit" value="si hei">';

//definerer variabler
let setning = "";
let mater = [];

//hvis en form blir submittet
formEl.addEventListener("submit", function (e) {

    //stopper form submit
    e.preventDefault();
    
    //null stiller variabler slik at det ikke blir mer og mer
    setning = "Jeg liker ";
    mater = [];

    //Teller hvor mange matretter som er huket av og pusher i en array
    for (i = 0; i < formEl.mat.length; i++) {
        if (form.mat[i].checked) {
            mater.push(formEl.mat[i].value);
        }
    }

    //setter inn matrettene som var huket i en setning
    for (i = 0; i < mater.length; i++) {
        //case 1: mater[i] er det siste eller nest siste elementet, legger til " og "
        if (i == mater.length - 2 || i == mater.length - 1) {
            setning += mater[i] + " og ";
            
        } else {//case 2: det er ikke siste / nest siste, legger til komma.
            setning += mater[i] + ", ";
        }
    }

    //fjerner den siste "og"
    setning = setning.slice(0, -4) + " best.";

    if (mater.length < 3) { //case 1: slutt bruker har ikke valgt 3 ting
        document.getElementById("text").innerHTML = "du må velge minst 3 mater"
    } else { //case 2: de har valgt <= 3 ting - skriver output
        document.getElementById("text").innerHTML = "Hei jeg heter " + formEl.navn.value + " og er " + formEl.alder.value + " år gammel. \n \nJeg liker " + formEl.drikke.value + ". \n\n"+ setning;
    }
})