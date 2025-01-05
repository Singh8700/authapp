const mongoose = require("mongoose")

const createUserSchema = new mongoose.Schema({
        userName: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
            unique: true,
            minlength: [3, 'Username Must Be at least 3 characters long']
        },
        fullName:{
            type: String,
            required:true,
            lowercase:true,
            trim: true,
            minlength: [3, 'Username Must Be at least 3 characters long']
        },
        contact:{
            type: Number,
            required:true,
            trim: true,
            minlength: [10, 'Mobile Must Be at least 10 characters long'],
            maxlength:[10, 'email Must Be at least 10 characters long']
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
            unique: true,
            minlength: [10, 'email Must Be at least 10 characters long']
        },
        password: {
            type: String,
            required: true,
            trim: true,
            minlength: [5, 'Username Must Be at least 3 characters long']
        },
})

const userModel = mongoose.model("authTestUSer",createUserSchema)

module.exports = userModel
