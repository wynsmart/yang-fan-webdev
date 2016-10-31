module.exports = function(app) {
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
        var website = req.body;
        websites.push(website);
        res.send(websites);
    }

    function findPagesByWebsiteId(req, res) {
        var uid = req.params.userId;
        var result = [];
        for(var w in websites) {
            if(websites[w].uid == uid) {
                result.push(websites[w]);
            }
        }
        res.json(result);
    }

    function findPageById(req, res) {

    }

    function updatePage(req, res) {

    }

    function deletePage(req, res) {

    }

};
