const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  gender: {
    type: String,
    required: [true, 'Gender is required'],
    enum: ['Male', 'Female']
  },
  designation: {
    type: String,
    required: [true, 'Designation is required'],
    trim: true
  },
  favorites: {
    type: [String],
    required: [true, 'At least one favorite is required'],
    validate: {
      validator: function(v) {
        return v.length > 0;
      },
      message: 'At least one favorite must be selected'
    }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);