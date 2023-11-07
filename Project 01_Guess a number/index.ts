import inquirer from 'inquirer';
import gradient from 'gradient-string';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';
import chalkAnimation from 'chalk-animation';



const sleep = (ms = 1000) => new Promise((r) => setTimeout(r, ms));

function welcome(){
  figlet(`Number Guessing Game`, (err, data) => {
    console.log('\n\n'+gradient.pastel.multiline(data) + '\n');

    })

}





welcome()
await sleep(1000)

let random_generated_number: number = Math.floor(Math.random() * 100)
let chances: number = 3





const rainbowTitle = chalkAnimation.rainbow(
    'You will be given 3 chances to guess the correct number (range: 1-100) \n');

await sleep(1500);
rainbowTitle.stop();


for (let i=0; i < chances; i++){


    let number = await inquirer.prompt([
        {
            name: "number",
            type: "number",
            message: "Guess the number:"

        }
    ])

    const spinner = createSpinner('Validating...').start();
    await sleep(1000);

    if (number.number === random_generated_number){
        spinner.success({text: "You guessed it right"})
        break
    }
    else{
        spinner.error({ text: `💀💀💀 You guessed it wrong!!\n`});

        
        if (i + 1 === chances){
            await sleep(1000)
            const rainbowTitle = chalkAnimation.radar(
                'Game Over, You failed to guess the right number !!!');
            
            await sleep(2700);
            rainbowTitle.stop();
        }

    }

}
