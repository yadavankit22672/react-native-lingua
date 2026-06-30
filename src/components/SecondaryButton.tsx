import { TouchableOpacity, Text, TouchableOpacityProps } from 'react-native';

interface SecondaryButtonProps extends TouchableOpacityProps {
  title: string;
}

export function SecondaryButton({ title, ...props }: SecondaryButtonProps) {
  return (
    <TouchableOpacity
      className="bg-white border-neutral-200 border-2 border-b-4 rounded-2xl p-4 items-center justify-center w-full"
      {...props}
    >
      <Text className="text-secondary font-bold text-lg uppercase tracking-wider">
        {title}
      </Text>
    </TouchableOpacity>
  );
}
