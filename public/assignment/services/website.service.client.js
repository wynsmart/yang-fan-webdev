(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    function WebsiteService($http) {

        return {
            createWebsite: createWebsite,
            findWebsiteById: findWebsiteById,
            findWebsitesByUser: findWebsitesByUser,
            updateWebsite: updateWebsite,
            deleteWebsite: deleteWebsite,
        };

        function createWebsite(userId, website) {
            return $http.post(`/api/user/${userId}/website`, website);
        }

        function findWebsiteById(websiteId) {
            return $http.get(`/api/website/${websiteId}`);
        }

        function findWebsitesByUser(userId) {
            return $http.get(`/api/user/${userId}/websites`);
        }

        function updateWebsite(websiteId, website) {
            return $http.put(`/api/website/${websiteId}`, website);
        }

        function deleteWebsite(websiteId) {
            return $http.delete(`/api/website/${websiteId}`);
        }
    }
})();
