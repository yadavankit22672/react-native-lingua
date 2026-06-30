import { useState } from 'react';
import { View, Text, Modal, TextInput, KeyboardAvoidingView, Platform, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '@/theme/colors';

interface VerificationModalProps {
  visible: boolean;
  onClose: () => void;
}

export function VerificationModal({ visible, onClose }: VerificationModalProps) {
  const [code, setCode] = useState('');
  const router = useRouter();

  const handleCodeChange = (text: string) => {
    // Keep only numbers
    const formatted = text.replace(/[^0-9]/g, '');
    setCode(formatted);
    
    // Auto navigate when 6 digits are entered
    if (formatted.length === 6) {
      setTimeout(() => {
        setCode('');
        onClose();
        router.replace('/');
      }, 300);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }}
      >
        <View className="flex-1 justify-end">
          <View className="bg-white rounded-t-3xl p-6 pb-12 w-full">
            <View className="flex-row justify-between items-center mb-6">
              <Text className="text-2xl font-bold text-black">Verify Email</Text>
              <TouchableOpacity onPress={onClose} className="p-2">
                <Text className="text-neutral-400 font-bold text-lg">X</Text>
              </TouchableOpacity>
            </View>
            
            <Text className="text-neutral-500 text-lg mb-6">
              We've sent a 6-digit verification code to your email.
            </Text>

            <TextInput
              style={styles.input}
              value={code}
              onChangeText={handleCodeChange}
              keyboardType="number-pad"
              maxLength={6}
              placeholder="Enter 6-digit code"
              placeholderTextColor={colors.neutral[300]}
              autoFocus
            />

            <View className="mt-8">
              <Text className="text-center text-neutral-400">
                Didn't receive the code? <Text className="text-primary font-bold">Resend</Text>
              </Text>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.neutral[100],
    borderWidth: 2,
    borderColor: colors.neutral[200],
    borderRadius: 16,
    padding: 16,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 8,
    color: colors.black,
  }
});
