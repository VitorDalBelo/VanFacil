import React, { useEffect, useState } from 'react';
import { TouchableOpacity, StyleSheet, View, ActivityIndicator, Keyboard } from 'react-native';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import Texto from '../../../components/Texto';
import cores from '../../../../assets/cores';
import CardPassageiro from '../../Shared/CardPassageiro';
import { toastApiError } from '../../../helpers/toast';
import api from '../../../services/api';

export default function ModalRota({ handleClose, setNovoPassageiro }) {
   const [pesquisa, setPesquisa] = useState('');
   const [listaResultados, setListaResultados] = useState([]);

   const [loading, setLoading] = useState(false);

   useEffect(() => {
      if (pesquisa != '') {
         setLoading(true);
         const pesquisaNome = setTimeout(async () => {
            const passageiros = await api
               .get(`/users/passenger/search?name=${pesquisa}`)
               .then((response) => {
                  return response.data;
               })
               .finally(() => {
                  setLoading(false);
               })
               .catch((e) => {
                  toastApiError(e);
                  console.log('Erro: ' + e);
                  return null;
               });
            if (passageiros) {
               setListaResultados(passageiros);
               if (passageiros.length != 0) Keyboard.dismiss();
            }
         }, 2000);

         return () => clearTimeout(pesquisaNome);
      }
   }, [pesquisa]);

   return (
      <>
         <TouchableOpacity style={estilos.btnFechar} onPress={handleClose}></TouchableOpacity>
         <View style={estilos.container}>
            <View style={estilos.linhaTexto}>
               <Texto style={estilos.textoGeral}>Pesquise o nome do(a) passageiro(a)</Texto>
            </View>
            <TextInput style={estilos.input} value={pesquisa} onChangeText={setPesquisa} placeholder="Digite o nome do Passageiro" />
            <View style={estilos.linhaTexto}>
               <Texto style={estilos.textoGeral}>Toque no nome para adicionar à rota</Texto>
            </View>
            <View style={estilos.containerLista}>
               {loading ? (
                  <View style={estilos.listaVazia}>
                     <ActivityIndicator style={{ justifyContent: 'center' }} size="large" color={cores.azulProfundo} />
                  </View>
               ) : (
                  <>
                     {listaResultados.length != 0 ? (
                        <FlatList
                           data={listaResultados}
                           renderItem={({ item }) => {
                              return (
                                 <TouchableOpacity
                                    onPress={() => {
                                       setNovoPassageiro(item);
                                       handleClose();
                                    }}
                                 >
                                    <CardPassageiro {...item} />
                                 </TouchableOpacity>
                              );
                           }}
                        />
                     ) : (
                        <View style={estilos.listaVazia}>
                           <Texto style={estilos.textoListaVazia}>Nenhum resultado encontrado ou pesquisado</Texto>
                        </View>
                     )}
                  </>
               )}
            </View>
         </View>
      </>
   );
}

const estilos = StyleSheet.create({
   btnFechar: {
      flex: 1,
      zindex: 9,
      backgroundColor: cores.cinzaEscuro,
      opacity: 0.8,
   },
   container: {
      flex: 2,
      backgroundColor: cores.branco,
      paddingHorizontal: 10,
   },
   input: {
      height: 40,
      paddingHorizontal: 10,
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: cores.azulProfundo,
      borderRadius: 5,
      fontSize: 16,
      fontFamily: 'RubikRegular',
   },
   linhaTexto: {
      justifyContent: 'center',
      marginVertical: 10,
   },
   textoGeral: {
      fontSize: 20,
   },
   containerLista: {
      flex: 1,
      borderWidth: 1,
      borderColor: cores.azulProfundo,
      borderRadius: 5,
      backgroundColor: cores.cinzaClaro,
      overflow: 'hidden',
      marginBottom: 10,
   },
   listaVazia: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
   },
   textoListaVazia: {
      fontSize: 18,
      color: cores.cinza,
      marginBottom: 10,
   },
   botao: {
      // alignSelf: 'center',
      width: '100%',
      padding: 10,
      borderRadius: 10,
      backgroundColor: cores.azulProfundo,
      color: cores.preto,
      marginVertical: 10,

      // Android
      elevation: 4,

      //iOS
      shadowColor: '#000',
      shadowOffset: {
         width: 0,
         height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
   },
   textoBotao: {
      color: cores.branco,
      alignSelf: 'center',
      fontWeight: 'bold',
      fontSize: 18,
   },
});
