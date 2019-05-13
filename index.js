const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const fs = require('fs')
const readline = require('readline')
const multer = require('multer')
const ejs = require('ejs')
const passwordValidator = require('./functions')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.set('view engine', 'ejs')

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './uploads')
	}, 
	filename: (req, file, cb) => {
		cb(null, Date.now() + '_' + file.originalname)
	}
})

const upload = multer({ storage: storage}).single('userfile')

app.get('/', (req, res) => { // middleware to display landing page for file upload
	res.sendFile(__dirname + "/index.html")
})

app.post('/fileUpload', (req, res) => { // middleware for processing file upload and 
	// check whether passwords are valid or not
	let html
	upload(req, res, (err) => {
		if(err) {
			res.send('Error uploading file')
		} else {
			if(req.file === undefined) { // if file is not present
				res.send('File not uploaded')
			} else {
				let resultArr = []
				const ext = path.extname(req.file.filename)
				if(ext === '.txt') {
					const file = path.join(__dirname, 'uploads/' + req.file.filename)
					const linereader = readline.createInterface({
						input: fs.createReadStream(file)
					})
					linereader.on('line', (pass) => { // to read the file line by line
						if(pass == 'end') {
							ejs.renderFile(path.join(__dirname, '/result.ejs'), {
								passwords: resultArr
							}, (err, result) => {
								if(result) {
									html = result
									fs.writeFile('./result.html', html, (err) => {
										if(err) {
											res.send('Error while storing file')
										} else {
											res.sendFile(__dirname + '/result.html')
										}
									})
								} else {
									res.send('error while rendering ejs file')
								}
							})
						} else {
							let result = '<'+pass+'> '
							if(passwordValidator(pass)) {
								result+='is acceptable.'
							} else {
								result+='is not acceptable.'
							}
							resultArr.push(result)
						}
					})
				} else {
					res.send('.txt File not uploaded')
				}
			}
		}
	})
})

const port = 9000

app.listen(port, () => {
	console.log('Server running at port ' + port)
})