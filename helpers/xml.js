import path from 'path';
import fs from 'fs';
import { parseStringPromise } from 'xml2js';

export async function parseXmlFile(filePath) {
	const dataPath = path.join(process.cwd(), filePath);
	return new Promise((resolve, reject) => {
		fs.readFile(dataPath, { encoding: 'utf-8' }, (err, data) => {
			if (err) reject(err);
			else resolve(data);
		});
	}).then(data => parseStringPromise(data));
}
