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

//funksjon som legger alle feltene på nettsiden
function printInput(tittel, array, name, inputType) {
    inputDiv.innerHTML += "<h3> " + tittel + "</h3>";
    for (let service of array) {
        inputDiv.innerHTML += "<input name = '" + name + "' type = '" + inputType + "' readonly value = '" + service.navn + "|" + service.pris + "' > <label>" + service.navn + "</label> <br>";
    }
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

    for (let valg of formEl.engangskost) {
        if (valg.checked) {
            let splitValue = valg.value.split("|");
            valgteEngagskoster.push({ navn: splitValue[0], pris: splitValue[1] });
        }
    }
    if (valgtAbonoment[0] || valgteEngagskoster[0]) {
        console.log(formEl.kunde.value, formEl.agent.value, valgtAbonoment[1]);
        output.innerHTML = 'Hei ' + formEl.kunde.value + ' og takk for en hyggelig telefonsamtale. \n\n';
        aRabattString = "";
        eRabattString = "";


        //rabatter
        switch (true) {
            case form.abonomentRabatt.value != '' && form.engangskostRabatt.value != '':
                output.innerHTML += "Sender deg som avtalt " + form.engangskostRabatt.value + "% tilbud på engangskost produktene og " + form.abonomentRabatt.value + "% tilbud på abonomentet \n\n";
                aRabatt -= parseFloat(form.abonomentRabatt.value) / 100;
                eRabatt -= parseFloat(form.engangskostRabatt.value) / 100;
                minusARabatt = Math.round((parseFloat(valgtAbonoment[1]) - parseFloat(valgtAbonoment[1]) * aRabatt) * 100) / 100;
                aRabattString = "Rabatt: kr " + minusARabatt + ",-";


                console.log(parseFloat(valgtAbonoment[1]) - parseFloat(valgtAbonoment[1]) * aRabatt);

                break;
            case form.abonomentRabatt.value != '':
                output.innerHTML += "Sender deg som avtalt " + form.abonomentRabatt.value + "% tilbud på abonomentet \n\n";
                aRabatt -= parseFloat(form.abonomentRabatt.value) / 100;

                minusARabatt = Math.round((parseFloat(valgtAbonoment[1]) - parseFloat(valgtAbonoment[1]) * aRabatt) * 100) / 100;
                aRabattString = "Rabatt: kr " + minusARabatt + ",-";
                break;
            case form.engangskostRabatt.value != '':
                output.innerHTML += "Sender deg som avtalt " + form.engangskostRabatt.value + "% tilbud på engangskost produktene \n\n";
                eRabatt -= parseFloat(form.engangskostRabatt.value) / 100;
                break;
            default:
                output.innerHTML += "Sender deg som avtalt tilbud på ingen produkter fordi vi gir ikke rabatt \n\n"
                break;
        }
        output.innerHTML += '\n\n------------------------------------------------------------------------'
        if (valgtAbonoment[0]) {
            output.innerHTML += '\n\nMånedlig\n';
            output.innerHTML += valgtAbonoment[0] + ": kr " + valgtAbonoment[1] + ',- \n' + aRabattString;
            totalpris += parseFloat(valgtAbonoment[1]) * aRabatt;
            abnonomentString = " \nmed en månedlig regning på kr " + twoDecimal(valgtAbonoment[1] * aRabatt) + ",-"
        }
        if (valgteEngagskoster[0]) {
            output.innerHTML += "\n\nEngangspriser"
            for (let element of valgteEngagskoster) {
                console.log(element.navn, element.pris);
                output.innerHTML += "\n"+element.navn + ': kr ' + element.pris + ',-';
                totalEngangspriser += parseFloat(element.pris) * eRabatt;
                if (eRabatt != 1) {
                    minusERabatt = Math.round((parseFloat(element.pris) - parseFloat(element.pris) * eRabatt) * 100) / 100;
                    output.innerHTML += "\nRabatt: kr " + minusERabatt + ",-";
                }
            }
            totalpris += totalEngangspriser;
        }


        abonomentString = "med en månedlig regning på kr " + twoDecimal(valgtAbonoment[1] * aRabatt) + ",-";
        output.innerHTML += "\n\nTotalpris blir kr " + twoDecimal(totalpris) + ",-" + abonomentString + ".";
        output.innerHTML += '\n\n------------------------------------------------------------------------'
        output.innerHTML += "\n\nDet er bare å svare på denne eposten hvis du har noen spørsmål. \n\nMed vennlig hilsen " + formEl.agent.value;
        // output.innerHTML += '\n\n'+valgtAbonoment[0];
        // output.innerHTML += '\n\n'+valgtAbonoment[0];

    } else {
        output.innerHTML = "Huk av minst ett felt.";
    }



})

function twoDecimal(num) {
    return Math.round(num*100)/100
}