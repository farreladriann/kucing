const axios = require('axios');
const fs = require('fs');

// Baca file sebagai buffer
const fileBuffer = fs.readFileSync('./mydrivetext.txt');

// Tampilkan buffer di konsol
console.log('File Buffer:', fileBuffer);

// Jika ingin menampilkan sebagai string (misalnya, utf-8 encoded)
const fileString = fileBuffer.toString('utf-8');
console.log('File as String:', fileString);

// Jika ingin menampilkan sebagian awal buffer (misalnya, 50 byte pertama)
const partialBuffer = fileBuffer.slice(0, 50);
console.log('Partial Buffer:', partialBuffer);

// Gunakan FormData untuk membangun formulir
const formData = new FormData();
formData.append('file', fileBuffer, {
  filename: 'file.txt',
  contentType: 'text/plain',
});

// Kirim permintaan menggunakan axios
axios.post('https://example.com/upload', formData, {
  headers: {
    'Content-Type': `multipart/form-data; boundary=${formData.getBoundary()}`,
  },
})
  .then(response => {
    console.log('Response:', response.data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
