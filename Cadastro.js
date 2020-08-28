import React, { Component } from 'react';
import { StyleSheet, View, Text, SafeAreaView,Modal  } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import {Button} from 'react-native-elements';

export default class Cadastro extends React.Component{
    static navigationOptions = {
        title: 'CadastroUser'
    };
    constructor(props){
        super(props);
        this.state = {
            name:  '',
            email: '',
            password: '',
            styles: StyleSheet.create({
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
                  backgroundColor:'blue',
                  width:250,
                  marginBottom:7
              
                },
                input: {
                    backgroundColor:'white',
                    width:250,
                    height:45,
                    textAlign:'center',
                    borderRadius:18,
                    marginBottom:6,
                    borderColor:'green',
                    borderWidth:5,
                }
              }),

        }
        this.insert = this.insert.bind(this);
        
    }
    insert(){
        var requestOptions = {
            method: 'POST',
            redirect: 'follow'
          };
          
          fetch("http://192.168.15.6:8000/api/register?name="+this.state.name+"&email="+this.state.email+"&password="+this.state.password+"", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .then(alert('Inserido com Sucesso'))
            .catch(error => alert(error));
    }
    render(){
        return(
            <View style={this.state.styles.container}>
                <Text style={{color:'white', fontSize:35, marginBottom:6}}>Cadastro de Usuários</Text>
                <Text style={{color:'white', fontSize:16, marginBottom:6}}>Digite um nome de Usuário</Text>
                <TextInput
                    style={this.state.styles.input}
                    onChangeText={(value) => this.setState({name: value})}
                    value={this.state.name}
                    
                />
                <Text style={{color:'white', fontSize:16, marginBottom:6}}>Digite um email</Text>
                <TextInput
                    style={this.state.styles.input}
                    onChangeText={(value) => this.setState({email: value})}
                    value={this.state.email}
                    
                />
                <Text style={{color:'white', fontSize:16, marginBottom:6}}>Digite uma senha</Text>
                <TextInput
                    style={this.state.styles.input}
                    onChangeText={(value) => this.setState({password: value})}
                    value={this.state.password}
                    secureTextEntry={true}
                />
                <Button
                    title="Cadastrar"
                    buttonStyle={this.state.styles.button}
                    onPress={this.insert}
                />
            </View>
        )
    }


}