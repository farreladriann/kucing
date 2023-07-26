// User input

// alert(3);
// confirm("Ok===true\nCancel===False");

// let myBoolean = confirm("Ok===true\nCancel===False");
// console.log(myBoolean);

// let nama = prompt("Enter name");
// (nama.length) ? console.log(nama) : console.log('gada nama');

let nama = prompt("Enter name");
if (nama) {
    console.log(nama);
    console.log(nama.length);
    console.log(nama.trim().length);//tanpa spasi
} else {
    console.log('ga masukin nama kamu');
}