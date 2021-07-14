const RouterUser = require('./user');
const RouterAdmin = require('./admin')

function route (app) {
    app.use('/api', RouterUser);
    app.use('/api', RouterAdmin);
}

module.exports = route;