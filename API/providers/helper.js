
module.exports = {    
    slugGenerator: (title, fieldName, tableName) => {
        title = (title)? title : 'A custom title';           
        var slug = title.trim().toLowerCase().split(' ').join('-');
        let table = require(`../models/${tableName}`);
        let incrementer = 1, stopWhile = true;
        return new Promise((resolve, reject) => {
            table.findOne({slug})
            .select('slug')
            .exec((err, result) => {
                console.log({err}, {result});
                if(err){ stopWhile=false; reject(new Error(err));}
                else resolve(slug);
                    if(!result){ 
                        // slug in unavailable so we can use this slug
                        stopWhile = false; resolve(slug);}
                else {
                    // slug is already available so we need a new slug
                    slug += `-${incrementer}`;
                    incrementer++;
                    console.log('else ', slug);
                    // some condtn to re run the find query
                }
            }) 
        })
        .then((z) => { 
            console.log('then ', {z}); 
            if(z) this.slugGenerator(slug, fieldName, tableName);
            else return z.slug
        } )
        .catch((z) => { console.log('catch ', {z}); return z} )
    }
}