import React, { useContext, useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { AuthContext } from '../../../context/Auth/AuthContext';

import cores from '../../../../assets/cores';
import CardRota from '../../Shared/Inicial/CardRota';
import Texto from '../../../components/Texto';
import api from '../../../services/api';
import { toastApiError } from '../../../helpers/toast';

export default function ListaRotas({ telaMotorista = true }) {
   const { user } = useContext(AuthContext);
   const [trips, setTrips] = useState([]);

   const getTrips = async () => {
      await api
         .get('/users/trips')
         .then((resp) => {
            const { trips } = resp.data;
            setTrips(trips);
         })
         .catch((e) => {
            console.log(e);
            toastApiError(e);
         });
   };

   useEffect(() => {
      getTrips();
   }, []);

   return (
      <>
         {trips.length != 0 ? (
            <FlatList
               data={trips}
               renderItem={({ item }) => {
                  return <CardRota {...item} telaMotorista={user.profile == 'driver'} />;
               }}
               keyExtractor={(trip) => trip.trip.trip_id}
            />
         ) : (
            <View style={estilos.listaVazia}>
               <Texto style={estilos.textoListaVazia}>Você não faz parte de nenhuma rota ainda!</Texto>
               {telaMotorista ? (
                  <Texto style={estilos.textoListaVazia}>Crie uma nova rota no botão abaixo!</Texto>
               ) : (
                  <Texto style={estilos.textoListaVazia}>Pesquise um motorista no botão abaixo!</Texto>
               )}
            </View>
         )}
      </>
   );
}
const estilos = StyleSheet.create({
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
