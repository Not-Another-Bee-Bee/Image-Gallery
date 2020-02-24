const fs = require('fs');
const faker = require('faker');
const path = require('path');

const filePath = path.join(__dirname, 'pgsql_10M_photos.csv');

// Use fs module to create a stream, name the file, and write headers for CSV file. Include encoding ‘utf-8’.  
const writePhotos = fs.createWriteStream(`${filePath}`);
writePhotos.write('id, photo_url, listing_id\n', 'utf8');

const getRandomNum = (min, max) => {
    return Math.floor((Math.random() * (max - min)) + min);
};

// This will create 10 million photo files. Create the data as comma separated values 
const createCSV = (writer, encoding, callback) => {
    let i = 10000000;
    let id = 0;
    const write = () => {
        let ok = true;
        do {
            i-=1;
            id += 1;
            const photo_url = faker.image.image();
            const listing_id = getRandomNum(0, 10000000);
            const data = `${id},${photo_url},${listing_id}\n`;
            if (i === 0) {
                writer.write(data, encoding, callback);
            } else {
                ok = writer.write(data, encoding);
            }
        } while (i > 0 && ok);
        if (i > 0) {
            writer.once('drain', write);
        }
    };
    write();
};

createCSV(writePhotos, 'utf8', () => {
    writePhotos.end();
});
