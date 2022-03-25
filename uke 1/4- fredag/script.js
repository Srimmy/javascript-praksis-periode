let formEl = document.getElementById("form");
let rørSekk = { vekt: 25, liter: 12.5, kost: 89 };
let outputEl = document.getElementById("output");

formEl.addEventListener("submit", function (e) {
    e.preventDefault();
    if(parseInt(formEl.yDiameter.value) > parseInt(formEl.iDiameter.value)) {
        //gir output
        regnAntallPoser(cmTilLiter(regnRørVolumn()), rørSekk.liter, rørSekk.kost);
    } else {
        console.log(formEl.yDiameter.value, formEl.iDiameter.value);
        //feilmelding
        outputEl.innerHTML = "Ytre diameter må være større enn indre diameter."
    }
})
function regnVolum(diameter, lengde) {
    //regner volumet til en sylinder
    return (diameter / 2) ** 2 * lengde * Math.PI;
}
function regnRørVolumn() {
    //finner differansen mellom sylynden sitt ytre og indre volum
    return regnVolum(form.yDiameter.value, form.lengde.value) - regnVolum(form.iDiameter.value, form.lengde.value);
}
function cmTilLiter(kubikkCm) {
    //gjør om til liter
    return kubikkCm / 1000;
}
function regnAntallPoser(volum, liter, pris) {
    //regner antall poser
    poser = Math.ceil(volum/liter);
    console.log(volum);
    //output
    switch (poser) {
        case 1:
            outputEl.innerHTML = "Du må kjøpe " + poser + " pose. Det vil koste deg kr " + pris * poser + ",-.";
            break;
        default:
            outputEl.innerHTML = "Du må kjøpe " + poser + " poser. Det vil koste deg kr " + pris * poser + ",-.";
            break;
    }

}