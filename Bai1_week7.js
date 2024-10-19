import React from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  Button,
} from 'react-native';


const App = () => {

var url ="https://670a9f43ac6860a6c2ca084f.mockapi.io/email/v1/email";
var email = {email: 'thanhphu5@gmail.com'}
var fn =()=>{
fetch(url,{
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(email)

});

}

var fnDelete =()=>{
fetch(url.concat("/") + 10, {
        method: "DELETE",
      });
}

var emailPut = {email: 'ThanhPhuPut2@gmail.com'}
var fnEdit =()=>{
fetch(url.concat("/") + 2, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailPut),
    });

}


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

export default App;