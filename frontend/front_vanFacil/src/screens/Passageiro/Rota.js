import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useRoute } from '@react-navigation/native';

import { toastApiError } from '../../helpers/toast';
import Texto from '../../components/Texto';
import MapaRotaInativa from '../Shared/Rota/MapaRotaInativa';
import MenuBar from '../Shared/MenuBar';
import BotoesIdaVolta from './BotoesIdaVolta';

import api from '../../services/api';
import cores from '../../../assets/cores';

export default function Rota() {
   const route = useRoute();
   var { trip_id } = route.params;

   const [userAbsences, setUserAbsences] = React.useState(undefined);
   const [numTotal, setTotal] = useState(0);
   const [numConfirmados, setConfirmados] = useState(0);

   const getTrip = () => {
      api.get(`/trip/${trip_id}`).then((trip) => {
         setUserAbsences(trip.data.userAbsences);
         setTotal(trip.data.passengers.length + trip.data.absences.length);
         setConfirmados(trip.data.passengers.length);
      });
   };

   const registerAbstence = (go, back) => {
      const data = new Date();
      const ano = data.getFullYear();
      const mes = (data.getMonth() + 1).toString().padStart(2, '0'); // O mês é baseado em zero, por isso é necessário adicionar 1.
      const dia = data.getDate().toString().padStart(2, '0');

      const dataFormatada = `${ano}-${mes}-${dia}`;

      api.post(`/trip/${trip_id}/absence`, {
         go: go,
         back: back,
         absence_date: dataFormatada,
      })
         .then((resp) => {
            getTrip();
         })
         .catch((e) => toastApiError(e));
   };

   React.useEffect(() => {
      getTrip();
   }, []);
   return (
      <>
         <MenuBar nomeTela={'Rota Inativa Passageiro'} mostraBtnPerfil={false} />

         <MapaRotaInativa />

         <View style={estilos.detalhesRota}>
            <View style={estilos.linhaDetalhe}>
               <Texto style={estilos.textoDetalhes}>Passageiros confirmados:</Texto>
               <Texto style={estilos.textoDetalhes}>
                  {numConfirmados}/{numTotal}
               </Texto>
            </View>
            <BotoesIdaVolta userAbsences={userAbsences} onConfirm={registerAbstence} />
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
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      paddingHorizontal: 20,
   },
   textoDetalhes: {
      fontSize: 18,
      lineHeight: 42,
   },
});
