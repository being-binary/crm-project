import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true, // Assuming email should be unique
    lowercase: true
  },
  phone: {
    type: String,
    required: true
  },
  department: {
    type: String
  },
  position: {
    type: String
  },
  salary: {
    type: Number,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  documents: [{
    type: String // URLs or file names if storing file info
  }]
}, {
  timestamps: true
});

const Employee = mongoose.model('Employee', employeeSchema);
export default Employee;
