import { GoogleInputProps } from "@/types/type";
import { Text, View } from "react-native";

const GoogleTextInput: React.FC<GoogleInputProps> = ({
  icon,
  textInputBackgroundColor,
  initialLocation,
  containerStyle,
  handlePress,
}) => {
  return (
    <View
      className={`flex flex-row items-center justify-center relative z-50 rounded-xl mb-5 ${containerStyle}`}
    >
      <Text>Search</Text>
    </View>
  );
};

export default GoogleTextInput;
