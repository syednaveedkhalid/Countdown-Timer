#! /usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
const date_fns_1 = require("date-fns");
// Function to prompt the user for input
function getUserInput() {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield inquirer_1.default.prompt({
            name: "userInput",
            type: "number",
            message: "Please enter the amount of seconds",
            validate: (input) => 0 || "Please enter the positive number"
        });
        return res.userInput;
    });
}
// Timer function that counts down from a specified number of seconds
function startCountdown(duration) {
    const endTime = new Date().getTime() + duration * 1000;
    const interval = setInterval(() => {
        const currentTime = new Date().getTime();
        const timeRemaining = (0, date_fns_1.differenceInSeconds)(new Date(endTime), currentTime);
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
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const input = yield getUserInput();
            startCountdown(input);
        }
        catch (error) {
            console.error("An error occurred:", error);
        }
    });
}
main();
