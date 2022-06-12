let firebaseURL = "https://pozoriste-dff61-default-rtdb.europe-west1.firebasedatabase.app"
// promenjive za prijavu
var korisniciLogin = {}
let greske = []
var ulogovanKorisnik
var novi_korisnik = {}
getKorisniciPrijava()

let login = document.getElementById("login");

login.addEventListener("submit", function (e) {
    // alert("usao u id")
    e.preventDefault();
    if (validatePrijava() == false){
        alert("Uneli ste pogresno korisnicko ime ili lozinku!");
    }else{
        alert("Uspesno ste se ulogovali");
        closeForm()
        let dugme = document.getElementById('dugmad');
        dugme.style.display = "none"
        let ulogovan = document.getElementById('ulogovan');
        ulogovan.style.display = "block"
        let ulogovan1 = document.createElement("p");
        ulogovan1.classList.add("ulogovanP")
        ulogovan1.setAttribute("id", "ulogovanKor");
        ulogovan1.innerText = "Ulogovan korisnik: "+korisniciLogin[ulogovanKorisnik].korisnickoIme
        ulogovan.appendChild(ulogovan1)

        let dugme3 = document.getElementById('div-dugme3');
        dugme3.style.display = "none"
    }
});

let register = document.getElementById("register");

register.addEventListener("submit", function (e) {
    // alert("usao u id")
    e.preventDefault();
    if (validate2Prijava() == false){
        // alert("Neki od podataka nisu validni!");
        let string = "Greske u formi: "
        for(let i in greske){
            console.log(i)
            string+= greske[i]
            if(i != greske.length-1){
                string+=", "
            }
        }
        string+="!!"
        string+=" Nemoguca registracija!!"
        alert(string)
    }else{
        let request = new XMLHttpRequest();
        request.open("POST", firebaseURL+"/korisnici.json", true);
        request.setRequestHeader("Content-Type", "application/json");
        request.onreadystatechange = function () {
            if (request.readyState === 4 && request.status === 200) {
                alert("Uspesno ste se registrovali");
                closeForm2()
                window.location.href = "korisnici.html";
            }
        };
        var data = JSON.stringify(novi_korisnik);
        request.send(data);
    }
});

function getKorisniciPrijava(){
    let request2 = new XMLHttpRequest();
    // let korisniciLogin = {}
    request2.onreadystatechange = function () {
        // console.log(this.readyState)
        if (this.readyState == 4) {
            if (this.status == 200) {
                korisniciLogin = JSON.parse(request2.responseText);
                console.log(korisniciLogin)
            } else {
                alert("Greška prilikom učitavanja korisnika.");
            }
        }
    };

    request2.open("GET", firebaseURL + "/korisnici.json");
    request2.send();
    // return korisniciLogin
}

function validatePrijava(){
    let korisnicko = document.getElementById('login1').value;
    let lozinka = document.getElementById('login2').value;

    console.log(korisniciLogin)

    for(let kor in korisniciLogin){
        if(korisnicko == korisniciLogin[kor].korisnickoIme){
            if(lozinka == korisniciLogin[kor].lozinka){
                ulogovanKorisnik = kor
                return true
            }
        }
    }
    return false

}

function isNumber(char) {
    if (typeof char !== 'string') {
      return false;
    }
  
    if (char.trim() === '') {
      return false;
    }
  
    return !isNaN(char);
  }

function validate2Prijava(){
    greske = []
    let korisnicko = document.getElementById('register1').value;
    let lozinka = document.getElementById('register2').value;
    let ime = document.getElementById('register3').value;
    let prezime = document.getElementById('register4').value;
    let telefon = document.getElementById('register5').value;
    let adresa = document.getElementById('register6').value;
    let datum = document.getElementById('register7').value;
    let gmail = document.getElementById('register8').value;
    
    if(korisnicko.length < 3){
        greske.push("kratko korisnicko ime")
    }else if(lozinka.length < 6){
        greske.push("kratka lozinka")
    }else if(gmail.length < 7){
        greske.push("kratak gmail")
    }else if(adresa.length < 10){
        greske.push("kratka adresa")
    }else if(ime.length < 3){
        greske.push("kratko ime")
    }else if(prezime.length < 3){
        greske.push("kratko prezime")
    }
    let today = new Date();
    let dat = new Date(datum)
    if(dat>today){
        greske.push("uneli ste datum iz buducnosti")
    }

    for(let kor in korisniciLogin){
        if(korisnicko == korisniciLogin[kor].korisnickoIme){
            greske.push("vec postoji korisnicko ime u bazi")
        }
        if(gmail == korisniciLogin[kor].email){
            greske.push("vec postoji gmail u bazi")
        }

    }
    
    for(let i in ime){
        if(isNumber(ime[i]) == true ){
            greske.push("unos za ime sadrzi broj")
        }
    }
    for(let i in prezime){
        if(isNumber(prezime[i]) == true ){
            greske.push("unos za prezime sadrzi broj")
        }
    }
    for(let i in telefon){
        if(isNaN(parseInt(telefon[i])) == true ){
            // console.log("ovde")
            greske.push("unos za telefon sadrzi slovo")
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
        greske.push("fali @ u polju za gmail")
    }else if(pronadjen2 == false){
        greske.push("fali . u polju za gmail")
    }
    if(greske.length == 0){
        novi_korisnik = {"korisnickoIme": korisnicko, "lozinka": lozinka, "ime": ime, "prezime": prezime, 
        "telefon": telefon, "adresa": adresa, "datumRodjenja": datum, "email": gmail, "blokiran": false}

        return true
    }else{
        return false
    }
}