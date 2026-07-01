import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { PrimaryButton } from '@/components/PrimaryButton';
import { VerificationModal } from '@/components/VerificationModal';
import { colors } from '@/theme/colors';
import { images } from '@/constants/images';

import { useSignIn, useSSO } from '@clerk/expo';

export default function SignInScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const router = useRouter();

  const { signIn } = useSignIn();
  const { startSSOFlow } = useSSO();

  const handleSocialAuth = async (strategy: 'oauth_facebook' | 'oauth_google' | 'oauth_apple') => {
    try {
      const { createdSessionId, setActive } = await startSSOFlow({ strategy });
      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
        router.replace('/');
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      Alert.alert('Error', err.message || 'An error occurred during social authentication.');
    }
  };

  const handleSignIn = async () => {
    if (!email.trim() || !password.trim()) return;
    
    try {
      const { error } = await signIn.password({
        emailAddress: email,
        password,
      });

      if (error) {
        console.error(JSON.stringify(error, null, 2));
        Alert.alert('Error', error.message || 'Invalid email or password.');
        return;
      }

      if (signIn.status === 'complete') {
        await signIn.finalize({
          navigate: ({ session, decorateUrl }) => {
            router.replace('/');
          }
        });
      } else {
        console.error('Sign-in attempt not complete:', signIn);
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      Alert.alert('Error', err.message || 'Invalid email or password.');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }} edges={['bottom']}>
      <Stack.Screen 
        options={{
          headerTitle: 'Sign in to your account',
          headerTitleAlign: 'center',
          headerShadowVisible: false,
          headerStyle: { backgroundColor: colors.white },
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: 'bold',
            color: colors.neutral[400],
          },
          headerLeft: () => (
            <TouchableOpacity 
              onPress={() => router.back()} 
              className="p-2 ml-2"
              accessibilityRole="button"
              accessibilityLabel="Close"
            >
              <Text className="text-neutral-400 font-bold text-2xl">✕</Text>
            </TouchableOpacity>
          )
        }} 
      />

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 20, paddingBottom: 40 }}>
          
          <View className="flex-row items-center justify-center mb-8 mt-4">
            <Image 
              source={images.mascotAuth} 
              className="w-24 h-24 mr-4" 
              resizeMode="contain" 
            />
            <Text className="text-xl font-bold text-neutral-500 flex-1 leading-snug">
              Welcome back to your journey
            </Text>
          </View>

          <Text className="text-lg font-bold text-neutral-500 mb-2 ml-1">Email</Text>
          <TextInput
            className="bg-neutral-100 border-2 border-neutral-200 rounded-2xl p-4 text-lg text-black font-medium"
            placeholder="Email"
            placeholderTextColor={colors.neutral[300]}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <Text className="text-lg font-bold text-neutral-500 mb-2 ml-1 mt-4">Password</Text>
          <View className="justify-center">
            <TextInput
              className="bg-neutral-100 border-2 border-neutral-200 rounded-2xl p-4 text-lg text-black font-medium"
              style={{ paddingRight: 50 }}
              placeholder="Password"
              placeholderTextColor={colors.neutral[300]}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
            />
            <TouchableOpacity 
              className="absolute right-4 p-2"
              onPress={() => setShowPassword(!showPassword)}
              accessibilityRole="button"
              accessibilityLabel={showPassword ? "Hide password" : "Show password"}
            >
              <Ionicons 
                name={showPassword ? 'eye-off' : 'eye'} 
                size={24} 
                color={colors.neutral[400]} 
              />
            </TouchableOpacity>
          </View>

          <View className="mt-8">
            <PrimaryButton 
              title="SIGN IN" 
              onPress={handleSignIn} 
            />
          </View>

          <View className="flex-row items-center my-8">
            <View className="flex-1 h-[2px] bg-neutral-200" />
            <Text className="text-neutral-300 font-bold px-4 text-base tracking-widest">OR</Text>
            <View className="flex-1 h-[2px] bg-neutral-200" />
          </View>

          <View className="gap-4">
            <SocialButton type="facebook" title="FACEBOOK" onPress={() => handleSocialAuth('oauth_facebook')} />
            <SocialButton type="google" title="GOOGLE" onPress={() => handleSocialAuth('oauth_google')} />
            <SocialButton type="apple" title="APPLE" onPress={() => handleSocialAuth('oauth_apple')} />
          </View>

          <View className="mt-10 px-4">
            <Text className="text-center text-neutral-400 text-sm leading-relaxed">
              By signing in to Muolingo, you agree to our{' '}
              <Text className="font-bold">Terms</Text> and{' '}
              <Text className="font-bold">Privacy Policy</Text>.
            </Text>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>

      <VerificationModal 
        visible={showVerification} 
        onClose={() => setShowVerification(false)} 
      />
    </SafeAreaView>
  );
}

function SocialButton({ type, title, onPress }: { type: 'apple' | 'google' | 'facebook', title: string, onPress: () => void }) {
  if (type === 'facebook') {
    return (
      <TouchableOpacity
        onPress={onPress}
        className="bg-[#1877F2] border-[#1865F2] border-2 border-b-4 rounded-2xl p-4 flex-row items-center justify-center w-full shadow-sm"
      >
        <Text className="text-white font-bold text-2xl mr-3 leading-none -mt-1">f</Text>
        <Text className="text-white font-bold text-[15px] uppercase tracking-wider">
          {title}
        </Text>
      </TouchableOpacity>
    );
  }
  if (type === 'google') {
    return (
      <TouchableOpacity
        onPress={onPress}
        className="bg-white border-neutral-200 border-2 border-b-4 rounded-2xl p-4 flex-row items-center justify-center w-full shadow-sm"
      >
        <Text className="text-[#EA4335] font-bold text-xl mr-3 leading-none">G</Text>
        <Text className="text-[#4285F4] font-bold text-[15px] uppercase tracking-wider">
          {title}
        </Text>
      </TouchableOpacity>
    );
  }
  if (type === 'apple') {
    return (
      <TouchableOpacity
        onPress={onPress}
        className="bg-black border-black border-2 border-b-4 rounded-2xl p-4 flex-row items-center justify-center w-full shadow-sm"
      >
        <Ionicons name="logo-apple" size={24} color="white" style={{ marginRight: 12, marginTop: -4 }} />
        <Text className="text-white font-bold text-[15px] uppercase tracking-wider">
          {title}
        </Text>
      </TouchableOpacity>
    );
  }
  return null;
}


