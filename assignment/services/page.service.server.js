module.exports = function (app, models) {

    app.post("/api/website/:wid/page", createPage);
    app.get("/api/webiste/:wid/pages", findPagesByWebsiteId);
    app.get("/api/page/:pid", findPageById);
    app.put("/api/page/:pid", updatePage);
    app.delete("/api/page/:pid", deletePage);


    function createPage(req, res) {
        var wid = req.params.wid;
        var page = req.body;
        models.page.createPage(wid, page).then(_assignToWebsite);

        function _assignToWebsite(page) {
            models.website.updateWebsite(wid, {$push: {pages: page}}).then(
                () => {
                    console.log('created page:', page);
                    res.json(page);
                }
            );
        }

    }

    function findPagesByWebsiteId(req, res) {
        var wid = req.params.wid;
        models.website.findAllPagesForWebsite(wid).then(
            website => {
                console.log('found pages:', website.pages);
                if (website.pages) {
                    res.json(website.pages);
                } else {
                    res.sendStatus(204);
                }
            }
        );
    }

    function findPageById(req, res) {
        var pid = req.params.pid;
        models.page.findPageById(pid).then(
            page => {
                console.log('found page:', page);
                if (page) {
                    res.json(page);
                } else {
                    res.sendStatus(204);
                }
            }
        );
    }

    function updatePage(req, res) {
        var pid = req.params.pid;
        var page = req.body;
        models.page.updatePage(pid, page).then(
            raw => {
                console.log('updated page:', raw);
                res.sendStatus(200);
            }
        );
    }

    function deletePage(req, res) {
        var pid = req.params.pid;
        models.page.deletePage(pid).then(
            () => {
                console.log('deleted page:', pid);
                res.sendStatus(200);
            }
        );
    }

};
