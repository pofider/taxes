const fs = require('fs')
const path = require('path')
const Promise = require('bluebird')
const Client = require('jsreport-client')
Promise.promisifyAll(fs)

const credentials = JSON.parse(fs.readFileSync(path.join(__dirname, '../credentials.json')).toString())
const client = Client(credentials.url, credentials.username, credentials.password)

module.exports = (req, p) => {
  return new Promise((resolve, reject) => {
    console.log(`Rendering ${req.template.name}`)
    client.render(req, (err, res) => {
      if (err) {
        return reject(new Error(`Rendering template ${req.template.name} failed:${err}`))
      }

      const stream = fs.createWriteStream(p)
      res.on('end', resolve)
      res.pipe(stream)
    })
  })
}
