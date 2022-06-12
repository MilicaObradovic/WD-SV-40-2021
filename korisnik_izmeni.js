// let firebaseURL = "https://pozoriste-dff61-default-rtdb.europe-west1.firebasedatabase.app"
let korisnici = {}
let korisnik = {}
let korisnikId = getParamValue();
// console.log(pozoristeId)

getKorisnik()

let izmeni = document.getElementById("sekcija");

izmeni.addEventListener("submit", function (e) {
    // alert("ovv")
    e.preventDefault();
    if (validate() == false){
        alert("Neki od unesenih podataka nisu validni.");
    }else{
        let putRequest = new XMLHttpRequest();

        putRequest.onreadystatechange = function (e) {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    window.location.href = "korisnik1.html?id=" + korisnikId;
                } else {
                    alert("Greška prilikom izmene korisnika.2");
                }
            }
        };

        putRequest.open("PUT", firebaseURL + "/korisnici/" + korisnikId + ".json");
        putRequest.send(JSON.stringify(korisnik));
    }
});

function isNumber(char) {
    if (typeof char !== 'string') {
      return false;
    }
  
    if (char.trim() === '') {
      return false;
    }
  
    return !isNaN(char);
  }

function validate(){
    let korisnicko = document.getElementById('korisnicko2').value;
    let lozinka = document.getElementById('lozinka2').value;
    let ime = document.getElementById('ime2').value;
    let prezime = document.getElementById('prezime2').value;
    let telefon = document.getElementById('telefon2').value;
    let adresa = document.getElementById('adresa2').value;
    let datum = document.getElementById('datum2').value;
    let gmail = document.getElementById('gmail2').value;

    if(korisnicko.length < 3){
        return false
    }else if(lozinka.length < 6){
        return false
    }else if(telefon.length < 9){
        return false
    }else if(gmail.length < 8){
        return false
    }else if(adresa.length < 10){
        return false
    }else if(ime.length < 3){
        return false
    }else if(prezime.length < 3){
        return false
    }
    

    for(let i in ime){
        if(isNumber(ime[i]) == true ){
            
            return false
        }
    }
    for(let i in prezime){
        if(isNumber(prezime[i]) == true ){
            
            return false
        }
    }

    for(let i in telefon){
        if(isNaN(parseInt(telefon[i])) == true ){
            console.log("ovde")
            return false
        }
    }
    pronadjen = false
    pronadjen2 = false
    for(let i in gmail){
        if(gmail[i] == "@" ){
            pronadjen = true
        }
        if(gmail[i] == "."){
            pronadjen2 = true
        }
    }
    if(pronadjen == false){
        return false
    }else if(pronadjen2 == false){
        return false
    }

    korisnik.korisnickoIme = korisnicko
    korisnik.lozinka = lozinka
    korisnik.ime = ime
    korisnik.prezime = prezime
    korisnik.adresa = adresa
    korisnik.telefon = telefon
    korisnik.datum = datum
    korisnik.email = gmail
    console.log(korisnik)
    return true

}

function getKorisnik(){
    let request = new XMLHttpRequest();
    
    request.onreadystatechange = function () {
        // console.log(this.readyState)
        if (this.readyState == 4) {
            if (this.status == 200) {
                korisnici = JSON.parse(request.responseText);
                korisnik = korisnici[korisnikId]
                // console.log(korisnik)
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

function appendKorisnik(pozoriste) {

    let korisnicko = document.createElement("input");
    korisnicko.setAttribute("type", "text");
    korisnicko.setAttribute("id", "korisnicko2");
    korisnicko.setAttribute("value", pozoriste.korisnickoIme);

    let lozinka = document.createElement("input");
    lozinka.setAttribute("type", "text");
    lozinka.setAttribute("id", "lozinka2");
    lozinka.setAttribute("value", pozoriste.lozinka);

    let ime = document.createElement("input");
    ime.setAttribute("type", "text");
    ime.setAttribute("id", "ime2");
    ime.setAttribute("value", pozoriste.ime);

    let prezime = document.createElement("input");
    prezime.setAttribute("type", "text");
    prezime.setAttribute("id", "prezime2");
    prezime.setAttribute("value", pozoriste.prezime);

    let telefon = document.createElement("input");
    telefon.setAttribute("type", "tel");
    telefon.setAttribute("id", "telefon2");
    telefon.setAttribute("value", pozoriste.telefon);

    let datum = document.createElement("input");
    datum.setAttribute("type", "date");
    datum.setAttribute("id", "datum2");
    datum.setAttribute("value", pozoriste.datumRodjenja);

    let adresa = document.createElement("input");
    adresa.setAttribute("type", "text");
    adresa.setAttribute("id", "adresa2");
    adresa.setAttribute("value", pozoriste.adresa);

    let gmail = document.createElement("input");
    gmail.setAttribute("type", "email");
    gmail.setAttribute("id", "gmail2");
    gmail.setAttribute("value", pozoriste.email);

    let button = document.createElement("button");
    button.type = "submit";
    button.className = "btn"
    // button.onclick = showIzmeni
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