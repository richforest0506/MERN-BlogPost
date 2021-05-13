require('dotenv').config();
const express = require("express")
const app = express()
const cors = require("cors");
const body_parser = require("body-parser");
const logger = require("morgan");
const mongoose = require('mongoose');
const port = process.env.PORT || 3001;

const Blog = require('./models/blogPost')
app.use(logger('dev'));
app.use(cors());

// parsing json objects
app.use(express.json({ limit: "30mb", extended: true }));

//parsing bodies from URL
app.use(express.urlencoded({ limit: "30mb", extended: true }));

// routing

app.get('/', async (req, res) => {
   const blogs = await Blog.find();
   console.log(blogs)
   res.status(200).send({ blogs: blogs })
})

app.get('/:id', async (req, res) => {
   let id = req.params.id;
   let blogById = await Blog.findById(id);
   res.status(200).send(blogById);
   console.log('Blog with id ' + req.params.id + ' is found')
})
app.post('/addBlog', async (req, res) => {
   try {
      await Blog.findOne({ title: req.body.title }, (err, blog) => {
         if (err) console.log(err)
         if (blog) {
            res.status(400).send({ msg: 'Blog with this name already exists' })
         }
         else {
            new Blog(req.body).save((err, blog) => {
               if (err) console.log(err)
               else {
                  res.status(200).send({ msg: 'New blog saved' })
               }
            })
         }
      })
   } catch (err) {
      res.status(400).json({ msg: ' Bad request' })
   }
   app.put('/:id', async (req, res) => {
      const id = req.params.id;
      const body = req.body;
      console.log(body)
      await Blog.findByIdAndUpdate(id, { title: body.title, content: body.content },
         function (err, blog) {
            if (err) {
               console.log(err)
            }
            else {
               console.log("Updated Blog");
               res.status(200).send({ msg: 'Updated blog.' });

            }
         })
   })
   app.delete('/:id', async (req, res) => {
      try {
         const id = req.params.id;
       const removed=  await Blog.findByIdAndDelete(id);
       console.log(removed)
         res.status(200).send(removed)
      } catch (err) {
         if (err) {
            console.log(err)
            res.status(400).json({
               msg: 'Bad request.',
               err
            })
         }
      }
   })

})

// connect to database
mongoose.connect(process.env.MONGO_DEV_URI, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
   useFindAndModify: false
})
   .then(console.log("Database connected!"))
   .catch(err => console.log(err))



// app listens for requsets
app.listen(port, function () {
   console.log(`App running on ${port}`);
});
module.exports = app