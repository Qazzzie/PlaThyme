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
        // this.deck = [];
    }

    /**
     * Logic for recieving data from clients.
     */
    recieveData(data) {
        if(data.event === "SLAP!") {
            super.sendGameData(data);
        }

    }

    startGame(){
        super.sendGameData({ event: "start-game" });
        this.gameStarted = true;
        //Ask for player 1 to place their first card.
        if(this.turnOrder.length === this.minPlayers){
            // let card = this.turnOrder[0].deck[0].shift();
            const theirTurn = { event: "your-turn"}; // , card };
            super.sendDataToPlayer(this.turnOrder[0], theirTurn);
        }
        if (this.gameStarted === true && this.turnOrder.length > this.minPlayers) {
            super.sendGameData({
              event: "play-card",
            //   card: card
            });
        } 
    }

    /**
   * When a new player joins the room, add that player name to the players list.
   * @param {String} playerName - name of the player
   */
    newPlayer(playerName) {
    super.newPlayer(playerName);
    if (playerName) {
      this.turnOrder.push(playerName);
    }
  }

  /**
   * remove disconnected players from turnOrder and continue to next player turn.
   * @param {String} playerName - name of the player.
   */
   disconnection(playerName) {
    if (playerName === this.turnOrder[0]) {
      this.turnStarted = false;
      if (this.turnOrder.length === 1) {
        this.turnOrder = this.turnOrder.filter(
          (player) => player !== playerName
        );
        return;
      }
      this.advanceTurnOrder();
    }
    this.turnOrder = this.turnOrder.filter((player) => player !== playerName);
    
    // if game started and player count drops below min players.
    if(this.gameStarted === true && this.turnOrder.length < this.minPlayers){
       super.sendChat({
        sender: "*Warning*",
        text: "Players count less than minimum number of players.",
      });
    }

    super.sendGameData({ event: "new-turn" });

    //notify player its their turn to place a card
    let card = 2;// this.turnOrder[0].deck[0].shift();
    const theirTurn = { event: "your-turn", card };
    super.sendDataToPlayer(this.turnOrder[0], theirTurn);
  }

    /**
   * rotate the most recent person's turn to the end of turnOrder. 
   * shift: REMOVE from FRONT and returns removed item. unshift: APPEND to FRONT and returns new array length. 
   * push: APPEND to END. pop: REMOVE from END returns removed item. 
   */
     advanceTurnOrder() {
        const lastPlayer = this.turnOrder.shift();
        this.turnOrder.push(lastPlayer);
      }

  /**
   * change turnOrder, message chat.
   */
   handleEndOfTurn() {
    this.turnStarted = false;
    this.advanceTurnOrder();
    super.sendGameData({ event: "new-turn" });
    let card = 1; // this.turnOrder[0].deck[0].shift();
    const theirTurn = { event: "your-turn", card };
    super.sendDataToPlayer(this.turnOrder[0], theirTurn);
  }      
}