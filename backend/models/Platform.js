const mongoose = require('mongoose');

const PlatformSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    label: {
      type: String,
      required: true,
      trim: true,
    },
    url: {
      type: String,
      required: true,
      trim: true,
    },
    // Slug of the social network: facebook | tiktok | youtube | instagram | twitter | whatsapp | telegram | etc.
    type: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    // Icon color used for the platform badge background
    iconColor: {
      type: String,
      default: '#000000',
    },
    order: {
      type: Number,
      default: 0,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Platform', PlatformSchema);
