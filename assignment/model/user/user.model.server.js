module.exports = function (db) {
    var UserSchema = require('./user.schema.server')(db);
    var UserModel = db.model('UserModel', UserSchema);
    return {
        createUser: createUser,
        findUserById: findUserById,
        findAllWebsitesForUser: findAllWebsitesForUser,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        updateUser: updateUser,
        deleteUser: deleteUser,
        findUserByFacebookId: findUserByFacebookId,
    };

    function createUser(user) {
        return UserModel.create(user);
    }

    function findUserById(userId) {
        return UserModel.findOne({_id: userId});
    }

    function findAllWebsitesForUser(userId) {
        return UserModel.findOne({_id: userId}).populate('websites');
    }

    function findUserByUsername(username) {
        return UserModel.findOne({username: username});
    }

    function findUserByCredentials(username, password) {
        return UserModel.findOne({username: username, password: password});
    }

    function updateUser(userId, user) {
        return UserModel.update({_id: userId}, user);
    }

    function deleteUser(userId) {
        console.log('deleting user:', userId);
        return UserModel.remove({_id: userId});
    }

    function findUserByFacebookId(facebookId) {
        return UserModel.findOne({'facebook.id': facebookId});
    }

};
