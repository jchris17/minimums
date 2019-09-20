'use strict';

const express = require('express');

const app = express();

app.use((req, res, next) => { 
	res.send(`hi there ${req.path}`);
});

app.listen(3000, () => {
	console.log('I AM ALIVE');
})
