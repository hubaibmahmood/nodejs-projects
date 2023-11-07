import inquirer from "inquirer";
import chalk from "chalk";
import gradient from 'gradient-string';
import figlet from 'figlet';
class Student {
    constructor(name, id, tutionFee, balance) {
        this.name = name;
        this.id = id;
        this.tutionFee = tutionFee;
        this.balance = balance;
        this.courses = [];
        this.isTutionFeePaid = false;
    }
    enroll(courses) {
        // console.log(courses)
        this.courses = this.courses.concat(courses);
        // console.log(this.courses)
    }
    showBalance() {
        console.log(chalk.green(`\nBalance: ${this.balance}`));
    }
    showStatus() {
        console.log(chalk.green(`\nName: ${this.name}\nID: ${this.id}\nCourses Enrolled: ${this.courses.length > 0 ? this.courses : "NO courses enrolled"}\nBalance: ${this.balance}\nTuition Fee to be Paid: ${this.tutionFee}\nTuition Fee Status: ${this.isTutionFeePaid ? "Paid" : "Not Paid"}`));
    }
    payTuition() {
        if (this.balance >= this.tutionFee) {
            this.balance = this.balance - this.tutionFee;
            this.isTutionFeePaid = true;
            console.log(chalk.green("\nStudent Tuition Fee paid successfully..."));
        }
        else {
            console.log(chalk.red("\nNot Enough Balance to pay tuition fee."));
        }
    }
}
function generateUniqueID() {
    const min = 10000; // Minimum 5-digit number
    const max = 99999; // Maximum 5-digit number
    const randomID = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomID;
}
let students = [];
const sleep = (ms = 1000) => new Promise((r) => setTimeout(r, ms));
function welcome() {
    // console.clear();
    figlet(`Student Management`, (err, data) => {
        console.log('\n\n' + gradient.pastel.multiline(data) + '\n');
    });
}
welcome();
await sleep(500);
do {
    var choice = await inquirer.prompt([
        {
            name: "opts",
            type: "list",
            message: "Choose which operation to peform:",
            choices: ["Add Student", "Enroll Courses", "Pay tution Fee", "Show Balance", "Show Status", "Exit"]
        }
    ]);
    if (choice.opts === "Add Student") {
        let std = await inquirer.prompt([
            {
                name: "name",
                type: "input",
                message: "Enter the name of the Student:"
            },
            {
                name: "tutionFee",
                type: "number",
                message: "Enter the tution Fee of the Student:"
            },
            {
                name: "balance",
                type: "number",
                message: "Enter the Balance of the Student:"
            }
        ]);
        let student = new Student(std.name, generateUniqueID(), std.tutionFee, std.balance);
        console.log(chalk.green("\nStudent Added successfully...."));
        students.push(student);
        // console.log(student)
    }
    else if (choice.opts !== "Exit") {
        let searchMethod = await inquirer.prompt([
            {
                name: "search",
                type: "list",
                message: "Choose to add by name or ID:",
                choices: ["Name", "ID"]
            }
        ]);
        if (searchMethod.search === "Name") {
            let isStudentFound = false;
            let std = await inquirer.prompt([
                {
                    name: "name",
                    type: "input",
                    message: "Enter the name of the Student:"
                },
            ]);
            for (let i = 0; i < students.length; i++) {
                if (students[i].name.toLowerCase() === std.name.toLowerCase()) {
                    if (choice.opts === "Enroll Courses") {
                        let courses = await inquirer.prompt([
                            {
                                name: "courses",
                                type: "input",
                                message: "Enter the courses seperated by ',':"
                            }
                        ]);
                        students[i].enroll(courses.courses.split(","));
                        isStudentFound = true;
                        console.log(chalk.green("\nCouses Enrolled successfully...."));
                        break;
                    }
                    else if (choice.opts === "Show Status") {
                        students[i].showStatus();
                        isStudentFound = true;
                        break;
                    }
                    else if (choice.opts === "Show Balance") {
                        students[i].showBalance();
                        isStudentFound = true;
                        break;
                    }
                    else if (choice.opts === "Pay tution Fee") {
                        students[i].payTuition();
                        isStudentFound = true;
                        break;
                    }
                }
            }
            if (!isStudentFound) {
                console.log(chalk.red("\nStudent not Found!!!\n"));
            }
        }
    }
    console.log("\n");
} while (choice.opts !== "Exit");
