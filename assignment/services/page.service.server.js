module.exports = function (app, db) {

    var PageModel = db.model('PageModel', db.Schema({
        name: String,
        title: String,
        websiteId: String,
    }));

    app.post("/api/website/:wid/page", createPage);
    app.get("/api/webiste/:wid/page", findPagesByWebsiteId);
    app.get("/api/page/:pid", findPageById);
    app.put("/api/page/:pid", updatePage);
    app.delete("/api/page/:pid", deletePage);


    function createPage(req, res) {
        var wid = req.params.wid;
        var page = req.body;
        page.websiteId = wid;
        PageModel.create(page, (err, page) => {
            console.log('created page:', page);
            res.json(page);
        });
    }

    function findPagesByWebsiteId(req, res) {
        var wid = req.params.wid;
        PageModel.find({websiteId: wid}, (err, pages) => {
            console.log('found pages:', pages);
            if (pages) {
                res.json(pages);
            } else {
                res.sendStatus(204);
            }
        });
    }

    function findPageById(req, res) {
        var pid = req.params.pid;
        PageModel.findOne({_id: pid}, (err, page) => {
            console.log('found page:', page);
            if (page) {
                res.json(page);
            } else {
                res.sendStatus(204);
            }
        });
    }

    function updatePage(req, res) {
        var pid = req.params.pid;
        var page = req.body;
        PageModel.update({_id: pid}, page, (err, raw) => {
            console.log('updated page:', raw);
            res.sendStatus(200);
        });
    }

    function deletePage(req, res) {
        // TODO: recursively delete all widgets
        var pid = req.params.pid;
        PageModel.remove({_id: pid}, (err) => {
            console.log('deleted page:', pid);
            res.sendStatus(200);
        });
    }

};
