import inquirer from 'inquirer';
import gradient from 'gradient-string';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';
import chalk from "chalk";
let total_score = 0;
const sleep = (ms = 1000) => new Promise((r) => setTimeout(r, ms));
function welcome() {
    figlet(`Quiz Game`, (err, data) => {
        console.log('\n\n' + gradient.pastel.multiline(data) + '\n');
    });
}
function calculateScore(isCorrect) {
    if (isCorrect) {
        total_score += 1;
    }
}
async function generateQuiz() {
    let questions = await inquirer.prompt([
        {
            name: "q1",
            type: "list",
            message: "When was TypeScript first appeared?",
            choices: [
                "20 February 1991",
                "5 December 2019",
                "1 October 2012",
                "None of the above"
            ]
        },
        {
            name: "q2",
            type: "list",
            message: "What are the three main 'simple types' in TypeScript?",
            choices: [
                "Boolean, Number, String",
                "Object, String, Number",
                "Object, Array, Symbol",
                "None of the above"
            ]
        },
        {
            name: "q3",
            type: "list",
            message: "What type of assignment is this variable, `const fullName: string = 'John Jackson';`?",
            choices: [
                "Explicit",
                "Implicit",
                "Object, Array, Symbol",
                "None of the above"
            ]
        },
        {
            name: "q4",
            type: "list",
            message: "What is the inherited type for the variable example in `const example = ['Dylan']`?",
            choices: [
                "unknown[]",
                "any[]",
                "string[]",
                "string"
            ]
        }
    ]);
    if (questions.q1 === "1 October 2012") {
        calculateScore(true);
    }
    if (questions.q2 === "Boolean, Number, String") {
        calculateScore(true);
    }
    if (questions.q3 === "Explicit") {
        calculateScore(true);
    }
    if (questions.q4 === "string[]") {
        calculateScore(true);
    }
    console.log("\n");
    const spinner = createSpinner('Validating...').start();
    await sleep(600);
    spinner.success({ text: `You answered ${chalk.green(total_score)} out of ${chalk.green(4)} correctly!!` });
}
welcome();
await sleep(500);
await generateQuiz();
