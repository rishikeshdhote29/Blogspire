const mongoose = require("mongoose")
const crypto = require("crypto");
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
        username: {
            type: String,
            required: true,

        },
        email: {
            type: String,
            required: true,

        },

        role: {
            type: String,
            // required: true,
            enum: ['user', 'admin'],
            default: 'user'
        },
        password: {
            type: String,
            required: true,

        },
        lastLogin: {
            type: Date,
            default: Date.now,

        },
        isVerified: {
            type: Boolean,
            default: false

        },
        accountLevel: {
            type: String,
            enum: ['bronze', 'silver', 'gold'],
            default: 'bronze'
        },
        profilePicture: {
            type: String,
            // required: true,
        },
    phone:{
            type: String,
        
    },dob:{
        type:Date,
        }
      ,  coverImage: {
            type: String,
            defaut: ""
        },
        bio: {
            type: String,

        },
        location: {
            type: String,

        },
        notificationType: {
            email: {type: String}


        },
        gender: {
            type: String,
            enum: ['male', 'female', 'prefer not to say', 'non-binary'],
        },
title:{
        type: String,
    
},
    profileViewers:[{
            type: mongoose.Schema.Types.ObjectId,ref:"User",

    }],

    followers:[{type:mongoose.Schema.Types.ObjectId, ref:"User"}],
following:[{type:mongoose.Schema.Types.ObjectId, ref:"User"}],
blockedUser:[{type:mongoose.Schema.Types.ObjectId, ref:"User"}],
posts:[{type:mongoose.Schema.Types.ObjectId, ref:"Post"}],
likedPosts:[{type:mongoose.Schema.Types.ObjectId, ref:"Post"}],

passwordResetToken:{
            type: String,
}    ,
passwordResetExprires:{type:Date},
    accountVerificationToken:{type:String,default:""},
    accountVerificationExpires:{type:Date},



},
    {timestamps:true,
     toJSON:{
        virtual:true
     },
        toObject: {
        virtual: true,
        }},

);

userSchema.methods.generatePasswordResetToken=function(){
    //generate token
    const resetToken= crypto.randomBytes(20).toString("hex");
    
    this.passwordResetToken=crypto.createHash('sha256').update(resetToken).digest('hex');
    
    //set the expiry time to 10 min
    this.passwordResetExprires=Date.now()+10*60*1000;
    
    return resetToken;
    
    
}
userSchema.methods.generateAccountVerificationToken=function(){
    
    //generate token
    const verificationToken= crypto.randomBytes(20).toString("hex");
    
    this.accountVerificationToken=crypto.createHash('sha256').update(verificationToken).digest('hex');
    
    //set the expiry time to 10 min
    this.accountVerificationExpires=Date.now()+10*60*1000;
    
    return verificationToken;
    
    
}

//convert schema to model
const User = mongoose.models.User || mongoose.model("User", userSchema);
module.exports = User;

