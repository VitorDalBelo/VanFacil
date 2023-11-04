import React, { useMemo, useRef, useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { Manager } from 'socket.io-client';
import Texto from '../../components/Texto';
import CardPassageiro from '../Shared/CardPassageiro';

import Mapa_teste from '../Shared/Rota/mapa_teste';

import cores from '../../../assets/cores';
import MenuBar from '../Shared/MenuBar';
import { useRoute } from '@react-navigation/native';
import api from '../../services/api';
import { useNavigation } from '@react-navigation/native';

import { requestForegroundPermissionsAsync } from 'expo-location';
import { toastApiError } from '../../helpers/toast';

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
   const navigation = useNavigation();
   const route = useRoute();
   var { trip_id } = route.params;

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

   return (
      <>
         <View style={estilos.container}>
            <MenuBar nomeTela={'Rota Ativa Motorista'} mostraBtnPerfil={false} />
            <Mapa_teste />
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
      </>
   );
}

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
});
