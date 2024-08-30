
import UserModel from './models/user.model.mjs';
import UserDTO from '../../dto/user.dto.mjs';

class UserDAO {
    async getAllUsers() {
        const users = await UserModel.find({});
        return users.map(user => new UserDTO(user));
    }

    async getUserById(id) {
        const user = await UserModel.findById(id);
        return new UserDTO(user);
    }

    async getUserByEmail(email) {
        return await UserModel.findOne({ email: email });
    }

    async createUser(userData) {
        const newUser = new UserModel(userData);
        const savedUser = await newUser.save();
        return new UserDTO(savedUser);
    }

    async updateUser(id, updateData) {
        const updatedUser = await UserModel.findByIdAndUpdate(id, updateData, { new: true });
        return new UserDTO(updatedUser);
    }

    async deleteUser(id) {
        const deletedUser = await UserModel.findByIdAndDelete(id);
        return new UserDTO(deletedUser);
    }
}

export default UserDAO;
