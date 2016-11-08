module.exports = function (app, db) {

    var WebsiteModel = db.model('WebsiteModel', db.Schema({
        name: String,
        description: String,
        developerId: String,
    }));

    app.post("/api/user/:uid/website", createWebsite);
    app.get("/api/user/:uid/website", findWebsitesByUser);
    app.get("/api/website/:wid", findWebsiteById);
    app.put("/api/website/:wid", updateWebsite);
    app.delete("/api/website/:wid", deleteWebsite);


    function createWebsite(req, res) {
        var website = req.body;
        var uid = req.params.uid;
        website.developerId = uid;
        WebsiteModel.create(website, (err, website) => {
            console.log('created website:', website);
            res.json(website);
        });

    }

    function findWebsitesByUser(req, res) {
        var uid = req.params.uid;
        WebsiteModel.find({developerId: uid}, (err, websites) => {
            console.log('found websites:', websites);
            if (websites) {
                res.json(websites);
            } else {
                res.sendStatus(204);
            }
        });
    }

    function findWebsiteById(req, res) {
        var wid = req.params.wid;
        WebsiteModel.findOne({_id: wid}, (err, website) => {
            console.log('found website:', website);
            if (website) {
                res.json(website);
            } else {
                res.sendStatus(204);
            }
        });
    }

    function updateWebsite(req, res) {
        var wid = req.params.wid;
        var website = req.body;
        WebsiteModel.update({_id: wid}, website, (err, raw) => {
            console.log('updated website:', raw);
            res.sendStatus(200);
        });
    }

    function deleteWebsite(req, res) {
        // TODO: recursively delete all pages and widgets
        var wid = req.params.wid;
        WebsiteModel.remove({_id: wid}, (err) => {
            console.log('deleted website:', wid);
            res.sendStatus(200);
        });
    }

};
