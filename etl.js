const fs = require('fs');
const {addPhotos, addCharacteristic, pool}= require('./db.js');
const fastCSV = require('fast-csv');
const photoDataLocation = './csv/reviews_photos.csv';
const characteristicDataLocation = './csv/characteristic_reviews.csv';

//let stream_photos = fs.createReadStream(photoDataLocation);
let csvStream = fastCSV.parse({headers: true})
.on('data', (data) => {
  addPhotos(data.id, data.review_id, data.url)
})
.on('end', (data) => {
  console.log(`${data} Photos Inserted`)
});
//console.log(`Adding Photos from ${photoDataLocation}`)
//stream_photos.pipe(csvStream);

////let stream_characteristic = fs.createReadStream(characteristicDataLocation);
let characteristicStream = fastCSV.parse({headers: true})
.on('data', (data) => {
  
  addCharacteristic(data.id, data.characteristic_id, data.review_id, data.value)
})
.on('end', (data) => {
  console.log(`${data} Characteristic Records Inserted`)
});
//console.log(`${characteristicDataLocation} Records are being Inserted`)
//stream_characteristic.pipe(characteristicStream);