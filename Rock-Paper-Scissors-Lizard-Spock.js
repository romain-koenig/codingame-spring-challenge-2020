/**
 * Signs defines which sign is stronger than another in order to determine who wins a match
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
}

const match = (player1, player2) => {

    // Same sign : the lowest number wins
    if (player1.sign == player2.sign) {
        if (player1.number < player2.number) {
            return player1;
        }
        return player2;
    }

    // Different sign, check which one is the strongest

    if (Signs.betterSign(player1.sign, player2.sign) === player1.sign) {
        return player1;
    }
    return player2;
}

class Player {
    number = 0;
    sign = "";
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
}

//Starting a ROUND
while (players.length > 1) {
    players.map(p => p.win = false);
    for (let i = 0 ; i < players.length / 2 ; i++) {
        players[2*i].addAdversary(players[2*i + 1]);
        players[2*i+1].addAdversary(players[2*i]);
        
        match(players[2*i], players[2*i + 1]).win = true;
    }
    players = players.filter(p => p.win === true);
}

// Write an answer using console.log()
// To debug: console.error('Debug messages...');

console.log(players[0].number);
console.log(players[0].printAdversariesNum());

