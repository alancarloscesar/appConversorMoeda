import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity,ActivityIndicator,Keyboard } from 'react-native';

import Picker from './src/components/Picker';

import api from './src/services/api';

export default function App() {

const [moedas, setMoedas] = useState([]);
const [loading, setLoading] = useState(true);

const [moedaSelecionada, setMoedaSelecionada] = useState(null);
const [moedaBvalor, setMoedaBvalor] = useState(0);

const [valorMoeda, setValorMoeda] = useState(null);
const [valorrConvertido, setValorrConvertido] = useState(0);

useEffect(() => {
  async function loadMoedas(){
  const response = await api.get('all');
  
  let arrayMoedas = []
  Object.keys(response.data).map((key) => {
    arrayMoedas.push({
      key:key,
      label:key,
      value:key,
    })
  })

  setMoedas(arrayMoedas);
  setLoading(false);

  }
  loadMoedas();
}, []);


async function converter(){
  if(moedaSelecionada === null || moedaBvalor === ''){
    alert('Selecione uma moeda e preencha o valor a ser convertido');
    return;
  }
  const response = await api.get(`all/${moedaSelecionada}-BRL`);

  let resultado = (response.data[moedaSelecionada].ask * parseFloat(moedaBvalor));

  setValorrConvertido(`R$ ${resultado.toFixed(2)}`);
  setValorMoeda(moedaBvalor);

  Keyboard.dismiss();
}


if(loading){
  return(

    <View style={{justifyContent:'center', alignItems:'center', flex:1}}>
      <ActivityIndicator color='#fff' size={45} />
    </View>
    )
}else{
  return (
    <View style={styles.container}>
      <View style={styles.areaMoeda}>
        <Text style={styles.titulo}>Selecione sua moeda</Text>
        <Picker moedas={moedas} onChange={(moeda) => setMoedaSelecionada(moeda)}/>
      </View>
      
      <View style={styles.areaValor}>
        <Text style={[styles.titulo, {fontSize:17}]}>Digite um valor para converter em (R$)</Text>
        <TextInput
        placeholder='Ex. 100'
        style={styles.input}
        keyboardType={'numeric'}

        onChangeText={(valor) => setMoedaBvalor(valor)}
        />
      </View>

      <TouchableOpacity style={styles.botaoArea} onPress={converter} >
        <Text style={styles.botaoTexto}>Converter</Text>
      </TouchableOpacity>

    {valorrConvertido !== 0 && (
     
     <View style={styles.areaResultado}>
      <Text style={styles.valorConvertido}>
        {moedaSelecionada}
      </Text>
      <Text style={[styles.valorConvertido, {fontSize:20,}]}>
        Corresponde a
      </Text>
      <Text style={styles.valorConvertido}>
        {valorrConvertido}
      </Text>

    </View>

    )}
      


      <StatusBar style="auto" />
    </View>
  );

  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   backgroundColor: '#101215',
    alignItems: 'center',
    paddingTop:55
  },
  areaMoeda:{
    width: '90%',
    backgroundColor: '#fff',
    paddingTop:9,
    borderTopLeftRadius:10,
    borderTopRightRadius:10
  },
  titulo:{
    fontSize:20,
    padding: 15
  },
  areaValor:{
    backgroundColor:'#f9f9f9',
    width: '90%',
    marginTop:3
  },
  input:{
    fontSize:20,
    padding: 15,
  },
  botaoArea:{
    backgroundColor:'#e52246',
    width: '90%',
    paddingVertical:13,
    borderBottomLeftRadius:10,
    borderBottomRightRadius:10
  },
  botaoTexto:{
    fontSize:20,
    color: '#fff',
    textAlign:'center',
    fontWeight:'bold'
  },
  areaResultado:{
    backgroundColor:'#f1f1f1',
    width: '90%',
    marginTop:30,
  },
  valorConvertido:{
    fontSize:40,
    textAlign:'center',
    padding: 10,
    fontWeight:'bold'
  }


});
