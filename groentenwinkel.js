"use strict";
let array = [];

getData();

document.getElementById("toevoegen").onclick = function () {
    verbergFoutmeldingen();
    const groenteCheck = document.getElementById('groente').checkValidity();
    const aantalCheck = document.getElementById('aantal').value > 0;

    if (groenteCheck && aantalCheck) {
        const select = document.getElementById("groente");
        const gekozenOption = select.options[select.selectedIndex]; 
        const groente = gekozenOption.value;
        const aantal = Number(document.getElementById('aantal').value);

        for (var i = 0; i < array.length; i++) {
            if (groente === array[i].groente) {
                array[i].aantal += aantal;
            }
            if (array[i].aantal != 0) {
                const groeneTr = document.getElementById(array[i].groente)
                groeneTr != null ? groeneTr.remove() : '';
                document.getElementById('header').hidden = false;
                const table = document.querySelector("tbody");
                const tr = table.insertRow();
                tr.id = array[i].groente;
                const groenteTd = tr.insertCell(); 
                groenteTd.innerText = array[i].groente; 
                const aantalTd = tr.insertCell();
                aantalTd.innerText = array[i].aantal;
                const prijsTd = tr.insertCell();
                prijsTd.innerText = array[i].prijs;
                const teBetalenTd = tr.insertCell();
                teBetalenTd.innerText = array[i].prijs * array[i].aantal;
                const verwijderTd = tr.insertCell(); 
                const verwijderHyperlink = document.createElement("a"); 
                verwijderHyperlink.id = i;
                const img = document.createElement("img");
                img.src = "vuilbak.png";
                verwijderHyperlink.appendChild(img); 
                verwijderHyperlink.href = "#"; 
                verwijderTd.appendChild(verwijderHyperlink); 

                verwijderHyperlink.onclick = function () { 
                    array[this.id].aantal = 0;
                    const tr = this.parentElement.parentElement; 
                    tr.remove(); 
                    berekenTotaal();
                };
            }
        }
        berekenTotaal();
    } else {
        if (!groenteCheck) {
            document.getElementById('groenteFout').hidden = false;
        }
        if (!aantalCheck) {
            document.getElementById('aantalFout').hidden = false;
        }    
    }
};

function getData() {
    const values = data;
    const selectInput = document.getElementById('groente');
    for (var i = 0; i < values.length; i++) {
        selectInput.innerHTML = selectInput.innerHTML +
                '<option value="' + values[i].naam + '">' + values[i].naam + '(' + values[i].prijs + '/' + values[i].eenheid + ')' + '</option>';
                array.push({'groente':values[i].naam , 'aantal': 0 , 'prijs': values[i].prijs });
    }
}

function berekenTotaal() {
    let totaal = 0;
    document.getElementById('footer').hidden = false;
    console.log(array)

    for (var i = 0; i < array.length; i++) {
        console.log(array[i].aantal * array[i].prijs)
        array[i].aantal != 0 ? totaal += array[i].prijs * array[i].aantal: '';
    }

    document.getElementById('totaal').innerText = totaal
    
    if (totaal === 0) {
        document.getElementById('header').hidden = true;
        document.getElementById('footer').hidden = true;
    }
}

function verbergFoutmeldingen() {
    for (const foutmelding of document.querySelectorAll("span.foutmelding")) { 
        foutmelding.hidden = true;
        }
}