
import UserDAO from '../persistence/mongoDB/user.dao.mjs';

class UserRepository {
    constructor() {
        this.userDAO = new UserDAO();
    }

    async getAllUsers() {
        return await this.userDAO.getAllUsers();
    }

    async getUserById(id) {
        return await this.userDAO.getUserById(id);
    }

    async getUserByEmail(email) {
        return await this.userDAO.getUserByEmail(email);
    }

    async createUser(userData) {
        return await this.userDAO.createUser(userData);
    }

    async updateUser(id, updateData) {
        return await this.userDAO.updateUser(id, updateData);
    }

    async deleteUser(id) {
        return await this.userDAO.deleteUser(id);
    }
}

export default UserRepository;
