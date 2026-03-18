const mongoose=require('mongoose')
const connectDB= async()=> {
    try{
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("MongoDB Connected");
    }catch(e){
        console.error(e);

    }
}
module.exports = connectDB;