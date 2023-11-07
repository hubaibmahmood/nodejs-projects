import figlet from "figlet";
import gradient from "gradient-string";




const sleep = (ms = 1000) => new Promise((r) => setTimeout(r, ms));


function welcome(){
    // console.clear();
  figlet(`MY BANK`, (err, data) => {
    console.log('\n\n'+gradient.pastel.multiline(data) + '\n');

    })

}



interface bankaccount{

    debit(d:number): string;
    credit(d: number): string;
}


class BankAccount implements bankaccount{

    acountBalance: number;

    constructor(){
        this.acountBalance = 100;
    }

    debit(amount: number): string {
        let statement: string = "Sorry, you have insufficient balance!"

        if (amount > 0 ){
            statement = "The amount you entered is wrong!"

            if (this.acountBalance > amount){
                this.acountBalance -= amount

                statement = "Transaction successfull! New account balance is "+this.acountBalance
            }
            else{
                statement = "You don't have enough money to do this transaction"
            }
        }

        return statement

    }

    credit(amount: number): string {
       
        let statement: string = "Transaction Failed!"

        if (amount > 0){
            this.acountBalance += amount;

            if (amount > 100){
                this.acountBalance -= 1
            }

            statement = "Your account has been credited successfully!";
        }

        return statement
    }
}


class Customer{
    
    firstName: string;
    lastName: string;
    gender: string;
    age: number;
    mobileNumber: number;

    bankAccount: BankAccount; 

    constructor(){
        this.firstName = "";
        this.lastName = "";
        this.gender = "";
        this.age = 0;
        this.mobileNumber = 0;
        this.bankAccount = new BankAccount()
    }
}









welcome()
await sleep(500)
