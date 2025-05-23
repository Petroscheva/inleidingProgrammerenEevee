const eeveeAaien = document.querySelector(".tamagochischerm img")
const pElement = document.querySelector(".tamagochischerm p")
const gevechtKnop = document.querySelector(".gevechtschermknop")
const gevechtScherm = document.querySelector(".gevechtscherm")
const tamagochiScherm = document.querySelector(".tamagochischerm")

let audioElement = new Audio("music/1-06. Route 201 (Day).mp3");

audioElement.play();

function eeveeGeaaid(){
    eeveeAaien.src = "Assets/eeveeblij.png"
    pElement.textContent = "Eevee is blij!"
}

function plaatjeVeranderen(){
    pElement.textContent = "Aai eevee om je vriendschapslevel te verhogen"
    eeveeAaien.src = "Assets/eeveevoorkant.png"
}

function zoekGevecht(){
    gevechtScherm.classList.remove("hidden")
    tamagochiScherm.classList.add("hidden")
}

eeveeAaien.addEventListener('mouseover', eeveeGeaaid)
eeveeAaien.addEventListener('mouseout', plaatjeVeranderen)
gevechtKnop.addEventListener('click', zoekGevecht)