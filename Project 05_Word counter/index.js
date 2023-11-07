import inquirer from "inquirer";
import gradient from 'gradient-string';
import figlet from 'figlet';
import chalk from 'chalk';
import { createSpinner } from 'nanospinner';
const sleep = (ms = 1000) => new Promise((r) => setTimeout(r, ms));
function welcome() {
    // console.clear();
    figlet(`Word Counter`, (err, data) => {
        console.log('\n\n' + gradient.pastel.multiline(data) + '\n');
    });
}
welcome();
await sleep(500);
let para = await inquirer.prompt([
    {
        name: "paragraph",
        type: "input",
        message: "Enter the string:"
    }
]);
// removing punctuation
let punctuation = /[\.,?!]/g;
let filteredText = para.paragraph.replace(punctuation, "");
let enteredpara = filteredText.split(" ");
let sum = 0;
let characters = enteredpara.map((value) => sum += value.length);
const spinner = createSpinner('Validating...').start();
await sleep(500);
spinner.success({ text: `Words Count: ${chalk.green(enteredpara.length)}` });
spinner.success({ text: `Character Count: ${chalk.green(characters[characters.length - 1])}` });
