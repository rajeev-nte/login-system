// import mongoose from "mongoose";
// const connectDB = async ()=>{

//     mongoose.connection.on('connected',() => console.log("Database connected"));
//     await mongoose.connect('${process.env.MONGODB_URL}')
// }

// export default connectDB;

import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on('connected', () => {
      console.log("Database connected");
    });

    await mongoose.connect(process.env.MONGODB_URL);
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
  }
};

export default connectDB;

