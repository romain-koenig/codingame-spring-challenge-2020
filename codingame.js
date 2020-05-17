class Coordinates {
    x = 0;
    y = 0;

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    toString() {
        return `[${this.x} - ${this.y}]`
    }
}


const Action = {
    MOVE: "move",
    SWITCH: "switch",
    SPEED: "speed"
}


const PacType = {
    ROCK: "rock",
    PAPER: "paper",
    SCISSORS: "scissors"
}

class PacMan {
    #position = null;
    #destination = null;
    id = 0;
    #action = Action.MOVE;
    #type;

    constructor(id, position, destination) {
        this.id = id;
        this.#position = position;
        this.#destination = destination;
    }

    setPosition(position) {
        this.#position = position;
    }
    getPosition() {
        return this.#position;
    }
    setDestination(position) {
        this.#destination = position;
    }
    getDestination() {
        return this.#destination;
    }
    getDestinationX() {
        return this.#destination.x;
    }
    getDestinationY() {
        return this.#destination.y;
    }

    setAction(action) {
        this.#action = action;
    }
    getAction() {
        return this.#action;
    }
    setType(type) {
        this.#type = type;
    }
    getType() {
        return this.#type;
    }

    toString() {
        return `PacId : ${this.id} - Position : ${this.#position} - Destination : ${this.#destination}`;
    }
}

class Pellet {
    #position = null;
    type = null;

    constructor(position, type) {
        this.#position = position;
        this.type = type;
    }
    getPosition() {
        return this.#position;
    }
    getType() {
        return this.type;
    }
    toString() {
        return `Pellet Position : ${this.#position} - Type : ${this.type}`;
    }
}



function computeDistance(positionA, positionB) {
    if (verbose) {
        console.error(`computeDistance(positionA, positionB)`);
        console.error(`Position A : ${positionA}`);
        console.error(`Position B : ${positionB}`);
    }
    const diffX = Math.abs(positionA.x - positionB.x);
    if (verbose) {
        console.error(`diffX : ${diffX}`);
    }
    const diffY = Math.abs(positionA.y - positionB.y);
    if (verbose) {
        console.error(`diffY : ${diffY}`);
    }
    const result = diffX + diffY;
    if (verbose) {
        console.error(result)
    }
    return result;
}

const PelletType = {
    BIG: "big",
    STD: "std"
}


const verbose = false;

/**
 * Grab the pellets as fast as you can!
 **/

var inputs = readline().split(' ');
const width = parseInt(inputs[0]); // size of the grid
const height = parseInt(inputs[1]); // top left corner is (x=0, y=0)

//  ██████╗ ██████╗ ██╗██████╗     ███╗   ███╗ ██████╗ ███╗   ███╗████████╗
// ██╔════╝ ██╔══██╗██║██╔══██╗    ████╗ ████║██╔════╝ ████╗ ████║╚══██╔══╝
// ██║  ███╗██████╔╝██║██║  ██║    ██╔████╔██║██║  ███╗██╔████╔██║   ██║   
// ██║   ██║██╔══██╗██║██║  ██║    ██║╚██╔╝██║██║   ██║██║╚██╔╝██║   ██║   
// ╚██████╔╝██║  ██║██║██████╔╝    ██║ ╚═╝ ██║╚██████╔╝██║ ╚═╝ ██║   ██║   
//  ╚═════╝ ╚═╝  ╚═╝╚═╝╚═════╝     ╚═╝     ╚═╝ ╚═════╝ ╚═╝     ╚═╝   ╚═╝   

grid = [];
for (let i = 0; i < height; i++) {
    const row = readline(); // one line of the grid: space " " is floor, pound "#" is wall
    grid.push(row);
}

if (verbose) {
    console.error(`GRID : `);
    grid.map(line => console.error(line));
}


//  ██████╗  █████╗ ███╗   ███╗███████╗    ██╗      ██████╗  ██████╗ ██████╗ 
// ██╔════╝ ██╔══██╗████╗ ████║██╔════╝    ██║     ██╔═══██╗██╔═══██╗██╔══██╗
// ██║  ███╗███████║██╔████╔██║█████╗      ██║     ██║   ██║██║   ██║██████╔╝
// ██║   ██║██╔══██║██║╚██╔╝██║██╔══╝      ██║     ██║   ██║██║   ██║██╔═══╝ 
// ╚██████╔╝██║  ██║██║ ╚═╝ ██║███████╗    ███████╗╚██████╔╝╚██████╔╝██║     
//  ╚═════╝ ╚═╝  ╚═╝╚═╝     ╚═╝╚══════╝    ╚══════╝ ╚═════╝  ╚═════╝ ╚═╝     


