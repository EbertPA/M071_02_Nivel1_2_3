class Rocket{
    codi: string;
    boosters: Booster[] = new Array();
    potenciaActual: number = 0;
    constructor(codi:string) {
        this.codi= codi;
    }
    addBooster(booster: Booster):void {
        this.boosters.push(booster);
    }

    acelerar(acelera: number): void {
        this.potenciaActual = acelera;
    }

    frenar(desacelera: number): void {
        this.potenciaActual = desacelera;
    }
}