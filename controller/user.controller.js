const users = require('../users');

const getAllUsers = (req, res) => {
  res.json(users);
};

const signUp = (req, res) => {
  const newUser = req.body;
  users.push(newUser);
  res.status(201).json({ message: "Registered successfully", newUser });
};

const signIn = (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return res.status(401).json({ message: "Invalid credentials" });
  res.json({ message: "Signed in successfully", user });
};

module.exports = { getAllUsers, signUp, signIn };