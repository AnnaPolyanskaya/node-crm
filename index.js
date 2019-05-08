const app = require('./app.js');
const port = process.env.PORT || 5000;
/* Creatng server */
app.listen(port, () => console.log(`Server has been started at port ${port}`));

