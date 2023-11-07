import fs from "fs";
// Accessing arguments from the commandline
const args = process.argv;
// console.log(args)
// filtering the directory path from the arguments
const current_working_directory = args[1].slice(0, -8);
// console.log(current_working_directory);
// Checking if the given file exists (todo.txt)
if (fs.existsSync(current_working_directory + "todo.txt") === false) {
    // Creating the file
    let create_file = fs.createWriteStream('todo.txt');
    create_file.end();
}
if (fs.existsSync(current_working_directory + "done.txt") === false) {
    // Creating the file
    let create_file = fs.createWriteStream('done.txt');
    create_file.end();
}
const InfoFunction = () => {
    const UsageText = ` 
  Usage :- 
  $ node index.js add "todo item"  # Add a new todo 
  $ node index.js ls               # Show remaining todos 
  $ node index.js del NUMBER       # Delete a todo 
  $ node index.js done NUMBER      # Complete a todo 
  $ node index.js help             # Show usage 
  $ node index.js report           # Statistics`;
    console.log(UsageText);
};
const listFunction = () => {
    let data = [];
    const fileData = fs.readFileSync(current_working_directory + "todo.txt").toString();
    data = fileData.split("\n");
    data = data.filter(function (value) {
        return value !== '';
    });
    if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
            console.log(i + 1 + ". " + data[i]);
        }
    }
    else {
        console.log("\nNo Pending Tasks!!!\n");
    }
};
const addFunction = () => {
    const newTask = args[3];
    if (newTask) {
        const fileData = fs.readFileSync(current_working_directory + "todo.txt").toString();
        if (fileData !== "\n" && fileData !== "") {
            fs.writeFile(current_working_directory + "todo.txt", fileData + "\n" + newTask, function (err) {
                // Handle if there is any error 
                if (err)
                    throw err;
                // Logs the new task added 
                console.log('Added todo: "' + newTask + '"');
            });
        }
        else {
            fs.writeFile(current_working_directory + "todo.txt", newTask, function (err) {
                // Handle if there is any error 
                if (err)
                    throw err;
                // Logs the new task added 
                console.log('Added todo: "' + newTask + '"');
            });
        }
    }
    else {
        console.log("Missing item to add");
    }
};
const deleteFunction = () => {
    const deletenum = Number(args[3]);
    const fileData = fs.readFileSync(current_working_directory + "todo.txt").toString();
    let data = fileData.split("\n");
    if (deletenum <= data.length) {
        let removed = data.splice(deletenum - 1, 1);
        fs.writeFile(current_working_directory + "todo.txt", data.join("\n"), function (err) {
            // Handle if there is any error 
            if (err)
                throw err;
            // Logs the new task added 
            console.log('\nDeleted todo: "' + removed + '"');
        });
    }
    else {
        console.log(`\n❌ Error: Todo # ${deletenum} doesn't exists\n`);
    }
};
const doneFunction = () => {
    const deletenum = Number(args[3]);
    if (deletenum) {
        const fileData = fs.readFileSync(current_working_directory + "todo.txt").toString();
        let data = fileData.split("\n");
        if (deletenum <= data.length) {
            let removed = data.splice(deletenum - 1, 1);
            fs.writeFile(current_working_directory + "todo.txt", data.join("\n"), function (err) {
                // Handle if there is any error 
                if (err)
                    throw err;
                // Logs the new task added 
                console.log('\nCompleted todo: "' + removed + '"');
            });
            let doneData = fs.readFileSync(current_working_directory + "done.txt").toString();
            if (doneData !== '' && doneData !== "\n") {
                fs.writeFileSync(current_working_directory + "done.txt", doneData + "\n" + removed.toString());
            }
            else {
                fs.writeFileSync(current_working_directory + "done.txt", removed.toString());
            }
        }
        else {
            console.log(`\n❌ Error: Todo # ${deletenum} doesn't exists\n`);
        }
    }
};
const reportFunction = () => {
    let todoData = fs.readFileSync(current_working_directory + "todo.txt").toString();
    let doneData = fs.readFileSync(current_working_directory + "done.txt").toString();
    let todo = todoData.split("\n");
    todo = todo.filter(function (value) {
        return value !== '';
    });
    let done = doneData.split("\n");
    done = done.filter(function (value) {
        return value !== '';
    });
    console.log(`\nCompleted Tasks: ${done.length}\nPending Tasks: ${todo.length}\n`);
};
switch (args[2]) {
    case 'ls': {
        listFunction();
        break;
    }
    case 'help': {
        InfoFunction();
        break;
    }
    case 'add': {
        addFunction();
        break;
    }
    case "del": {
        deleteFunction();
        break;
    }
    case "done": {
        doneFunction();
        break;
    }
    case "report": {
        reportFunction();
        break;
    }
    default: {
        InfoFunction();
        break;
    }
}
