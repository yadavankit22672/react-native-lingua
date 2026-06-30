import { View, Text, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { images } from '@/constants/images';
import { PrimaryButton } from '@/components/PrimaryButton';
import { SecondaryButton } from '@/components/SecondaryButton';
import { colors } from '@/theme/colors';

export default function OnboardingScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }} edges={['bottom']}>
      <Stack.Screen 
        options={{
          headerTitle: () => (
            <View className="flex-row items-center justify-center">
              <Image 
                source={images.mascotLogo} 
                className="w-14 h-14 mr-3" 
                resizeMode="contain"
              />
              <Text className="text-primary font-bold text-4xl tracking-tight">muolingo</Text>
            </View>
          ),
          headerTitleAlign: 'center',
          headerShadowVisible: false,
          headerStyle: { backgroundColor: colors.white },
        }} 
      />

      {/* Main Illustration */}
      <View className="flex-1 items-center justify-center px-6 mt-4">
        <Image 
          source={images.mascotWelcome} 
          className="w-full h-72" 
          resizeMode="contain"
        />
        <Text className="text-black font-bold text-4xl text-center mt-8 leading-snug tracking-tight">
          Your AI language{'\n'}teacher.
        </Text>
        <Text className="text-neutral-500 text-center text-lg mt-4 leading-relaxed">
          Real conversations, personalized{'\n'}lessons, anytime, anywhere.
        </Text>
      </View>

      {/* Footer Buttons */}
      <View className="px-4 pb-8 pt-4 gap-4 w-full">
        <PrimaryButton 
          title="GET STARTED" 
          onPress={() => {
            // Add action later
          }} 
        />
        <SecondaryButton 
          title="I ALREADY HAVE AN ACCOUNT" 
          onPress={() => {
            // Add action later
          }} 
        />
      </View>
    </SafeAreaView>
  );
}
