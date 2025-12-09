const InputTextField = ({type, onChange, placeholder}) => {
  return (
    <input
    onChange={onChange}
      type={type}
      required
      className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
      placeholder={placeholder}
    />
  );
};

export default InputTextField;
