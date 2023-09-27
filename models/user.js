import { Schema, model, models } from 'mongoose';

const userSchema = new Schema({
    email: {
        type: String,
        unique: [true, 'Email already exists'],
        required: [true, 'Email is required'],
    },
    name: {
        type: String,
        required: [true, 'Name is required'],
        match: [/^[a-zA-Z]+$/, 'Name can only contain letters'],
    },
    image: {
        type: String,
    }
})
// The code below is necessary because of the serverless environment 
const User = models.User || model('User', userSchema);

export default User;
