import mongoose from "mongoose";
import bcrypt from "bcryptjs"

const custSchema =  mongoose.Schema({
    customer_name:{
        type:String,
        required:true
    },
    customer_email:{
        type:String,
        required:true,
        unique:true
    },
    customer_mobile:{
        type:Number,
        required:true,
        unique:true,
        length:10,
        default:0
    },
    password:{
        type:String,
        required:true

    },
    isAdmin:{
        type:Boolean,
        required:true,
        default:false
    }
},{
    timestamps:true
})

custSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}

custSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
      const hashPassword = await bcrypt.hashSync(this.password, 10);
      this.password = hashPassword;
    }
    return next();
  });
const Cust = mongoose.model("User",custSchema)

export default Cust