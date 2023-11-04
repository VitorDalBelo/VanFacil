import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, BackHandler, FlatList, Modal, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import Texto from '../../../components/Texto';
import MenuBar from '../../Shared/MenuBar';
import CardPassageiro from '../../Shared/CardPassageiro';

import cores from '../../../../assets/cores';
import { TextInput } from 'react-native-gesture-handler';
import ModalRota from './ModalRota';
import toast from '../../../helpers/toast';
import api from '../../../services/api';

export default function CriarRota() {
   const [nomeRota, setNomeRota] = useState('');
   const [listaRota, setListaRota] = useState([]);
   const navigation = useNavigation();

   const [modalVisible, setModalVisible] = useState(false);
   const [loading, setLoading] = useState(false);

   const [novoPassageiro, setNovoPassageiro] = useState(null);

   useEffect(() => {
      if (novoPassageiro != null) {
         if (idJaExiste(novoPassageiro.p_passenger_id)) {
            toast('O(A) Passageiro(a) já está na lista da rota', 'error');
         } else {
            listaRota.push(novoPassageiro);
         }
         setNovoPassageiro(null);
      }
   }, [novoPassageiro]);

   const separaIds = () => {
      var listaIds = [];
      listaRota.forEach((passageiro) => {
         listaIds.push(passageiro.p_passenger_id);
      });
      return listaIds;
   };

   const montaListaId = () => {
      var listaIds = [];
      listaRota.forEach((passageiro) => {
         listaIds.push({ passengerid: passageiro.p_passenger_id });
      });
      return listaIds;
   };

   const idJaExiste = (idNovoPassageiro) => {
      var listaIds = separaIds();
      const idJaExiste = listaIds.find((id) => id === idNovoPassageiro) !== undefined;
      return idJaExiste;
   };

   const excluiPassageiro = (passageiro) => {
      Alert.alert('Excluir', 'Tem certeza de que quer excluir esse passageiro da rota?', [
         {
            text: 'Cancelar',
            onPress: () => null,
            style: 'cancel',
         },
         { text: 'Sim', onPress: () => setListaRota(listaRota.filter((elemento) => elemento !== passageiro)) },
      ]);
   };

   const finalizarRota = async () => {
      if (nomeRota == '') {
         toast('Dê um nome para sua Rota', 'error');
      } else {
         setLoading(true);
         const requestPayload = { name: nomeRota, passengers: montaListaId() };
         console.log(requestPayload);
         api.post('/trip', requestPayload)
            .then(() => {
               navigation.navigate('M_Inicial');
               toast('Rota cadastrada com sucesso', 'success');
            })
            .catch((e) => {
               console.log('error: ', e);
               if (e.response && e.response.data) toast(e.response.data.message, 'error');
               else toast('Ocorreu um erro', 'error');
            })
            .finally(() => {
               setLoading(false);
            });
      }
   };

   // Aviso para sair da criação de rota
   useEffect(() => {
      const backAction = () => {
         if (!loading) {
            Alert.alert('Sair', 'Tem certeza de que quer sair da criação da rota?\nOs dados não serão salvos.', [
               {
                  text: 'Cancelar',
                  onPress: () => null,
                  style: 'cancel',
               },
               { text: 'Sim', onPress: () => navigation.goBack() },
            ]);
         } else {
            Alert.alert('Sair', 'Aguarde enquanto realizamos o cadastro da nova rota.', [
               {
                  text: 'OK',
                  onPress: () => null,
                  style: 'cancel',
               },
            ]);
         }

         return true;
      };

      const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

      return () => backHandler.remove();
   }, [loading]);

   return (
      <>
         <MenuBar nomeTela={'Nova Rota'} mostraBtnPerfil={false} />
         <View style={estilos.container}>
            <View style={estilos.linhaTexto}>
               <Texto style={estilos.textoGeral}>Nome da rota</Texto>
            </View>
            <TextInput
               editable={!loading}
               style={estilos.input}
               value={nomeRota}
               onChangeText={setNomeRota}
               maxLength={40}
               placeholder={'Dê um nome para sua rota. Ex: USCS Manhã'}
            />
            <View style={estilos.linhaTexto}>
               <Texto style={estilos.textoGeral}>Passageiros</Texto>
            </View>
            <View style={estilos.containerLista}>
               {listaRota.length != 0 ? (
                  <FlatList
                     data={listaRota}
                     renderItem={({ item }) => {
                        return (
                           <View style={estilos.cardComBotao}>
                              <CardPassageiro {...item} />
                              <View style={estilos.fundoBotao}>
                                 <TouchableOpacity style={estilos.btnExcluir} onPress={() => excluiPassageiro(item)} disabled={loading}>
                                    <Feather name="x" size={30} color="white" />
                                 </TouchableOpacity>
                              </View>
                           </View>
                        );
                     }}
                  />
               ) : (
                  <View style={estilos.listaVazia}>
                     <Texto style={estilos.textoListaVazia}>Sua lista está vazia</Texto>
                     <Texto style={estilos.textoListaVazia}>Adicione passageiros clicando no botão abaixo</Texto>
                  </View>
               )}
            </View>
            {loading ? (
               <View style={estilos.listaVazia}>
                  <ActivityIndicator style={{ justifyContent: 'center' }} size="large" color={cores.azulProfundo} />
               </View>
            ) : (
               <View style={estilos.buttonContainer}>
                  <TouchableOpacity style={estilos.botao} disabled={loading} onPress={() => setModalVisible(true)}>
                     <Texto style={estilos.textoBotao}>Adicionar Passageiro</Texto>
                  </TouchableOpacity>
                  <TouchableOpacity style={estilos.botao} disabled={loading} onPress={finalizarRota}>
                     <Texto style={estilos.textoBotao}>Finalizar Rota</Texto>
                  </TouchableOpacity>
               </View>
            )}
         </View>
         <Modal visible={modalVisible} transparent={true} onRequestClose={() => setModalVisible(false)}>
            <ModalRota handleClose={() => setModalVisible(false)} setNovoPassageiro={setNovoPassageiro} />
         </Modal>
      </>
   );
}

const estilos = StyleSheet.create({
   container: {
      flex: 1,
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
      fontWeight: 'bold',
   },
   containerLista: {
      flex: 1,
      borderWidth: 1,
      borderColor: cores.azulProfundo,
      borderRadius: 5,
      backgroundColor: cores.cinzaClaro,
      overflow: 'hidden',
   },
   cardComBotao: {
      backgroundColor: cores.branco,
      flexDirection: 'row',
   },
   fundoBotao: {
      height: 101,
      backgroundColor: cores.branco,
      borderBottomWidth: 1,
      borderBottomColor: cores.cinzaBorda,
      justifyContent: 'center',
   },
   btnExcluir: {
      width: 40,
      height: 40,
      marginRight: 10,
      backgroundColor: cores.vermelho,
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
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
   buttonContainer: {
      width: '100%',
      alignSelf: 'center',
      justifyContent: 'space-around',
      backgroundColor: cores.cinzaClaro,
   },
   button: {
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: cores.azulProfundo,
      borderRadius: 5,
      marginVertical: 10,
   },
   textoBotao: {
      color: cores.branco,
      alignSelf: 'center',
      fontWeight: 'bold',
      fontSize: 18,
   },
});
