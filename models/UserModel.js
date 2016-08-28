import mongoose from 'mongoose'
import validate from 'mongoose-validator'
const Schema = mongoose.Schema

const userSchema = new Schema({
  id: { type:String, required:true, unique:true, index:true, default:mongoose.Types.ObjectId },
  email: {
    type: String,
    lowercase: true,
    required: true,
    validate: validate({
      validator: 'isEmail',
      message: '邮箱格式错误',
    })
  },
  name: { type: String, required: true, minlength: 1 },
  password: { type: String, required: true },
  // registed: { type: Date, default: Date.now },
  // regdevice: { type: String },
  regcity: { type: String, required: true }
})

// var UserModel = mongoose.model('UserModel', userSchema)

/**
 * todo
 */

 function getUserById(id) {

   return new Promise((resolve, reject) => {
     UserModel.findById(id, function (err, doc){
       console.log(doc)
       err ? reject(err) : resolve(doc);
     // doc 是单个文档
     });
   });
 }

 exports.getUserById = getUserById;

// find by id
userSchema.statics.findById = async function (_id) {
  console.log("adfasdf")
  // console.log(_id)
  const exists = await this.findById(_id)
  // console.log(exists)
  console.log("111111")
  if (exists) {
    return {
      done: true,
      data: exists
    }
  }
}

// userSchema.findById = async function (_id) {
//   const exists = await this.findById(_id)
//   console.log(exists)
//   console.log("asdfad")
//   if (exists) {
//     return {
//       done: true,
//       data: exists
//     }
//   }
// }

userSchema.statics.findAll = async function () {
  const exists = await this.findAll()
  if (exists) {
    return {
      done: true,
      data: exists
    }
  }
}


userSchema.statics.create = async function (obj) {
  const user = new this(obj)

  const exists = await this.findOne({email: user.email})
  if (exists) {
    return {
      done: false,
    }
  }
  const back = await user.save()
  if (back) {
    return {
      done: true,
      data: back
    }
  }
}

export default mongoose.model('UserModel', userSchema)
