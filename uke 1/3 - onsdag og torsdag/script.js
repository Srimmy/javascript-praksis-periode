let formEl = document.getElementById("form");
let inputDiv = document.getElementById("inputDiv");
let outputEl = document.getElementById("output");

let abonoment = [ //lagrer data som blir brukt, hvis du vil legge til noe så legger du til på samme format
    { navn: "Internett 50mbit", pris: 399.00 },
    { navn: "Internett 100mbit", pris: 599.00 },
    { navn: "Internett 300mbit", pris: 799.00 },
    { navn: "Internett 500mbit", pris: 999.00 },
]
let engangskost = [ // samme som over på abonoment
    { navn: "Ekstra TV-dekoder", pris: 399.00 },
    { navn: "Wifi-extender", pris: 499.00 },
]

printInput('Internett abonoment', abonoment, 'abonoment', 'radio');
printInput('Engangskost', engangskost, 'engangskost', 'checkbox')

for (i of document.getElementsByTagName('input')) {
    console.log(i);
}



form.addEventListener("submit", function (e) {

    e.preventDefault();
    let valgteEngagskoster = [];
    let valgtAbonoment = formEl.abonoment.value.split("|");
    let totalEngangspriser = 0;
    let totalpris = 0;
    let abonomentString = "";
    let aRabatt = 1;
    let eRabatt = 1;
    let minusARabatt = 0;
    let minusERabatt = 0;

    for (let valg of formEl.engangskost) { //ser hvilke checkboxer som er krysset av
        if (valg.checked) { //kjører kode hvis en checkbox er huket av
            //har 2 verdier i valie attribute, de kan deles opp med "|"
            let splitValue = valg.value.split("|");
            //gjør verdier til objekter i en array
            valgteEngagskoster.push({ navn: splitValue[0], pris: splitValue[1] });
        }
    }
    if (valgtAbonoment[0] || valgteEngagskoster[0]) {
        //case 1: enten en radio knapp eller checkbox er krysset av
        output.innerHTML = 'Hei ' + formEl.kunde.value + ' og takk for en hyggelig telefonsamtale. \n\n';
        aRabattString = "";
        eRabattString = "";


        //rabatter
        switch (true) {
            case form.abonomentRabatt.value != '' && form.engangskostRabatt.value != '':
                //case 1: det er rabatt på abonoment og engangskost
                output.innerHTML += "Sender deg som avtalt " + form.engangskostRabatt.value + "% tilbud på engangskost produktene og " + form.abonomentRabatt.value + "% tilbud på abonomentet \n\n";
                aRabatt -= parseFloat(form.abonomentRabatt.value) / 100;
                eRabatt -= parseFloat(form.engangskostRabatt.value) / 100;
                minusARabatt = Math.round((parseFloat(valgtAbonoment[1]) - parseFloat(valgtAbonoment[1]) * aRabatt) * 100) / 100;
                aRabattString = "Rabatt: kr " + minusARabatt + ",-";


                console.log(parseFloat(valgtAbonoment[1]) - parseFloat(valgtAbonoment[1]) * aRabatt);

                break;
            case form.abonomentRabatt.value != '':
                //case 2: det er rabatt på abonoment
                output.innerHTML += "Sender deg som avtalt " + form.abonomentRabatt.value + "% tilbud på abonomentet \n\n";
                aRabatt -= parseFloat(form.abonomentRabatt.value) / 100;

                minusARabatt = Math.round((parseFloat(valgtAbonoment[1]) - parseFloat(valgtAbonoment[1]) * aRabatt) * 100) / 100;
                aRabattString = "Rabatt: kr " + minusARabatt + ",-";
                break;
            case form.engangskostRabatt.value != '':
                //case 3: det er rabatt på engangskost
                output.innerHTML += "Sender deg som avtalt " + form.engangskostRabatt.value + "% tilbud på engangskost produktene \n\n";
                eRabatt -= parseFloat(form.engangskostRabatt.value) / 100;
                break;
            default:
                //case 4: det er ingen rabatt
                output.innerHTML += "Sender deg som avtalt tilbud på ingen produkter fordi vi gir ikke rabatt \n\n"
                break;
        }
        //skriver ut regning
        output.innerHTML += '\n\n------------------------------------------------------------------------'
        if (valgtAbonoment[0]) {
            //kjører dersom et abonoment er huket av 
            output.innerHTML += '\n\nMånedlig\n';
            output.innerHTML += valgtAbonoment[0] + ": kr " + valgtAbonoment[1] + ',- \n' + aRabattString;
            totalpris += parseFloat(valgtAbonoment[1]) * aRabatt;
            abnonomentString = " \nmed en månedlig regning på kr " + twoDecimal(valgtAbonoment[1] * aRabatt) + ",-"
        }
        if (valgteEngagskoster[0]) {
            //kjører om en engangskost er huket av
            output.innerHTML += "\n\nEngangspriser"
            for (let element of valgteEngagskoster) { // ser hvilke som er huket av
                output.innerHTML += "\n" + element.navn + ': kr ' + element.pris + ',-';
                totalEngangspriser += parseFloat(element.pris) * eRabatt;
                if (eRabatt != 1) {
                    //kjører kode hvis det er rabatt
                    minusERabatt = Math.round((parseFloat(element.pris) - parseFloat(element.pris) * eRabatt) * 100) / 100;
                    output.innerHTML += "\nRabatt: kr " + minusERabatt + ",-";
                }
            }
            //legger til i totalpris
            totalpris += totalEngangspriser;
        }

        //skriver ut
        abonomentString = "med en månedlig regning på kr " + twoDecimal(valgtAbonoment[1] * aRabatt) + ",-";
        output.innerHTML += "\n\nTotalpris blir kr " + twoDecimal(totalpris) + ",-" + abonomentString + ".";
        output.innerHTML += '\n\n------------------------------------------------------------------------'
        output.innerHTML += "\n\nDet er bare å svare på denne eposten hvis du har noen spørsmål. \n\nMed vennlig hilsen " + formEl.agent.value;

    } else {
        //case 2: ingenting er krysset av
        output.innerHTML = "Huk av minst ett felt.";
    }



})
//runder av til 2 desimaler
function twoDecimal(num) {
    return Math.round(num * 100) / 100
}
//funksjon som legger alle feltene på nettsiden
function printInput(tittel, array, name, inputType) {
    inputDiv.innerHTML += "<h3> " + tittel + "</h3>";
    for (let service of array) {
        inputDiv.innerHTML += "<input name = '" + name + "' type = '" + inputType + "' readonly value = '" + service.navn + "|" + service.pris + "' > <label>" + service.navn + "</label> <br>";
    }
}