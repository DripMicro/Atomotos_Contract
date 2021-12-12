const express = require("express");
const path = require('path');
const https = require('https');
const http = require('http');
const fs = require('fs');
const PORT = process.env.PORT || 80;

const app = express();

app.use(express.static(path.resolve(__dirname, '../BlockVault/client/build')));

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});
app.get("/.well-known/pki-validation/B0F026A73BA4CFC941BE2DEFF92FA552.txt", (req, res) => {
  res.sendFile(path.resolve(__dirname, './', 'B0F026A73BA4CFC941BE2DEFF92FA552.txt'));
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../BlockVault/client/build', 'index.html'));
});

const httpsServer = https.createServer({
	key: fs.readFileSync('server/private.key'),
    cert: fs.readFileSync('server/certificate.crt')
}, app);

httpsServer.listen(443, () => {
    console.log('HTTPS Server running on port 443');
});

// app.listen(80, () => {
//   console.log(`Server listening on 80`);
// });

http.createServer(function (req, res) {
    res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
     res.end();
}).listen(80, () => {
    console.log('HTTP Server running on port 80');
});
