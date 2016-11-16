var connectionString = 'mongodb://localhost/assignment';
var mongoose = require("mongoose");
var db = new mongoose.Mongoose();
db.connect(connectionString);
db.connection.once('open', () => console.log('mongodb connected: assignment'));

var UserModel = require('./user/user.model.server')(db);
var WebsiteModel = require('./website/website.model.server')(db);
var PageModel = require('./page/page.model.server')(db);
var WidgetModel = require('./widget/widget.model.server')(db);

module.exports = {
    user: UserModel,
    website: WebsiteModel,
    page: PageModel,
    widget: WidgetModel,
};
