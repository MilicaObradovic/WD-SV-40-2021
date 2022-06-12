// let firebaseURL = "https://pozoriste-dff61-default-rtdb.europe-west1.firebasedatabase.app"
// let korisnici = {}
let korisnikId = getParamValue();
// console.log(pozoristeId)

getKorisnik()

function getKorisnik(){
    let request = new XMLHttpRequest();
    
    request.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                // korisnici = JSON.parse(request.responseText);
                // korisnik = korisnici[korisnikId]
                korisnik = JSON.parse(request.responseText);
                console.log(korisnik)
                appendHead(korisnik)
                appendNalog(korisnik)
                appendPodaci(korisnik)
            } else {
                alert("Greška prilikom učitavanja predstava.");
            }
        }
    };

    request.open("GET", firebaseURL + "/korisnici/"+korisnikId+".json");
    request.send();
    
}

function showObrisi(){
    let txt;
    if (confirm("Da li zelite da deaktivirate korisnika?")) {
        txt = true;
    } else {
        txt = false;
    }
    if(txt == true){
        let clickedBtn = this;
        let korisnik = clickedBtn.getAttribute("data-id");
        let request = new XMLHttpRequest();
        korisnik = korisnici[korisnikId]
        korisnik.blokiran = true

        request.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    window.location.href = "korisnici.html";
                } else {
                    alert("Greška prilikom brisanja automobila.");
                }
            }
        };

        request.open("PUT", firebaseURL + "/korisnici/" + korisnikId + ".json");
        request.send(JSON.stringify(korisnik));
    }
    
}

function getParamValue() {
    let location = decodeURI(window.location.toString());
    let index = location.indexOf("?") + 1;
    let subs = location.substring(index, location.length);
    let splitted = subs.split("=");

    return splitted[1]
}

function showIzmeni(){
    let clickedBtn = this;
    let data = clickedBtn.getAttribute("data-id");
    window.location.href = "korisnik_izmeni.html?id=" + data ;
}

function appendHead(korisnik){
    let ime = document.createElement("h5");
    ime.innerText = korisnik.ime + " " + korisnik.prezime 

    let korisnicko = document.createElement("p");
    korisnicko.innerText = korisnik.korisnickoIme

    document.getElementById("head").appendChild(ime);
    document.getElementById("head").appendChild(korisnicko);
}

function appendNalog(korisnik){
    let div1 = document.createElement("div");
    let div2 = document.createElement("div");

    div1.classList.add("col-12", "col-sm-6", "mb-3")
    let ime = document.createElement("h6");
    ime.innerText = "Korisnicko ime"
    let p1 = document.createElement("p");
    p1.classList.add("profil-text")
    p1.innerText = korisnik.korisnickoIme
    div1.appendChild(ime)
    div1.appendChild(p1)

    div2.classList.add("col-12", "col-sm-6", "mb-3")
    let ime2 = document.createElement("h6");
    ime2.innerText = "Lozinka"
    let p2 = document.createElement("p");
    p2.classList.add("profil-text")
    p2.innerText = korisnik.lozinka
    div2.appendChild(ime2)
    div2.appendChild(p2)

    document.getElementById("nalog").appendChild(div1);
    document.getElementById("nalog").appendChild(div2);

}

function appendPodaci(korisnik){
    let div1 = document.createElement("div");
    let div2 = document.createElement("div");
    let div3 = document.createElement("div");
    let div4 = document.createElement("div");

    div1.classList.add("col-12", "col-sm-6", "mb-3")
    let ime = document.createElement("h6");
    ime.innerText = "Gmail"
    let p1 = document.createElement("p");
    p1.classList.add("profil-text")
    p1.innerText = korisnik.email
    div1.appendChild(ime)
    div1.appendChild(p1)

    div2.classList.add("col-12", "col-sm-6", "mb-3")
    let ime2 = document.createElement("h6");
    ime2.innerText = "Telefon"
    let p2 = document.createElement("p");
    p2.classList.add("profil-text")
    p2.innerText = korisnik.telefon
    div2.appendChild(ime2)
    div2.appendChild(p2)

    div3.classList.add("col-12", "col-sm-6", "mb-3")
    let ime3 = document.createElement("h6");
    ime3.innerText = "Adresa"
    let p3 = document.createElement("p");
    p3.classList.add("profil-text")
    p3.innerText = korisnik.telefon
    div3.appendChild(ime3)
    div3.appendChild(p3)

    div4.classList.add("col-12", "col-sm-6", "mb-3")
    let ime4 = document.createElement("h6");
    ime4.innerText = "Datum rodjenja"
    let p4 = document.createElement("p");
    p4.classList.add("profil-text")
    p4.innerText = korisnik.datumRodjenja
    div4.appendChild(ime4)
    div4.appendChild(p4)

    document.getElementById("podaci").appendChild(div1);
    document.getElementById("podaci").appendChild(div2);
    document.getElementById("podaci").appendChild(div3);
    document.getElementById("podaci").appendChild(div4);

    let button = document.createElement("button");
    button.type = "button";
    button.className = "btn"
    button.onclick = showIzmeni
    button.setAttribute("data-id", korisnikId);
    button.innerText = "Izmeni korisnika"

    let button2 = document.createElement("button");
    button2.type = "button";
    button2.className = "btn"
    button2.onclick = showObrisi
    button2.setAttribute("data-id", korisnikId);
    button2.innerText = "Deaktiviraj korisnika"
    // textPozoriste.appendChild(button);
    document.getElementById("podaci").appendChild(button);
    document.getElementById("podaci").appendChild(button2);

}