import React, {useEffect,useState} from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';

import MenuBar from '../../Shared/MenuBar';
import Texto from '../../../components/Texto';
import cores from '../../../../assets/cores';

import api from '../../../services/api';
import { toastApiError } from '../../../helpers/toast';

export default function Perfil() {
   const [loading,setLoading] = useState(false);
   const [motorista,setMotorista] = useState(null);
   
   const route = useRoute();
   const { donoDoPerfil } = route.params;

   const navigation = useNavigation();

   const getData = async () =>{
      await api.get("/users/drivers/me")
      .then(resp=>{
         setMotorista(resp.data);
      })
      .catch(e=>{toastApiError(e)})
      
      setLoading(false)
   }

   useEffect(()=>{
      getData()
   },[])

   useEffect(()=>{
      if(route.params && route.params.reload){
         route.params.reload= false;
         getData()
      } 
   },[route.params])

   return (
      <>
      {
         motorista?<>
         <MenuBar />
         <View style={estilos.molde}>
            <View style={estilos.topoPerfil}>
               <Image source={{uri:`${process.env.EXPO_PUBLIC_BACKEND_URL}${motorista.user.photo}`}} style={estilos.foto} />
               <Texto style={estilos.textoNome}>{motorista.user.name}</Texto>
            </View>
            <View style={estilos.info}>
               <Texto style={estilos.desc}>{motorista.driver.descricao}</Texto>
               <Texto style={estilos.outraInfo}>{'numero telefone'}</Texto>
               {donoDoPerfil && (
                  <TouchableOpacity style={estilos.botao} onPress={() => {}}>
                     <Texto style={estilos.textoBotao}>Editar Perfil</Texto>
                  </TouchableOpacity>
               )}
            </View>
         </View>
         </>:<Text>{"erro"}</Text>

      }
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
});
