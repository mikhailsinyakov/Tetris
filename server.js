const express = require('express');
const path = require('path');
require('dotenv').config();
const dbHandler = require('./dbHandler');
const app = express();
app.use(express.static(path.join(__dirname, 'build')));

(async () => {
	await dbHandler.connect();
	app.get('/', (req, res) => {
		res.sendFile(path.join(__dirname, 'build', 'index.html'));
	});
	
	app.listen(process.env.PORT || 8080);
})();

process.on('SIGINT', async () => {
	await dbHandler.close();
  process.exit(0);
});