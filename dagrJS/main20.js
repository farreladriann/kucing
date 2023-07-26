// javascript errors and error handling
"use strict";

const makeError = () => {
    try {
        const i = 1;
        i = 2;
        // throw new customError("This is a custom error!");
        throw new Error("This is a custom error");
    } catch(err) {
        console.error(err.name);
        console.error(err.message);
        console.error(err.stack);
    } finally {
        //selalu diexecut, no matter what ada error atau ga
        console.log("...akhirtnnya");
    }
}
makeError();

// function customError(message) {
//     this.message = message;
//     this.name = "customError";
//     this.stack = `${this.name}: ${this.message}`;
// }