const data = {//ini objek, bukan class, class itu blueprint, objek itu yg jadinya
    employees: require('./model/employees.json'),
    setEmployees: (data) => { this.employees = data }
};

const employee = data.employees.find(emp => emp.id === parseInt(1));

console.log(employee);

// employee.firstname = "kucing";
// employee.lastname = "negara";

// const filteredArray = data.employees.filter(emp => emp.id !== parseInt(1));
// const unsortedArray = [...filteredArray,  employee];
// console.log(unsortedArray);

//=========

// const data = {
//     employees: null,
// };

// console.log(data.employees?.length); // Output: undefined

// data.employees = ["John", "Jane", "Mike"];
// console.log(data.employees?.length); // Output: 3

// ===========

// const unsortedArray = [
//     { id: 2, name: "John" },
//     { id: 1, name: "Jane" },
//     { id: 2, name: "Mike" },
// ];

// unsortedArray.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0));
// // 1 berarti  a ditemaptkan setelah b
// // -1 berarti a ditempatkan sebelum b
// // 0 berarti a dan b memiliki kedudukan yang sama
// console.log(unsortedArray);
// // Output: [
// //   { id: 1, name: "Jane" },
// //   { id: 2, name: "Mike" },
// //   { id: 2, name: "John" }
// // ]

//==========
// const data = [
//     { id: 5, name: "John" },
//     { name: "Jane" },
//     { id: 10, name: "Mike" },
//     { id: 20, name: "Sarah" },
// ];

// // Membuat ID baru untuk objek yang tidak memiliki ID
// let nextId = 1;
// for (var obj of data) {
//         obj.id = char(nextId);
//         nextId++;
// }

// console.log(data);
