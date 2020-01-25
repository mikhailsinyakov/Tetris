const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();
const dbHandler = require('./dbHandler');
dbHandler.connect();

const app = express();
app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json());
app.use((err, req, res, next) => {
	if (err) res.status(400).json({error: 'Invalid json'});
	else next();
});

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.route('/api/records')
	.get((req, res) => {
		dbHandler.getRecords()
			.then(records => res.status(200).json(records))
			.catch(e => res.status(500).json({error: 'Error connecting to database'}));
	}).post((req, res) => {
		const contentType = req.get('Content-Type');
		if (contentType != 'application/json') {
			res.status(400).json({error: 'Content-Type should be application/json'});
			return;
		}
		const newRecord = req.body;
		const { username, record } = newRecord;
		if ( !username || !record || typeof username != 'string' || typeof record != 'number') {
			res.status(422).json({error: 'JSON should have non-empty username and record props'});
			return;
		} 
		dbHandler.handleNewRecord({username, record})
			.then(() => res.status(204).end())
			.catch(e => res.status(500).json({error: 'Error connecting to database'}));
	});

app.all('*', (req, res) => {
	res.status(404).json({error: 'The operation is not supported'});
});

app.listen(process.env.PORT || 8080);