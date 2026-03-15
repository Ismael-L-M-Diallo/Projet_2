const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true, 
    trim: true 
  },
  completed: { 
    type: Boolean, 
    default: false 
  },
  // Bonus : lien avec User (comme Post)
  author: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  }
}, { 
  timestamps: true  // createdAt + updatedAt automatiques
});

module.exports = mongoose.model('Task', taskSchema);
