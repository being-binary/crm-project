import Employee from '../model/employeeCollection.js';

export const createEmployee = async (req, res) => {
  try {
    const newEmployee =  new Employee(req.body);
    await newEmployee.save();
    res.status(201).json({ message: 'Employee created successfully', employee: newEmployee });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllEmployees = async (req, res) => {
    try {
      const employees = await Employee.find();
      res.status(200).json(employees);
    } catch (error) {
      console.error('Error fetching employees:', error);
      res.status(500).json({ message: 'Server Error' });
    }
  };
