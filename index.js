const express = require('express');
const app = express();

const { PORT } = require('./src/constans');
const routers = require('./router');
const expressConfig = require('./src/config/expressConfig');
const hablebarsConfig = require('./src/config/handlerConfig');
const dbConnect = require('./src/config/dbConfig');

expressConfig(app);
hablebarsConfig(app);

app.use(routers);
dbConnect()
    .then(() => console.log('Successfully connected DB...'))
    .catch((err) => console.error(`Error connecting DB: ${err}`));

app.listen(PORT, () => console.log(`Server listening on port ${PORT}.....`));
