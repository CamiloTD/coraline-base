const http = require('http');
const path = require('path');
const express = require('express');
const opn = require('opn');

let app = express();

app.use(function (rq, rs, next) {
	let { url } = rq;
	if(url.substring(url.length -4) === '.kmi') {
		rs.end(`
			<!DOCTYPE html>
			<html>
			<head>
			</head>
			<body>
				<script src="/kmi_modules/require.kmi.js"></script>

				<meta kmi-init="${url.substring(0, url.length - 4)}">
			</body>
			</html>
		`);
	} else next();
});

app.get('/@test.js', (rq, rs) => {
	rs.sendFile(path.join(__dirname, 'test-entry.js'));
});

app.get('/', (rq, rs) => {
	rs.end(`
			<!DOCTYPE html>
			<html>
			<head>
			</head>
			<body>
				<script src="/kmi_modules/require.kmi.js"></script>

				<meta kmi-init="@test">
			</body>
			</html>
	`);
});

app.use(express.static('build'));

app.listen(8080, () => {
	console.log("Server is listening at port :8080");
	opn('http://localhost:8080/');
});