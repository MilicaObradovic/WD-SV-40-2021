let firebaseURL = "https://pozoriste-dff61-default-rtdb.europe-west1.firebasedatabase.app"
// promenjive za prijavu
var korisniciLogin = {}
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
        // isUlogovan()
        // sendUlogovan()
    }
});

// function sendUlogovan(){
//     if(isUlogovan()){
//         let navKorisnici = document.getElementById("navKorisnici")
//         navKorisnici.setAttribute("href", "korisnici.html?id=" + ulogovanKorisnik )
//     }else{
//         let navKorisnici = document.getElementById("navKorisnici")
//         navKorisnici.setAttribute("href", "korisnici.html?id=" )
//     }
// }

// function isUlogovan(){
//     let ulogovanProvera = document.getElementById("ulogovan")
//     if(ulogovanProvera.querySelector("#ulogovanKor") != null){
//         return true
//     }
//     return false
    
// }

let register = document.getElementById("register");

register.addEventListener("submit", function (e) {
    // alert("usao u id")
    e.preventDefault();
    if (validate2Prijava() == false){
        alert("Neki od podataka nisu validni!");
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

    // korisniciLogin = getKorisnici()
    console.log(korisniciLogin)
    // pitati t
    // alert(korisnicko)
    // alert(lozinka)
    

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

function validate2Prijava(){
    let korisnicko = document.getElementById('register1').value;
    let lozinka = document.getElementById('register2').value;
    let ime = document.getElementById('register3').value;
    let prezime = document.getElementById('register4').value;
    let telefon = document.getElementById('register5').value;
    let adresa = document.getElementById('register6').value;
    let datum = document.getElementById('register7').value;
    let gmail = document.getElementById('register8').value;

    novi_korisnik = {"korisnickoIme": korisnicko, "lozinka": lozinka, "ime": ime, "prezime": prezime, 
    "telefon": telefon, "adresa": adresa, "datumRodjenja": datum, "email": gmail, "blokiran": false}

    return true
}