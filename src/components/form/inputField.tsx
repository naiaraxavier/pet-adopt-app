// * React Native
import { Text, TextInput } from "react-native";

// * Interface
interface InputFieldProps {
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  placeholder: string;
  onBlur?: () => void;
  error?: string;
  value: string;
  keyboardType?:
    | "default"
    | "email-address"
    | "numeric"
    | "phone-pad"
    | "ascii-capable"
    | "numbers-and-punctuation"
    | "url"
    | "number-pad"
    | "decimal-pad"
    | "twitter"
    | "web-search"
    | "visible-password";
}

export const InputField = ({
  error,
  value,
  onBlur,
  placeholder,
  onChangeText,
  secureTextEntry = false,
  keyboardType = "default",
}: InputFieldProps) => {
  return (
    <>
      <TextInput
        className={`border ${
          error ? "border-red-500" : "border-gray-300"
        } rounded p-2 mt-4`}
        value={value}
        placeholder={placeholder}
        autoCapitalize="none"
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        placeholderTextColor="#949494"
        onBlur={onBlur}
      />
      {error && <Text className="text-red-500">{error}</Text>}
    </>
  );
};
