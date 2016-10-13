(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService() {
        var pages = [
            {"_id": "321", "name": "Post 1", "websiteId": "456"},
            {"_id": "432", "name": "Post 2", "websiteId": "456"},
            {"_id": "543", "name": "Post 3", "websiteId": "456"},
        ];

        var fac = {};

        fac.createPage = function (websiteId, page) {
            page.websiteId = websiteId;
            pages.push(page);
        }

        fac.findPageByWebsiteId = function (websiteId) {
            var ret = [];
            for (var page of pages) {
                if (page.websiteId === websiteId) {
                    ret.push(page);
                }
            }
            return ret;
        }

        fac.findPageById = function (pageId) {
            for (var page of pages) {
                if (page._id === pageId) {
                    return page;
                }
            }
            return null;
        }

        fac.updatePage = function (pageId, page) {
            for (var i = 0; i < pages.length; i++) {
                if (pages[i]._id === pageId) {
                    pages[i] = page;
                    return;
                }
            }
        }

        fac.deletePage = function (pageId) {
            for (var i = 0; i < pages.length; i++) {
                if (pages[i]._id === pageId) {
                    pages.splice(i, 1);
                    return;
                }
            }
        }

        return fac;
    }
})();
