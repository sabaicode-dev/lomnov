import React from "react";
import {
  useController,
  UseControllerProps,
  FieldValues,
} from "react-hook-form";

interface InputFieldProps<T extends FieldValues> extends UseControllerProps<T> {
  label: string;
  type?: string;
  placeholder?: string;
}

const InputField = <T extends FieldValues>({
  label,
  type = "text",
  placeholder,
  ...controllerProps
}: InputFieldProps<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController(controllerProps);

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        {...field}
        placeholder={placeholder}
        className="mt-1 block w-full px-4 py-2 rounded-md border-2 border-gray-300 hover:border-blue-500 focus:outline-none focus:border-blue-500 bg-transparent text-base"
      />
      {error && (
        <span className="text-red-500 text-sm absolute left-0 top-11">
          {error.message}
        </span>
      )}
    </div>
  );
};

export default InputField;
