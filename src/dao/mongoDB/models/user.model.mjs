import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const userCollection = "users";

const userSchema = mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    age: { type: Number, required: true },
    password: { type: String, required: true },
    cart: { type: mongoose.Schema.Types.ObjectId, ref: 'Carts' },
    role: { type: String, default: 'user' }
});

userSchema.pre('save', function(next) {
    if (!this.isModified('password')) return next();
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10));
    next();
});

const userModel = mongoose.model(userCollection, userSchema);

export default userModel;