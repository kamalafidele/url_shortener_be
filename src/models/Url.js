const mongoose = require('mongoose');

const { Schema } = mongoose;

const URLSchema = new Schema(
  {
    original_link: {
      type: String,
      default: null,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    clicks: { type: Number, default: 0 },
    uniqueIdentifier: {
      type: String,
      default: null,
    },
    shareable_link: {
      type: String,
      default: null,
    },
    expirationDate: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Url', URLSchema);
