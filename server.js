import { createServer } from 'http';
import fs from 'fs/promises';
import url from 'url';
import path from 'path';
import 'dotenv/config';

const PORT = process.env.PORT || 3000;
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = createServer(async (req, res) => {
	let filePath = '';

	switch (req.url) {
		case '/':
			filePath = path.join(__dirname, 'views', 'index.html');
			res.statusCode = 200;
			break;
		case '/about':
			filePath = path.join(__dirname, 'views', 'about.html');
			res.statusCode = 200;
			break;
		case '/contact-me':
			filePath = path.join(__dirname, 'views', 'contact-me.html');
			res.statusCode = 200;
			break;
		case '/contact':
			res.setHeader('Location', '/contact-me');
			res.statusCode = 302;
			break;
		default:
			filePath = path.join(__dirname, 'views', '404.html');
			res.statusCode = 404;
			break;
	}

	res.setHeader('Content-Type', 'text/html');
	const fileContent = await fs.readFile(filePath);
	res.write(fileContent);
	res.end();
});

server.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
