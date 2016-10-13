(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService() {
        var widgets = [
            {"_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
            {"_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            {
                "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "http://lorempixel.com/400/200/"
            },
            {"_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
            {"_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            {
                "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E"
            },
            {"_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
        ];

        var fac = {};

        fac.createWidget = function (pageId, widget) {
            widget.pageId = pageId;
            widgets.push(widget);
        }

        fac.findWidgetsByPageId = function (pageId) {
            var ret = [];
            for (var widget of widgets) {
                if (widget.pageId === pageId) {
                    ret.push(widget);
                }
            }
            return ret;
        }

        fac.findWidgetById = function (widgetId) {
            for (var widget of widgets) {
                if (widget._id === widgetId) {
                    return widget;
                }
            }
            return null;
        }

        fac.updateWidget = function (widgetId, widget) {
            for (var i = 0; i < widgets.length; i++) {
                if (widgets[i]._id === widgetId) {
                    widgets[i] = widget;
                    return;
                }
            }
        }

        fac.deleteWidget = function (widgetId) {
            for (var i = 0; i < widgets.length; i++) {
                if (widgets[i]._id === widgetId) {
                    widgets.splice(i, 1);
                    return;
                }
            }
        }

        return fac;
    }
})();
