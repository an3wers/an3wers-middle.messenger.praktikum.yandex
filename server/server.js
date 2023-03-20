// eslint-disable-next-line import/no-extraneous-dependencies
const fallback = require('express-history-api-fallback')
const express = require('express')

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.static('./dist/'))
app.use(fallback('index.html', { root: './dist/' }))

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}!`)
})
