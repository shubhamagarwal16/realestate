
module.exports = {
    slugGenerator: async (title, fieldName, tableName) => {
        title = (title) ? title : 'Property title';
        var slug = title.trim().toLowerCase().split(' ').join('-');
        let table = require(`../models/${tableName}`);
        let incrementer = 0;
        do {
            var result = await table.findOne({ slug: incrementer ? slug + '-' + incrementer : slug }).select('slug');

            if (result && result.slug)
                incrementer++;
            else
                return slug + '-' + incrementer;
        } while (true)

    }
}