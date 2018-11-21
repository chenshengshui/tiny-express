const express = require('../index');

const app = express();

app.get('/word', function(req, res) {
    res.send('Hello World');
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000');
})