(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService)
        .factory('FlickrService', FlickrService);

    function WidgetService($http) {

        return {
            createWidget: createWidget,
            findWidgetById: findWidgetById,
            findWidgetsByPageId: findWidgetsByPageId,
            updateWidget: updateWidget,
            reorderWidgets: reorderWidgets,
            deleteWidget: deleteWidget,
        };

        function createWidget(pageId, widget) {
            return $http.post(`/api/page/${pageId}/widget`, widget);
        }

        function findWidgetById(widgetId) {
            return $http.get(`/api/widget/${widgetId}`);
        }

        function findWidgetsByPageId(pageId) {
            return $http.get(`/api/page/${pageId}/widgets`);
        }

        function updateWidget(widgetId, widget) {
            return $http.put(`/api/widget/${widgetId}`, widget);
        }

        function reorderWidgets(pageId, newOrder) {
            return $http.put(`/api/page/${pageId}/widget/reorder`, newOrder);
        }

        function deleteWidget(widgetId) {
            return $http.delete(`/api/widget/${widgetId}`);
        }
    }

    function FlickrService($http) {
        return {
            searchPhotos: searchPhotos,
        };

        function searchPhotos(searchText) {
            var key = "bf76aa4c55dbe3f4916733e46d4f8cfc";
            var secret = "36f8885a9ce3a9e3";
            var urlBase = 'https://api.flickr.com/services/rest/?method=flickr.photos.search';
            var url = `${urlBase}&format=json&api_key=${key}&text=${searchText}`;
            return $http.get(url);
        }
    }

})();
