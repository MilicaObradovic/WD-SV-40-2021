// let firebaseURL = "https://pozoriste-dff61-default-rtdb.europe-west1.firebasedatabase.app"
let predstave = {}
let predstave1 = {}
let ids = getParamValue();
let predstaveId = ids[0]
let pozoristeId = ids[1]
let trenutnaPredstava = {}
let brojZaId = 0
// console.log(pozoristeId)

getPredstave()


function getPredstave(){
    let request = new XMLHttpRequest();
    
    request.onreadystatechange = function () {
        // console.log(this.readyState)
        if (this.readyState == 4) {
            if (this.status == 200) {
                trenutnaPredstava = JSON.parse(request.responseText);
                // console.log(trenutnaPredstava)
                // predstave = JSON.parse(request.responseText);
                // predstave1 = predstave[pozoristeId[1]]
                // trenutnaPredstava = predstave1[predstaveId[1]]
                appendZaglavlje(trenutnaPredstava.naziv)
                appendPredstava(predstaveId[1], trenutnaPredstava)
                appendZvezdice(trenutnaPredstava)
            } else {
                alert("Greška prilikom učitavanja predstava.");
            }
        }
    };

    request.open("GET", firebaseURL + "/predstave/" +pozoristeId[1]+ "/" +predstaveId[1]+".json");
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

function showPosaljiKomentar2(){
    let ime = document.getElementById("ime").value
    let text = document.getElementById("text").value
    let showRequest = new XMLHttpRequest();
    showRequest.open("POST", firebaseURL+"/predstave/" + pozoristeId[1] + "/" + predstaveId[1] + "/komentari.json", true);
    showRequest.setRequestHeader("Content-Type", "application/json");
    showRequest.onreadystatechange = function () {
        if (showRequest.readyState === 4 && showRequest.status === 200) {
            // alert("Uspesno postovanje komentara");
            window.location.href = "predstava1.html?id=" + predstaveId[1] + ";pozoriste=" + pozoristeId[1];
        }
    };
    var data = JSON.stringify({"ime": ime, "text": text, "komentari": "0"});
    showRequest.send(data);
}

function showKomentarisi(){
    // let clickedBtn = this;
    // let data = clickedBtn.getAttribute("data-id");
    // let poz = clickedBtn.getAttribute("predstave-id");
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
    button.onclick = showPosaljiKomentar2
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
    if(pozoriste.komentari != "0"){
        for(let kor in pozoriste.komentari){
            ucitaniK = req(kor,pozoriste.komentari[kor])
            document.getElementById("komentari").appendChild(ucitaniK);
        }
    }
    
}

function appendZvezdice(pozoriste){
    let zvezdice = document.getElementById("zvezdice")
    let prosek = Math.round(pozoriste.ocena)
    // alert(prosek)

    for(let i = 1; i < 6; i++){
        let prva = document.createElement("span");
        prva.classList.add("fa", "fa-star")
        if(prosek>=i){
            prva.classList.add("checked")
        }
        zvezdice.appendChild(prva)
    }

    let broj = 0
    for(let i in pozoriste.ocene){
        // alert(i)
        broj += parseInt(pozoriste.ocene[i])
    }

    let srednja = document.createElement("p");
    srednja.innerText = pozoriste.ocena +" srednja ocena za "+broj+" glasanja"
    zvezdice.appendChild(srednja)

    let bar5 = document.getElementById("bar-5")
    let posto5 = (pozoriste.ocene[4]/broj)*100
    bar5.style.width = posto5.toString()+"%"

    let bar4 = document.getElementById("bar-4")
    let posto4 = (pozoriste.ocene[3]/broj)*100
    bar4.style.width = posto4.toString()+"%"

    let bar3 = document.getElementById("bar-3")
    let posto3 = (pozoriste.ocene[2]/broj)*100
    bar3.style.width = posto3.toString()+"%"

    let bar2 = document.getElementById("bar-2")
    let posto2 = (pozoriste.ocene[1]/broj)*100
    bar2.style.width = posto2.toString()+"%"

    let bar1 = document.getElementById("bar-1")
    let posto1 = (pozoriste.ocene[0]/broj)*100
    bar1.style.width = posto1.toString()+"%"

    let petice = document.getElementById("petice")
    petice.innerText = pozoriste.ocene[4]

    let cetvorke = document.getElementById("cetvorke")
    cetvorke.innerText = pozoriste.ocene[3]

    let trojke = document.getElementById("trojke")
    trojke.innerText = pozoriste.ocene[2]

    let dvojke = document.getElementById("dvojke")
    dvojke.innerText = pozoriste.ocene[1]

    let jedinice = document.getElementById("jedinice")
    jedinice.innerText = pozoriste.ocene[0]
}

function getIds(element){
    if(element.parentElement.getAttribute("id") == "komentari"){
        return [element.getAttribute("id")]
    }
    // alert("ids")
    let ids = getIds(element.parentElement)
    ids.push(element.getAttribute("id"))

    return ids
}

function showPosaljiOdgovor(){
    let clickedBtn = this;
    let id = clickedBtn.getAttribute("posalji-id");

    let ime = document.getElementById("ime-"+id).value
    let text = document.getElementById("text-"+id).value
    let listaIds = []
    // console.log(document.getElementById(id).getAttribute("id"))
    listaIds = getIds(document.getElementById(id))
    console.log(listaIds)
    string = ""
    for(let i in listaIds){
        string += "/"
        string = string + listaIds[i]
        string = string + "/komentari"
    }

    let showRequest = new XMLHttpRequest();
    showRequest.open("POST", firebaseURL+"/predstave/" + pozoristeId[1] + "/" + predstaveId[1] + "/komentari" +string+ ".json", true);
    showRequest.setRequestHeader("Content-Type", "application/json");
    showRequest.onreadystatechange = function () {
        if (showRequest.readyState === 4 && showRequest.status === 200) {
            // alert("Uspesno postovanje odgovora");
            window.location.href = "predstava1.html?id=" + predstaveId[1] + ";pozoriste=" + pozoristeId[1];
        }
    };
    var data = JSON.stringify({"ime": ime, "text": text, "komentari": "0"});
    showRequest.send(data);

}

function odgovoriNaOdgovor(){

    let clickedBtn = this;
    let id = clickedBtn.getAttribute("button-id");
    let formaDiv = document.getElementById("forma-"+id)

    clickedBtn.style.display = "none"

    // let forma = document.createElement("form");

    let ime = document.createElement("label");
    ime.classList.add("labela");
    ime.innerText = "Unesite ime:"
    let ime2 = document.createElement("input");
    ime2.classList.add("form-control");
    ime2.setAttribute("type", "text");
    ime2.setAttribute("id", "ime-"+id);

    let text = document.createElement("label");
    text.classList.add("labela");
    text.innerText = "Unesite text:"
    let text2 = document.createElement("textarea");
    text2.classList.add("form-control");
    text2.setAttribute("rows", 5);
    text2.setAttribute("cols", 10);
    text2.setAttribute("id", "text-"+id);

    let br = document.createElement("br");
    let button = document.createElement("button");
    button.type = "button";
    button.className = "btn"
    button.onclick = showPosaljiOdgovor
    button.setAttribute("posalji-id", id);
    button.innerText = "Posalji"

    formaDiv.appendChild(ime);
    formaDiv.appendChild(ime2);
    formaDiv.appendChild(br);
    formaDiv.appendChild(text);
    formaDiv.appendChild(text2);
    formaDiv.appendChild(br);
    formaDiv.appendChild(button);

    // let dodaj = document.getElementById("dodajKomentar")
    // dodaj.appendChild(formaDiv)
}

function createKom(id,komentar){
    let novi = document.createElement("div")
    novi.setAttribute("id", id)
    novi.classList.add("komentar")
    let p1 = document.createElement("p")
    p1.innerText = komentar.ime+":"
    let p2 = document.createElement("p")
    p2.innerText = komentar.text
    let button = document.createElement("button")
    button.setAttribute("type","button")
    button.setAttribute("button-id", id)
    button.classList.add("btn")
    button.innerText = "Odgovori"
    button.onclick = odgovoriNaOdgovor

    let forma = document.createElement("form")
    forma.setAttribute("id", "forma-"+id)

    novi.appendChild(p1)
    novi.appendChild(p2)
    novi.appendChild(button)
    novi.appendChild(forma)
    return novi
}


function req(id, komentar){
    if(komentar.komentari == "0"){
        return createKom(id, komentar)
    }
    let spoljasnji = createKom(id, komentar)
    for(let kom in komentar.komentari){
        let ret = req(kom, komentar.komentari[kom])
        spoljasnji.appendChild(ret)
    }
    return spoljasnji
}