(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService() {
        var widgets = [
            {_id: "123", widgetType: "HEADER", pageId: "321", size: 2, text: "GIZMODO"},
            {_id: "234", widgetType: "HEADER", pageId: "321", size: 4, text: "Lorem ipsum"},
            {
                _id: "345", widgetType: "IMAGE", pageId: "321", width: "100%",
                url: "http://lorempixel.com/400/200/"
            },
            {_id: "456", widgetType: "HTML", pageId: "321", text: "<p>Lorem ipsum html text</p>"},
            {_id: "567", widgetType: "HEADER", pageId: "321", size: 4, text: "Lorem ipsum"},
            {
                _id: "678", widgetType: "YOUTUBE", pageId: "321", width: "100%",
                url: "https://www.youtube.com/embed/DQOYfYsUKl0"
            },
            {_id: "789", widgetType: "HTML", pageId: "321", text: "<p>Lorem ipsum html text2</p>"},
        ];

        return {
            createWidget: _createWidget,
            findWidgetsByPageId: _findWidgetsByPageId,
            findWidgetById: _findWidgetById,
            updateWidget: _updateWidget,
            deleteWidget: _deleteWidget,
        };

        function _createWidget(pageId, widget) {
            widget.pageId = pageId;
            widgets.push(widget);
        }

        function _findWidgetsByPageId(pageId) {
            var ret = [];
            for (var widget of widgets) {
                if (widget.pageId === pageId) {
                    ret.push(widget);
                }
            }
            return ret;
        }

        function _findWidgetById(widgetId) {
            for (var widget of widgets) {
                if (widget._id === widgetId) {
                    return widget;
                }
            }
            return null;
        }

        function _updateWidget(widgetId, widget) {
            for (var i = 0; i < widgets.length; i++) {
                if (widgets[i]._id === widgetId) {
                    widgets[i] = widget;
                    return;
                }
            }
        }

        function _deleteWidget(widgetId) {
            for (var i = 0; i < widgets.length; i++) {
                if (widgets[i]._id === widgetId) {
                    widgets.splice(i, 1);
                    return;
                }
            }
        }
    }
})();
