function Person(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
}

Person.prototype.fullName = function () {
    return this.firstName + " " + this.lastName;
};

Person.prototype.nationality = "American";

const orang = new Person('Zafira', 'Fayyaza');
console.log(orang.fullName());
console.log(orang.nationality);