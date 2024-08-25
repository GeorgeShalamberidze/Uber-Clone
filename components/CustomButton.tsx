import { ButtonProps } from "@/types/type";
import { getBgVariantStyle } from "@/utils/getBgVariantStyle";
import { getTextVariantStyle } from "@/utils/getTextVariantStyle";
import { Text, TouchableOpacity } from "react-native";

const CustomButton: React.FC<ButtonProps> = ({
  onPress,
  title,
  bgVariant = "primary",
  textVariant = "default",
  IconLeft,
  IconRight,
  className,
  ...props
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`w-full rounded-full flex flex-row p-3 justify-center items-center shadow-md shadow-natural-400/70 ${getBgVariantStyle(bgVariant)} ${className}`}
      {...props}
    >
      {IconLeft && <IconLeft />}
      <Text
        className={`text-lg font-bold ${getTextVariantStyle(textVariant)} text-white`}
      >
        {title}
      </Text>
      {IconRight && <IconRight />}
    </TouchableOpacity>
  );
};

export default CustomButton;
