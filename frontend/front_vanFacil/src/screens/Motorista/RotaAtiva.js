import React, { useMemo, useRef, useState, useEffect } from 'react';
import { BackHandler, Dimensions, StyleSheet, View } from 'react-native';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { Manager } from 'socket.io-client';
import { useNavigation, useRoute } from '@react-navigation/native';

import Texto from '../../components/Texto';
import MenuBar from '../Shared/MenuBar';
import MapaRotaAtiva from '../Shared/Rota/MapaRotaAtiva';
import CardPassageiro from '../Shared/CardPassageiro';

import cores from '../../../assets/cores';
import api from '../../services/api';

import { toastApiError } from '../../helpers/toast';
import { TouchableOpacity } from 'react-native-gesture-handler';

function TopoLista() {
   return (
      <View
         style={[
            estilos.linhaDetalhe,
            {
               backgroundColor: cores.cinzaClaro,
               justifyContent: 'center',
            },
         ]}
      >
         <Texto style={estilos.textoDetalhes}>Lista de passageiros</Texto>
      </View>
   );
}

export default function RotaAtiva() {
   const route = useRoute();
   var { trip_id } = route.params;
   const navigation = useNavigation();

   const [socketConnection, setSocketConnection] = useState(null);

   const [passageiros, setPassageiros] = useState([]);

   const listaPassageiros = passageiros.slice(1);

   const bottomSheetRef = useRef(BottomSheet);
   const snapPoints = useMemo(() => [200, '100%'], []);

   const getTrip = () => {
      api.get(`/trip/${trip_id}`)
         .then((trip) => {
            setPassageiros(formataLista(trip.data.passengers));
         })
         .catch((e) => toastApiError(e));
   };

   const formataLista = (lista) => {
      var passageiros = [];
      lista.forEach((objeto) => {
         address = objeto.passenger.address;
         passageiros.push({
            google_account: objeto.passenger.user.google_account,
            photo: objeto.passenger.user.photo,
            name: objeto.passenger.user.name,
            address: `${address.cidade} - ${address.bairro}\n${address.logradouro} nº ${address.numero} ${
               address.complemento ? address.complemento : ''
            }`,
         });
      });
      return passageiros;
   };

   // Verifica se algum passageiro alterou sua presença na rota
   useEffect(() => {
      getTrip();
      const manager = new Manager(String(process.env.EXPO_PUBLIC_BACKEND_URL));
      const socket = manager.socket('/');
      socket.emit('joinTrip', String(trip_id));
      socket.on('tripClient', (msg) => {
         if (msg === 'absence') {
            getTrip();
         }
         console.log('msg', msg);
      });
      setSocketConnection(socket);
   }, []);

   const pararRota = () => {
      api.post(`/trip/${trip_id}/statustrip?status=false`)
         .then(() => navigation.navigate('M_Rota', { trip_id: trip_id }))
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
         <View style={estilos.container}>
            <MenuBar nomeTela={'Rota Ativa Motorista'} mostraBtnPerfil={false} />
            <MapaRotaAtiva />
            <BottomSheet ref={bottomSheetRef} index={0} snapPoints={snapPoints}>
               <View style={[estilos.linhaDetalhe, estilos.bordaCima]}>
                  <Texto style={estilos.textoDetalhes}>Passageiros restantes:</Texto>
                  <Texto style={estilos.textoDetalhes}>{passageiros.length}</Texto>
               </View>
               <View style={estilos.linhaDetalhe}>
                  <Texto style={estilos.textoDetalhes}>Próximo(a) passageiro(a):</Texto>
               </View>
               {passageiros.length > 0 && (
                  <>
                     <View style={{ height: 100 }}>
                        <CardPassageiro {...passageiros[0]} />
                     </View>

                     <BottomSheetFlatList
                        ListHeaderComponent={TopoLista}
                        data={listaPassageiros}
                        keyExtractor={({ ordem }) => ordem}
                        renderItem={({ item }) => {
                           return <CardPassageiro {...item} />;
                        }}
                     />
                  </>
               )}
            </BottomSheet>
         </View>
         <View style={estilos.linhaBotao}>
            <TouchableOpacity style={estilos.botao} onPress={pararRota}>
               <Texto style={estilos.textoBotao}>Parar Rota</Texto>
            </TouchableOpacity>
         </View>
      </>
   );
}

const larguraTela = Dimensions.get('screen').width;

const estilos = StyleSheet.create({
   container: {
      width: '100%',
      flex: 1,
      backgroundColor: 'white',
   },
   linhaDetalhe: {
      width: '100%',
      borderBottomWidth: 1,
      borderBottomColor: cores.cinzaBorda,
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      paddingHorizontal: 20,
   },
   bordaCima: { borderTopColor: cores.cinzaBorda, borderTopWidth: 1 },
   textoDetalhes: {
      fontSize: 18,
      lineHeight: 42,
   },
   linhaBotao: {
      width: '100%',
      borderBottomWidth: 1,
      borderBottomColor: '#ECECEC',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      backgroundColor: cores.branco,
      paddingHorizontal: 10,
   },
   botao: {
      alignSelf: 'center',
      alignItems: 'center',
      width: larguraTela - 20,
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
