module.exports = function(app) {
    var widgets = [
        {_id: "123", widgetType: "HEADING", pageId: "321", size: 2, text: "GIZMODO"},
        {_id: "234", widgetType: "HEADING", pageId: "321", size: 4, text: "Lorem ipsum"},
        {
            _id: "345", widgetType: "IMAGE", pageId: "321", width: "100%",
            url: "http://lorempixel.com/400/200/"
        },
        {_id: "456", widgetType: "HTML", pageId: "321", text: "<p>Lorem ipsum html text</p>"},
        {_id: "567", widgetType: "HEADING", pageId: "321", size: 4, text: "Lorem ipsum"},
        {
            _id: "678", widgetType: "YOUTUBE", pageId: "321", width: "100%",
            url: "https://youtu.be/AM2Ivdi9c4E"
        },
        {_id: "789", widgetType: "HTML", pageId: "321", text: "<p>Lorem ipsum html text2</p>"},
    ];

    app.post("/api/page/:pid/widget", createWidget);
    app.get("/api/page/:pid/widget", findWidgetsByPageId);
    app.get("/api/widget/:wgid", findWidgetById);
    app.put("/api/widget/:wgid", updateWidget);
    app.delete("/api/widget/wgid", deleteWidget);

    function createWidget(req, res) {

    }

    function findWidgetsByPageId(req, res) {

    }

    function findWidgetById(req, res) {

    }

    function updateWidget(req, res) {

    }

    function deleteWidget(req, res) {

    }

};
