import { Lottery } from "../../../../models/enums";


// ==================================================================================================================
export class FortuneWheelConfig {

    public static readonly prizes = [
        {
            name: Lottery.HOSPITAL,
            // name: "szpital",
            from: 0,
            to: 70,
            msg: "W skrzyce wroga była podejrzana fiolka z jakimś płynem."
                + "<br>Skierowano cię do szpitala na 5 dni."
                + "<br>Odzyskujesz 10% życia."
        },
        {
            name: Lottery.GRANADE,
            // name: 'granat',
            from: 70,
            to: 88,
            msg: "GRANAT!!"
                + "<br>Tracisz 3% życia."
        },
        {
            name: Lottery.SHIELD,
            // name: 'helm',
            from: 88,
            to: 159,
            msg: "Znajdujesz saperski hełm wroga."
                + "<br>Zyskujesz 5% mocy swojej ochrony."
        },
        {
            name: Lottery.CASSINO,
            // name: 'kasyno',
            from: 159,
            to: 232,
            msg: "Odkryłeś mapę pola minowego. W nagrodę dostałeś urlop."
                + "<br>Niestety, postanowiłeś spędzić go w obozowym kasynie."
                + "<br>Przegrywasz 15% mocy swojego kombinezonu."
        },
        {
            name: Lottery.CANARIES,
            // name: 'kanary',
            from: 232,
            to: 360,
            msg: "Materiały znalezione w skrzynce wroga są tak cenne,"
                + "że otrzymujesz 2-tygodniowy urlop na Kanarach."
                + "Odzyskujesz 20% życia."
        },
    ];
}
