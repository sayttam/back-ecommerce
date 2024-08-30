
class UserDTO {
    constructor({ _id, email, firstName, lastName, role }) {
        this.id = _id;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.role = role;
    }
}

export default UserDTO;
