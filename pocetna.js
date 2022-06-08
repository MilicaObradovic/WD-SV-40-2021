let firebaseURL = "https://pozoriste-dff61-default-rtdb.europe-west1.firebasedatabase.app"
let pozorista = {}

getPozorista()

function getPozorista(){
    let request = new XMLHttpRequest();

    request.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                removePozorista("pozorista");

                pozorista = JSON.parse(request.responseText);
                // console.log(pozorista);

                for (let id in pozorista) {
                    let pozoriste = pozorista[id];
                    appendPozoriste("pozorista",id, pozoriste);
                }
            } else {
                alert("Greška prilikom učitavanja pozorista.");
            }
        }
  };

  request.open("GET", firebaseURL + "/pozorista.json");
  request.send();
}

function removePozorista(id) {
    let pozorista = document.getElementById(id);
    while (pozorista.firstChild) {
        pozorista.removeChild(pozorista.lastChild);
    }
}
function showPredstave(){
    let clickedBtn = this;
    let predstaveId = clickedBtn.getAttribute("data-id");
    let pozoristeId = clickedBtn.getAttribute("pozoriste-id");
    window.location.href = "pozoriste1.html?id=" + predstaveId + ";pozoriste=" + pozoristeId;
}

function appendPozoriste(body, id, pozoriste) {
    let sekcija = document.createElement("div");
    sekcija.classList.add("row", "sekcija")

    let slikaPozoriste = document.createElement("div");
    slikaPozoriste.classList.add("col-sm-12", "col-lg-7", "col-xl-6")

    let textPozoriste = document.createElement("div");
    textPozoriste.classList.add("text", "col-sm-12", "col-lg-5", "col-xl-6");
    
    let naslov = document.createElement("h2");
    naslov.innerText = pozoriste.naziv
    textPozoriste.appendChild(naslov);

    let adresa = document.createElement("p");
    let text1 = "Adresa: ";
    let result = text1.concat(pozoriste.adresa);
    adresa.innerText = result
    textPozoriste.appendChild(adresa);

    let brPredstava = document.createElement("p");
    text1 = "Broj predstava: ";
    result = text1.concat(pozoriste.brojPredstava);
    brPredstava.innerText = result
    textPozoriste.appendChild(brPredstava);

    let button = document.createElement("button");
    button.type = "button";
    button.className = "btn"
    button.onclick = showPredstave
    button.setAttribute("data-id", pozoriste.idPredstava);
    button.setAttribute("pozoriste-id", id);
    button.innerText = "Predstave"
    textPozoriste.appendChild(button);

    let slika = document.createElement("img");
    slika.classList.add("pozoriste", "img-responsive")
    slika.src = pozoriste.slika
    slika.alt = "pozoriste"
    slikaPozoriste.appendChild(slika);

    sekcija.appendChild(slikaPozoriste)
    sekcija.appendChild(textPozoriste)
  
    document.getElementById(body).appendChild(sekcija);
}

