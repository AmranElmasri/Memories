import mongoose from 'mongoose';


const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

        console.log(`MongoDB Connected: ${connection.connection.host}`.cyan.underline)

    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

export default connectDB;