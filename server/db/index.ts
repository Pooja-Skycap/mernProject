import mongoose from 'mongoose'
import env from '../utils/validateEnv'

console.log('env.MONGOURL', env.MONGOURL)
export const connectDB = () =>{
    mongoose.connect(`${env.MONGOURL}`)
    .then(()=>{
        console.log("Successfully connected to the Database")
    })
    .catch(console.error)
}