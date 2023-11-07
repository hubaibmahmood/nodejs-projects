import { log } from 'console';
import inquirer from 'inquirer';


let total_amount:number = 5000;

let user_ids: string[] = ["john12", "alex23"]
let user_password: string[] = ["hello231", "haw34"]
let access_granted: boolean = false
let account_logged_in: number = -1;


let user_id = await inquirer.prompt([
    {
        name: "id",
        type: "input",
        message: "Enter your id:"
    },
    {
        name: "password",
        type: "input",
        message: "Enter your password:"
    }
])

// console.log(user_id.id)

for (let i=0; i< user_ids.length; i++){

    if (user_ids[i] === user_id.id){
        // console.log("ID found!!")
        if (user_password[i] === user_id.password){
            // console.log("Password Found!!")
            console.log(`\nID ${user_ids[i]} is logged in !!!\n`)
            access_granted = true
            account_logged_in = i
        }
        else{
            console.log("\nWrong pin entered!!\n")
        }
        break
    }

}

if (access_granted){
    // console.log("Showing more options.....")

    do {
        var options = await inquirer.prompt([
            {
                name:"operation",
                type: "list",
                message: "Choose one operation",
                choices:[
                    "Withdraw Money",
                    "Check Balance",
                    "Deposit Money",
                    "Change pin",
                    "Exit"
                ]
            }
        ])

        if (options.operation === "Withdraw Money"){
            // console.log("How much you want to withdraw?: ");

            let withdraw_amount = await inquirer.prompt([
                {
                    name:"amount",
                    type:"number",
                    message: "How much you want to withdraw?: "
                }
            ])
            
            total_amount -= withdraw_amount.amount

            console.log(`\nYour remaining balance: ${total_amount}`+ "\n")

            
        }

        else if(options.operation === "Check Balance"){
            console.log(`\nYour remaining balance: ${total_amount}`+ "\n")

        }

        else if (options.operation === "Deposit Money"){
            
            let deposit_amount = await inquirer.prompt([
                {
                    name:"amount",
                    type:"number",
                    message: "How much you want to deposit?: "
                }
            ])

            total_amount += deposit_amount.amount
            console.log(`\nYour remaining balance: ${total_amount}`+ "\n")

        }

        else if (options.operation === "Change pin"){

            let old_pin = await inquirer.prompt([
                {
                    name:"pin",
                    type:"string",
                    message: "Enter your old pin:"
                }
            ])

            if (user_password[account_logged_in] === old_pin.pin) {
                
                let new_pin = await inquirer.prompt([
                    {
                        name:"pin",
                        type:"string",
                        message: "Enter new pin:"
                    }
                ])

                user_password[account_logged_in] = new_pin.pin
                console.log(`\n Your pin changed to ${user_password}\n`)
            }
            else{
                console.log("\nWrong pin entered!!!\n")
            }

        }
    
    } while(options.operation != "Exit")

}
else{
    console.log("Access denied");
    
    
}


