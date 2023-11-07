import inquirer from "inquirer";
import chalk from "chalk";
import figlet from "figlet";
import gradient from "gradient-string";
const sleep = (ms = 1000) => new Promise((r) => setTimeout(r, ms));
function welcome() {
    // console.clear();
    figlet(`Adventure Game`, (err, data) => {
        console.log('\n\n' + gradient.pastel.multiline(data) + '\n');
    });
}
class Player {
    constructor(name) {
        this.hp = 100;
        this.name = name;
    }
    hpDecrease() {
        this.hp -= 25;
    }
    hpIncrease() {
        this.hp = 100;
    }
}
class Opponent {
    constructor(name) {
        this.hp = 100;
        this.name = name;
    }
    hpDecrease() {
        this.hp -= 25;
    }
}
welcome();
await sleep(1000);
let player = await inquirer.prompt([
    {
        name: "name",
        type: "input",
        message: "Enter your name:"
    }
]);
let opponent = await inquirer.prompt([
    {
        name: "select",
        type: "list",
        message: "Select your Opponen:",
        choices: ["Skeleton", "Assasin", "Zombie"]
    }
]);
let p1 = new Player(player.name);
let o1 = new Opponent(opponent.select);
console.log(`${chalk.bold.green(p1.name)} VS ${chalk.bold.red(o1.name)}`);
do {
    let choice = await inquirer.prompt([
        {
            name: "choice",
            type: "list",
            message: "Choose a move:",
            choices: ["Attack", "Drink Potion", "Run"]
        }
    ]);
    if (choice.choice === "Attack") {
        let num = Math.floor(Math.random() * 2);
        if (num > 0) {
            p1.hpDecrease();
            console.log(chalk.bold.red(`\n${p1.name} hp is ${p1.hp}`));
            console.log(chalk.bold.green(`${o1.name} hp is ${o1.hp}`));
            if (p1.hp <= 0) {
                console.log(chalk.bold.italic.red(`\n${p1.name} Looses the Game, Better Luck Next Time`));
                break;
            }
        }
        else if (num <= 0) {
            o1.hpDecrease();
            console.log(chalk.bold.red(`\n${o1.name} hp is ${o1.hp}`));
            console.log(chalk.bold.green(`${p1.name} hp is ${p1.hp}`));
            if (o1.hp <= 0) {
                console.log(chalk.bold.italic.green(`\nCongratulations, ${p1.name} wins the Game`));
                break;
            }
        }
    }
    else if (choice.choice === "Drink Potion") {
        p1.hpIncrease();
        console.log(chalk.bold.green.italic(`\n${p1.name} Drank Potion and now hp is ${p1.hp}`));
        //  console.log(chalk.bold.red(`${o1.name} hp is ${o1.hp}`))
    }
    else if (choice.choice === "Run") {
        console.log(chalk.red.bold.italic("You Loose, Better Luck Next Time"));
        break;
    }
    console.log("\n");
} while (true);
