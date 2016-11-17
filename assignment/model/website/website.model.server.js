module.exports = function (db) {
    var WebsiteSchema = require('./website.schema.server')(db);
    var WebsiteModel = db.model('WebsiteModel', WebsiteSchema);
    return {
        createWebsiteForUser: createWebsiteForUser,
        findAllPagesForWebsite: findAllPagesForWebsite,
        findWebsiteById: findWebsiteById,
        updateWebsite: updateWebsite,
        deleteWebsite: deleteWebsite,
    };

    function createWebsiteForUser(userId, website) {
        website._user = userId;
        return WebsiteModel.create(website);
    }

    function findAllPagesForWebsite(websiteId) {
        return WebsiteModel.findOne({_id: websiteId}).populate('pages');
    }

    function findWebsiteById(websiteId) {
        return WebsiteModel.findOne({_id: websiteId});
    }

    function updateWebsite(websiteId, website) {
        return WebsiteModel.update({_id: websiteId}, website);
    }

    function deleteWebsite(websiteId) {
        console.log('deleting website:', websiteId);
        return WebsiteModel.remove({_id: websiteId});
    }
};
