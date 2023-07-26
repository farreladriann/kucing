// Dalam JavaScript, fungsi dapat dikelompokkan berdasarkan bagaimana dan di mana mereka didefinisikan dan digunakan. Berikut adalah beberapa jenis fungsi di JavaScript:

// 1. **Fungsi Deklarasi (Function Declarations)**: Fungsi ini didefinisikan menggunakan kata kunci `function`, diikuti dengan nama fungsi, daftar parameter dalam tanda kurung, dan blok kode yang berisi tubuh fungsi. Contoh:

//    ```javascript
function greet(name) {
    console.log("Hello, " + name);
}
//    ```

// 2. **Fungsi Ekspresi (Function Expressions)**: Fungsi ini didefinisikan dalam sebuah ekspresi dan dapat disimpan dalam variabel. Fungsi ekspresi bisa diberi nama atau anonim (tanpa nama). Contoh:

//    ```javascript
let greet = function (name) {
    console.log("Hello, " + name);
};
//    ```

// 3. **Fungsi Anonim (Anonymous Functions)**: Seperti namanya, fungsi ini adalah fungsi tanpa nama. Fungsi anonim biasanya digunakan di tempat fungsi dideklarasikan. Fungsi ekspresi biasanya adalah fungsi anonim. Contoh:

//    ```javascript
let greet = function (name) {
    console.log("Hello, " + name);
};
//    ```

// 4. **Fungsi Panah (Arrow Functions)**: Diperkenalkan dalam ES6, fungsi panah memiliki sintaks lebih ringkas dibandingkan dengan fungsi tradisional dan tidak memiliki `this`, `arguments`, `super`, atau `new.target` mereka sendiri. Contoh:

//    ```javascript
let greet = (name) => {
    console.log("Hello, " + name);
};
//    ```

// 5. **IIFE (Immediately Invoked Function Expressions)**: IIFE adalah fungsi yang segera dijalankan saat dideklarasikan. Contoh:

//    ```javascript
(function () {
    console.log("This is an IIFE");
})();
//    ```

// 6. **Fungsi Callback**: Fungsi ini adalah fungsi yang diteruskan sebagai argumen ke fungsi lain dan kemudian dipanggil kembali pada titik tertentu. Contoh:

//    ```javascript
function greeting(name) {
    alert("Hello " + name);
}

function processUserInput(callback) {
    let name = prompt("Please enter your name.");
    callback(name);
}

processUserInput(greeting);
//    ```

// 7. **Konstruktor Fungsi (Constructor Functions)**: Fungsi ini digunakan dengan kata kunci `new` untuk membuat objek. Contoh:

//    ```javascript
function Person(name, age) {
    this.name = name;
    this.age = age;
}

let person1 = new Person("John", 30);
//    ```

// 8. **Generator Functions**: Fungsi ini dapat menghasilkan banyak nilai pada waktu yang berbeda selama eksekusinya.

//    ```javascript
function* idGenerator() {
    let id = 0;
    while (true) {
        yield id++;
    }
}

const generator = idGenerator();

console.log(generator.next().value); // 0
console.log(generator.next().value); // 1
console.log(generator.next().value); // 2
//    ```

// Semua jenis fungsi ini memiliki karakteristik dan penggunaannya masing-masing, dan Anda bisa memilih jenis yang paling sesuai dengan kebutuhan Anda.
