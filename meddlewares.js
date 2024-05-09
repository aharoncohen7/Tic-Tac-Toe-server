const fs = require('fs');

// קריאה
function readJSONFile(filename, callback) {
    fs.readFile(filename, 'utf8', (err, data) => {
        if (err) {
            callback(err);
            return;
        }

        try {
            const json = JSON.parse(data);
            callback(null, json);
        } catch (err) {
            callback(err);
        }
    });
}

// כתיבה
function writeJSONFile(filename, data, callback) {
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFile(filename, jsonData, 'utf8', callback);
}


const filename = 'data.json';

readJSONFile(filename, (err, json) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }
    json.example = 'Hello, World!';

    // Write JSON back to file
    writeJSONFile(filename, json, err => {
        if (err) {
            console.error('Error writing file:', err);
            return;
        }
        console.log('Data written successfully.');
    });
});


