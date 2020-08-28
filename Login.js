import { StyleSheet, View, Text, TextInput } from 'react-native';
import React from 'react';
import {Button} from 'react-native-elements';

export default class login extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            data: [],
            email: '',
            password: '',
            msg: '',
            style: StyleSheet.create({
                container:{
                    flex: 1,
                    backgroundColor: '#9400d3',
                    alignItems: 'center',
                    justifyContent: 'center',
                },
                button:{
                    backgroundColor:'green',
                    width:250,
                    borderRadius:15,
                    borderWidth:5,
                    borderColor:'gray',
                    textAlign:'center',
                    marginBottom:7
                },
                input:{
                    backgroundColor:'white',
                    width:250,
                    borderRadius:15,
                    borderWidth:5,
                    borderColor:'gray',
                    textAlign:'center',
                    marginBottom:7
                }

            })
        }
        this.login = this.login.bind(this)
    }
    login(){
        var requestOptions = {
        method: 'POST',
        redirect: 'follow'
        };

        fetch("http://192.168.15.6:8000/api/login?email="+this.state.email+"&password="+this.state.password+"", requestOptions)
        .then(response => response.json())
        .then(response => {this.setState({data: response.access_token})})
        .then(() => {this.props.navigation.navigate('logado',{'data': this.state.data})})
        .catch(this.state.msg="Invalid password or email");
            }
    render(){
        return(
            <View style={this.state.style.container}>
                <Text>{this.state.msg}</Text>
                <Text style={{color:'white',fontSize:35}}>Login de Usuários</Text>
                <Text>E-mail</Text>
                <TextInput
                    style={this.state.style.input}
                    onChangeText={(value) => this.setState({email: value})}
                    value={this.state.email}
                />
                <Text>Senha</Text>
                <TextInput
                    style={this.state.style.input}
                    onChangeText={(value) => this.setState({password: value})}
                    value={this.state.password}
                    secureTextEntry={true}
                />
                <Button
                    buttonStyle={this.state.style.button}
                    title="Entrar"
                    onPress={this.login}
                />
            </View>
        )
    }
}