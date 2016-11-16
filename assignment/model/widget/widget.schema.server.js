module.exports = function (db) {
    return db.Schema({
        _page: {type: db.Schema.ObjectId, ref: 'PageModel'},
        type: {type: String, enum: ['HEADING', 'IMAGE', 'YOUTUBE', 'HTML']},
        name: String,
        text: String,
        size: Number,
        url: String,
        width: {type: String, default: '100%'},
        dateCreated: {type: Date, default: Date.now},
    });
};
