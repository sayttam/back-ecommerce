import { Router } from 'express';
import userModel from '../dao/mongoDB/models/user.model.mjs';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import auth from '../middleware/auth.middleware.mjs';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const result = await userModel.find();
        res.send({ status: 'success', payload: result });
    } catch (error) {
        res.status(500).send({ status: 'error', message: error.message });
    }
});

router.post('/register', async (req, res) => {
    const { first_name, last_name, age, email, password, cart, role } = req.body;
    try {
        const user = new userModel({ first_name, last_name, age, email, password, cart, role });
        await user.save();
        res.send({ status: 'success', payload: user });
    } catch (error) {
        res.status(400).send({ status: 'error', message: error.message });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (!user) return res.status(400).send({ message: 'User not found' });
        const validPassword = bcrypt.compareSync(password, user.password);
        console.log(password);
        console.log(user.password)
        console.log(validPassword);
        
        if (!validPassword) return res.status(400).send({ message: 'Invalid password' });

        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true }).send({ message: 'Logged in successfully' });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

router.get('/current', auth, (req, res) => {
    res.send({ status: 'success', payload: req.user });
});

router.put('/:uid', async (req, res) => {
    const uid = req.params.uid;
    const { first_name, last_name, age, email, password, cart, role } = req.body;
    try {
        const user = await userModel.findOne({ _id: uid });
        if (!user) throw new Error('User not found');

        user.first_name = first_name ?? user.first_name;
        user.last_name = last_name ?? user.last_name;
        user.age = age ?? user.age;
        user.email = email ?? user.email;

        if (password) user.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
        user.cart = cart ?? user.cart;
        user.role = role ?? user.role;

        await user.save();
        res.send({ status: 'success', payload: user });
    } catch (error) {
        res.status(400).send({ status: 'error', message: error.message });
    }
});

router.delete('/:uid', async (req, res) => {
    const uid = req.params.uid;
    try {
        const result = await userModel.deleteOne({ _id: uid });
        res.status(200).send({ status: 'success', payload: result });
    } catch (error) {
        res.status(400).send({ status: 'error', message: error.message });
    }
});

export default router;
