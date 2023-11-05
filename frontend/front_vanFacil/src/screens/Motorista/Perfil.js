import React, { useContext, useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native';

import MenuBar from '../Shared/MenuBar';
import Texto from '../../components/Texto';
import cores from '../../../assets/cores';

import api from '../../services/api';
import { toastApiError } from '../../helpers/toast';
import { AuthContext } from '../../context/Auth/AuthContext';
import placeholder_photo from '../../../assets/placeholder_user_photo.png';

export default function Perfil() {
   const route = useRoute();
   const { donoDoPerfil } = route.params;
   const [loading, setLoading] = useState(false);

   const [dadosMotorista, setDadosMotorista] = useState(null);
   const [dadosGerais, setDadosGerais] = useState(null);
   const [dadosProntos, setDadosProntos] = useState(false);
   const [photoUri, setPhotoUri] = useState(placeholder_photo);

   const navigation = useNavigation();

   const getData = async () => {
      setLoading(true);
      await api
         .get(`/users/drivers/driver/${route.params.user_id}`)
         .then((resp) => {
            setDadosMotorista(resp.data.driver);
            setDadosGerais(resp.data.user);
            if (resp.data.user.google_account) {
               setPhotoUri({ uri: props.photo });
            }
            setDadosProntos(true);
         })
         .finally(() => {
            setLoading(false);
         })
         .catch((e) => {
            toastApiError(e);
         });
   };

   useEffect(() => {
      getData();
   }, []);

   useEffect(() => {
      if (route.params && route.params.reload) {
         route.params.reload = false;
         getData();
      }
   }, [route.params]);

   return (
      <>
         <MenuBar nomeTela={'Perfil Motorista'} mostraBtnPerfil={!donoDoPerfil} />
         {loading ? (
            <ActivityIndicator style={{ justifyContent: 'center', flex: 1 }} size="large" color={cores.azulProfundo} />
         ) : (
            <>
               {dadosProntos ? (
                  <View style={estilos.molde}>
                     <View style={estilos.topoPerfil}>
                        <Image source={photoUri} style={estilos.foto} />
                        <Texto style={estilos.textoNome}>{dadosGerais.name}</Texto>
                     </View>
                     <View style={estilos.info}>
                        <Texto style={estilos.desc}>{dadosMotorista.descricao}</Texto>
                        <Texto style={estilos.outraInfo}>{'numero telefone'}</Texto>
                     </View>
                  </View>
               ) : (
                  <View style={estilos.listaVazia}>
                     <Texto style={estilos.textoListaVazia}>Ocorreu um erro ao carregar o perfil</Texto>
                  </View>
               )}
            </>
         )}
      </>
   );
}

const estilos = StyleSheet.create({
   molde: {
      margin: 10,
      flex: 1,
   },
   topoPerfil: {
      flexDirection: 'row',
      alignItems: 'center',
   },
   foto: {
      width: 60,
      height: 60,
      borderRadius: 50,
      borderWidth: 2,
      borderColor: cores.azulProfundo,
      marginRight: 10,
   },
   textoNome: {
      flex: 1,
      height: 40,
      backgroundColor: cores.branco,
      paddingHorizontal: 10,
      textAlignVertical: 'center',
      borderRadius: 5,
      borderWidth: 2,
      borderColor: cores.azulProfundo,
      fontSize: 20,
   },
   info: {
      flex: 1,
   },
   outraInfo: {
      height: 40,
      marginVertical: 10,
      textAlignVertical: 'center',
      paddingLeft: 10,
      fontSize: 20,
      borderRadius: 5,
      borderWidth: 2,
      borderColor: cores.azulProfundo,
      backgroundColor: cores.branco,
   },
   desc: {
      backgroundColor: cores.branco,
      marginTop: 10,
      borderRadius: 5,
      paddingLeft: 10,
      paddingTop: 5,
      fontSize: 15,
      borderWidth: 2,
      borderColor: cores.azulProfundo,
      height: 100,
   },
   caixaMapa: {
      flex: 1,
      overflow: 'hidden',
      borderWidth: 2,
      borderColor: cores.azulProfundo,
      borderRadius: 5,
   },
   botao: {
      alignSelf: 'flex-start',
      padding: 10,
      borderRadius: 10,
      backgroundColor: cores.azulProfundo,
      color: cores.preto,
      marginTop: 10,

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
      fontWeight: 'bold',
      fontSize: 18,
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
});
