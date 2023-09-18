const axios = require("axios");

for (let i = 1; i < 1000; i++) {
    axios
        .get(`http://178.128.112.149/profile?id=${i}`)
        .then((response) => console.log(response.data));
}
