require('dotenv').config();


const express = require('express');
const dbConnection = require('./db');
const app = express();
app.use(express.json());
const middleware = require('./middleware');

// app.use(require("./middleware/headers"));

const controllers = require('./controllers');


app.use('/auth', controllers.usercontroller);
app.use(middleware.validateSession)
app.use('/posts', controllers.postcontroller);
app.use('/comments', controllers.commentscontroller);
// app.use('follow', controllers.followcontroller);

//try {
dbConnection
    .authenticate()
    .then(async () => await dbConnection.sync()) // force: true will drop all tables in pgAdmin and resync them. This is necessary after you make a change to a model, and need to sync any new table headers to the database.
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`[SERVER]: App is listening on ${process.env.PORT}`);
        });
    })
    .catch(error => console.log(`[SERVER]: ${error}`))
//} catch (err) {
    // console.log('[SERVER]: Server crashed');
    // console.log(err);
//}
