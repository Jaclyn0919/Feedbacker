import React, { useEffect, useState } from 'react';
import {
    Modal,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import ErrorModal from './ErrorModal'; // ✅ 引入 ErrorModal

type Props = {
  visible: boolean;
  onClose: () => void;
};

const RegisterModal = ({ visible, onClose }: Props) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [codeSent, setCodeSent] = useState(false);
  const [countdown, setCountdown] = useState(30);

  const [errorVisible, setErrorVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (codeSent && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      setCodeSent(false);
      setCountdown(30);
    }

    return () => clearTimeout(timer);
  }, [codeSent, countdown]);

  const triggerError = (msg: string) => {
    setErrorMessage(msg);
    setErrorVisible(true);
  };

  const handleGetCode = () => {
    if (!email) {
      triggerError('Please enter your email first.');
      return;
    }
    setCodeSent(true);
  };

  const handleRegister = () => {
    if (password !== confirmPassword) {
      triggerError('Passwords do not match.');
      return;
    }

    // 成功注册，不提示，直接关闭
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>×</Text>
          </TouchableOpacity>

          <Text style={styles.title}>Register</Text>

          <TextInput
            placeholder="Username"
            placeholderTextColor="#888"
            style={styles.input}
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            placeholder="Email"
            placeholderTextColor="#888"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />

          <TouchableOpacity
            style={[
              styles.codeButton,
              codeSent && styles.codeButtonDisabled,
            ]}
            onPress={handleGetCode}
            disabled={codeSent}
          >
            <Text style={styles.codeButtonText}>
              {codeSent ? `Sent (${countdown}s)` : 'Get Verification Code'}
            </Text>
          </TouchableOpacity>

          <TextInput
            placeholder="Password"
            placeholderTextColor="#888"
            secureTextEntry
            style={styles.input}
            value={password}
            onChangeText={setPassword}
          />
          <TextInput
            placeholder="Confirm Password"
            placeholderTextColor="#888"
            secureTextEntry
            style={styles.input}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />

          <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
            <Text style={styles.registerButtonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>

        {/* ✅ 错误提示弹窗 */}
        <ErrorModal
          visible={errorVisible}
          onClose={() => setErrorVisible(false)}
          message={errorMessage}
        />
      </View>
    </Modal>
  );
};

export default RegisterModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#1c1c1e',
    padding: 24,
    borderRadius: 16,
    width: '85%',
  },
  closeButton: {
    position: 'absolute',
    right: 10,
    top: 6,
  },
  closeText: {
    fontSize: 24,
    color: '#fff',
  },
  title: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#2c2c2e',
    color: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 14,
  },
  codeButton: {
    backgroundColor: '#30a9ff',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 14,
  },
  codeButtonDisabled: {
    backgroundColor: '#3d3d3d',
  },
  codeButtonText: {
    color: '#fff',
    fontWeight: '500',
  },
  registerButton: {
    backgroundColor: '#30a9ff',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  registerButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
