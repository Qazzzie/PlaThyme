const Game = require("./Game");
/**
 * This is a backend implementation for `Slapjack` game. It contains all the Game logic.
 * This class uses the `Game.js` class to implement certain game features.
 */
class Slapjack extends Game {
    constructor(){

    }

    recieveData(data) {
        if(data.event === "SLAP!") {
            super.sendGameData(data);
        }
    }

}