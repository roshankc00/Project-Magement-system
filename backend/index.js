const express=require('express')
require('dotenv').config({path:'config/.env'});
const schema=require('./schema/schema')
const {graphqlHTTP} =require('express-graphql')
const connectDb =require("./config/connetDb")


// rest variables 
const app=express();
const PORT=process.env.PORT || 4000
NODE_ENV=process.env.NODE_ENV;
connectDb()


// listening to the port 
app.use('/graphql',graphqlHTTP({
    schema,
    graphiql:NODE_ENV==="Development"
}))
app.listen(PORT,()=>{
    console.log(`running at the ${PORT} in ${NODE_ENV} mode `);
})