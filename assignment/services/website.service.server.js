module.exports = function (app) {
    var websites = [
        {_id: "123", name: "Facebook", developerId: "456"},
        {_id: "234", name: "Tweeter", developerId: "456"},
        {_id: "456", name: "Gizmodo", developerId: "456"},
        {_id: "567", name: "Tic Tac Toe", developerId: "123"},
        {_id: "678", name: "Checkers", developerId: "123"},
        {_id: "789", name: "Chess", developerId: "234"},
    ];

    app.post("/api/user/:uid/website", createWebsite);
    app.get("/api/user/:uid/website", findWebsitesByUser);
    app.get("/api/website/:wid", findWebsiteById);
    app.put("/api/website/:wid", updateWebsite);
    app.delete("/api/website/:wid", deleteWebsite);


    function createWebsite(req, res) {
        var website = req.body;
        var uid = req.params.uid;
        website._id = Date.now().toString();
        website.developerId = uid;
        websites.push(website);
        res.json(website);
    }

    function findWebsitesByUser(req, res) {
        var uid = req.params.uid;
        var result = [];
        for (var w of websites) {
            if (w.developerId === uid) {
                result.push(w);
            }
        }
        res.json(result);
    }

    function findWebsiteById(req, res) {
        var wid = req.params.wid;
        for (var w of websites) {
            if (w._id === wid) {
                res.json(w);
                return;
            }
        }
        res.sendStatus(204);
    }

    function updateWebsite(req, res) {
        var wid = req.params.wid;
        var website = req.body;
        for (var i = 0; i < websites.length; i++) {
            if (websites[i]._id === wid) {
                websites[i] = website;
            }
        }
        res.sendStatus(200);
    }

    function deleteWebsite(req, res) {
        var wid = req.params.wid;
        for (var i = 0; i < websites.length; i++) {
            if (websites[i]._id === wid) {
                websites.splice(i, 1);
            }
        }
        res.sendStatus(200);
    }

};
