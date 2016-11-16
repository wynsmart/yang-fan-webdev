module.exports = function (db) {
    return db.Schema({
        _website: {type: db.Schema.ObjectId, ref: 'WebsiteModel'},
        name: String,
        title: String,
        description: String,
        widgets: [{type: db.Schema.ObjectId, ref: 'WidgetModel'}],
        dateCreated: {type: Date, default: Date.now},
    });
};
