module.exports = function (app) {
    var widgets = [
        {
            _id: "123", widgetType: "HEADING", pageId: "321",
            size: 2, text: "GIZMODO", order: 123
        },
        {
            _id: "234", widgetType: "HEADING", pageId: "321",
            size: 4, text: "Lorem ipsum", order: 234,
        },
        {
            _id: "345", widgetType: "IMAGE", pageId: "321", width: "100%",
            url: "http://lorempixel.com/400/200/", order: 345,
        },
        {
            _id: "456", widgetType: "HTML", pageId: "321",
            text: "<p>Lorem ipsum html text</p>", order: 456,
        },
        {
            _id: "567", widgetType: "HEADING", pageId: "321", size: 4,
            text: "Lorem ipsum", order: 567
        },
        {
            _id: "678", widgetType: "YOUTUBE", pageId: "321", width: "100%",
            url: "https://youtu.be/AM2Ivdi9c4E", order: 678,
        },
        {
            _id: "789", widgetType: "HTML", pageId: "321",
            text: "<p>Lorem ipsum html text2</p>", order: 789,
        },
    ];

    app.post("/api/page/:pid/widget", createWidget);
    app.get("/api/page/:pid/widget", findWidgetsByPageId);
    app.get("/api/widget/:wgid", findWidgetById);
    app.put("/api/widget/:wgid", updateWidget);
    app.put("/api/page/:pid/widget/reorder", reorderWidgets)
    app.delete("/api/widget/:wgid", deleteWidget);

    function createWidget(req, res) {
        var widget = req.body;
        widget.order = Date.now();
        widget._id = widget.order.toString();
        widget.pageId = req.params.pid;
        widgets.push(widget);
        res.json(widget);
    }

    function findWidgetsByPageId(req, res) {
        var pid = req.params.pid;
        var result = [];
        for (var i = 0; i < widgets.length; i++) {
            if (widgets[i].pageId === pid) {
                result.push(widgets[i]);
            }
        }
        res.json(result);
    }

    function findWidgetById(req, res) {
        var wgid = req.params.wgid;
        for (var wg of widgets) {
            if (wg._id === wgid) {
                res.json(wg);
                return;
            }
        }
        res.sendStatus(204);
    }

    function updateWidget(req, res) {
        var wgid = req.params.wgid;
        var widget = req.body;
        for (var i = 0; i < widgets.length; i++) {
            if (widgets[i]._id === wgid) {
                widgets[i] = widget;
            }
        }
        res.sendStatus(200);
    }

    function reorderWidgets(req, res) {
        var pid = req.params.pid;
        var newOrder = req.body;
        for (var i = 0; i < newOrder.length; i++) {
            for (var w of widgets) {
                if (w._id === newOrder[i]) {
                    w.order = i;
                }
            }
        }
    }

    function deleteWidget(req, res) {
        var wgid = req.params.wgid;
        for (var i = 0; i < widgets.length; i++) {
            if (widgets[i]._id === wgid) {
                widgets.splice(i, 1);
            }
        }
        res.sendStatus(200);
    }

};
