// VARIABELEN
let pikachuHP = 120
let eeveeHP = 100

// CHAT GPT
//prompt: ik wil nu dat de item van het wingevechtscherm in de items knop komt en dat je deze aan eevee kan geven in het tamagochischerm, waardoor deze kan evolueren in een van de 8 evoluaties
let verkregenItems = []
let huidigeEvolutie = null

let huidigeEvolutieHP = 150

const tamagochiScherm   = document.querySelector(".tamagochischerm")
const gevechtScherm     = document.querySelector(".gevechtscherm")
const winScherm         = document.querySelector(".winscherm")
const verliesScherm     = document.querySelector(".verliesscherm")

const eeveeAaien        = document.querySelector(".tamagochischerm img")
const pElement          = document.querySelector(".tamagochischerm p")
const gevechtKnop       = document.querySelector(".gevechtschermknop")
const terugKnop         = document.querySelector("#tamagochischermknop")
const verliesKnop       = document.querySelector("#opnieuwknop")

const achtergrondAudio  = document.querySelector("#TamagochiAudio")
const battleAudio       = document.querySelector("#battleAudio")
const winAudio          = document.querySelector("#winAudio")
const verliesAudio      = document.querySelector("#verliesAudio")

const pikachuImg        = document.querySelector("#pikachu")
const eeveeImg          = document.querySelector("#eeveeachterkant")
const hpPikachu         = document.querySelector("#hppikachu")
const hpEevee           = document.querySelector("#hpeevee")

const itemsKnop         = document.querySelector("#geefItemKnop")
const itemsMenu         = document.querySelector("#itemsMenu")
const itemsLijst        = document.querySelector("#itemsLijst")
const evolutieTekst     = document.querySelector("#evolutieTekst")
const gevondenItemAfbeelding = document.querySelector("#gevondenItemAfbeelding")
const itemMeldingElement     = document.querySelector("#itemMelding")

// CHAT GPT
//prompt: ik wil nu dat de item van het wingevechtscherm in de items knop komt en dat je deze aan eevee kan geven in het tamagochischerm, waardoor deze kan evolueren in een van de 8 evoluaties
const evoluties = {
  "Water Stone":   { naam: "Vaporeon",  img: "Assets/vaporeon.png", achterkant: "Assets/vaporeonachterkant.png" },
  "Fire Stone":    { naam: "Flareon",   img: "Assets/flareon.png", achterkant: "Assets/flareonachterkant.png" },
  "Thunder Stone": { naam: "Jolteon",   img: "Assets/jolteon.png", achterkant: "Assets/jolteonachterkant.png" },
  "Leaf Stone":    { naam: "Leafeon",   img: "Assets/leafeon.png", achterkant: "Assets/leafeonachterkant.png" },
  "Ice Stone":     { naam: "Glaceon",   img: "Assets/glaceon.png", achterkant: "Assets/glaceonachterkant.png" },
  "Moon Stone":    { naam: "Umbreon",   img: "Assets/umbreon.png", achterkant: "Assets/umbreonachterkant.png" },
  "Sun Stone":     { naam: "Espeon",    img: "Assets/espeon.png", achterkant: "Assets/espeonachterkant.png" },
  "Fairy Stone":   { naam: "Sylveon",   img: "Assets/sylveon.png", achterkant: "Assets/sylveonachterkant.png" }
}

const attacks = {
  tackleknop:      { values: [10, 20, 25],                 sound: "music/Tackle.mp3" },
  growlknop:       { values: [5, 10, 15],                  sound: "music/Growl.mp3" },
  quickattackknop: { values: [10, 20, 30], critChance: 0.3, sound: "music/Quick Attack.mp3" },
  gnawknop:        { values: [10, 15, 20, 25, 30],         sound: "music/Growl.mp3" }
}

function openGevecht() {
  gevechtScherm.classList.remove("hidden")
  tamagochiScherm.classList.add("hidden")
  verliesScherm.classList.add("hidden")

  stopEnResetAudio(verliesAudio)
  stopEnResetAudio(achtergrondAudio)
  battleAudio.currentTime = 0
  battleAudio.play()
  updateHP()
}

function winGevecht() {
  gevechtScherm.classList.add("hidden")
  winScherm.classList.remove("hidden")

  stopEnResetAudio(battleAudio)
  winAudio.currentTime = 0
  winAudio.play()

  resetBattle()
 // CHAT GPT
 // prompt: ik wil nu dat de item van het wingevechtscherm in de items knop komt en dat je deze aan eevee kan geven in het tamagochischerm, waardoor deze kan evolueren in een van de 8 evoluaties
  const itemKeys = Object.keys(evoluties)
  const randomItem = itemKeys[Math.floor(Math.random() * itemKeys.length)]
  verkregenItems.push(randomItem)

  itemMeldingElement.textContent = "Je hebt een " + randomItem + " gevonden!"
  gevondenItemAfbeelding.src = "Assets/" + randomItem.toLowerCase().replace(" ", "") + ".png"
  gevondenItemAfbeelding.alt = randomItem
}

function verliesGevecht() {
  gevechtScherm.classList.add("hidden")
  winScherm.classList.add("hidden")
  verliesScherm.classList.remove("hidden")

  stopEnResetAudio(battleAudio)
  stopEnResetAudio(achtergrondAudio)
  verliesAudio.currentTime = 0
  verliesAudio.play()

  resetBattle()
  eeveeImg.classList.remove("faint")
}

