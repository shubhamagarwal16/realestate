
module.exports = {
    slugGenerator: async (title, fieldName, tableName) => {
        title = (title) ? title : 'Property listing';
        var slug = title.trim().toLowerCase().split(' ').join('-').replace(/[,"$!^@%*&]+/g, "");
        let table = require(`../models/${tableName}`);
        let incrementer = 0;
        if (table) {
            do {
                var result = await table.findOne({ slug: incrementer ? slug + '-' + incrementer : slug }).select('slug');

                if (result && result.slug)
                    incrementer++;
                else
                    return incrementer ? slug + '-' + incrementer : slug;
            } while (true)
        }
        else return Date.now();
    },
    isKeyMissing: (data, requiredArray) => {
        for (element of requiredArray) {
            if (!data[element]) {
                return element
            }
        }
        return false
    }
}