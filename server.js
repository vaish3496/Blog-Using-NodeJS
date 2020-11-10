const { urlencoded } = require('express')
const express = require('express')
const mongoose = require('mongoose')
const Article = require('./models/article')
const methodOverride = require('method-override')
const app = express()
const articleRouter = require('./routes/articles')

mongoose.connect('mongodb://localhost/blog', {useNewUrlParser: true, useUnifiedTopology: true})

const port = 8800

app.set('view engine','ejs')



app.use(express.urlencoded({extended: false}))

app.use(methodOverride('_method'))

app.get('/', async (req, res) => {
    const articles = await Article.find().sort({createdAt: "desc"})
    res.render('articles/index', {articles : articles})
})

app.listen(port)


app.use('/articles',articleRouter)

