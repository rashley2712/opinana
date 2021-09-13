const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!<br/>This is Opinana.')
})

app.use(express.static('/var/www/opinana'));

app.listen(port, () => {
  console.log(`opinana is listening on http://localhost:${port}`)
})

