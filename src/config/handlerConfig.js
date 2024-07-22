const hablebars = require('express-handlebars');

const hablebarsConfig = (app) => {
    app.engine('hbs', hablebars.engine({ extname: 'hbs' }));
    app.set('view engine', 'hbs');
    app.set('views', 'views');
}

module.exports = hablebarsConfig