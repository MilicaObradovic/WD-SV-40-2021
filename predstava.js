let firebaseURL = "https://pozoriste-dff61-default-rtdb.europe-west1.firebasedatabase.app"
let predstave = {}
let ids = getParamValue();
let predstaveId = ids[0]
let pozoristeId = ids[1]
console.log(pozoristeId)

getPredstave()

function getPredstave(){
    let request = new XMLHttpRequest();
    
    request.onreadystatechange = function () {
        // console.log(this.readyState)
        if (this.readyState == 4) {
            if (this.status == 200) {
                predstave = JSON.parse(request.responseText);
                predstave = predstave[pozoristeId[1]]
                console.log(predstave)
                predstave = predstave[predstaveId[1]]
                appendZaglavlje(predstave.naziv)
                appendPredstava(predstaveId[1], predstave)
            } else {
                alert("Greška prilikom učitavanja predstava.");
            }
        }
    };

    request.open("GET", firebaseURL + "/predstave.json");
    request.send();
    
}

function getParamValue() {
    let location = decodeURI(window.location.toString());
    let index = location.indexOf("?") + 1;
    let subs = location.substring(index, location.length);
    let splitted = subs.split(";");
    result = []

    for(let string in splitted){
        let splitted2 = splitted[string].split("=");
        result.push(splitted2)
    }

    return result
}

function appendZaglavlje(naziv){
    let sekcija = document.createElement("h1");
    sekcija.innerText = naziv
    document.getElementById("zaglavlje").appendChild(sekcija);
}

function showIzmeni(){
    let clickedBtn = this;
    let data = clickedBtn.getAttribute("data-id");
    let poz = clickedBtn.getAttribute("predstave-id");
    window.location.href = "izmeni_predstavu.html?id=" + data + ";pozoriste=" + poz;
}

function appendPredstava(id, pozoriste) {
    // let sekcija = document.createElement("div");
    // sekcija.classList.add("row", "predstava")

    // let slikaPozoriste = document.createElement("div");
    // slikaPozoriste.classList.add("pocetna")

    let textPozoriste = document.createElement("div");
    textPozoriste.classList.add("opis", "col-lg-8", "col-xl-9");
    
    let opis = document.createElement("p");
    opis.innerText = pozoriste.opis
    textPozoriste.appendChild(opis);

    let zanr = document.createElement("p");
    text1 = "Zanr: ";
    result = text1.concat(pozoriste.zanr);
    zanr.innerText = result
    textPozoriste.appendChild(zanr);

    let tarajanje = document.createElement("p");
    text1 = "Trajanje: ";
    result = text1.concat(pozoriste.trajanje, "min");
    tarajanje.innerText = result
    textPozoriste.appendChild(tarajanje);

    let cena = document.createElement("p");
    text1 = "Cena: ";
    result = text1.concat(pozoriste.cena, "din");
    cena.innerText = result
    textPozoriste.appendChild(cena);

    let kod = document.createElement("p");
    text1 = "Kod predstave: ";
    result = text1.concat(pozoriste.kod);
    kod.innerText = result
    textPozoriste.appendChild(kod);

    let osobe = document.createElement("p");
    text1 = "Maks br. osoba: ";
    result = text1.concat(pozoriste.maxOsobe);
    osobe.innerText = result
    textPozoriste.appendChild(osobe);

    let ocena = document.createElement("p");
    text1 = "Prosecna ocena: ";
    result = text1.concat(pozoriste.ocena);
    ocena.innerText = result
    textPozoriste.appendChild(ocena);

    // DODATI OCENE

    let button = document.createElement("button");
    button.type = "button";
    button.className = "btn"
    button.onclick = showIzmeni
    button.setAttribute("data-id", id);
    button.setAttribute("predstave-id", pozoristeId[1]);
    button.innerText = "Izmeni"
    textPozoriste.appendChild(button);


    let slika = document.createElement("img");
    slika.classList.add("pocetna-slika", "col-lg-4", "col-xl-3")
    slika.src = pozoriste.slika
    slika.alt = "predstava"
    // slikaPozoriste.appendChild(slika);
  
    document.getElementById("predstava").appendChild(slika);
    document.getElementById("predstava").appendChild(textPozoriste);
}