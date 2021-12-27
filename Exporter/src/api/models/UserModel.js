import { model, Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const UserModel = new Schema(
  {
    email: { type: String, unique: true, required: true, dropDups: true },
    token: { type: String, required: true, default: uuidv4 },
    startAt: { type: Date, default: Date.now, required: true }
  },
  {
    timestamps: true
  }
);

export default model('User', UserModel);
