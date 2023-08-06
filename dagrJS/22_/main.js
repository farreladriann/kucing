// JS event listeners

const view = document.querySelector("#view2");
const div = view.querySelector("div");
const h2 = div.querySelector("h2");

// Syntax addEventListener(event, function, useCapture)

const doSomething = () => {
    alert('doing something');
}

// h2.addEventListener('click', doSomething, false);
h2.addEventListener('click', (event) => {
    console.log(event.target);
    event.target
});