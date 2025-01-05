try{
const mongoose = require('mongoose')

const connectToDB= async ()=>{
   
        await mongoose.connect(process.env.MONGO_URI).then(()=>{
            console.log("connection done")
        })
}
module.exports = connectToDB

}catch (e){
    console.log("mongoose error is :", e)
}
