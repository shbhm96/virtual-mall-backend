import mongoose from "mongoose";
import bcrypt from "bcryptjs"

const socialAccountSchema = mongoose.Schema({
    facebook_url:{
        type:String
    },
    instagram_url:{
        type:String
    },
    youtube_url:{
        type:String
    },
    twitter_url:{
        type:String
    }
})

const visitorSchema = mongoose.Schema({
    custId:{
        type:String,
        required:true
    },
    visitedOn:{
        type:Date,
        required:true
    }
})

const reviewSchema = mongoose.Schema({
    cust:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Cust"
    },
    customer_name:{
        type:String,
        required:true,
    },
    rating:{
        type:Number,
        required:true
    },
    Comment:{
        type:String,        
    }
})

const sellerSchema = mongoose.Schema({
    businessName:{
        type:String,
        required:true
    },
    businessOwnerName:{
        type:String,
        required:true
    },
    sellerEmail:{
        type:String,
        required:true,
        unique:true
    },
    sellerMobile:{
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
    aadharNumber:{
        type:Number,
        required:true,
        unique:true
    },
    isAdmin:{
        type:Boolean,
        default:false,
        require:true
    },
    url:{
        type:String,
        default:""
    },
    rentPaid:{
        type:Boolean,
        default:true
    },
    visitors:[visitorSchema],
    reviews:[reviewSchema],
    socialAccounts:socialAccountSchema,
},{
    timestamps:true
})

sellerSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}

sellerSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
      const hashPassword = await bcrypt.hashSync(this.password, 10);
      this.password = hashPassword;
    }
    return next();
  });
const Seller = mongoose.model("Seller",sellerSchema)

export default Seller