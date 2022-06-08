let firebaseURL = "https://pozoriste-dff61-default-rtdb.europe-west1.firebasedatabase.app"
let korisnici = {}
let korisnikId = getParamValue();
// console.log(pozoristeId)

getKorisnik()

function getKorisnik(){
    let request = new XMLHttpRequest();
    
    request.onreadystatechange = function () {
        // console.log(this.readyState)
        if (this.readyState == 4) {
            if (this.status == 200) {
                korisnici = JSON.parse(request.responseText);
                korisnik = korisnici[korisnikId]
                console.log(korisnik)
                appendZaglavlje(korisnik.korisnickoIme)
                appendKorisnik(korisnik)
            } else {
                alert("Greška prilikom učitavanja predstava.");
            }
        }
    };

    request.open("GET", firebaseURL + "/korisnici.json");
    request.send();
    
}

function getParamValue() {
    let location = decodeURI(window.location.toString());
    let index = location.indexOf("?") + 1;
    let subs = location.substring(index, location.length);
    let splitted = subs.split("=");

    return splitted[1]
}

function appendZaglavlje(naziv){
    let sekcija = document.createElement("h1");
    sekcija.innerText = "Izmena korisnika - " + naziv
    document.getElementById("zaglavlje").appendChild(sekcija);
}
function showIzmeni(){
    console.log("Izmeniti u bazi")
}

function appendKorisnik(pozoriste) {

    let korisnicko = document.createElement("input");
    korisnicko.setAttribute("type", "text");
    korisnicko.setAttribute("value", pozoriste.korisnickoIme);

    let lozinka = document.createElement("input");
    lozinka.setAttribute("type", "text");
    lozinka.setAttribute("value", pozoriste.lozinka);

    let ime = document.createElement("input");
    ime.setAttribute("type", "text");
    ime.setAttribute("value", pozoriste.ime);

    let prezime = document.createElement("input");
    prezime.setAttribute("type", "text");
    prezime.setAttribute("value", pozoriste.prezime);

    let telefon = document.createElement("input");
    telefon.setAttribute("type", "tel");
    prezime.setAttribute("pattern", "[0-9]{10}");
    telefon.setAttribute("value", pozoriste.telefon);

    let datum = document.createElement("input");
    datum.setAttribute("type", "date");
    datum.setAttribute("value", pozoriste.datumRodjenja);

    let adresa = document.createElement("input");
    adresa.setAttribute("type", "text");
    adresa.setAttribute("value", pozoriste.adresa);

    let gmail = document.createElement("input");
    gmail.setAttribute("type", "email");
    gmail.setAttribute("value", pozoriste.email);

    let button = document.createElement("button");
    button.type = "button";
    button.className = "btn"
    button.onclick = showIzmeni
    button.setAttribute("data-id", korisnikId);
    button.innerText = "Izmeni korisnika"
  
    document.getElementById("sekcija").appendChild(button);
    document.getElementById("korisnicko").appendChild(korisnicko);
    document.getElementById("lozinka").appendChild(lozinka);
    document.getElementById("ime").appendChild(ime);
    document.getElementById("prezime").appendChild(prezime);
    document.getElementById("telefon").appendChild(telefon);
    document.getElementById("adresa").appendChild(adresa);
    document.getElementById("datum").appendChild(datum);
    document.getElementById("gmail").appendChild(gmail);
}