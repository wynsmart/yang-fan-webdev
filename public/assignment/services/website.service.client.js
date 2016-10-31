(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    function WebsiteService() {

        return {
            createWebsite: createWebsite,
            findWebsitesByUser: findWebsitesByUser,
            findWebsiteById: findWebsiteById,
            updateWebsite: updateWebsite,
            deleteWebsite: deleteWebsite,
        };

        function createWebsite(userId, website) {
            website.developerId = userId;
            websites.push(website);
        }

        function findWebsitesByUser(userId) {
            var ret = [];
            for (var website of websites) {
                if (website.developerId === userId) {
                    ret.push(website);
                }
            }
            return ret;
        }

        function findWebsiteById(websiteId) {
            for (var website of websites) {
                if (website._id === websiteId) {
                    return website;
                }
            }
            return null;
        }

        function updateWebsite(websiteId, website) {
            for (var i = 0; i < websites.length; i++) {
                if (websites[i]._id === websiteId) {
                    websites[i] = website;
                    return;
                }
            }
        }

        function deleteWebsite(websiteId) {
            for (var i = 0; i < websites.length; i++) {
                if (websites[i]._id === websiteId) {
                    websites.splice(i, 1);
                    return;
                }
            }
        }
    }
})();
