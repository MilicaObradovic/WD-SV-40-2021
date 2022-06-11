let firebaseURL = "https://pozoriste-dff61-default-rtdb.europe-west1.firebasedatabase.app"
let predstave = {}
let predstava = {}
let predstava1 = {}
let ids = getParamValue();
let predstaveId = ids[0]
let pozoristeId = ids[1]
console.log(pozoristeId)

getPredstave()

let izmeni = document.getElementById("edit-form");
// console.log(izmeni)
// alert(izmeni)

izmeni.addEventListener("submit", function (e) {
    // alert("usao u id")
    e.preventDefault();
    if (validate() == false){
        alert("Neki od unesenih podataka nisu validni.");
    }else{
        let putRequest = new XMLHttpRequest();

        putRequest.onreadystatechange = function (e) {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    window.location.href = "predstava1.html?id=" + predstaveId[1] + ";pozoriste=" + pozoristeId[1];
                } else {
                    alert("Greška prilikom izmene korisnika.2");
                }
            }
        };

        putRequest.open("PUT", firebaseURL + "/predstave/" + pozoristeId[1] + "/" + predstaveId[1] + ".json");
        putRequest.send(JSON.stringify(predstava));
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
    let naziv = document.getElementById('naziv2').value;
    let zanr = document.getElementById('selected').value;
    console.log(zanr)
    let trajanje = document.getElementById('trajanje2').value;
    let cena = document.getElementById('cena2').value;
    let kod = document.getElementById('kod2').value;
    let osobe = document.getElementById('osobe2').value;
    let opis = document.getElementById('opis2').value;
    alert(opis)

    if(naziv.length < 2){
        return false
    }else if(trajanje.length > 4){
        return false
    }else if(cena.length > 5){
        return false
    }else if(kod.length != 6){
        return false
    }else if(osobe.length > 4){
        return false
    }else if(opis.length == 0){
        return false
    }

    for(let i in trajanje){
        if(isNaN(parseInt(trajanje[i])) == true){
            return false
        }
    }
    
    for(let i in cena){
        if(isNaN(parseInt(cena[i])) == true){
            return false
        }
    }

    for(let i in kod){
        // alert(parseInt(kod[i]))
        if(isNaN(parseInt(kod[i])) == true ){
            alert("ovde")
            return false
        }
    }
    for(let i in osobe){
        if(isNaN(parseInt(osobe[i])) == true ){
            return false
        }
    }
    // validacija jedinstvenosti koda
    for(let i in predstave){
        // alert(i )
        for(let j in predstave[i]){
            // uslov da ne proverava kod iz te predstave koju obradjujemo
            if(j != predstaveId[1]){
                if(predstave[i][j].kod == kod){
                    // console.log("kod nije validan")
                    alert("ovde")
                    return false
                }
            }
        }
    }


    predstava.naziv = naziv
    predstava.zanr = zanr
    predstava.trajanje = trajanje
    predstava.cena = cena
    predstava.kod = kod
    predstava.maxOsobe = osobe
    predstava.opis = opis
    console.log(predstava)
    return true

}

function getPredstave(){
    let request = new XMLHttpRequest();
    
    request.onreadystatechange = function () {
        // console.log(this.readyState)
        if (this.readyState == 4) {
            if (this.status == 200) {
                predstave = JSON.parse(request.responseText);
                predstava1 = predstave[pozoristeId[1]]
                // console.log(predstava)
                predstava = predstava1[predstaveId[1]]
                appendZaglavlje(predstava.naziv)
                appendPredstava(predstaveId[1], predstava)
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

function appendPredstava(id, pozoriste) {

    let text = document.createElement("textarea");
    text.classList.add("form-control");
    text.setAttribute("rows", 20);
    text.setAttribute("cols", 20);
    text.setAttribute("id", "opis2");
    text.innerText = pozoriste.opis

    let naziv = document.createElement("input");
    naziv.classList.add("form-control");
    naziv.setAttribute("type", "text");
    naziv.setAttribute("id", "naziv2");
    naziv.setAttribute("value", pozoriste.naziv);

    let zanr = document.createElement("select");
    zanr.setAttribute("value", pozoriste.zanr);
    zanr.setAttribute("id", "zanr2");

    lista = ["Drama", "Komedija", "Tragikomedija","Muzicka parodija", "Farsa"]

    for(let i in lista){
        // console.log(lista[i])
        let z = document.createElement("option");
        z.setAttribute("value", lista[i]);
        z.innerText = lista[i]
        if(pozoriste.zanr == lista[i]){
            z.setAttribute("selected", true)
            z.setAttribute("id", "selected");
        }
        zanr.appendChild(z);
    }

    let trajanje = document.createElement("input");
    trajanje.classList.add("form-group");
    trajanje.setAttribute("type", "number");
    trajanje.setAttribute("id", "trajanje2");
    trajanje.setAttribute("min", "0");
    trajanje.setAttribute("max", "250");
    // trajanje.setAttribute("step", "30");
    trajanje.setAttribute("value", pozoriste.trajanje);
    
    let cena = document.createElement("input");
    cena.classList.add("form-group");
    cena.setAttribute("id", "cena2");
    cena.setAttribute("type", "number");
    cena.setAttribute("min", "0");
    cena.setAttribute("max", "4000");
    // cena.setAttribute("step", "200");
    cena.setAttribute("value", pozoriste.cena);

    let osobe = document.createElement("input");
    osobe.classList.add("form-group");
    osobe.setAttribute("type", "number");
    osobe.setAttribute("id", "osobe2");
    osobe.setAttribute("min", "0");
    osobe.setAttribute("max", "300");
    // osobe.setAttribute("step", "50");
    osobe.setAttribute("value", pozoriste.maxOsobe);

    let kod = document.createElement("input");
    kod.setAttribute("type", "text");
    kod.setAttribute("value", pozoriste.kod);
    kod.setAttribute("id", "kod2");

    let button = document.createElement("button");
    button.type = "submit";
    button.className = "btn"
    button.setAttribute("data-id", id);
    button.setAttribute("predstave-id", pozoristeId[1]);
    button.innerText = "Izmeni"
  
    let br = document.createElement("br");
    document.getElementById("opis").appendChild(text);
    document.getElementById("opis").appendChild(br);
    document.getElementById("edit-form").appendChild(button);
    document.getElementById("naziv").appendChild(naziv);
    document.getElementById("zanr").appendChild(zanr);
    document.getElementById("trajanje").appendChild(trajanje);
    document.getElementById("cena").appendChild(cena);
    document.getElementById("kod").appendChild(kod);
    document.getElementById("osobe").appendChild(osobe);
}