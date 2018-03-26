const express = require('express');
const app = express();
const path = require('path');

const router = express.Router();

router.route('/:params*')
    .get((req, res) => {
        res.sendFile(path.resolve(`public/${req.path}`));
    });

app.use('/public', router);

app.get('/', (req, res) => res.sendFile(path.resolve('./public/UI/index.html')));

const server = app.listen(3000, () => console.log(`Server is listening on port ${server.address().port}`));

app.use((req, res) => {
    res.sendFile(path.resolve('./public/UI/errorPage.html'));
});