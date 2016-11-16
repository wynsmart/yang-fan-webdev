module.exports = function (db) {
    return db.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        websites: [{type: db.Schema.ObjectId, ref: 'WebsiteModel'}],
        dateCreated: {type: Date, default: Date.now},
    });
}
