/**
 * Created by Forrrest on 15/05/2016.
 */

function say(word) {
    console.log(word);
}

function execute(someFunction, value) {
    someFunction(value);
}

execute(say, "Hello World");