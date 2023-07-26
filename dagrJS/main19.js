//JSON
//JSON is used to send and receive data.
//JSON is a texxt format that is completely language independent
//using in many language, not just JavaScript

const myObj = {
    name: "Safika",
    hobbies: ["eat", "sleep", "code"],
    hello: function() {
        console.log("Hello!");
    }
};

console.log(myObj);
console.log(myObj.name);
myObj.hello();
console.log(typeof myObj);

const sendJSON = JSON.stringify(myObj);
// const sendJSON = JSON.stringify(myObj, null, 4);
console.log(sendJSON);

console.log(typeof sendJSON);
console.log(sendJSON.name);

const receiveJSON = JSON.parse(sendJSON);
console.log(receiveJSON);
console.log(typeof receiveJSON);