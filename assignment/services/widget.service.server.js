module.exports = function (app, models) {
    const multer = require('multer');
    const upload = multer({dest: __dirname + '/../../public/uploads'});

    app.post("/api/upload", upload.single('widgetUpload'), uploadImage);
    app.post("/api/page/:pid/widget", createWidget);
    app.get("/api/widget/:wgid", findWidgetById);
    app.get("/api/page/:pid/widgets", findWidgetsByPageId);
    app.put("/api/widget/:wgid", updateWidget);
    app.put("/api/page/:pid/widget/reorder", reorderWidgets);
    app.delete("/api/widget/:wgid", deleteWidget);

    function uploadImage(req, res) {
        var wgid = req.body.widgetId;
        var wgUrl = req.body.widgetUrl;
        var wgUpload = req.file;
        if (!wgUpload) {
            console.log('no image uploaded');
            res.redirect(`/assignment/#${wgUrl}`);
            return;
        }
        var imageUrl = `/uploads/${wgUpload.filename}`;
        models.widget.updateImageUrl(wgid, imageUrl).then(
            (raw) => {
                console.log('uploaded image:', wgUpload);
                res.redirect(`/assignment/#${wgUrl}`);
            }
        );
    }

    function createWidget(req, res) {
        var widget = req.body;
        var pid = req.params.pid;
        models.widget.createWidget(pid, widget).then(
            (widget) => {
                models.page.updatePage(pid, {$push: {widgets: widget}}).then(
                    () => {
                        console.log('created widget:', widget);
                        res.json(widget);
                    }
                );
            }
        );
    }

    function findWidgetById(req, res) {
        var wgid = req.params.wgid;
        models.widget.findWidgetById(wgid).then(
            (widget) => {
                console.log('found widget:', widget);
                if (widget) {
                    res.json(widget);
                } else {
                    res.sendStatus(204);
                }
            }
        );
    }

    function findWidgetsByPageId(req, res) {
        var pid = req.params.pid;
        models.page.findAllWidgetsForPage(pid).then(
            (page) => {
                console.log('found widgets:', page.widgets);
                if (page.widgets) {
                    res.json(page.widgets);
                } else {
                    res.sendStatus(204);
                }
            }
        );
    }

    function updateWidget(req, res) {
        var wgid = req.params.wgid;
        var widget = req.body;
        models.widget.updateWidget(wgid, widget).then(
            (raw) => {
                console.log('updated widget:', raw);
                res.sendStatus(200);
            }
        );
    }

    function reorderWidgets(req, res) {
        var pid = req.params.pid;
        var newOrder = req.body;
        models.page.reorderWidgets(pid, newOrder).then(
            () => {
                console.log('reordered widgets:', newOrder);
                res.sendStatus(200);
            }
        );
    }

    function deleteWidget(req, res) {
        var wgid = req.params.wgid;
        models.widget.deleteWidget(wgid, (err) => {
                console.log('deleted widget:', wgid);
                res.sendStatus(200);
            }
        );
    }

};
