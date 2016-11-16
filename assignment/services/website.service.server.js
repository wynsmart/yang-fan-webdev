module.exports = function (app, models) {

    app.post("/api/user/:uid/website", createWebsite);
    app.get("/api/user/:uid/websites", findWebsitesByUser);
    app.get("/api/website/:wid", findWebsiteById);
    app.put("/api/website/:wid", updateWebsite);
    app.delete("/api/website/:wid", deleteWebsite);


    function createWebsite(req, res) {
        var website = req.body;
        var uid = req.params.uid;
        models.website.createWebsiteForUser(uid, website).then(
            (website) => {
                models.user.updateUser(uid, {$push: {websites: website}}).then(
                    () => {
                        console.log('created website:', website);
                        res.json(website);
                    }
                );
            }
        );

    }

    function findWebsiteById(req, res) {
        var wid = req.params.wid;
        models.website.findWebsiteById(wid).then(
            (website) => {
                console.log('found website:', website);
                if (website) {
                    res.json(website);
                } else {
                    res.sendStatus(204);
                }
            }
        );
    }

    function findWebsitesByUser(req, res) {
        var uid = req.params.uid;
        models.user.findAllWebsitesForUser(uid).then(
            (user) => {
                console.log('found websites:', user.websites);
                if (user.websites) {
                    res.json(user.websites);
                } else {
                    res.sendStatus(204);
                }
            }
        );
    }

    function updateWebsite(req, res) {
        var wid = req.params.wid;
        var website = req.body;
        models.website.updateWebsite(wid, website).then(
            (raw) => {
                console.log('updated website:', raw);
                res.sendStatus(200);
            }
        );
    }

    function deleteWebsite(req, res) {
        // TODO: recursively delete all pages and widgets
        var wid = req.params.wid;
        models.website.deleteWebsite(wid).then(
            () => {
                console.log('deleted website:', wid);
                res.sendStatus(200);
            }
        );
    }

};
