const mongoose = require("mongoose")

function connecttoDb(){
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{
        console.log("Connect to Db")
    })

    .catch((err)=>{
        console.log("Error connecting to MongoDb: ",err)

    })
}

module.exports=connecttoDb
