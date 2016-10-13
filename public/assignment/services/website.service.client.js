(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    function WebsiteService() {
        var websites = [
            {_id: "123", name: "Facebook", developerId: "456"},
            {_id: "234", name: "Tweeter", developerId: "456"},
            {_id: "456", name: "Gizmodo", developerId: "456"},
            {_id: "567", name: "Tic Tac Toe", developerId: "123"},
            {_id: "678", name: "Checkers", developerId: "123"},
            {_id: "789", name: "Chess", developerId: "234"},
        ];

        return {
            createWebsite: _createWebsite,
            findWebsitesByUser: _findWebsitesByUser,
            findWebsiteById: _findWebsiteById,
            updateWebsite: _updateWebsite,
            deleteWebsite: _deleteWebsite,
        };

        function _createWebsite(userId, website) {
            website.developerId = userId;
            websites.push(website);
        }

        function _findWebsitesByUser(userId) {
            var ret = [];
            for (var website of websites) {
                if (website.developerId === userId) {
                    ret.push(website);
                }
            }
            return ret;
        }

        function _findWebsiteById(websiteId) {
            for (var website of websites) {
                if (website._id === websiteId) {
                    return website;
                }
            }
            return null;
        }

        function _updateWebsite(websiteId, website) {
            for (var i = 0; i < websites.length; i++) {
                if (websites[i]._id === websiteId) {
                    websites[i] = website;
                    return;
                }
            }
        }

        function _deleteWebsite(websiteId) {
            for (var i = 0; i < websites.length; i++) {
                if (websites[i]._id === websiteId) {
                    websites.splice(i, 1);
                    return;
                }
            }
        }
    }
})();
