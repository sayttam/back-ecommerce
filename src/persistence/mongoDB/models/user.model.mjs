import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const userCollection = "users";

const userSchema = mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    age: { type: Number },
    password: { type: String, required: true },
    cart: { type: mongoose.Schema.Types.ObjectId, ref: 'Carts' },
    role: { type: String, default: 'user', required: true }
});

userSchema.pre('save', function(next) {
    if (!this.isModified('password')) return next();
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10));
    next();
});

const userModel = mongoose.model(userCollection, userSchema);

export default userModel;