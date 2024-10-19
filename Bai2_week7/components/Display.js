import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, StyleSheet, FlatList } from 'react-native';

const Display = ({navigation}) => {
  const [data, setData] = useState([]);

  const fetchData = () => {
    fetch('https://670a9f43ac6860a6c2ca084f.mockapi.io/email/v1/email')
      .then(response => response.json())
      .then(result => setData(result))
      .catch(error => console.log(error));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderItem = ({ item }) => (
    <Text key={item.id} style={styles.itemText}>
      {JSON.stringify(item, null, 2)}  {/* Hiển thị tất cả các thuộc tính của item */}
    </Text>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  itemText: {
    fontSize: 18,
    marginVertical: 5,
    whiteSpace: 'pre-wrap' // Giúp hiển thị xuống dòng trong văn bản
  },
});

export default Display;
