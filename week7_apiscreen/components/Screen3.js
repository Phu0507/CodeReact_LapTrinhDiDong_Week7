import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

const Screen3 = ({ route, navigation }) => {
  const { mode, job, id, setData } = route.params;
  const [inputText, setInputText] = useState(mode === 'edit' ? job : '');


var url= 'https://670cdfed7e5a228ec1d1b86c.mockapi.io/job';
const fnEdit = async(idPut)=>{

try{
  const responsePut= await fetch(`${url}/${idPut}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({job: inputText}),
    });
    if(responsePut.ok){
      setData(prevData => prevData.map(item => item.id === idPut ? { ...item, job: inputText } : item )
    );
    }
    else
      console.log('Put thất bại')
}catch (error){
    console.log('error')
}
};


const fn = async () => {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({job:inputText}),
      });
      
      if (response.ok) {
        const newJob = await response.json();
        console.log('Job added successfully:', newJob);
        setData(prevData => [...prevData, newJob]);
      } else {
        console.log('POST thất bại');
      }
    } catch (error) {
      console.error('Lỗi khi POST:', error);
    }
  };


  const handleFinish = async() => {
    if (mode === 'add') {
      fn();
      console.log('Adding new job:', inputText);
    } else if (mode === 'edit') {
      fnEdit(id);
      console.log('Updating job:', inputText);   
    }
    await navigation.goBack()
  };

  return (
    <View style={{flex:1}}>
      <View style={styles.container}>
      <Text style={styles.title}>
        {mode === 'add' ? 'Add your job' : 'Edit your job'}
      </Text>
      <TextInput
        style={styles.input}
        value={inputText}
        onChangeText={setInputText}
        placeholder={mode === 'add' ? 'In put your job...' : 'Edit job...'}
      />
      <Text style={styles.job}>📋</Text>
      <TouchableOpacity style={styles.finishButton} onPress={handleFinish}>
        <Text style={styles.textFinish}>Finish ⇨</Text>
      </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <Image style={styles.image} source={require('../assets/icon_giay_but.png')}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: 300,
    height: 35,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    paddingLeft: 40,
  },
  finishButton: {
    width: 190,
    height: 44,
    padding: '9 33 9 29',
    borderRadius: 12,
    backgroundColor: '#00BDD6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textFinish: {
    color: '#FFFFFF',
    fontFamily: 'Inter',
    fontWeight: '400',
    fontSize: 16,
  },

  job: {
    position: 'absolute',
    left: 30,
    top: '44%',
    width: 15,
    height: 15,
  },
  image:{
    height:150,
    width:150
  }
});

export default Screen3;