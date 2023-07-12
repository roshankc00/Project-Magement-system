const mongoose=require('mongoose');

const clientSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:["Not Started","In Progress","Completed"],
        required:true
    },
    clientId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Client"
    }
},{timestamps:true})


module.exports=mongoose.model("Project",clientSchema);