// let firebaseURL = "https://pozoriste-dff61-default-rtdb.europe-west1.firebasedatabase.app"
let predstave = {}
let predstave1 = {}
let ids = getParamValue();
let predstaveId = ids[0]
let pozoristeId = ids[1]
let trenutnaPredstava = {}
// console.log(pozoristeId)


getPredstave()

function getPredstave(){
    let request = new XMLHttpRequest();
    
    request.onreadystatechange = function () {
        // console.log(this.readyState)
        if (this.readyState == 4) {
            if (this.status == 200) {
                predstave = JSON.parse(request.responseText);
                predstave1 = predstave[pozoristeId[1]]
                console.log(predstave)
                trenutnaPredstava = predstave1[predstaveId[1]]
                appendZaglavlje(trenutnaPredstava.naziv)
                appendPredstava(predstaveId[1], trenutnaPredstava)
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

function showPosaljiKomentar(){
    let ime = document.getElementById("ime").value
    let text = document.getElementById("text").value
    if(trenutnaPredstava.komentari == 0){
        let listaKomentara = [{"ime": ime, "text": text,"id":1, "komentari": 0}]
        trenutnaPredstava.komentari = listaKomentara
    }else{
        trenutnaPredstava.komentari.push({"ime": ime, "text": text,"id":trenutnaPredstava.komentari.length+1, "komentari": 0})
    }
    let put = new XMLHttpRequest();

    put.onreadystatechange = function (e) {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    window.location.href = "predstava1.html?id=" + predstaveId[1] + ";pozoriste=" + pozoristeId[1];
                } else {
                    alert("Greška prilikom dodavanja komentara.");
                }
            }
        };

    put.open("PUT", firebaseURL + "/predstave/" + pozoristeId[1] + "/" + predstaveId[1] + ".json");
    put.send(JSON.stringify(trenutnaPredstava));
}


function showKomentarisi(){
    let clickedBtn = this;
    let data = clickedBtn.getAttribute("data-id");
    let poz = clickedBtn.getAttribute("predstave-id");
    let show = document.getElementById("showKomentarisi")
    show.style.display = "none"

    let forma = document.createElement("form");

    let ime = document.createElement("label");
    ime.classList.add("labela");
    ime.innerText = "Unesite ime:"
    let ime2 = document.createElement("input");
    ime2.classList.add("form-control");
    ime2.setAttribute("type", "text");
    ime2.setAttribute("id", "ime");

    let text = document.createElement("label");
    text.classList.add("labela");
    text.innerText = "Unesite text:"
    let text2 = document.createElement("textarea");
    text2.classList.add("form-control");
    text2.setAttribute("rows", 5);
    text2.setAttribute("cols", 10);
    text2.setAttribute("id", "text");

    let br = document.createElement("br");
    let button = document.createElement("button");
    button.type = "button";
    button.className = "btn"
    button.onclick = showPosaljiKomentar
    button.setAttribute("id", "posaljiKomentar");
    button.innerText = "Posalji"

    forma.appendChild(ime);
    forma.appendChild(ime2);
    forma.appendChild(br);
    forma.appendChild(text);
    forma.appendChild(text2);
    forma.appendChild(br);
    forma.appendChild(button);

    let dodaj = document.getElementById("dodajKomentar")
    dodaj.appendChild(forma)

}

function appendPredstava(id, pozoriste) {

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

    let button2 = document.createElement("button");
    button2.type = "button";
    button2.className = "btn2"
    button2.onclick = showKomentarisi
    button2.setAttribute("data-id", id);
    button2.setAttribute("id", "showKomentarisi");
    button2.setAttribute("predstave-id", pozoristeId[1]);
    button2.innerText = "Dodaj komentar"
    textPozoriste.appendChild(button2);

    let dodajKomentar = document.createElement("div");
    dodajKomentar.setAttribute("id", "dodajKomentar");
    textPozoriste.appendChild(dodajKomentar);


    let slika = document.createElement("img");
    slika.classList.add("pocetna-slika", "col-lg-4", "col-xl-3")
    slika.src = pozoriste.slika
    slika.alt = "predstava"
  
    document.getElementById("predstava").appendChild(slika);
    document.getElementById("predstava").appendChild(textPozoriste);
    let ucitaniK
    console.log(pozoriste.komentari)
    for(let kor in pozoriste.komentari){
        // alert(kor)
        ucitaniK = appendKomentarReq(pozoriste.komentari[kor])
        document.getElementById("komentari").appendChild(ucitaniK);
    }
}

function createKom(komentar){
    let novi = document.createElement("div")
    novi.setAttribute("id", komentar.id)
    novi.classList.add("komentar")
    let p1 = document.createElement("p")
    p1.innerText = komentar.ime+":"
    let p2 = document.createElement("p")
    p2.innerText = komentar.text
    let button = document.createElement("button")
    button.setAttribute("type","button")
    button.classList.add("btn")
    button.innerText = "Odgovori"
    // button.onclick = odgovori
    novi.appendChild(p1)
    novi.appendChild(p2)
    novi.appendChild(button)
    return novi
}

function appendKomentarReq(komentar){
    if(komentar.komentari == 0){
        let novi = createKom(komentar)
        return novi
    }
    let pocetni = createKom(komentar)
    for(let kor in komentar.komentari){
        // let tren = createKom(kor)
        // deca
        let noviK = appendKomentarReq(komentar.komentari[kor].komentari)
        pocetni.appendChild(noviK)
    }
    return pocetni

}