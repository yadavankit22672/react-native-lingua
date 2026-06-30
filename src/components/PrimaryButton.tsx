import { TouchableOpacity, Text, TouchableOpacityProps } from 'react-native';

interface PrimaryButtonProps extends TouchableOpacityProps {
  title: string;
}

export function PrimaryButton({ title, ...props }: PrimaryButtonProps) {
  return (
    <TouchableOpacity
      className="bg-primary border-primary-shadow border-b-4 rounded-2xl p-4 items-center justify-center w-full"
      {...props}
    >
      <Text className="text-white font-bold text-lg uppercase tracking-wider">
        {title}
      </Text>
    </TouchableOpacity>
  );
}
