module.exports = function (app) {
    var pages = [
        {_id: "321", name: "Post 1", websiteId: "456"},
        {_id: "432", name: "Post 2", websiteId: "456"},
        {_id: "543", name: "Post 3", websiteId: "456"},
    ];

    app.post("/api/website/:wid/page", createPage);
    app.get("/api/webiste/:wid/page", findPagesByWebsiteId);
    app.get("/api/page/:pid", findPageById);
    app.put("/api/page/:pid", updatePage);
    app.delete("/api/page/:pid", deletePage);


    function createPage(req, res) {
        var page = req.body;
        pages.push(page);
        res.json(pages);
    }

    function findPagesByWebsiteId(req, res) {
        var pid = req.params.pid;
        var result = [];
        for (var i = 0; i < pages.length; i++) {
            if (pages[i].pid === pid) {
                result.push(pages[i]);
            }
        }
        res.json(result);
    }

    function findPageById(req, res) {
        var pid = req.params.pid;
        for (var p of pages) {
            if (p._id === pid) {
                res.json(p);
                return;
            }
        }
        res.sendStatus(204);
    }

    function updatePage(req, res) {
        var pid = req.params.pid;
        var page = req.body;
        for (var i = 0; i < pages.length; i++) {
            if (pages[i]._id === pid) {
                pages[i] = page;
            }
        }
        res.sendStatus(200);
    }

    function deletePage(req, res) {
        var pid = req.params.pid;
        for (var i = 0; i < pages.length; i++) {
            if (pages[i]._id === pid) {
                pages.splice(i, 1);
            }
        }
        res.sendStatus(200);
    }

};
