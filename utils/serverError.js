const serverError = (res) => {
  return res.status(500).json({ message: 'Internal server error' });
};
export default serverError;
