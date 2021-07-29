const Game = require("./Game");
/**
 * This is a backend implementation for `Slapjack` game. It contains all the Game logic.
 * This class uses the `Game.js` class to implement certain game features.
 */
class Slapjack extends Game {
    constructor(roomCode, socket, io, players, minPlayers){
        super(roomCode, socket, io, players, minPlayers);
        this.turnOrder = [players];
        this.minPlayers = minPlayers;
        this.selectedWord = null;
        this.selectedWordLength = 0;
        this.turnStarted = false;
        this.gameStarted = false;
    }

    recieveData(data) {
        if(data.event === "SLAP!") {
            super.sendGameData(data);
        }

    }

    startGame(){
        super.sendGameData({ event: "start-game" });
        his.gameStarted = true;
        //Ask for player 1 to place their first card.
        if(this.turnOrder.length === this.minPlayers) 
    }


}