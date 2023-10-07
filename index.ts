#! /usr/bin/env node

import inquirer from 'inquirer';
import chalk from 'chalk';
import chalkAnimation from 'chalk-animation'

export function add(a: number, b: number): number {
  return a + b;
}

export function subtract(a: number, b: number): number {
  return a - b;
}

export function multiply(a: number, b: number): number {
  return a * b;
}

export function divide(a: number, b: number): number {
  if (b === 0) {
    console.log(chalk.redBright("Division by zero is not allowed."));
  }
  return a / b;
}

const sleep = () => {
  return new Promise((response) => {
      setTimeout(response, 1000)
  })
}

async function main() {
  let rainbowStyle = chalkAnimation.rainbow("\n -------------------o Welcome to Calculator App o------------------- \n")
    await sleep();
    rainbowStyle.stop();

  while (true) {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'num1',
        message: chalk.yellowBright('Enter the first number:'),
        validate: (value: string) => !isNaN(parseFloat(value)) || chalk.red('Please enter a valid number'),
      },
      {
        type: 'input',
        name: 'num2',
        message: chalk.yellowBright('Enter the second number:'),
        validate: (value: string) => !isNaN(parseFloat(value)) || chalk.red('Please enter a valid number'),
      },
      {
        type: 'list',
        name: 'operation',
        message: chalk.yellow('Select an operation:'),
        choices: ['Add', 'Subtract', 'Multiply', 'Divide'],
      }
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

    console.log(chalk.cyan(`Result: ${result}`));

    const newCalculation = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'continue',
        message: chalk.bold.blueBright('Do you want to perform another calculation?'),
        default: false,
      }
    ])
    if (!newCalculation.continue) {
      console.log(chalk.yellowBright('Thank you for using the calculator!'));
      break;
    }
  }
}

main();
