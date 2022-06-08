let firebaseURL = "https://pozoriste-dff61-default-rtdb.europe-west1.firebasedatabase.app"
let predstave = {}
let pozorista = {}
let ids = getParamValue();
let predstaveId = ids[0]
let pozoristeId = ids[1]
var predstava = ""
// console.log(pozoristeId)

getNaslov()
getPredstave()

function getPredstave(){
    let request = new XMLHttpRequest();
    
    request.onreadystatechange = function () {
        // console.log(this.readyState)
        if (this.readyState == 4) {
            if (this.status == 200) {
                removePredstave("predstave");
        
                predstave = JSON.parse(request.responseText);
                // console.log(predstave);
                predstave = predstave[predstaveId[1]]
                // console.log("predstave")
                // console.log(predstave);
                for (let id in predstave) {
                    let predstava = predstave[id];
                    appendPredstava("predstave",id, predstava);
                }
            } else {
                alert("Greška prilikom učitavanja predstava.");
            }
        }
    };

    request.open("GET", firebaseURL + "/predstave.json");
    request.send();
    
}

function getNaslov(){
    let request = new XMLHttpRequest();
    
    request.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                pozorista = JSON.parse(request.responseText);
                pozoriste = pozorista[pozoristeId[1]]
                predstava = pozoriste.idPredstava
                appendZaglavlje(pozoriste.naziv)
            } else {
                alert("Greška prilikom učitavanja predstava.");
            }
        }
    };

    request.open("GET", firebaseURL + "/pozorista.json");
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

function removePredstave(id) {
    let predstave = document.getElementById(id);
    while (predstave.firstChild) {
        predstave.removeChild(predstave.lastChild);
    }
}

function showDetaljnije(){
    let clickedBtn = this;
    let data = clickedBtn.getAttribute("data-id");
    let poz = clickedBtn.getAttribute("predstave-id");
    window.location.href = "predstava1.html?id=" + data + ";pozoriste=" + poz;
}

function appendZaglavlje(naziv){
    let sekcija = document.createElement("h1");
    sekcija.innerText = naziv
    document.getElementById("zaglavlje").appendChild(sekcija);
}

function appendPredstava(body,id, pozoriste) {
    let sekcija = document.createElement("div");
    sekcija.classList.add("row", "predstava")

    let slikaPozoriste = document.createElement("div");
    slikaPozoriste.classList.add("col-lg-4", "col-xl-4", "div-slika")

    let textPozoriste = document.createElement("div");
    textPozoriste.classList.add("text", "col-lg-8", "col-xl-8");
    
    let naslov = document.createElement("h2");
    naslov.innerText = pozoriste.naziv
    textPozoriste.appendChild(naslov);

    let kratakOpis = document.createElement("p");
    kratakOpis.innerText = pozoriste.kratakOpis
    textPozoriste.appendChild(kratakOpis);

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

    let button = document.createElement("button");
    button.type = "button";
    button.className = "btn"
    button.onclick = showDetaljnije
    button.setAttribute("data-id", id);
    button.setAttribute("predstave-id", predstava);
    button.innerText = "Detaljnije"
    textPozoriste.appendChild(button);

    let slika = document.createElement("img");
    slika.classList.add("slika")
    slika.src = pozoriste.slika
    slika.alt = "predstava"
    slikaPozoriste.appendChild(slika);

    sekcija.appendChild(slikaPozoriste)
    sekcija.appendChild(textPozoriste)
  
    document.getElementById(body).appendChild(sekcija);
}