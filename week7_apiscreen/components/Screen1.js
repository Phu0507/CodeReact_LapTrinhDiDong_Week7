import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';

const Screen1 = ({ navigation }) => {
  const [email, setEmail] = useState(''); // State để lưu trữ email
  const [error, setError] = useState(null);
  const [emailsList, setEmailsList] = useState([]); // State để lưu trữ danh sách email từ API

  const handleGetStarted = () => {
  setError(null); // Reset error trước khi gọi API

  // Gọi API để lấy dữ liệu email
  fetch('https://670a9f43ac6860a6c2ca084f.mockapi.io/email/v1/email')
    .then(response => {
      if (!response.ok) {
        throw new Error('Có lỗi xảy ra khi lấy dữ liệu.');
      }
      return response.json(); // Chuyển đổi phản hồi thành JSON
    })
    .then(result => {
      setEmailsList(result); // Lưu danh sách email vào state

      // Kiểm tra email sau khi đã cập nhật danh sách
      const isEmailValid = result.some(item => item.email === email); // So sánh email với danh sách mới

      if (isEmailValid) {
        navigation.navigate('TodoList', { userEmail: email }); // Chuyển đến TodoList nếu hợp lệ
      } else {
        setError('Email không được xác thực.'); // Nếu không hợp lệ
      }
    })
    .catch(error => {
      setError(error.message); // Xử lý lỗi
    });
};

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 5, justifyContent: 'center', alignItems: 'center' }}>
        <Image
          style={styles.img_head_screen1}
          source={require('../assets/icon_giay_but.png')}
        />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.style_manage}>MANAGE YOUR TASK</Text>
      </View>
      <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
        <Image
          style={styles.style_letter}
          source={require('../assets/thu.png')}
        />
        <TextInput
          placeholder="Enter your email"
          style={styles.styleInputEmail}
          value={email}
          onChangeText={setEmail} // Cập nhật state khi nhập email
        />
      </View>
      <View style={{flex: 1}}>{error && <Text style={styles.errorText}>{String(error)}</Text>}</View>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity
          style={styles.style_btn}
          onPress={handleGetStarted}>
          <Text style={styles.style_txtinbtn}> GET STARTED ⇨</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  img_head_screen1: {
    width: 271,
    height: 271,
  },
  style_manage: {
    fontFamily: 'Epilogue',
    fontSize: 24,
    fontWeight: '700',
    color: '#8353E2',
    textAlign: 'center',
    margin: '0 25% 0',
  },
  style_letter: {
    position: 'absolute',
    left: 15,
    top: '50%',
    width: 20,
    height: 20,
    transform: [{ translateY: -10 }],
  },
  styleInputEmail: {
    borderRadius: 10,
    borderWidth: 1,
    paddingLeft: 40,
    width: 330,
    height: 45,
  },
  style_btn: {
    width: 190,
    height: 44,
    padding: '9 33 9 29',
    borderRadius: 12,
    backgroundColor: '#00BDD6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  style_txtinbtn: {
    color: '#FFFFFF',
    fontFamily: 'Inter',
    fontWeight: '400',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});

export default Screen1;
