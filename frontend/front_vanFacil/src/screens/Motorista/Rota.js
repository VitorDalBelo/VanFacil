import React, { useEffect, useState } from 'react';
import { BackHandler, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Manager } from 'socket.io-client';

import Texto from '../../components/Texto';
import MapaRotaInativa from '../Shared/Rota/MapaRotaInativa';
import MenuBar from '../Shared/MenuBar';

import cores from '../../../assets/cores';
import api from '../../services/api';

export default function Rota() {
   const route = useRoute();
   var { trip_id } = route.params;
   const navigation = useNavigation();

   const [numTotal, setTotal] = useState(0);
   const [numConfirmados, setConfirmados] = useState(0);
   const [socketConnection, setSocketConnection] = useState(null);

   const getTrip = () => {
      api.get(`/trip/${trip_id}`)
         .then((trip) => {
            setTotal(trip.data.passengers.length + trip.data.absences.length);
            setConfirmados(trip.data.passengers.length);
         })
         .catch((e) => toastApiError(e));
   };

   useEffect(() => {
      getTrip();
      const manager = new Manager(String(process.env.EXPO_PUBLIC_BACKEND_URL));
      const socket = manager.socket('/');
      socket.emit('joinTrip', String(trip_id));
      socket.on('tripClient', (msg) => {
         if (msg === 'absence') {
            getTrip();
         }
      });
      setSocketConnection(socket);
   }, []);

   const iniciarRota = () => {
      api.post(`/trip/${trip_id}/statustrip?status=true`)
         .then(() => navigation.navigate('M_RotaAtiva', { trip_id: trip_id }))
         .catch((e) => toastApiError(e));
   };

   // Direciona o caminho de volta para a tela inicial
   useEffect(() => {
      const backAction = () => {
         navigation.navigate('M_Inicial');

         return true;
      };

      const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
      return () => backHandler.remove();
   }, []);

   return (
      <>
         <MenuBar nomeTela={'Rota Inativa Motorista'} mostraBtnPerfil={false} />
         <MapaRotaInativa />
         <View style={estilos.detalhesRota}>
            <View style={estilos.linhaDetalhe}>
               <Texto style={estilos.textoDetalhes}>Passageiros confirmados: </Texto>
               <Texto style={estilos.textoDetalhes}>
                  {numConfirmados}/{numTotal}
               </Texto>
            </View>

            <View style={estilos.linhaDetalhe}>
               <TouchableOpacity style={estilos.botao} onPress={iniciarRota}>
                  <Texto style={estilos.textoBotao}>Iniciar Rota</Texto>
               </TouchableOpacity>
            </View>
         </View>
      </>
   );
}

const estilos = StyleSheet.create({
   detalhesRota: {
      width: '100%',
      backgroundColor: cores.branco,
      position: 'absolute',
      bottom: 0,
      justifyContent: 'space-around',
   },
   linhaDetalhe: {
      width: '100%',
      borderBottomWidth: 1,
      borderBottomColor: '#ECECEC',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      paddingHorizontal: 10,
   },
   textoDetalhes: {
      fontSize: 18,
      lineHeight: 42,
   },
   botao: {
      alignSelf: 'center',
      alignItems: 'center',
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
      fontWeight: 'bold',
      fontSize: 18,
   },
});
