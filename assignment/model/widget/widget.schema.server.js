module.exports = function (db) {
    return db.Schema({
        _page: {type: db.Schema.ObjectId, ref: 'PageModel'},
        type: {type: String, enum: ['HEADING', 'IMAGE', 'YOUTUBE', 'HTML', 'INPUT', 'TEXT']},
        name: String,
        text: String,
        placeholder: String,
        rows: Number,
        size: Number,
        formatted: Boolean,
        url: String,
        width: {type: String, default: '100%'},
        dateCreated: {type: Date, default: Date.now},
    });
};