let firstPass = true;

let pacs = []

// game loop
while (true) {
    var inputs = readline().split(' ');
    const myScore = parseInt(inputs[0]);
    const opponentScore = parseInt(inputs[1]);
    const visiblePacCount = parseInt(readline()); // all your pacs and enemy pacs in sight



    // ██████╗  █████╗  ██████╗███╗   ███╗ █████╗ ███╗   ██╗
    // ██╔══██╗██╔══██╗██╔════╝████╗ ████║██╔══██╗████╗  ██║
    // ██████╔╝███████║██║     ██╔████╔██║███████║██╔██╗ ██║
    // ██╔═══╝ ██╔══██║██║     ██║╚██╔╝██║██╔══██║██║╚██╗██║
    // ██║     ██║  ██║╚██████╗██║ ╚═╝ ██║██║  ██║██║ ╚████║
    // ╚═╝     ╚═╝  ╚═╝ ╚═════╝╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝


    for (let i = 0; i < visiblePacCount; i++) {


        var inputs = readline().split(' ');
        const pacId = parseInt(inputs[0]); // pac number (unique within a team)
        const mine = inputs[1] !== '0'; // true if this pac is yours
        const x = parseInt(inputs[2]); // position in the grid
        const y = parseInt(inputs[3]); // position in the grid
        const typeId = inputs[4]; // unused in wood leagues
        const speedTurnsLeft = parseInt(inputs[5]); // unused in wood leagues
        const abilityCooldown = parseInt(inputs[6]); // unused in wood leagues

        let adversaries = [];

        if (mine) {
            if (firstPass) {
                pacPosition = new Coordinates(x, y);
                pacTarget = new Coordinates(0, 0);
                const newPac = new PacMan(pacId, pacPosition, pacTarget);
                pacs.push(newPac);
                if (verbose) {
                    console.error(`In loop ; i = ${i}`);
                    console.error(`Last Pac in list : ${pacs[pacs.length - 1]}`);
                }
            }
            else {
                if (verbose) {
                    console.error(`I'm updating positions`)
                }
                pacs.filter(pac => pac.id === pacId).map(pac => pac.setPosition(new Coordinates(x, y)));
            }
        }
        else { // managing other player's pacs
            adversaries.filter(pac => pac.id === pacId).length > 0 ?
                adversaries.filter(pac => pac.id === pacId).map(pac => pac.setPosition(new Coordinates(x, y))).map(pac => pac.setType(typeId))
                : adversaries.push(new PacMan(pacId, new Coordinates(x, y), null, typeId));

            console.error(`ADVERSARIES : ${adversaries.map(pac => pac)}`)
        }
    }

    if (verbose) {
        console.error(`List of PAC`);
        for (i = 0; i < pacs.length; i++) {
            console.error(`PAC : ${pacs[i]}`);
        }
    }

    firstPass = false;



    // ██████╗ ███████╗██╗     ██╗     ███████╗████████╗    ███╗   ███╗ ██████╗ ███╗   ███╗████████╗
    // ██╔══██╗██╔════╝██║     ██║     ██╔════╝╚══██╔══╝    ████╗ ████║██╔════╝ ████╗ ████║╚══██╔══╝
    // ██████╔╝█████╗  ██║     ██║     █████╗     ██║       ██╔████╔██║██║  ███╗██╔████╔██║   ██║   
    // ██╔═══╝ ██╔══╝  ██║     ██║     ██╔══╝     ██║       ██║╚██╔╝██║██║   ██║██║╚██╔╝██║   ██║   
    // ██║     ███████╗███████╗███████╗███████╗   ██║       ██║ ╚═╝ ██║╚██████╔╝██║ ╚═╝ ██║   ██║   
    // ╚═╝     ╚══════╝╚══════╝╚══════╝╚══════╝   ╚═╝       ╚═╝     ╚═╝ ╚═════╝ ╚═╝     ╚═╝   ╚═╝   

    let pellets = []
    let bigPellets = []

    const visiblePelletCount = parseInt(readline()); // all pellets in sight
    for (let i = 0; i < visiblePelletCount; i++) {
        var inputs = readline().split(' ');
        const x = parseInt(inputs[0]);
        const y = parseInt(inputs[1]);
        const pelletPoints = parseInt(inputs[2]); // amount of points this pellet is worth

        if (pelletPoints > 1) {
            const newPellet = new Pellet(new Coordinates(x, y), PelletType.BIG);
            bigPellets.push(newPellet);

            if (verbose) {
                console.error(`BigPellets : ${bigPellets.length} elements - Last one : ${bigPellets[bigPellets.length - 1]}`);
            }
        }
        else {
            // console.error(`Adding a classic pellet`)
            pellets.push(new Pellet(new Coordinates(x, y), PelletType.STD));
        }
    }
    if (verbose) {
        console.error(`Number of Big pellets : ${bigPellets.length}`)
    }

    // bigPellets.map(bp => console.error(`BigPellet : ${Object.keys(bp)}`))
    // bigPellets.map(bp => console.error(`BigPellet : ${Object.values(bp)}`))


    // ██╗    ██╗██╗  ██╗███████╗██████╗ ███████╗    ████████╗ ██████╗      ██████╗  ██████╗ 
    // ██║    ██║██║  ██║██╔════╝██╔══██╗██╔════╝    ╚══██╔══╝██╔═══██╗    ██╔════╝ ██╔═══██╗
    // ██║ █╗ ██║███████║█████╗  ██████╔╝█████╗         ██║   ██║   ██║    ██║  ███╗██║   ██║
    // ██║███╗██║██╔══██║██╔══╝  ██╔══██╗██╔══╝         ██║   ██║   ██║    ██║   ██║██║   ██║
    // ╚███╔███╔╝██║  ██║███████╗██║  ██║███████╗       ██║   ╚██████╔╝    ╚██████╔╝╚██████╔╝
    //  ╚══╝╚══╝ ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚══════╝       ╚═╝    ╚═════╝      ╚═════╝  ╚═════╝ 




    // For each Pacman : get which pellet is the closest and set the target accordingly

    // note : note optimal as another pacman might be closer

    let bigPelletsTarget = [];


    for (i = 0; i < pacs.length; i++) {
        if (bigPellets.length > 0) { // Default action : try to grab the big pellets
            let distance = 10000;
            let betterPelletIndex = 0;

            for (j = 0; j < bigPellets.length; j++) {

                let currentDistance = computeDistance(pacs[i].getPosition(), bigPellets[j].getPosition());
                console.error(`distance between PAC ${pacs[i].id} and pellet ${bigPellets[j]} : ${currentDistance}`)

                if (currentDistance < distance) {
                    distance = currentDistance;
                    betterPelletIndex = j;
                }
            }

            pacs[i].setDestination(bigPellets[betterPelletIndex].getPosition());

            if (verbose) {
                console.error(``);
                console.error(`PAC : ${pacs[i]}`);
                console.error(`Smallest distance = ${distance}`);
                console.error(`Better target = ${bigPellets[betterPelletIndex]}`);
                console.error(`Better target position = ${bigPellets[betterPelletIndex].getPosition()}`);
                console.error(``);
            }
            bigPelletsTarget.push(bigPellets.splice(betterPelletIndex, 1));
            if (verbose) {
                console.error(`BigPellets : ${bigPellets}`);
                console.error(`BigPelletsTarget : ${bigPelletsTarget}`);
                console.error(``);
            }


        }

        // When every big pellet has been eaten
        else if (pellets.length > i) {

            switch (i) {
                case 0:
                    pacs[i].setDestination(pellets[i].getPosition());
                    break;
                case 1:
                    pacs[i].setDestination(pellets[pellets.length - 1].getPosition());
                    break;
                case 2:
                    pacs[i].setDestination(pellets[Math.floor(pellets.length / 2)].getPosition());
                    break;
                case 3:
                    pacs[i].setDestination(pellets[Math.floor(pellets.length / 4)].getPosition());
                    break;
                case 4:
                    pacs[i].setDestination(pellets[Math.floor(pellets.length * 3 / 4)].getPosition());

            }
        }
        else {
            // Means no more pellets - Should not happen
            console.error("THIS SHOULD NOT HAPPEN");
            pacs[i].setDestination(new Coordinates(0, 0));
        }
    }


    // ██████╗ ███████╗███████╗██╗   ██╗██╗  ████████╗
    // ██╔══██╗██╔════╝██╔════╝██║   ██║██║  ╚══██╔══╝
    // ██████╔╝█████╗  ███████╗██║   ██║██║     ██║   
    // ██╔══██╗██╔══╝  ╚════██║██║   ██║██║     ██║   
    // ██║  ██║███████╗███████║╚██████╔╝███████╗██║   
    // ╚═╝  ╚═╝╚══════╝╚══════╝ ╚═════╝ ╚══════╝╚═╝   


    // Write an action using console.log()
    // To debug: console.error('Debug messages...');


    const outputMessage = pacs.map(pac => {
        return `${pac.getAction()} ${pac.id} ${pac.getDestinationX()} ${pac.getDestinationY()}`;
    }).join(" | ");

    // console.log('MOVE 0 15 10');     // MOVE <pacId> <x> <y>
    console.log(outputMessage);     // MOVE <pacId> <x> <y>


}