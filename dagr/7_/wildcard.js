let pattern = /\/o+/;
let str = '/aa';

if (!pattern.test(str)) {
    // str does not contain '/index'
    console.log('str does not contain')
}
else {
    console.log('str contain')
}