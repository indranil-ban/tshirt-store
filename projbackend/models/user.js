var mongoose = require("mongoose");
const crypto = require('crypto');
const uuidv1 = require("uuid/v1");
var userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 32,
        trim: true
    
    },
    lastname: {
        type: String,
        required: false,
        maxlength: 32,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    userinfo: {
        type: String,
        trim: true,
    },
    encry_password: {
        type: String,
        required: true,
    },
    salt: {
        type: String,
    },
    role: {
        type: Number,
        default: 0,
    },
    purchases: {
        type: Array,
        default: [],
    }
},
{timestamps: true})

userSchema.virtual("password")
.set(function(password)
{
    this._password = password;
    this.salt = uuidv1();
    this.encry_password = this.securepassword(password)
})
.get(function(){
    return this._password = password;
}
)

userSchema.methods = {
    authenticate: function(plainpassword){
        return this.securepassword(plainpassword) === this.encry_password;
    },
    securepassword: function(plainpassword)
        {
            if(!plainpassword)
                return "";
            try {
                return crypto.createHmac('sha256', this.salt)
                .update(plainpassword)
                .digest('hex');
                
            } catch (err) {
                return "";
                
            }
        }

}

module.exports = mongoose.model("User", userSchema);
