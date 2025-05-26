//VARIABELEN
let pikachuHP = 120;
let eeveeHP = 100;
let verkregenItems = [];
let huidigeEvolutie = null;

const tamagochiScherm = document.querySelector(".tamagochischerm");
const gevechtScherm   = document.querySelector(".gevechtscherm");
const winScherm       = document.querySelector(".winscherm");
const verliesScherm   = document.querySelector(".verliesscherm");

const eeveeAaien      = document.querySelector(".tamagochischerm img");
const pElement        = document.querySelector(".tamagochischerm p");
const gevechtKnop     = document.querySelector(".gevechtschermknop");
const terugKnop       = document.querySelector("#tamagochischermknop");
const verliesKnop     = document.querySelector("#opnieuwknop");

const achtergrondAudio = document.querySelector("#TamagochiAudio");
const battleAudio      = document.querySelector("#battleAudio");
const winAudio         = document.querySelector("#winAudio");
const verliesAudio	   = document.querySelector("#verliesAudio")

const pikachuImg = document.querySelector("#pikachu");
const eeveeImg = document.querySelector("#eeveeachterkant")
const hpPikachu  = document.querySelector("#hppikachu");
const hpEevee    = document.querySelector("#hpeevee");

const itemsKnop = document.querySelector("#geefItemKnop");
const itemsMenu = document.querySelector("#itemsMenu");
const itemsLijst = document.querySelector("#itemsLijst");
const evolutieTekst = document.querySelector("#evolutieTekst");
const gevondenItemAfbeelding = document.querySelector("#gevondenItemAfbeelding");
const itemMeldingElement = document.querySelector("#itemMelding");

// EVOLUTIES
const evoluties = {
  "Water Stone":  { naam: "Vaporeon",  img: "Assets/vaporeon.png"  },
  "Fire Stone":   { naam: "Flareon",   img: "Assets/flareon.png"   },
  "Thunder Stone":{ naam: "Jolteon",   img: "Assets/jolteon.png"   },
  "Leaf Stone":   { naam: "Leafeon",   img: "Assets/leafeon.png"   },
  "Ice Stone":    { naam: "Glaceon",   img: "Assets/glaceon.png"   },
  "Moon Stone":   { naam: "Umbreon",   img: "Assets/umbreon.png"   },
  "Sun Stone":    { naam: "Espeon",    img: "Assets/espeon.png"    },
  "Fairy Stone":  { naam: "Sylveon",   img: "Assets/sylveon.png", achterkant: "Assets/sylveonachterkant.png" }
};

// AANVALLEN
const attacks = {
    tackleknop:      { values: [10, 20, 25],                 sound: "music/Tackle.mp3" },
    growlknop:       { values: [5, 10, 15],                  sound: "music/Growl.mp3" },
    quickattackknop: { values: [10, 20, 30], critChance: .3, sound: "music/Quick Attack.mp3" },
    gnawknop:        { values: [10, 15, 20, 25, 30],         sound: "music/Growl.mp3" }
  };

// START ACHTERGRONDMUZIEK
achtergrondAudio.play();


// SCHERM WISSELEN
function openGevecht() {
  gevechtScherm.classList.remove("hidden");
  tamagochiScherm.classList.add   ("hidden");
  verliesScherm.classList.add   ("hidden");

  [verliesAudio, achtergrondAudio].forEach(stopEnResetAudio);
  battleAudio.currentTime = 0;
  battleAudio.play();
  
}


function winGevecht() {
  gevechtScherm.classList.add("hidden");
  winScherm.classList.remove("hidden");

  battleAudio.pause();
  winAudio.currentTime = 0;
  winAudio.play();

  resetBattle();

  // Kies een random item
  const itemKeys = Object.keys(evoluties);
  const randomItem = itemKeys[Math.floor(Math.random() * itemKeys.length)];
  verkregenItems.push(randomItem);

  // Toon het item
  itemMeldingElement.textContent = "Je hebt een " + randomItem + " gevonden!";
  gevondenItemAfbeelding.src = `Assets/${randomItem.toLowerCase().replace(" ", "")}.png`;
  gevondenItemAfbeelding.alt = randomItem;
}

function verliesGevecht() {
  gevechtScherm.classList.add("hidden");
  winScherm.classList.add("hidden");
  verliesScherm.classList.remove("hidden");

  [battleAudio, achtergrondAudio].forEach(stopEnResetAudio);
  verliesAudio.currentTime = 0;
  verliesAudio.play();

  resetBattle();
}

