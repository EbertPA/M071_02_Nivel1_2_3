"use strict";
var Rocket = /** @class */ (function () {
    function Rocket(codi) {
        this.boosters = new Array();
        this.potenciaActual = 0;
        this.codi = codi;
    }
    Rocket.prototype.addBooster = function (booster) {
        this.boosters.push(booster);
    };
    Rocket.prototype.acelerar = function (acelera) {
        this.potenciaActual = acelera;
    };
    Rocket.prototype.frenar = function (desacelera) {
        this.potenciaActual = desacelera;
    };
    return Rocket;
}());
