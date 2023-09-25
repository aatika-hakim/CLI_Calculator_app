#! /usr/bin/env node
import inquirer from 'inquirer';
import chalk from 'chalk';
export function add(a, b) {
    return a + b;
}
export function subtract(a, b) {
    return a - b;
}
export function multiply(a, b) {
    return a * b;
}
export function divide(a, b) {
    if (b === 0) {
        throw new Error(chalk.redBright("Division by zero is not allowed."));
    }
    return a / b;
}
async function main() {
    console.log(chalk.cyanBright('Welcome to the Calculator!'));
    while (true) {
        const answers = await inquirer.prompt([
            {
                type: 'input',
                name: 'num1',
                message: chalk.yellowBright('Enter the first number:'),
                validate: (value) => !isNaN(parseFloat(value)) || chalk.red('Please enter a valid number'),
            },
            {
                type: 'input',
                name: 'num2',
                message: chalk.yellowBright('Enter the second number:'),
                validate: (value) => !isNaN(parseFloat(value)) || chalk.red('Please enter a valid number'),
            },
            {
                type: 'list',
                name: 'operation',
                message: chalk.yellow('Select an operation:'),
                choices: ['Add', 'Subtract', 'Multiply', 'Divide'],
            },
            {
                type: 'confirm',
                name: 'continue',
                message: (chalk.black('Do you want to perform another calculation?')),
                default: false,
            },
        ]);
        const num1 = parseFloat(answers.num1);
        const num2 = parseFloat(answers.num2);
        let result;
        switch (answers.operation) {
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
                result = chalk.red('Invalid operation');
        }
        console.log(`Result: ${result}`);
        if (!answers.continue) {
            console.log(chalk.greenBright('Thank you for using the calculator!'));
            break;
        }
    }
}
main();
