import mongoose from 'mongoose'
import { port, connexionString } from './config'

mongoose.connect(connexionString)
mongoose.connection.on('error', console.error)
console.log('mongoose is connect');
