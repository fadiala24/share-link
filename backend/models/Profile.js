const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    logoUrl: {
      type: String,
      default: '/logo1.png',
    },
    subtitle: {
      type: String,
      default: '',
    },
    backgroundColor: {
      type: String,
      default: '#00c853', // green from the image
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Profile', ProfileSchema);
