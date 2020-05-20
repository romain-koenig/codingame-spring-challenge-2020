/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/
class Signs {
    static ROCK = "R";
    static PAPER = "P";
    static SCISSORS = "C";
    static LIZARD = "L";
    static SPOCK = "S";
}

const match = (player1, player2) => {

    // Same sign : the lowest number wins
    if (player1.sign === player2.sign){
        if (player1.num < player2.num) {
            return player1;
        }
        return player2
    }



}

class Player {
    number = 0;
    sign = "X";
    constructor(num, sign) {
        this.number = num;

        switch (sign) {
            case "R":
                this.sign = Signs.ROCK;
                break;
            case "P":
                this.sign = Signs.PAPER;
                break;
            case "C":
                this.sign = Signs.SCISSORS;
                break;
            case "L":
                this.sign = Signs.LIZARD;
                break;
            case "S":
                this.sign = Signs.SPOCK;
                break;
            default:
                this.sign = "ERROR";
        }
    }

    toString() {
        return `Player #${this.number} // Sign : ${this.sign}`
    }
}
const N = parseInt(readline());
players = new Array(N);

for (let i = 0; i < N; i++) {
    var inputs = readline().split(' ');
    const NUMPLAYER = parseInt(inputs[0]);
    const SIGNPLAYER = inputs[1];
    console.error(`INPUTS : NUMPLAYER : ${NUMPLAYER} - SIGNPLAYER: ${SIGNPLAYER}`)
    const newPlayer = new Player(NUMPLAYER, SIGNPLAYER);
    console.error(newPlayer);
    players.push(newPlayer);
    console.error(players[players.length - 1].toString());
}


// Write an answer using console.log()
// To debug: console.error('Debug messages...');

console.log('WHO IS THE WINNER?');

