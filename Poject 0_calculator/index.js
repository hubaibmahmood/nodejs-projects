import inquirer from 'inquirer';
import gradient from 'gradient-string';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';
function welcome() {
    // console.clear();
    figlet(`Calculator`, (err, data) => {
        console.log('\n\n' + gradient.pastel.multiline(data) + '\n');
    });
}
const sleep = (ms = 1000) => new Promise((r) => setTimeout(r, ms));
async function calculate() {
    const choice = await inquirer.prompt([{
            name: "operations",
            type: "list",
            message: "Choice the operation you want to perform?\n",
            choices: [
                '+',
                "-",
                "/",
                "*"
            ]
        },
        {
            name: "num1",
            type: "number",
            message: "Enter num1: "
        },
        {
            name: "num2",
            type: "number",
            message: "Enter num2: "
        }
    ]);
    return perform(choice.operations, choice.num1, choice.num2);
}
async function perform(operator, num1, num2) {
    const spinner = createSpinner('Calculating...').start();
    await sleep();
    console.log("\n");
    if (operator == "+") {
        await add(num1, num2, spinner);
    }
    else if (operator == "-") {
        await subtract(num1, num2, spinner);
    }
    else if (operator == "/") {
        await divide(num1, num2, spinner);
    }
    else if (operator == "*") {
        await multiply(num1, num2, spinner);
    }
}
async function add(num1, num2, spinner) {
    spinner.success({ text: `${num1} + ${num2} = ${num1 + num2}` });
}
async function subtract(num1, num2, spinner) {
    spinner.success({ text: `${num1} - ${num2} = ${num1 - num2}` });
}
async function multiply(num1, num2, spinner) {
    spinner.success({ text: `${num1} * ${num2} = ${num1 * num2}` });
}
async function divide(num1, num2, spinner) {
    spinner.success({ text: `${num1} / ${num2} = ${num1 / num2}` });
}
welcome();
await sleep();
await calculate();
