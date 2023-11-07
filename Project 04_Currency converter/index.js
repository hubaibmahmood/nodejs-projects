import inquirer from "inquirer";
import gradient from 'gradient-string';
import figlet from 'figlet';
import Currenzy from "currenzy";
import { createSpinner } from 'nanospinner';
import chalk from "chalk";
const sleep = (ms = 1000) => new Promise((r) => setTimeout(r, ms));
function welcome() {
    // console.clear();
    figlet(`Currency Converter`, (err, data) => {
        console.log('\n\n' + gradient.pastel.multiline(data) + '\n');
    });
}
async function takeInput() {
    let values = await inquirer.prompt([
        {
            name: "convertFrom",
            type: "input",
            message: "Enter the Currency you want to convert (USD, PKR, AED etc): "
        },
        {
            name: "convertTo",
            type: "input",
            message: "Enter the Currency you want to convert into (USD, PKR, AED etc): "
        },
        {
            name: "amount",
            type: "number",
            message: "Enter the amount to convert: "
        }
    ]);
    convertCurrency(values);
}
async function convertCurrency(values) {
    const spinner = createSpinner('Converting...').start();
    await sleep(500);
    const currenzy = new Currenzy((values.convertFrom).toUpperCase());
    try {
        const convertedAmount = await currenzy.convert(values.amount, (values.convertTo).toUpperCase());
        spinner.success({ text: chalk.green(`${values.amount} ${values.convertFrom} in ${values.convertTo} = ${convertedAmount.toFixed(3)}`) });
    }
    catch (error) {
        spinner.error({ text: `💀💀💀 ${error}` });
    }
    // console.log(convertedAmount.toFixed(3))
}
welcome();
await sleep(500);
await takeInput();
