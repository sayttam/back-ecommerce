    import express from 'express';
    import UserRepository from '../repository/user.repository.mjs';
    import bcrypt from 'bcrypt';
    import jwt from 'jsonwebtoken';
    import auth from '../middleware/auth.middleware.mjs';
    import authorization from '../middleware/authorization.middleware.mjs'
    import UserDTO from '../dto/user.dto.mjs';
    import dotenv from 'dotenv';

    dotenv.config();

    const router = express.Router();
    const userRepository = new UserRepository();

    router.post('/login', async (req, res) => {
        try {
            const {
                email,
                password
            } = req.body;

            const user = await userRepository.getUserByEmail(email);

            if (!user) {
                return res.status(400).json({
                    error: 'Invalid email or password'
                });
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({
                    error: 'Invalid email or password'
                });
            }

            const token = jwt.sign({
                id: user.id,
                role: user.role
            }, process.env.SECRET_KEY, {
                expiresIn: '1h'
            });

            res.cookie('token', token, {
                httpOnly: true
            }).send({
                message: 'Logged in successfully'
            });
        } catch (error) {
            res.status(500).json({
                error: 'Failed to authenticate user'
            });
        }
    });

    router.post('/register', async (req, res) => {
        try {
            const {
                firstName,
                lastName,
                email,
                password,
                role
            } = req.body;

            const existingUser = await userRepository.getUserByEmail(email);
            if (existingUser) {
                return res.status(400).json({
                    error: 'User already exists'
                });
            }

            const newUser = await userRepository.createUser({
                firstName,
                lastName,
                email,
                password,
                role
            });

            const userResponse = {
                id: newUser.id,
                email: newUser.email,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                role: newUser.role
            };

            res.status(201).json(userResponse);
        } catch (error) {
            res.status(500).json(error);
        }
    });


    router.get('/', auth, authorization(["admin"]), async (req, res) => {
        try {
            const users = await userRepository.getAllUsers();
            res.json(users);
        } catch (error) {
            res.status(500).json({
                error: 'Failed to fetch users'
            });
        }
    });

    router.get('/current', auth, (req, res) => {

        const userDTO = new UserDTO(req.user)

        res.send({ status: 'success', payload: userDTO });
    });

    router.get('/:id', auth, authorization(["admin"]), async (req, res) => {
        try {
            const user = await userRepository.getUserById(req.params.id);
            if (!user) {
                return res.status(404).json({
                    error: 'User not found'
                });
            }
            res.json(user);
        } catch (error) {
            res.status(500).json({
                error: 'Failed to fetch user'
            });
        }
    });

    router.put('/:id', auth, async (req, res) => {
        try {
            const updatedUser = await userRepository.updateUser(req.params.id, req.body);
            if (!updatedUser) {
                return res.status(404).json({
                    error: 'User not found'
                });
            }
            res.json(updatedUser);
        } catch (error) {
            res.status(500).json({
                error: 'Failed to update user'
            });
        }
    });

    router.delete('/:id', auth, authorization(["admin"]), async (req, res) => {
        try {
            const deletedUser = await userRepository.deleteUser(req.params.id);
            if (!deletedUser) {
                return res.status(404).json({
                    error: 'User not found'
                });
            }
            res.status(204).send();
        } catch (error) {
            res.status(500).json({
                error: 'Failed to delete user'
            });
        }
    });

    export default router;