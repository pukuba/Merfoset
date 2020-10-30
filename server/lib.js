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

const month = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
const monthMap = new Map()

for(let i = 0; i < 12; i++) monthMap.set(month[i], i + 1)

module.exports = { uploadStream, rand, monthMap }