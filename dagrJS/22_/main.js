// JS event listeners

// Syntax: addEventListener(event, function, useCapture)
// event bisa berupa aja termasuk click

// const doSomething = () => {
//     alert("do something");
// };

// h2.addEventListener('click', doSomething, false); //false by default
// h2.removeEventListener('click', doSomething, false);

// h2.addEventListener("click", (event) => {
//     console.log(event.target);
//     event.target.textContent = "Clicked";
// });

document.addEventListener("readystatechange", (event) => {
    if (event.target.readyState === "complete") {
        console.log("readyState: complete");
        initApp();
    }
});

const initApp = () => {
    const view = document.querySelector("#view2");
    const div = view.querySelector("div");
    const h2 = div.querySelector("h2");

    view.addEventListener(
        "click",
        (event) => {
            event.stopPropagation();
            view.style.backgroundColor = "purple";
        },
        true
    );

    div.addEventListener(
        "click",
        (event) => {
            div.style.backgroundColor = "blue";
        },
        true
    );

    h2.addEventListener(
        "click",
        (event) => {
            event.target.textContent = "Clicked";
        },
        true
    );
};
