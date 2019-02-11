const mongoose = require('mongoose');

function slugCheck(slug, fieldName, tableName){    
    var table = require(`../models/${tableName}`);
    var data = {};
    data[fieldName] = slug;
    console.log('1');
    if(!table) return null; 
    var promise = new Promise((resolve, reject) => {
        console.log('3');
        table.findOne(data)
        .exec((err, result) => {
            console.log({err}, {result});
            if(err) resolve(true);
            else reject(null);
        })
        .then((z) => {return true} )
        .catch((z) => {return null} )
    })
}

module.exports = {    
    slugGenerator: (title, fieldName, tableName) => {
        title = (title)? title : 'A custom title';           
        var slug = title.trim().toLowerCase().split(' ').join('-');
        var table = require(`../models/${tableName}`);
        var promise = new Promise((resolve, reject) => {
            console.log('3');
            table.findOne({slug})
            .exec((err, result) => {
                console.log({err}, {result});
                if(err) reject(new Error(err));
                else resolve(result);
            })            
        })
        .then((z) => { console.log('then ', {z}); return z.slug} )
        .catch((z) => { console.log('catch ', {z}); return z} )
        // let i = 0;
        // var slugTemp = slug;
        // while(true){
        //     console.log('2');
        //     slugTemp = i ? `${slug}-${i}` : slug;
        //     if(slugCheck(slugTemp, fieldName, tableName)) {break;}
        //     else i++;
        // }
        // return slugTemp;
    }
}