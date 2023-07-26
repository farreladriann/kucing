// windows sebagai global object
function xx () {
    return function yy () {
        return 20;
    }
}
console.dir(xx.length);