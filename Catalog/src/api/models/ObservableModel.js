import { model, Schema } from 'mongoose';

const ObservableSchema = new Schema(
  {
    name: { type: String, unique: true, required: true, dropDups: true },
    standardUnit: { type: String, required: true },
    minValue: { type: Number, required: true },
    maxValue: { type: Number, required: true },
    sensors: [{ type: Schema.Types.ObjectId, ref: 'Sensor' }]
  },
  {
    timestamps: true
  }
);

export default model('Observable', ObservableSchema);
