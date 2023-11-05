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
   const { donoDoPerfil = false } = route.params;
   const { user } = React.useContext(AuthContext);

   const [loading, setLoading] = useState(false);

   const [dadosPassageiro, setDadosPassageiro] = useState({});
   const [dadosProntos, setDadosProntos] = useState(false);
   const [photoUri, setPhotoUri] = useState(placeholder_photo);

   const getData = async () => {
      var id = donoDoPerfil ? user.user_id : route.params.user_id;

      setLoading(true);
      await api
         .get(`/users/passengers/passenger/${id}`)
         .then((resp) => {
            setDadosPassageiro(resp.data);
            if (resp.data.google_account) {
               setPhotoUri({ uri: resp.data.photo });
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
         <MenuBar nomeTela={'Perfil Passageiro'} mostraBtnPerfil={!donoDoPerfil} />
         {loading ? (
            <ActivityIndicator style={{ justifyContent: 'center', flex: 1 }} size="large" color={cores.azulProfundo} />
         ) : (
            <>
               {dadosProntos ? (
                  <View style={estilos.container}>
                     <View style={[estilos.topoPerfil, estilos.bordaAbaixo]}>
                        <Image source={photoUri} style={estilos.foto} />
                        <Texto style={estilos.textoNome}>{dadosPassageiro.name}</Texto>
                     </View>
                     <View style={[estilos.infoContainer, estilos.bordaAbaixo]}>
                        <Texto style={estilos.label}>Telefone</Texto>
                        <Texto style={estilos.textoDados}>{dadosPassageiro.phone ? dadosPassageiro.phone : '(11) 99999-9999'}</Texto>
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
   container: {
      flex: 1,
      backgroundColor: cores.branco,
   },
   topoPerfil: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
   },
   bordaAbaixo: {
      borderBottomColor: cores.cinza,
      borderBottomWidth: 1,
   },
   foto: {
      width: 80,
      height: 80,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: cores.azulProfundo,
      marginRight: 10,
   },
   textoNome: {
      flex: 1,
      paddingHorizontal: 10,
      textAlignVertical: 'center',
      fontSize: 24,
   },
   infoContainer: {
      padding: 10,
   },
   label: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
      color: cores.azulProfundo,
   },
   textoDados: {
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
