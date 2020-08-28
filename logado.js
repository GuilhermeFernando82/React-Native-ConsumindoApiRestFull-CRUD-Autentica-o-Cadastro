import { StyleSheet, View, Text, TextInput } from 'react-native';
import React, { Component } from 'react';
import {Button} from 'react-native-elements';

export default class logado extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            token: props.route.params.data,
            user: [],
            nome: '',
            desc: '',
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
                    height:45,
                    textAlign:'center',
                    borderRadius:18,
                    marginBottom:6,
                    borderColor:'green',
                    borderWidth:5,
                }

            })
        }
        this.redirect = this.redirect.bind(this)
        this.exit = this.exit.bind(this)
        this.getUser = this.getUser.bind(this)
        this.cadastrar = this.cadastrar.bind(this)
    }
componentDidMount(){
    this.redirect()
    this.getUser()
}
redirect(){
    if(this.state.token == null){
        this.props.navigation.navigate('Login')
        this.exit
   }
}
exit(){
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+this.state.token+"");

    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };

    fetch("http://192.168.15.6:8000/api/logout", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .then(this.props.navigation.navigate('Login'))
    .catch(error => console.log('error', error));
    }
getUser(){
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+this.state.token+"");

    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };

    fetch("http://192.168.15.6:8000/api/user", requestOptions)
    .then(response => response.json())
    .then(response => {this.setState({user: response || []})})
    .catch(error => console.log('error', error));
    }
cadastrar(){
    var requestOptions = {
    method: 'POST',
    redirect: 'follow'
    };

    fetch("http://192.168.15.6:8000/api/produtos?nome_user="+this.state.user.name+"&id_usuario="+this.state.user.id+"&nome="+this.state.nome+"&desc="+this.state.desc+"", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
    }
render(){
    return(
    <View style={this.state.style.container}>
         <Text style={{marginBottom:15}}>
            <Text style={{color:'white', fontSize:20}}>Bem vindo:</Text><Text style={{color:'yellow', fontSize:16}}>{this.state.user.name}</Text>
         </Text>
         
         <Text style={{color:'white', fontSize:16}}>Insira um nome do Produto</Text>
         <TextInput
            style={this.state.style.input}
            onChangeText={(value) => this.setState({nome: value})}
            value={this.state.nome}
         />
         <Text style={{color:'white', fontSize:16}}>Insira uma descrição</Text>
         <TextInput
            style={this.state.style.input}
            onChangeText={(value) => this.setState({desc: value})}
            value={this.state.desc}
         />
         <Button
            title="Cadastrar Produto"
            onPress={this.cadastrar}
            buttonStyle={this.state.style.button}
         />
        <Button
            title="Ver Lista de Produtos"
            onPress={() => {this.props.navigation.navigate('products',{'token': this.state.token, 'user_id': this.state.user.id})}}
            buttonStyle={this.state.style.button}
        />
    </View>
   

    )
}

}