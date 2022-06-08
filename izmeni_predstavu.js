let firebaseURL = "https://pozoriste-dff61-default-rtdb.europe-west1.firebasedatabase.app"
let predstave = {}
let ids = getParamValue();
let predstaveId = ids[0]
let pozoristeId = ids[1]
console.log(pozoristeId)

getPredstave()

function getPredstave(){
    let request = new XMLHttpRequest();
    
    request.onreadystatechange = function () {
        // console.log(this.readyState)
        if (this.readyState == 4) {
            if (this.status == 200) {
                predstave = JSON.parse(request.responseText);
                predstave = predstave[pozoristeId[1]]
                console.log(predstave)
                predstave = predstave[predstaveId[1]]
                appendZaglavlje(predstave.naziv)
                appendPredstava(predstaveId[1], predstave)
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
    sekcija.innerText = "Izmena predstave - " + naziv
    document.getElementById("zaglavlje").appendChild(sekcija);
}
function showIzmeni(){
    console.log("Izmeniti u bazi")
}

function appendPredstava(id, pozoriste) {

    let text = document.createElement("textarea");
    text.classList.add("form-control");
    text.setAttribute("rows", 15);
    text.setAttribute("cols", 20);
    text.innerText = pozoriste.opis

    let naziv = document.createElement("input");
    naziv.classList.add("form-control");
    naziv.setAttribute("type", "text");
    naziv.setAttribute("value", pozoriste.naziv);

    let zanr = document.createElement("select");
    zanr.setAttribute("value", pozoriste.zanr);

    lista = ["Drama", "Komedija", "Tragikomedija","Muzicka parodija", "Farsa"]

    for(let i in lista){
        console.log(lista[i])
        let z = document.createElement("option");
        z.setAttribute("value", lista[i]);
        z.innerText = lista[i]
        if(pozoriste.zanr == lista[i]){
            z.setAttribute("selected", true)
        }
        zanr.appendChild(z);
    }

    let trajanje = document.createElement("input");
    trajanje.classList.add("form-group");
    trajanje.setAttribute("type", "number");
    trajanje.setAttribute("min", "0");
    trajanje.setAttribute("max", "250");
    trajanje.setAttribute("step", "30");
    trajanje.setAttribute("value", pozoriste.trajanje);
    
    let cena = document.createElement("input");
    cena.classList.add("form-group");
    cena.setAttribute("type", "number");
    cena.setAttribute("min", "0");
    cena.setAttribute("max", "4000");
    cena.setAttribute("step", "200");
    cena.setAttribute("value", pozoriste.cena);

    let osobe = document.createElement("input");
    osobe.classList.add("form-group");
    osobe.setAttribute("type", "number");
    osobe.setAttribute("min", "0");
    osobe.setAttribute("max", "300");
    osobe.setAttribute("step", "50");
    osobe.setAttribute("value", pozoriste.maxOsobe);

    let kod = document.createElement("input");
    kod.setAttribute("type", "text");
    kod.setAttribute("value", pozoriste.kod);

    let button = document.createElement("button");
    button.type = "button";
    button.className = "btn"
    button.onclick = showIzmeni
    button.setAttribute("data-id", id);
    button.setAttribute("predstave-id", pozoristeId[1]);
    button.innerText = "Izmeni"
  
    let br = document.createElement("br");
    document.getElementById("opis").appendChild(text);
    document.getElementById("opis").appendChild(br);
    document.getElementById("opis").appendChild(button);
    document.getElementById("naziv").appendChild(naziv);
    document.getElementById("zanr").appendChild(zanr);
    document.getElementById("trajanje").appendChild(trajanje);
    document.getElementById("cena").appendChild(cena);
    document.getElementById("kod").appendChild(kod);
    document.getElementById("osobe").appendChild(osobe);
}