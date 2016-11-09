module.exports = function (app, db) {
    const multer = require('multer');
    const upload = multer({dest: __dirname + '/../../public/uploads'});

    var WidgetModel = db.model('WidgetModel', db.Schema({
        widgetType: String,
        pageId: String,
        order: Number,
        name: String,
        text: String,
        size: Number,
        url: String,
        width: String,
    }));

    app.post("/api/upload", upload.single('widgetUpload'), uploadImage);
    app.post("/api/page/:pid/widget", createWidget);
    app.get("/api/page/:pid/widget", findWidgetsByPageId);
    app.get("/api/widget/:wgid", findWidgetById);
    app.put("/api/widget/:wgid", updateWidget);
    app.put("/api/page/:pid/widget/reorder", reorderWidgets);
    app.delete("/api/widget/:wgid", deleteWidget);

    function uploadImage(req, res) {
        var wgid = req.body.widgetId;
        var wgUrl = req.body.widgetUrl;
        var wgUpload = req.file;
        var imageUrl = `/uploads/${wgUpload.filename}`;
        WidgetModel.update({_id: wgid}, {url: imageUrl}, (err, raw) => {
            console.log('uploaded image:', wgUpload);
            res.redirect(`/assignment/#${wgUrl}`);
        });
    }

    function createWidget(req, res) {
        // TODO: fix widget attributes not saved properly
        var widget = req.body;
        widget.order = Date.now();
        widget.pageId = req.params.pid;
        WidgetModel.create(widget, (err, widget) => {
            console.log('created widget:', widget);
            res.json(widget);
        });
    }

    function findWidgetsByPageId(req, res) {
        var pid = req.params.pid;
        WidgetModel.find({pageId: pid}, (err, widgets) => {
            console.log('found widgets:', widgets);
            if (widgets) {
                res.json(widgets);
            } else {
                res.sendStatus(204);
            }
        });
    }

    function findWidgetById(req, res) {
        var wgid = req.params.wgid;
        WidgetModel.findOne({_id: wgid}, (err, widget) => {
            console.log('found widget:', widget);
            if (widget) {
                res.json(widget);
            } else {
                res.sendStatus(204);
            }
        });
    }

    function updateWidget(req, res) {
        var wgid = req.params.wgid;
        var widget = req.body;
        WidgetModel.update({_id: wgid}, widget, (err, raw) => {
            console.log('updated widget:', raw);
            res.sendStatus(200);
        });
    }

    function reorderWidgets(req, res) {
        var pid = req.params.pid;
        var newOrder = req.body;
        var fn = (err, raw) => console.log('reordered widget:', raw);
        for (var i = 0; i < newOrder.length; i++) {
            WidgetModel.update({_id: newOrder[i]}, {order: i}, fn);
        }
        res.sendStatus(200);
    }

    function deleteWidget(req, res) {
        var wgid = req.params.wgid;
        WidgetModel.remove({_id: wgid}, (err) => {
            console.log('deleted widget:', wgid);
            res.sendStatus(200);
        });
    }

};
