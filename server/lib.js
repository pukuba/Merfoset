const {WriteStream} = require('fs-capacitor')
const fs = require('fs')

const uploadStream = (stream, path) => 
    new Promise((resolve, reject) => { 
        const capacitor = new WriteStream()  
        const destination = fs.createWriteStream(path);  
        stream.pipe(capacitor)
        capacitor
            .createReadStream() 
            .pipe(destination)
            .on('error', reject)
            .on('finish', resolve)
    })

const rand = (min, max) => Math.floor(Math.random() * (max - min)) + min

const updateLated = (name, rated, k, db) => {
    let a = rated / 200, b = (rated + k) / 200
    a = a < 6 ? 1 : a-5, b = b < 6 ? 1 : b - 5
    if(a != b) db.collection('user').updateOne({name:name},{$set:{rated : rated + k, class : b}})
    else db.collection('user').updateOne({name:name},{$set:{rated : rated + k}})
}

module.exports = { uploadStream, rand, updateLated }