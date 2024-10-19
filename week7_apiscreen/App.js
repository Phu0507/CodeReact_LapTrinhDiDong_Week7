import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Screen1 from './components/Screen1'; // Màn hình nhập email
import TodoList from './components/TodoList'; // Màn hình danh sách công việc
import Screen3 from './components/Screen3'
import { View, Text, Image, StyleSheet } from 'react-native';

const Stack = createNativeStackNavigator();

const App = () => {  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Screen1">
        <Stack.Screen 
          name="Screen1" 
          component={Screen1} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="TodoList" 
          component={TodoList} 
          options={({ route }) => ({
            title: '',
            headerRight: () => (
              <View style={styles.headerRightContainer}>
                <Image 
                  source={require('./assets/icon_giay_but.png')}
                  style={styles.profileImage}
                />
                <Text style={styles.profileName}>{route.params?.userEmail || 'Khách'}</Text> 
              </View>
            ),
          })} 
        />

        <Stack.Screen 
          name="Screen3" 
          component={Screen3} 
          options={({ route }) => ({
            title: '',
            headerRight: () => (
              <View style={styles.headerRightContainer}>
                <Image 
                  source={require('./assets/icon_giay_but.png')}
                  style={styles.profileImage}
                />
                <Text style={styles.profileName}>{route.params?.email || 'Khách'}</Text> 
              </View>
            ),
          })} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  headerRightContainer: {
    flexDirection: 'row', // Sắp xếp theo hàng
    alignItems: 'center', // Căn giữa theo chiều dọc
    marginRight: 10, // Khoảng cách bên phải
  },
  profileImage: {
    width: 40, // Kích thước ảnh
    height: 40,
    borderRadius: '50%', // Làm cho ảnh thành hình tròn
    marginRight: 5, // Khoảng cách giữa ảnh và tên
  },
  profileName: {
    color: '#000', // Màu chữ
    fontWeight: 'bold', // Độ đậm chữ
  },
});

export default App;
