import { View, Text, Image, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useRouter, Redirect } from 'expo-router';
import { useAuth } from '@clerk/expo';
import { images } from '@/constants/images';
import { PrimaryButton } from '@/components/PrimaryButton';
import { SecondaryButton } from '@/components/SecondaryButton';
import { colors } from '@/theme/colors';

export default function OnboardingScreen() {
  const router = useRouter();
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (isSignedIn) {
    return <Redirect href="/" />;
  }

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
          onPress={() => router.push('/sign-up')} 
        />
        <SecondaryButton 
          title="I ALREADY HAVE AN ACCOUNT" 
          onPress={() => router.push('/sign-in')} 
        />
      </View>
    </SafeAreaView>
  );
}
