// ÜBUNG: Pokemon Anzeigen mit Hilfe einer API

// 1. URL besorgen auf einer Hompage. Fkt erstellen async fkt loadPokemons()
//      Mit FOR Schleife Index bestimmen -> Anzahl der Pokemon
//      In die URL Anzahl ersetzen und in eine Var packen
//      URL fetchen und konvertieren in neue Var packen
// 2. Die Var currentPokemon global definieren d.h. ausserhalb der fkt zeigen
//    Ein leeres Array (let pokemons) für die ersten 10 erzeugen als Zwischenspeicher
// 3. DIV ID nehmen und Inhalt pushen. Dafür Template Fkt für HTML Inhalt erstellen
//    Name und ID aus dem Strukturaufbau entnehmen und dynamisch eintragen
//    Achtung: type gibt es häufiger d.h. es ist ein Array. Daher Hilfsfkt. mit For Schleife.
// 4. Hilfsfkt. gettype   am Ende von load fkt aufrufen und Paramenter i,currentPokemon mitgeben
//    mit if-Schleife so lang wie die type länge alle namen anzeigen lassen
// 5. Such fkt im Input-Suchfeld bei onchange= oder on keydown = auf rufen lassen.
//    Input in Var und als Wert. Durch .toLowercase alle Buchstaben klein konvertieren.
//    Bedingung: Wenn Name im Array (konvertiert) den Wert enthaltält, dann zeige an
// 6. Background-Color wechseln, je nach Type- name. In die for Schleife bei types neue color-fkt aufrufen
// 7. Neue fkt color () definieren mit if Abfrage und .includes
// 9. Open Fkt mit Template für HTML
// 10. Render-FKT für die types-Anzeige und Ability-Anzeige
// 11. Close Fkt mit hide
// 12. Btn mit LoadMore-FKT erzeugen und FKT definieren
//     Neue Arays mit Start und Lade-Wert global definieren - Diese in die Load fkt bei i eintragen
//     In der LoadMore-Fkt diese um 18 erhöhen und neu Laden
// 13. Neue -Next fkt erstellen. Arrow-Img einfügen und onclick.

let currentPokemon; // 2. API JSON
let pokemons = []; // 2. leeres Array
let startPokemon = 1; // 12.
let loadMore = 18; // 12.

//  1. Load-Fkt
async function loadPokemons() {
  document.getElementById(`maincontent`).innerHTML = ``;
  for (let i = startPokemon; i <= loadMore; i++) {
    let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    let response = await fetch(url);
    let currentPokemon = await response.json();
    pokemons.push(currentPokemon);
    console.log("Loaded pokemon", currentPokemon);

    document.getElementById(`maincontent`).innerHTML += generateCard(
      currentPokemon,
      i
    );
    gettype(i, currentPokemon);
  }
}
// 3. Template Card-HTML-Anzeige
function generateCard(currentPokemon, i) {
  return /*html*/`
  <div class="card" id="pokecard${i}" onclick="openPokemon(${
    (currentPokemon, i - 1)
  })">
    <div class="pokemon-card-head">
      <h2>${currentPokemon["name"]}</h2>
      <div>#${currentPokemon["id"]}</div>
    </div>
    <div class="pokemon-card-wrapper">
      <div id = "poketype${i}" class="pokemon-card-class">
        
      </div>
      <img src="${
        currentPokemon["sprites"]["other"]["home"]["front_default"]
      }"alt="">
    </div>
  </div>`;
}

// 4. Render-FKT für types
function gettype(i, currentPokemon) {
  let type = document.getElementById(`poketype${i}`);

  for (let index = 0; index < currentPokemon.types.length; index++) {
    let poketype = currentPokemon.types[index].type.name;
    type.innerHTML += `<div><spann>${currentPokemon.types[index].type.name}</span></div>`;
    color(i, poketype); // 6.
  }
}

// 5. Fkt für Such-Filter
async function filterPoke() {
  document.getElementById(`maincontent`).innerHTML = ""; //Leeren
  let varSearchInput = document.getElementById(`search`).value; // Input in Var als Wert
  varSearchInput = varSearchInput.toLowerCase(); // Var klein-schrift

  for (let i = 0; i < pokemons.length; i++) {
    // Mit einer For-Schleife über die Pokemons Arrays gehen
    let name = pokemons[i].name;
    if (name.toLowerCase().includes(varSearchInput)) {
      // Wenn der Eingabe-Wert dem durchiterierten (kleingeschribenen) Array Namen entsprichet,
      currentPokemon = pokemons[i];
      document.getElementById(`maincontent`).innerHTML += generateCard(
        pokemons[i],
        i
      );
      gettype(i, pokemons[i]);
    }
  }
}

