/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/
class Signs {
    static betterSign(sign1, sign2) {

        // Rock crushes Lizard
        // Rock crushes Scissors

        // Paper covers Rock
        // Paper disproves Spock

        // Scissors cuts Paper
        // Scissors decapitates Lizard

        // Lizard poisons Spock
        // Lizard eats Paper

        // Spock smashes Scissors
        // Spock vaporizes Rock
        if (
            (sign1 === signDict['R'] && (sign2 === signDict['L'] || sign2 === signDict['C'])) ||
            (sign1 === signDict['P'] && (sign2 === signDict['R'] || sign2 === signDict['S'])) ||
            (sign1 === signDict['C'] && (sign2 === signDict['P'] || sign2 === signDict['L'])) ||
            (sign1 === signDict['L'] && (sign2 === signDict['S'] || sign2 === signDict['P'])) ||
            (sign1 === signDict['S'] && (sign2 === signDict['C'] || sign2 === signDict['R']))

        ) {
            return sign1
        }
        return sign2
    }
}

const signDict = {
    R: "ROCK",
    P: "PAPER",
    C: "SCISSORS",
    L: "LIZARD",
    S: "SPOCK",
    D: "DRAW",
}

const match = (player1, player2) => {

    // Same sign : the lowest number wins
    if (player1.sign == player2.sign) {
        console.error("SAME SIGN");
        if (player1.number < player2.number) {
            console.error(`Returning player #${player1.number} because smaller than #${player2.number}`)
            return player1;
        }
        console.error(`Default behaviour Returning player #${player2.number} because smaller than #${player1.number}`)
        return player2;
    }
    console.error("DIFFERENT SIGN");
    // Different sign, check which one is the strongest

    if (Signs.betterSign(player1.sign, player2.sign) === player1.sign) {
        return player1;
    }
    return player2;


}

class Player {
    number = 0;
    sign = "X";
    win = false;
    adversaries = new Array(0);
    constructor(num, sign) {
        this.number = num;
        this.sign = signDict[sign]
    }

    addAdversary = player => this.adversaries.push(player);

    toString() {
        return `Player #${this.number} // Sign : ${this.sign}`
    }

    printAdversariesNum () {
        
        return this.adversaries.map(player => player.number).join(" ");
    }
}


const N = parseInt(readline());
players = new Array(N);

for (let i = 0; i < N; i++) {
    var inputs = readline().split(' ');
    const NUMPLAYER = parseInt(inputs[0]);
    const SIGNPLAYER = inputs[1];
    
    const newPlayer = new Player(NUMPLAYER, SIGNPLAYER);

    players[i] = newPlayer;
    console.error(players[i].toString());

}

console.error(`Winner of match between player ${players[0].toString()} and ${players[1].toString()} : ${match(players[0], players[1])} `)

while (players.length > 1) {
    console.error("Starting a ROUND");
    players.map(p => p.win = false);
    console.error(players);
    for (let i = 0 ; i < players.length / 2 ; i++) {
        players[2*i].addAdversary(players[2*i + 1]);
        players[2*i+1].addAdversary(players[2*i]);
        
        match(players[2*i], players[2*i + 1]).win = true;
    }
    players = players.filter(p => p.win === true);
    console.error(players);
    console.error(`-------------------------------------------`);
}

// Write an answer using console.log()
// To debug: console.error('Debug messages...');

console.log(players[0].number);
console.log(players[0].printAdversariesNum());

