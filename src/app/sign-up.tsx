import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { PrimaryButton } from '@/components/PrimaryButton';
import { VerificationModal } from '@/components/VerificationModal';
import { colors } from '@/theme/colors';
import { images } from '@/constants/images';

export default function SignUpScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const router = useRouter();

  const handleSignUp = () => {
    if (email.trim() && password.trim()) {
      setShowVerification(true);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }} edges={['bottom']}>
      <Stack.Screen 
        options={{
          headerTitle: 'Create your account',
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
              Start your language journey today
            </Text>
          </View>

          <Text className="text-lg font-bold text-neutral-500 mb-2 ml-1">Email</Text>
          <TextInput
            style={styles.input}
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
              style={[styles.input, { paddingRight: 50 }]}
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
              title="CREATE ACCOUNT" 
              onPress={handleSignUp} 
            />
          </View>

          <View className="flex-row items-center my-8">
            <View className="flex-1 h-[2px] bg-neutral-200" />
            <Text className="text-neutral-300 font-bold px-4 text-base tracking-widest">OR</Text>
            <View className="flex-1 h-[2px] bg-neutral-200" />
          </View>

          <View className="gap-4">
            <SocialButton type="facebook" title="FACEBOOK" onPress={() => Alert.alert('Coming Soon', 'Social authentication will be implemented soon.')} />
            <SocialButton type="google" title="GOOGLE" onPress={() => Alert.alert('Coming Soon', 'Social authentication will be implemented soon.')} />
            <SocialButton type="apple" title="APPLE" onPress={() => Alert.alert('Coming Soon', 'Social authentication will be implemented soon.')} />
          </View>

          <View className="mt-10 px-4">
            <Text className="text-center text-neutral-400 text-sm leading-relaxed">
              By signing up for Muolingo, you agree to our{' '}
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

const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.neutral[100],
    borderWidth: 2,
    borderColor: colors.neutral[200],
    borderRadius: 16,
    padding: 16,
    fontSize: 18,
    color: colors.black,
    fontWeight: '500',
  }
});
