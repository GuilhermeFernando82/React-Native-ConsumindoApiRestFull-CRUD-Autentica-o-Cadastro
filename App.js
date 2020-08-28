import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {Button} from 'react-native-elements';
import Login from './Login';
import loga from './logado';
import Cadastro from './Cadastro';
import produtos from './products';
import manager from './manager'
function Home({navigation}) {
  return (
    <View style={styles.container}>
      <Text style={{color:'yellow', fontSize:35}}>Curso React-Native</Text>
      <Image
        style={styles.img}
        source={{
          uri: 'https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/132371850/original/dcd54e6803f35c11db574db59813ba1aab945584/develop-react-native-app-with-laravel-backend.png'
        }}
      />
      <Button
        buttonStyle={styles.button}
        title="Login"
        onPress={() => navigation.navigate('Login')}
      />
      <Button
        buttonStyle={styles.button}
        title="Criar uma nova conta"
        onPress={() => navigation.navigate('CadastroUser')}
      />
      <StatusBar style="auto" />
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9400d3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    borderRadius:15,
    borderWidth:6,
    borderColor:'gray',
    backgroundColor:'#00607c',
    width:250,
    marginBottom:7

  },
  img:{
    width:300,
    height:200,
    marginBottom:6

  }

});

const Stack = createStackNavigator();
function App(){
  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="CadastroUser" component={Cadastro}/>
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="logado" component={loga}/>
        <Stack.Screen name="products" component={produtos}/>
        <Stack.Screen name="manager" component={manager}/>
      </Stack.Navigator>
    </NavigationContainer>
  );

}
export default App;