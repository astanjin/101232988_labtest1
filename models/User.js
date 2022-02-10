const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        name: { type: String, required: [true, "first Name is required"] },
      
        username: {
           type: String,
            required:true,
            lowercase: true,
             trim: true,
            unique: [true, "This username is already taken, please submit another"],
        },
       
       password: { type: String,required: [true, "password is needed"],
        },
    },
        { timeseries: true }
);

const User = new mongoose.model("Users", UserSchema);

module.exports = User;