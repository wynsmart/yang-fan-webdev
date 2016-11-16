module.exports = function (db) {
    return db.Schema({
        _user: {type: db.Schema.ObjectId, ref: 'UserModel'},
        name: String,
        description: String,
        pages: [{type: db.Schema.ObjectId, ref: 'PageModel'}],
        dateCreated: {type: Date, default: Date.now},
    });
};
