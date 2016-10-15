(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService() {
        var pages = [
            {_id: "321", name: "Post 1", websiteId: "456"},
            {_id: "432", name: "Post 2", websiteId: "456"},
            {_id: "543", name: "Post 3", websiteId: "456"},
        ];

        return {
            createPage: _createPage,
            findPagesByWebsiteId: _findPagesByWebsiteId,
            findPageById: _findPageById,
            updatePage: _updatePage,
            deletePage: _deletePage,
        };

        function _createPage(websiteId, page) {
            page.websiteId = websiteId;
            pages.push(page);
        }

        function _findPagesByWebsiteId(websiteId) {
            var ret = [];
            for (var page of pages) {
                if (page.websiteId === websiteId) {
                    ret.push(page);
                }
            }
            return ret;
        }

        function _findPageById(pageId) {
            for (var page of pages) {
                if (page._id === pageId) {
                    return page;
                }
            }
            return null;
        }

        function _updatePage(pageId, page) {
            for (var i = 0; i < pages.length; i++) {
                if (pages[i]._id === pageId) {
                    pages[i] = page;
                    return;
                }
            }
        }

        function _deletePage(pageId) {
            for (var i = 0; i < pages.length; i++) {
                if (pages[i]._id === pageId) {
                    pages.splice(i, 1);
                    return;
                }
            }
        }
    }
})();
