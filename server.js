const express = require('express');
const port = 3000;
const app = express();

app.use('/images', express.static('images'));

app.listen(port, (error) => {
    if (error) {
        console.log('Something went wrong', error);
    } else {
        console.log('Server is listening on port: ' + port);
    }
});