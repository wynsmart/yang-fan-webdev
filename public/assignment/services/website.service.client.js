(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    function WebsiteService() {
        var websites = [
            {"_id": "123", "name": "Facebook", "developerId": "456"},
            {"_id": "234", "name": "Tweeter", "developerId": "456"},
            {"_id": "456", "name": "Gizmodo", "developerId": "456"},
            {"_id": "567", "name": "Tic Tac Toe", "developerId": "123"},
            {"_id": "678", "name": "Checkers", "developerId": "123"},
            {"_id": "789", "name": "Chess", "developerId": "234"},
        ];

        var fac = {};

        fac.createWebsite = function(userId, website) {
            website.developerId = userId;
            websites.push(website);
        }

        fac.findWebsitesByUser = function(userId) {
            var ret = [];
            for (var website of websites) {
                if (website.developerId === userId) {
                    ret.push(website);
                }
            }
            return ret;
        }

        fac.findWebsiteById = function(websiteId) {
            for (var website of websites) {
                if (website._id === websiteId) {
                    return website;
                }
            }
            return null;
        }

        fac.updateWebsite = function(websiteId, website) {
            for (var i = 0; i < websites.length; i++) {
                if (websites[i]._id === websiteId) {
                    websites[i] = website;
                    return;
                }
            }
        }

        fac.deleteWebsite = function(websiteId) {
            for (var i = 0; i < websites.length; i++) {
                if (websites[i]._id === websiteId) {
                    websites.splice(i, 1);
                    return;
                }
            }
        }

        return fac;
    }
})();
