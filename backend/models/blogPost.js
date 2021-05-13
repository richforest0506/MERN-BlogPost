const mongoose = require('mongoose');

const {Schema} = mongoose;
 
const blogPostShema= new Schema({
    title: {
        type: String, required:true
    },
    content: {
        type: String, required:true
    }

})
module.exports= mongoose.model('blogPost', blogPostShema);