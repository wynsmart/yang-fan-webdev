module.exports = function (app) {
    var connectionString = 'mongodb://localhost/assignment';
    var mongoose = require("mongoose");
    var db = new mongoose.Mongoose();
    db.connect(connectionString);
    db.connection.once('open', () => console.log('mongodb connected: assignment'));
    require("./services/user.service.server.js")(app, db);
    require("./services/website.service.server.js")(app, db);
    require("./services/page.service.server.js")(app, db);
    require("./services/widget.service.server.js")(app, db);
};