function terugNaarTamagotchi() {
    // winscherm → tamagochi
    winScherm.classList.add("hidden");
    verliesScherm.classList.add("hidden");
    tamagochiScherm.classList.remove("hidden");
  
    [battleAudio, winAudio, verliesAudio].forEach(stopEnResetAudio);
    achtergrondAudio.currentTime = 0;
    achtergrondAudio.play();
    resetBattle();
}

// FUNCTIES
function geefItemAanEevee() {
  if (verkregenItems.length === 0) {
    evolutieTekst.textContent = "Je hebt nog geen items.";
    return;
  }

  itemsMenu.classList.toggle("hidden");
  itemsLijst.innerHTML = "";

  verkregenItems.forEach((item, index) => {
    const evolutie = evoluties[item];
    const li = document.createElement("li");
    li.textContent = `${item} → ${evolutie.naam}`;
    li.style.cursor = "pointer";

    li.addEventListener("click", () => {
      if (huidigeEvolutie) {
        evolutieTekst.textContent = `Eevee is al geëvolueerd in ${huidigeEvolutie.naam}.`;
        return;
      }

      huidigeEvolutie = evolutie;
      eeveeImg.src = evolutie.achterkant || evolutie.img;
      eeveeAaien.src = evolutie.img;
      pElement.textContent = `${evolutie.naam} is blij!`;
      evolutieTekst.textContent = `Eevee is geëvolueerd in ${evolutie.naam}!`;

      verkregenItems.splice(index, 1);
      itemsMenu.classList.add("hidden");
    });

    itemsLijst.appendChild(li);
  });
}

function stopEnResetAudio(audio) {
  audio.pause();
  audio.currentTime = 0;
}

function resetBattle() {
  pikachuHP = 120;
  eeveeHP = 100;
  updateHP();
  pikachuImg.classList.remove("faint");
  eeveeImg.classList.remove("faint");
}

function eeveeGeaaid() {
  if (huidigeEvolutie) {
    pElement.textContent = `${huidigeEvolutie.naam} is blij!`;
    return;
  }
  eeveeAaien.src = "Assets/eeveeblij.png";
  pElement.textContent = "Eevee is blij!";
}

function plaatjeVeranderen() {
  if (huidigeEvolutie) {
    pElement.textContent = `${huidigeEvolutie.naam} is blij!`;
    return;
  }
  eeveeAaien.src = "Assets/eeveevoorkant.png";
  pElement.textContent = "Aai Eevee voor een glimlach!";
}

function berekenDamage(values, critChance = 0.2, critMultiplier = 2) {
  const basisDamage       = values[Math.floor(Math.random() * values.length)];
  const isCritical        = Math.random() < critChance;
  const damage            = isCritical ? basisDamage * critMultiplier : basisDamage; //CHATGPT: 
  return { damage, isCritical };
}

function speelGeluid(src) {
    const a = new Audio(src);
    a.play();
}

function updateHP() {
    hpPikachu.textContent = "HP " + pikachuHP;
    hpEevee.textContent   = "HP " + eeveeHP;
}

function pikachuAanval() {
    const damage = Math.floor(Math.random() * 15) + 5;
    eeveeHP -= damage;
    eeveeHP = Math.max(0, eeveeHP);
    updateHP();
  
    document.querySelector("#eeveeachterkant").classList.add("schud");
  
    setTimeout(() => {
      document.querySelector("#eeveeachterkant").classList.remove("schud");
  
      if (eeveeHP <= 0) {
        verliesGevecht();
      }
    }, 400);
}
  
function doeEeveeAanval(damage, isCritical) {
    pikachuHP -= damage;
    if (pikachuHP < 0) pikachuHP = 0;
    updateHP();
  
    pikachuImg.classList.add("schud");
    if (isCritical) pikachuImg.classList.add("critical");
  
    setTimeout(() => {
      pikachuImg.classList.remove("schud", "critical");
  
      if (pikachuHP <= 0) {
        winGevecht();
      } else {
        // Pikachu valt terug aan
        setTimeout(pikachuAanval, 500);
      }
    }, 400);
}



// EVENTLISTENERS
//eevee aai systeem
eeveeAaien.addEventListener('mouseover', eeveeGeaaid)
eeveeAaien.addEventListener('mouseout', plaatjeVeranderen)

gevechtKnop.addEventListener("click", openGevecht);
terugKnop.addEventListener("click", terugNaarTamagotchi);
verliesKnop.addEventListener("click", openGevecht);

itemsKnop.addEventListener("click", geefItemAanEevee);

// aanvalknoppen
Object.entries(attacks).forEach(([btnId, { values, critChance = 0.2, sound }]) => {
    document.querySelector(`#${btnId}`).addEventListener("click", () => {
      const { damage, isCritical } = berekenDamage(values, critChance);
      speelGeluid(sound);
      doeEeveeAanval(damage, isCritical);
    });
});



