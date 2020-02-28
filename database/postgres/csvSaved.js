const fs = require('fs');
const faker = require('faker');
const path = require('path');

const filePath = path.join(__dirname, 'pgsql_saved.csv');

// Use fs module to create a stream, name the file, and write headers for CSV file. Include encoding ‘utf-8’.  
const writeSaved = fs.createWriteStream(`${filePath}`);
writeSaved.write('id, listing_id, users_id\n', 'utf8');

const getRandomNum = (min, max) => {
    return Math.floor((Math.random() * (max - min)) + min);
};

// This will create 50 million saved pairs. Create the data as comma separated values 
const createCSV = (writer, encoding, callback) => {
    let i = 10000000;
    let id = 0;
    const write = () => {
        let ok = true;
        do {
            i-=1;
            id += 1;
            const listing_id = getRandomNum(0, 10000000);
            const users_id = getRandomNum(0, 10000000);
            const data = `${id},${listing_id},${users_id}\n`;
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

createCSV(writeSaved, 'utf8', () => {
    writeSaved.end();
});
