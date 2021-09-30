"use strict";
// Variables globales
var rocketArray = [];
var showRocket;
var rocket1;
var rocket2;
var y1 = 0;
var y2 = 0;
var altoNavegador;
var anchoNavegador;
var altoRocket1;
var anchoRocket1;
var anchoRocket2;
var meta;
var maxPowerArray1;
var maxPowerArray2;
var startGameInterval;
var audioRocket = new Audio("../audio/rocket-effects.mp3");
window.onload = function () {
    rocket1 = document.querySelector("#rocket1");
    rocket2 = document.querySelector("#rocket2");
    //   Calcula medias del navegador y rockets
    calculateSizes();
    showRocket = document.querySelector("#rocketInfo");
    // Variables
    var indexRocket;
    var aceleracion;
    var buttons = document.querySelectorAll("button");
    var buttonSartGame = document.getElementById("startGame");
    desactivateOptions(buttons);
    buttons.forEach(function (element) {
        element.addEventListener("click", function (e) {
            showRocket.style.color = "white";
            if (element.id === "createRocket1") {
                clearMessage();
                maxPowerArray1 = [10, 30, 80];
                createRocket("32WESSDS", maxPowerArray1);
                indexRocket = numberRocket(element.id);
                showImageRocket(indexRocket);
                element.disabled = true;
            }
            if (element.id === "createRocket2") {
                if (rocketArray.length > 0) {
                    maxPowerArray2 = [30, 40, 50, 50, 30, 10];
                    createRocket("LDSFJA32", maxPowerArray2);
                    indexRocket = numberRocket(element.id);
                    showImageRocket(indexRocket);
                    element.disabled = true;
                    buttonSartGame.style.visibility = "visible";
                }
                else {
                    clearMessage();
                    showRocket.insertAdjacentText("afterbegin", "Primero debe crear el Rocket 1");
                }
            }
            if (element.id === "startGame") {
                clearMessage();
                activateOptions(buttons);
                startGameInterval = setInterval(startRocket, 600);
                element.disabled = true;
            }
            if (element.id === "powerMaxRocket1") {
                if (rocketArray.length > 0) {
                    indexRocket = numberRocket(element.id);
                    showPowerMaxRocket(indexRocket);
                }
                else {
                    clearMessage();
                    showRocket.insertAdjacentText("afterbegin", "Primero debe crear el Rocket 1");
                }
            }
            if (element.id === "powerMaxRocket2") {
                if (rocketArray.length === 2) {
                    indexRocket = numberRocket(element.id);
                    showPowerMaxRocket(indexRocket);
                }
                else {
                    clearMessage();
                    showRocket.insertAdjacentText("afterbegin", "Primero debe crear el Rocket 2");
                }
            }
            if (element.id === "acelerateRocket1") {
                if (rocketArray.length > 0) {
                    indexRocket = numberRocket(element.id);
                    aceleracion = acelerateRocket(indexRocket);
                    moveRocket(indexRocket, aceleracion);
                }
                else {
                    clearMessage();
                    showRocket.insertAdjacentText("afterbegin", "Primero debe crear el Rocket 1");
                }
            }
            if (element.id === "breakRocket1") {
                if (rocketArray.length > 0) {
                    indexRocket = numberRocket(element.id);
                    aceleracion = breakRocket(indexRocket);
                }
                else {
                    clearMessage();
                    showRocket.insertAdjacentText("afterbegin", "Primero debe crear el Rocket 1");
                }
            }
            if (element.id === "acelerateRocket2") {
                if (rocketArray.length === 2) {
                    indexRocket = numberRocket(element.id);
                    aceleracion = acelerateRocket(indexRocket);
                    moveRocket(indexRocket, aceleracion);
                }
                else {
                    clearMessage();
                    showRocket.insertAdjacentText("afterbegin", "Primero debe crear el Rocket 2");
                }
            }
            if (element.id === "breakRocket2") {
                if (rocketArray.length > 0) {
                    indexRocket = numberRocket(element.id);
                    aceleracion = breakRocket(indexRocket);
                }
                else {
                    clearMessage();
                    showRocket.insertAdjacentText("afterbegin", "Primero debe crear el Rocket 2");
                }
            }
            if (element.id === "printRocket1") {
                if (rocketArray.length > 0) {
                    indexRocket = numberRocket(element.id);
                    showRockets(indexRocket);
                }
                else {
                    clearMessage();
                    showRocket.insertAdjacentText("afterbegin", "Primero debe crear el Rocket 1");
                }
            }
            if (element.id === "printRocket2") {
                if (rocketArray.length === 2) {
                    indexRocket = numberRocket(element.id);
                    showRockets(indexRocket);
                }
                else {
                    clearMessage();
                    showRocket.insertAdjacentText("afterbegin", "Primero debe crear el Rocket 2");
                }
            }
            if (element.id === "printAllRockets") {
                if (rocketArray.length > 0) {
                    showRockets(-1);
                }
                else {
                    clearMessage();
                    showRocket.insertAdjacentText("afterbegin", "No existe ning\u00FAn rocket creado");
                }
            }
        });
    });
};
function numberRocket(itextId) {
    var _a;
    var patt = /\d{1,99999999}/g;
    var indice = (_a = itextId.match(patt)) === null || _a === void 0 ? void 0 : _a.join("");
    var indiceNumber = -1;
    indiceNumber = parseInt(indice) - 1;
    return indiceNumber;
}
function showRockets(index) {
    showRocket = document.querySelector("#rocketInfo");
    clearMessage();
    var listBoosters = "";
    if (index != -1) {
        rocketArray[index].boosters.forEach(function (booster) {
            listBoosters += booster.maxPower + ",";
        });
        listBoosters = listBoosters.substring(0, listBoosters.length - 1);
        showRocket.insertAdjacentText("afterbegin", "Rocket " + rocketArray[index].codi + " boosters max power: " + listBoosters);
    }
    else {
        rocketArray.forEach(function (rocket) {
            listBoosters = "";
            rocket.boosters.forEach(function (booster) {
                listBoosters += booster.maxPower + ",";
            });
            listBoosters = listBoosters.substring(0, listBoosters.length - 1);
            showRocket.insertAdjacentHTML("beforeend", "Rocket " + rocket.codi + " boosters max power: " + listBoosters + "<br>");
        });
    }
}
function createRocket(code, maxPowerArray) {
    var rocket = new Rocket(code);
    maxPowerArray.forEach(function (maxPower) {
        rocket.addBooster(new Booster(maxPower));
    });
    rocketArray.push(rocket);
}
function showPowerMaxRocket(index) {
    var showRocket = document.querySelector("#rocketInfo");
    clearMessage();
    var maxPowerAcum = 0;
    rocketArray[index].boosters.forEach(function (booster) {
        maxPowerAcum += booster.maxPower;
    });
    showRocket.insertAdjacentText("afterbegin", "Rocket " + rocketArray[index].codi + " max power rocket: " + maxPowerAcum);
}
function acelerateRocket(index) {
    clearMessage();
    var currentPower = rocketArray[index].potenciaActual;
    rocketArray[index].boosters.forEach(function (booster) {
        if (booster.maxPower > 0) {
            booster.maxPower -= 10;
            currentPower += 10;
        }
    });
    rocketArray[index].acelerar(currentPower);
    return currentPower;
}
function breakRocket(index) {
    clearMessage();
    var currentPower = rocketArray[index].potenciaActual;
    rocketArray[index].boosters.forEach(function (booster, indice) {
        if (currentPower > 0) {
            if (index === 0) {
                if (maxPowerArray1[indice] > booster.maxPower) {
                    booster.maxPower += 10;
                    currentPower -= 10;
                }
            }
            if (index === 1) {
                if (maxPowerArray2[indice] > booster.maxPower) {
                    booster.maxPower += 10;
                    currentPower -= 10;
                }
            }
        }
    });
    rocketArray[index].frenar(currentPower);
    return currentPower;
}
function clearMessage() {
    showRocket.innerHTML = "";
}
function showImageRocket(index) {
    var numberRocket = "#rocket" + (index + 1);
    var visibilityRocket = document.querySelector(numberRocket);
    visibilityRocket.style.visibility = "visible";
    rocket1.style.left = anchoNavegador / 2 - anchoRocket1 + "px";
    rocket2.style.left = anchoNavegador / 2 + anchoRocket2 + "px";
}
function startRocket() {
    var indexRocket;
    var powerRocket1 = rocketArray[0].potenciaActual;
    var powerRocket2 = rocketArray[1].potenciaActual;
    if (y1 < meta) {
        if (powerRocket1 != 0) {
            y1 += powerRocket1 / 10;
        }
        indexRocket = numberRocket("y1");
        moveRocket(indexRocket, powerRocket1);
    }
    if (y2 < meta) {
        if (powerRocket2 != 0) {
            y2 += powerRocket2 / 10;
        }
        indexRocket = numberRocket("y2");
        moveRocket(indexRocket, powerRocket2);
    }
}
function moveRocket(index, aceleracion) {
    if (rocketArray[0].potenciaActual === 0 && rocketArray[1].potenciaActual === 0) {
        audioRocket.pause();
    }
    else {
        audioRocket.play();
    }
    if (aceleracion != 0) {
        aceleracion /= 10;
    }
    if (index === 0) {
        if (aceleracion != undefined) {
            y1 += aceleracion;
        }
        rocket1.style.bottom = y1 + "px";
    }
    if (index === 1) {
        if (aceleracion != undefined) {
            y2 += aceleracion;
        }
        rocket2.style.bottom = y2 + "px";
    }
    if (y1 >= meta) {
        index = numberRocket("y1");
        winner(index);
    }
    else if (y2 >= meta) {
        index = numberRocket("y2");
        winner(index);
    }
}
function winner(index) {
    clearMessage();
    showRocket.style.color = "yellow";
    clearTimeout(startGameInterval);
    audioRocket.volume = 0;
    showRocket.insertAdjacentText("afterbegin", "The winner \"Rocket " + rocketArray[index].codi + "\" \u00A1Congratulations!");
    var buttons = document.querySelectorAll("button");
    desactivateOptions(buttons);
}
function calculateSizes() {
    altoNavegador = window.innerHeight;
    anchoNavegador = window.innerWidth;
    altoRocket1 = rocket1.offsetHeight;
    anchoRocket1 = rocket1.offsetWidth;
    anchoRocket2 = rocket2.offsetWidth;
    meta = altoNavegador - altoRocket1 - 15;
}
function desactivateOptions(buttons) {
    buttons.forEach(function (element) {
        if (element.id === "acelerateRocket1")
            element.disabled = true;
        if (element.id === "acelerateRocket2")
            element.disabled = true;
        if (element.id === "breakRocket1")
            element.disabled = true;
        if (element.id === "breakRocket2")
            element.disabled = true;
    });
}
function activateOptions(buttons) {
    buttons.forEach(function (element) {
        if (element.id === "acelerateRocket1")
            element.disabled = false;
        if (element.id === "acelerateRocket2")
            element.disabled = false;
        if (element.id === "breakRocket1")
            element.disabled = false;
        if (element.id === "breakRocket2")
            element.disabled = false;
    });
}
