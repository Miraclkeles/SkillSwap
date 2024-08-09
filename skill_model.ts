import mongoose from 'mongoose';

const skillDefinition = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  linkedUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const SkillModel = mongoose.model('Skill', skillDefinition);

export default SkillModel;