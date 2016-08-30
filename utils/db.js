import mongoose from 'mongoose'
import { port, connexionString } from './config'

mongoose.Promise = global.Promise;
mongoose.connect(connexionString)
mongoose.connection.on('error', console.error)
console.log('mongoose is connect');
