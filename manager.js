import { StyleSheet, View, Text, TextInput,FlatList, Modal } from 'react-native';
import React, { Component } from 'react';
import {Button} from 'react-native-elements';

export default class manager extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            data: [],
            token: props.route.params.token,
            id_user: props.route.params.id,
            visible: false,
            nome: '',
            desc: '',
            id_selected: '',
            styles: StyleSheet.create({
                container: {
                    flex: 1,
                    backgroundColor: '#9400d3',
                    alignItems: 'center',
                    justifyContent: 'center',
                },
                button:{
                    backgroundColor:'blue',
                    width:250,
                    color:'black',
                    borderRadius:15,
                    borderWidth:5,
                    borderColor:'gray',
                    textAlign:'center',
                    marginBottom:7
                },
                deletar:{
                    backgroundColor:'red',
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
    async updateItem(key){
        var requestOptions = {
            method: 'PUT',
            redirect: 'follow'
          };
          
          fetch("http://192.168.15.6:8000/api/produtos/"+key+"?nome="+this.state.nome+"&desc="+this.state.desc+"", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .then(this.loadProdutos)
            .catch(error => console.log('error', error));
    }
    async removeItem(key){
        var requestOptions = {
            method: 'DELETE',
            redirect: 'follow'
          };
          
          fetch("http://192.168.15.6:8000/api/produtos/"+key, requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .then(this.loadProdutos)
            .catch(error => console.log('error', error));
    }
    loadProdutos(){
    var requestOptions = {
    method: 'GET',
    redirect: 'follow'
    }
    fetch("http://192.168.15.6:8000/api/produtoslist/"+this.state.id_user, requestOptions)
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
                            <View style={{ alignItems:'center',justifyContent:'center',marginBottom:5,height:200,width:350,borderRadius:15,backgroundColor:'white',borderWidth:4,borderColor:'green', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{color:'black'}}>Publicado por: {item.nome_user}</Text>
                                <Text style={{color:'black'}}>Nome do Produto: {item.nome}</Text>
                                <Text style={{color:'black'}}>Descrição: {item.desc}</Text>
                                <Button
                                    title="Atualizar"
                                    buttonStyle={this.state.styles.button}
                                    onPress={() => {this.setState({id_selected:item.id, visible:true})}}
                                />
                                <Button
                                    title="Deletar Item"
                                    buttonStyle={this.state.styles.deletar}
                                    onPress={()=>this.removeItem(item.id)}
                                />
                        <View style={{ flex: 1,alignItems: 'center', justifyContent: 'center', backgroundColor:'gray' }}>
                        <Modal
                            animationType={'slide'}
                            transparent={false}
                            visible={this.state.visible}
                            onRequestClose={() => {
                                this.setState({ visible: false });
                            }}
                            >
                            <View style={{ flex: 1,alignItems: 'center', justifyContent: 'center', backgroundColor:'gray' }}>
                            <Text>Atualizar Item</Text>
                            <Text>Nome</Text>
                            <TextInput
                                style={{textAlign:'center', height:50,width:320 ,marginBottom:6, borderColor:'black',borderWidth:6, backgroundColor:'white',borderRadius:15}}
                                onChangeText={(value) => this.setState({nome: value})}
                                value={this.state.nome}
                            />
                            <Text>Descrição</Text>
                            <TextInput
                                style={{textAlign:'center', height:50,width:320 ,marginBottom:6, borderColor:'black',borderWidth:6, backgroundColor:'white',borderRadius:15}}
                                onChangeText={(value) => this.setState({desc: value})}
                                value={this.state.desc}
                            />
                            <Button
                                buttonStyle={this.state.styles.button}
                                title="Atualizar"
                                onPress={() => this.updateItem(this.state.id_selected)}
                                
                            />
                            <Button
                            buttonStyle={this.state.styles.button}
                            title="Fechar"
                            onPress={() => {
                                this.setState({ visible: false });
                            }}
                            />
                        </View>
                    </Modal>
                </View>
            </View>
                        )}
                    />
               
        </View>
        )
    }
}