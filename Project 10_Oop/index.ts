import inquirer from "inquirer";
import figlet from "figlet";
import gradient from "gradient-string";


const sleep = (ms = 1000) => new Promise((r) => setTimeout(r, ms));


function welcome(){
    // console.clear();
  figlet(`OOP`, (err, data) => {
    console.log('\n\n'+gradient.pastel.multiline(data) + '\n');

    })

}





class Person {
    
    private personality: string;


    constructor(){
        this.personality = "Mystery"
    }


    askQuestion(answer: number){

        if (answer === 1){
            this.personality = "Extrovert"
        }
        else if (answer === 2){
            this.personality = "Introvert"
        }
        else{
            this.personality = "still a Mystery.."
        }
    }

    getPersonality(): string{
        return this.personality;
    }
}



class Program{


    async main(){
        


        let input = await inquirer.prompt([
            {
                name:"opt",
                type: "number",
                message: "Type 1 if you like to talk to others and Type 2 if you rather keep to yourself?",
                validate: (input) => {

                    if (isNaN(input)){
                        return "Please enter 1 or 2"

                    }
                    else{
                        return true
                    }
                }
            },
            {
                name:"name",
                type: "input",
                message: "What is your name?",  
            }
        ])




        let person = new Person()

        person.askQuestion(input.opt)

        console.log(`\nYou are: ${person.getPersonality()}`)



        let student = new Student()
        student.name = input.name

        console.log(`\nYour name is: ${student.name} and your personality type is: ${student.getPersonality()}`)

    }

}


class Student extends Person{

    private _name: string;

    constructor(){
        super();
        this._name= "";

    }

    get name(): string | undefined {
        return this._name
    }


    set name(newName: string){
        this._name = newName
    }

}




welcome()
await sleep(500)


let program = new Program()

program.main()