#! /usr/bin/env node
import inquirer from "inquirer";
import { differenceInSeconds } from "date-fns";

// Function to prompt the user for input
async function getUserInput(): Promise<number> {
    const res = await inquirer.prompt<{ userInput: number }>({
        name: "userInput",
        type: "number",
        message: "Please enter the amount of seconds",
        validate: (input) => 0 || "Please enter the positive number"
    });
    return res.userInput;
}

// Timer function that counts down from a specified number of seconds
function startCountdown(duration: number): void {
    const endTime = new Date().getTime() + duration * 1000;

    const interval = setInterval(() => {
        const currentTime = new Date().getTime();
        const timeRemaining = differenceInSeconds(new Date(endTime), currentTime);

        if (timeRemaining <= 0) {
            console.log("Timer has expired");
            clearInterval(interval);
            return;
        }

        const minutes = Math.floor((timeRemaining % 3600) / 60);
        const seconds = timeRemaining % 60;
        console.log(`Time remaining: ${minutes} minutes and ${seconds} seconds`);
    }, 1000);
}

// Main function to initialize the timer
async function main(): Promise<void> {
    try {
        const input = await getUserInput();
        startCountdown(input);
    } catch (error) {
        console.error("An error occurred:", error);
    }
}

main();
