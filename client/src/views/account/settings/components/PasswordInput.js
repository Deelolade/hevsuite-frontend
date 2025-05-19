import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const PasswordInput = ({ value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  // Debug input value
  

  return (
    <div className="relative">
      <label htmlFor="password" className="block mb-2">
        Password
      </label>
      <div className="relative">
        
        <input
          id="password"
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
          value={value}
          onChange={onChange}
          autoFocus
          className="w-full p-3 border rounded-lg pr-10"
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
        >
          {showPassword ? (
            <AiOutlineEyeInvisible size={20} />
          ) : (
            <AiOutlineEye size={20} />
          )}
        </button>
      </div>
    </div>
  );
};

export default PasswordInput;