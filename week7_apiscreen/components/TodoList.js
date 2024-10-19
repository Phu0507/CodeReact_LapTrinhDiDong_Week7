import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

const TodoList = ({route,navigation}) => {
  const [data, setData] = useState([]);
  const url = "https://670cdfed7e5a228ec1d1b86c.mockapi.io/job";

  const fetchData = async () => {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Không thể lấy dữ liệu');
      }
      const result = await response.json();
      setData(result);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fnDelete = async (idXoa) => {
      const responseDelete = await fetch(`${url}/${idXoa}`, {
        method: "DELETE",
      });
      if (responseDelete.ok) {
        setData(prevData => prevData.filter(item => item.id !== idXoa)); // Cập nhật danh sách
      } else {
        console.log('Delete thất bại');
      }
  };

  const renderItem = ({ item }) => {
    return (
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <View style={styles.itemNav}>
          <Text key={item.id} style={styles.itemText} numberOfLines={1} ellipsizeMode="tail">
            {item.job}
          </Text>
          <Text style={styles.style_check}>✅</Text>
          <TouchableOpacity style={styles.itemXoa} onPress={ () => fnDelete(item.id)}>
            <Text>❌</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.itemEdit} onPress={() => navigation.navigate('Screen3',{ mode: 'edit', job: item.job, id: item.id, setData: setData, email: route.params.userEmail})}><Text>✏️</Text></TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1, marginTop: 10, justifyContent: 'center', alignItems: 'center' }}>
          <Image style={styles.style_kinhlup} source={require('../assets/kinhlup.png')} />
          <TextInput placeholder="Search" style={styles.styleInputEmail} />
        </View>
      </View>
      <View style={{ flex: 6, marginTop: 30 }}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()} // Đảm bảo id là chuỗi
        />
      </View>
      <View style={{ flex: 3, alignItems: 'center' }}>
        <TouchableOpacity  onPress={() => navigation.navigate('Screen3',{ mode: 'add', setData: setData,email: route.params.userEmail})}>
          <Text style={styles.plus}>╋</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  styleInputEmail: {
    borderRadius: 5,
    borderWidth: 1,
    paddingLeft: 40,
    width: 300,
    height: 35,
  },
  style_kinhlup: {
    position: 'absolute',
    left: 15,
    top: '35%',
    width: 15,
    height: 15,
  },
  itemNav: {
    flexDirection: 'row',
    flex: 1,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  style_check: {
    position: 'absolute',
    left: 20,
    top: '25%',
  },
  itemText: {
    backgroundColor: '#9095A0',
    width: 280,
    height: 40,
    borderRadius: 30,
    borderWidth: 1,
    paddingLeft: 50,
    paddingTop: 10,
    paddingRight: 60,
  },
  itemXoa: {
    position: 'absolute',
    right: 40,
    top: '20%',
  },
  itemEdit: {
    position: 'absolute',
    right: 20,
    top: '20%',
  },
  plus: {
    fontSize: 30,
    backgroundColor: '#00BDD6',
    height: 60,
    width: 60,
    paddingLeft: 15,
    paddingTop: 5,
    borderRadius: 30, // Thay đổi từ '50%' thành 30 để phù hợp với chiều cao
  },
});

export default TodoList;
