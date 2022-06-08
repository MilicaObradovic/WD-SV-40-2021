let firebaseURL = "https://pozoriste-dff61-default-rtdb.europe-west1.firebasedatabase.app"
let korisnici = {}
getKorisnici()

function getKorisnici(){
    let request = new XMLHttpRequest();
    
    request.onreadystatechange = function () {
        // console.log(this.readyState)
        if (this.readyState == 4) {
            if (this.status == 200) {
                removeKorisnici();

                korisnici = JSON.parse(request.responseText);
                for (let id in korisnici) {
                    let korisnik = korisnici[id];
                    
                    appendKorisnik(id, korisnik);
                    appendMiniKorisnik(id, korisnik);
                }
            } else {
                alert("Greška prilikom učitavanja predstava.");
            }
        }
    };

    request.open("GET", firebaseURL + "/korisnici.json");
    request.send();
    
}

function removeKorisnici() {
    let pozorista = document.getElementById("tbody");
    while (pozorista.firstChild) {
        pozorista.removeChild(pozorista.lastChild);
    }
}


function showKorisnik(){
    let clickedBtn = this;
    let predstaveId = clickedBtn.getAttribute("data-id");
    window.location.href = "korisnik1.html?id=" + predstaveId;
}

function appendKorisnik(id, pozoriste) {
    let tr = document.createElement("tr");

    let td1 = document.createElement("td");
    td1.innerText = pozoriste.ime

    let td2 = document.createElement("td");
    td2.innerText = pozoriste.prezime

    let td3 = document.createElement("td");
    td3.innerText = pozoriste.korisnickoIme

    let button = document.createElement("button");
    button.type = "button";
    button.className = "btn"
    button.onclick = showKorisnik
    button.setAttribute("data-id", id);
    button.innerText = "Detaljnije"

    let td4 = document.createElement("td");
    td4.appendChild(button)

    tr.appendChild(td1)
    tr.appendChild(td2)
    tr.appendChild(td3)
    tr.appendChild(td4)
  
    document.getElementById("tbody").appendChild(tr);
}

function appendMiniKorisnik(id, pozoriste) {
    let sekcija = document.createElement("div");
    sekcija.classList.add("mini-korisnik")

    let td1 = document.createElement("p");
    td1.classList.add("malo")
    td1.innerText = "Ime:"

    let td2 = document.createElement("p");
    td2.classList.add("veliko")
    td2.innerText = pozoriste.ime

    let td3 = document.createElement("p");
    td3.classList.add("malo")
    td3.innerText = "Prezime:"

    let td4 = document.createElement("p");
    td4.classList.add("veliko")
    td4.innerText = pozoriste.prezime

    let td5 = document.createElement("p");
    td5.classList.add("malo")
    td5.innerText = "Korisnicko ime:"

    let td6 = document.createElement("p");
    td6.classList.add("veliko")
    td6.innerText = pozoriste.korisnickoIme

    let button = document.createElement("button");
    button.type = "button";
    button.className = "btn"
    button.onclick = showKorisnik
    button.setAttribute("data-id", id);
    button.innerText = "Detaljnije"

    sekcija.appendChild(td1)
    sekcija.appendChild(td2)
    sekcija.appendChild(td3)
    sekcija.appendChild(td4)
    sekcija.appendChild(td5)
    sekcija.appendChild(td6)
    sekcija.appendChild(button)
  
    document.getElementById("mini-table").appendChild(sekcija);
}