function terugNaarTamagotchi() {
  winScherm.classList.add("hidden")
  verliesScherm.classList.add("hidden")
  tamagochiScherm.classList.remove("hidden")

  stopEnResetAudio(battleAudio)
  stopEnResetAudio(winAudio)
  stopEnResetAudio(verliesAudio)

  achtergrondAudio.currentTime = 0
  achtergrondAudio.play()
  resetBattle()
}
// CHAT GPT maar zelf aangepast
// prompt: ik wil nu dat de item van het wingevechtscherm in de items knop komt en dat je deze aan eevee kan geven in het tamagochischerm, waardoor deze kan evolueren in een van de 8 evoluaties
function geefItemAanEevee() {
  if (verkregenItems.length === 0) {
    evolutieTekst.textContent = "Je hebt nog geen items."
  } else {
    itemsMenu.classList.toggle("hidden")
    itemsLijst.innerHTML = ""

    for (let i = 0; i < verkregenItems.length; i++) {
      const item = verkregenItems[i]
      const evolutie = evoluties[item]

      const li = document.createElement("li")
      li.textContent = item + " → " + evolutie.naam
      li.style.cursor = "pointer"

      li.addEventListener("click", function () {
        if (!huidigeEvolutie) {
          huidigeEvolutie = evolutie
          eeveeImg.src = evolutie.achterkant || evolutie.img
          eeveeAaien.src = evolutie.img
          pElement.textContent = evolutie.naam + " is blij!"
          evolutieTekst.textContent = "Eevee is geëvolueerd in " + evolutie.naam + "!"

          verkregenItems.splice(i, 1)
          itemsMenu.classList.add("hidden")
        } else {
          evolutieTekst.textContent = "Eevee is al geëvolueerd in " + huidigeEvolutie.naam + "."
        }
      })

      itemsLijst.appendChild(li)
    }
  }
}
// CHATGPT
// Prompt: how to use javascript to play an audio file when you visit a website and change audio when a class is being hidden?
function stopEnResetAudio(audio) {
  audio.pause()
  audio.currentTime = 0
}

function resetBattle() {
  pikachuHP = 120
  eeveeHP = 100
  huidigeEvolutieHP = 150
  updateHP()
  pikachuImg.classList.remove("faint")
  eeveeImg.classList.remove("faint")
}

function plaatjeVeranderen() {
  if (huidigeEvolutie) {
    pElement.textContent = huidigeEvolutie.naam + " is blij!"
  } else {
    eeveeAaien.src = "Assets/eeveevoorkant.png"
    pElement.textContent = "Aai Eevee voor een glimlach!"
  }
}

function eeveeGeaaid() {
  if (huidigeEvolutie) {
    pElement.textContent = huidigeEvolutie.naam + " is blij!"
  } else {
    eeveeAaien.src = "Assets/eeveeblij.png"
    pElement.textContent = "Eevee is blij!"
  }
}

function berekenDamage(values, critChance = 0.2, critMultiplier = 2) {
  const basisDamage = values[Math.floor(Math.random() * values.length)]
  const isCritical = Math.random() < critChance
  const damage = isCritical ? basisDamage * critMultiplier : basisDamage
  return { damage, isCritical }
}
// CHATGPT
// Prompt: how to use javascript to play an audio file when you visit a website and change audio when a class is being hidden?
function speelGeluid(src) {
  const a = new Audio(src)
  a.play()
}

function updateHP() {
  hpPikachu.textContent = "HP " + pikachuHP
  hpEevee.textContent = huidigeEvolutie ? "HP " + huidigeEvolutieHP : "HP " + eeveeHP
}

function pikachuAanval() {
  const damage = Math.floor(Math.random() * 15) + 5

  if (huidigeEvolutie) {
    huidigeEvolutieHP -= damage
    huidigeEvolutieHP = Math.max(0, huidigeEvolutieHP)
    updateHP()
    eeveeImg.classList.add("schud")

    setTimeout(function () {
      eeveeImg.classList.remove("schud")
      if (huidigeEvolutieHP <= 0) {
        verliesGevecht()
      }
    }, 400)
  } else {
    eeveeHP -= damage
    eeveeHP = Math.max(0, eeveeHP)
    updateHP()
    eeveeImg.classList.add("schud")

    setTimeout(function () {
      eeveeImg.classList.remove("schud")
      if (eeveeHP <= 0) {
        setTimeout(verliesGevecht, 1000)
        eeveeImg.classList.add("faint")
      }
    }, 400)
  }
}

function doeEeveeAanval(damage, isCritical) {
  pikachuHP -= damage
  if (pikachuHP < 0) pikachuHP = 0
  updateHP()

  pikachuImg.classList.add("schud")
  if (isCritical) {
    pikachuImg.classList.add("critical")
  }

  setTimeout(function () {
    pikachuImg.classList.remove("schud", "critical")
    if (pikachuHP <= 0) {
      setTimeout(winGevecht, 1000)
      pikachuImg.classList.add("faint")
    } else {
      setTimeout(pikachuAanval, 500)
    }
  }, 400)
}

function handleAttackButtonClick(values, critChance, sound) {
  return function () {
    const result = berekenDamage(values, critChance)
    speelGeluid(sound)
    doeEeveeAanval(result.damage, result.isCritical)
  }
}

function setupAttackButtons() {
  for (let btnId in attacks) {
    const aanval = attacks[btnId]
    const button = document.querySelector("#" + btnId)
    button.addEventListener("click", handleAttackButtonClick(aanval.values, aanval.critChance || 0.2, aanval.sound))
  }
}

function laadPagina() {
  achtergrondAudio.play()
  setupAttackButtons()
}

laadPagina()

eeveeAaien.addEventListener("mouseover", eeveeGeaaid)
eeveeAaien.addEventListener("mouseout", plaatjeVeranderen)

gevechtKnop.addEventListener("click", openGevecht)
terugKnop.addEventListener("click", terugNaarTamagotchi)
verliesKnop.addEventListener("click", openGevecht)

itemsKnop.addEventListener("click", geefItemAanEevee)

