(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService() {

        return {
            createWidget: createWidget,
            findWidgetsByPageId: findWidgetsByPageId,
            findWidgetById: findWidgetById,
            updateWidget: updateWidget,
            deleteWidget: deleteWidget,
        };

        function createWidget(pageId, widget) {
            widget.pageId = pageId;
            widgets.push(widget);
        }

        function findWidgetsByPageId(pageId) {
            var ret = [];
            for (var widget of widgets) {
                if (widget.pageId === pageId) {
                    ret.push(widget);
                }
            }
            return ret;
        }

        function findWidgetById(widgetId) {
            for (var widget of widgets) {
                if (widget._id === widgetId) {
                    return widget;
                }
            }
            return null;
        }

        function updateWidget(widgetId, widget) {
            for (var i = 0; i < widgets.length; i++) {
                if (widgets[i]._id === widgetId) {
                    widgets[i] = widget;
                    return;
                }
            }
        }

        function deleteWidget(widgetId) {
            for (var i = 0; i < widgets.length; i++) {
                if (widgets[i]._id === widgetId) {
                    widgets.splice(i, 1);
                    return;
                }
            }
        }
    }
})();
