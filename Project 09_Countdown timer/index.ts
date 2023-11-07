import inquirer from "inquirer";
import gradient from 'gradient-string';
import figlet from 'figlet';





const sleep = (ms=1000) => new Promise((r) => setTimeout(r, ms))



function welcome(){
    // console.clear();
  figlet(`Countdown Timer`, (err, data) => {
    console.log('\n\n'+gradient.pastel.multiline(data) + '\n');

    })

}



function timer(secs: number){

    let adjustedSeconds = new Date().setSeconds(new Date().getSeconds() + secs)
    let customDate = new Date(adjustedSeconds)
    
    
    
    let id = setInterval(() => {
    
        let timer = new Date().setSeconds(customDate.getSeconds() - new Date().getSeconds())
        let time = new Date(timer)
    
        
        if (time.getSeconds() === 0){
            console.log("Timer Stopped!!!")
            clearInterval(id)
        }
        else{
            
            process.stdout.write("00:"+time.getSeconds().toString().padStart(2, "0")+"\r");
        }
        
    
    }, 1000)

}


welcome()
await sleep(500)


let seconds = await inquirer.prompt([
    {
        name: "seconds",
        type: "number",
        message: "Enter the seconds for countdown:",
        validate: (input) => {
            if (isNaN(input)){
                return "Please enter a valid number"
            }else if (input > 60){
                return "Seconds must be less than or equal to 60"
            }
            else{
                return true
            }
        }
    }
])


console.log("\n")
timer(seconds.seconds)

