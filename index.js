import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";
function add(x, y) {
    return x + y;
}
function subtract(x, y) {
    return x - y;
}
function multiply(x, y) {
    return x * y;
}
function divide(x, y) {
    return x / y;
}
const sleep = (ms) => {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
};
async function calc() {
    let rainbowStyle = chalkAnimation.rainbow("_______________________Welcome to the Calculator App_______________________");
    await sleep(2000);
    rainbowStyle.stop();
    while (true) {
        const answers = await inquirer.prompt([
            {
                type: 'number',
                name: 'num1',
                message: chalk.blue('Enter the first number:'),
            },
            {
                type: 'number',
                name: 'num2',
                message: chalk.blue('Enter the second number:'),
            },
            {
                type: 'list',
                name: 'operation',
                message: chalk.grey('Select an operation:'),
                choices: ['Add', 'Subtract', 'Multiply', 'Divide'],
            },
        ]);
        let result;
        const { num1, num2, operation } = answers;
        switch (operation) {
            case 'Add':
                result = add(num1, num2);
                break;
            case 'Subtract':
                result = subtract(num1, num2);
                break;
            case 'Multiply':
                result = multiply(num1, num2);
                break;
            case 'Divide':
                result = divide(num1, num2);
                break;
            default:
                result = chalk.redBright('Invalid operation');
        }
        console.log(chalk.italic.magenta(`Result: ${result} \n`));
        const other = await inquirer.prompt([
            {
                type: 'confirm',
                name: 'continue',
                message: chalk.yellow('Do you want to perform another calculation?'),
                default: false,
            }
        ]);
        if (!other.continue) {
            console.log(chalk.greenBright('Thank you for using the calculator! \n'));
            break;
        }
    }
}
calc();
