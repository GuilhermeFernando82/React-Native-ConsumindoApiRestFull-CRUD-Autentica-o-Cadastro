import { StyleSheet, View, Text, TextInput,FlatList,SafeAreaView } from 'react-native';
import React, { Component } from 'react';
import {Button} from 'react-native-elements';

export default class produtos extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            data: [],
            token: props.route.params.token,
            id_user: props.route.params.user_id,
            styles: StyleSheet.create({
                container: {
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
                }
            })
        }
        this.loadProdutos = this.loadProdutos.bind(this)
        this.redirect = this.redirect.bind(this)
    }
    componentDidMount(){
        this.redirect()
        this.loadProdutos()
    }
    redirect(){
        if(this.state.token == null){
            this.props.navigation.navigate('Login')
       }
    }
    loadProdutos(){
    var requestOptions = {
    method: 'GET',
    redirect: 'follow'
    };

    fetch("http://192.168.15.6:8000/api/produtos", requestOptions)
    .then(response => response.json())
    .then(response => {this.setState({data: response || []})})
    .catch(error => console.log('error', error));
    }
    render(){
        return(
            <View style={this.state.styles.container}>
                <Text style={{marginTop:20, marginBottom:5, fontSize:35, color:'yellow'}}>Produtos Cadastrados</Text>
                    <FlatList
                        data={this.state.data}
                        renderItem={({item})=> (
                            <View style={{ alignItems:'center',justifyContent:'center',marginBottom:5,height:80,width:350,borderRadius:15,backgroundColor:'white',borderWidth:4,borderColor:'green', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{color:'black'}}>Publicado por: {item.nome_user}</Text>
                                <Text style={{color:'black'}}>Nome do Produto: {item.nome}</Text>
                                <Text style={{color:'black'}}>Descrição: {item.desc}</Text>
                            </View>
                        )}
                    />
               <Button
                    buttonStyle={this.state.styles.button}
                    title="Gerenciar"
                    onPress={() => {this.props.navigation.navigate('manager',{'token': this.state.token, 'id': this.state.id_user})}}
               />
               
            </View>
        )
    }
}