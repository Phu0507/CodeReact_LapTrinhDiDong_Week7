import React, { useEffect } from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Button,
} from 'react-native';
import fetchData from './Display'

const Home = ({navigation}) => {



var url ="https://670a9f43ac6860a6c2ca084f.mockapi.io/email/v1/email";
var email = {email: 'daothanhphu12@gmail.com'}
const fn = async () => {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(email),
      });
      
      if (response.ok) {
        // Nếu POST thành công, điều hướng đến trang Display
        navigation.navigate('Display');
      } else {
        console.log('POST thất bại');
      }
    } catch (error) {
      console.error('Lỗi khi POST:', error);
    }
  };

const fnDelete = async ()=>{
  try{
    const responseDelete = await fetch(url.concat("/") + 12, {
        method: "DELETE",
      });
      if(responseDelete.ok)
        navigation.navigate('Display')
      else
        console.log('Delete thất bại')
  }catch (error){
      console.log('error')
  }
};

var emailPut = {email: 'ThanhPhuPut2@gmail.com'}
const fnEdit = async()=>{

try{
  const responsePut= await fetch(url.concat("/") + 2, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailPut),
    });
    if(responsePut.ok)
      navigation.navigate('Display')
    else
      console.log('Put thất bại')
}catch (error){
    console.log('error')
}

};


  return (
    <SafeAreaView style={styles.container}>
    <View>
    <Button title ="Add" onPress={fn}></Button>
    <br/>
     <Button title ="Delete" onPress={fnDelete}></Button>
     <br/>
     <Button title ="Edit" onPress={fnEdit}></Button>
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    padding: 20,
    
  },
});

export default Home;