const mongoose=require('mongoose')

const connectDb=()=>{
    mongoose.connect(process.env.MONGO_URL).then(()=>{
        console.log("connnected to the database");
    }).catch((error)=>{
        console.log(error)

    })
}

module.exports=connectDb