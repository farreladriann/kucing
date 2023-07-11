const add = (a, b, callback) => { 
	console.log (a + b);
	callback();
};

add(1, 2, ()=> {console.log('mantapp')});