// 7. Color-Change fkt

function color(i, poketype) {
  if (poketype.includes("fire")) {
    document.getElementById(`pokecard${i}`).classList.add("red");
  }
  if (poketype.includes("water")) {
    document.getElementById(`pokecard${i}`).classList.add("blue");
  }
  if (poketype.includes("normal")) {
    document.getElementById(`pokecard${i}`).classList.add("grey");
  }
  if (poketype.includes("poison")) {
    document.getElementById(`pokecard${i}`).classList.add("violet");
  }
  if (poketype.includes("electric")) {
    document.getElementById(`pokecard${i}`).classList.add("yellow");
  }
  if (poketype.includes("grass")) {
    document.getElementById(`pokecard${i}`).classList.add("green");
  }
}

// 9. Open-Fkt
function openPokemon(i) {
  document.getElementById("popUpContainer").classList.remove("hide");

  document.getElementById("popUpContainer").innerHTML = renderDetail(i);
  gettypes(i);
  getAbi(i);
}

// 9. Template für Fkt openPokemon
function renderDetail(i) {
  return /*html*/`
  <div id="detail-card" class="detail-card"">

    <div id="top${i}" class="top-container">
      <img onclick= "closePokemon()" src = "./img/close-window-32.png">
      
      <div><h1>${pokemons[i]["name"]}</h1></div>
      <div class="cardId">#${pokemons[i]["id"]}</div>
      <div class="cardTypes" id ="CardPoketypes${i}"></div>
      <img onclick="nextPoke(${i + 1})" src="./img/arrow.png">
    </div>
      <img class= "cardImg" src="${
        pokemons[i]["sprites"]["other"]["home"]["front_default"]
      }"alt="">
      <div class="bottom-container">
        <div class= "cardtab">
          <div>#About</div>
          <div>#Base Stats </div>
          <div>#Moves</div>
        </div>
        <div class= "details">
        <div>Height: ${pokemons[i]["height"] / 10}&nbsp;m</div>
        <div>Weight: ${pokemons[i]["weight"] / 10}&nbsp;kg</div>
        <div>Experience: ${pokemons[i]["base_experience"]}&nbsp;</div>
        <div>Abilities:<ul id = "cardAbi${i}"></ul></div> 
        </div>
    </div>
  </div>`;
}

//10. Render-FKT Card-Types
function gettypes(i) {
  let type = document.getElementById(`CardPoketypes${i}`);

  for (let index = 0; index < pokemons[i].types.length; index++) {
    let poketype = pokemons[i].types[index].type.name;
    type.innerHTML += `<div>${pokemons[i].types[index].type.name}</div>`;
    cardColor(i, poketype);
  }
}

// 10. Render-FKT Card-Ability
function getAbi(i) {
  let abi = document.getElementById(`cardAbi${i}`);

  for (let index = 0; index < pokemons[i].abilities.length; index++) {
    let abilities = pokemons[i].abilities[index].ability.name;
    abi.innerHTML += `<li>&nbsp;${abilities}</li>`;
  }
}

// Card-Color

function cardColor(i, poketype) {
  if (poketype.includes("fire")) {
    document.getElementById(`top${i}`).classList.add("red");
  }
  if (poketype.includes("water")) {
    document.getElementById(`top${i}`).classList.add("blue");
  }
  if (poketype.includes("normal")) {
    document.getElementById(`top${i}`).classList.add("grey");
  }
  if (poketype.includes("poison")) {
    document.getElementById(`top${i}`).classList.add("violet");
  }
  if (poketype.includes("electric")) {
    document.getElementById(`top${i}`).classList.add("yellow");
  }
  if (poketype.includes("grass") && poketype.includes("bug")) {
    document.getElementById(`top${i}`).classList.add("green");
  }
  if (poketype.includes("poison") && poketype.includes("bug")) {
    document.getElementById(`top${i}`).classList.add("lila");
  }
}

// 11. Close-Fkt
function closePokemon() {
  document.getElementById("popUpContainer").classList.add("hide");
}

// 12. More Poke-Fkt
function loadMorePoke() {
  loadMore += 18;
  loadPokemons();
}

// 13. Next-FKT
function nextPoke(i) {
  if (i >= pokemons.length) {
    i = 0;
  } else {
    i + 1;
  }
  openPokemon(i);
}
