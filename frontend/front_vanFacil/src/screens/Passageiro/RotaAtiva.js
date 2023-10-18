import React, { useEffect, useMemo, useRef , useState } from 'react';
import { StyleSheet, View } from 'react-native';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';

import MenuBar from '../Shared/MenuBar';
import Texto from '../../components/Texto';
import MapaRotaInativa from '../Shared/Rota/MapaRotaInativa';
import CardPassageiro from '../Shared/CardPassageiro';
import BotoesIdaVolta from './BotoesIdaVolta';

import cores from '../../../assets/cores';
import { useRoute } from '@react-navigation/native';
import api from '../../services/api';
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
   const route = useRoute();
   const [passengers,setPassengers] = useState([])
   const [absences,setAbsences] = useState([])
   const [userAbsences,setUserAbsences] = useState(null);
   var { trip_id } = route.params;
   var listaPassageiros = passengers.slice(1);

   const bottomSheetRef = useRef(BottomSheet);
   const snapPoints = useMemo(() => [202, '100%'], []);

   const getTrip = ()=>{
      api.get(`/trip/${trip_id}`)
      .then(trip=>{
         setPassengers(trip.data.passengers);
         setAbsences(trip.data.absences);
         setUserAbsences(trip.data.userAbsences)
      })
      .catch(e=>toastApiError(e))
   }

   const registerAbstence = (go,back)=>{
      const data = new Date();
      const ano = data.getFullYear();
      const mes = (data.getMonth() + 1).toString().padStart(2, '0'); // O mês é baseado em zero, por isso é necessário adicionar 1.
      const dia = data.getDate().toString().padStart(2, '0');

      const dataFormatada = `${ano}-${mes}-${dia}`;


      api.post(`/trip/${trip_id}/absence`,{
         "go": go,
         "back": back,
         "absence_date": dataFormatada
     }).then(resp=>{
      getTrip()
     }).catch(e=>toastApiError(e))
   }

   useEffect(()=>{
      getTrip();
   },[])

   return (
      <>
         <MenuBar nomeTela={'Rota Ativa Passageiro'} mostraBtnPerfil={false} />
         <View style={estilos.container}>
            <MapaRotaInativa />

            <BottomSheet ref={bottomSheetRef} index={0} snapPoints={snapPoints}>
               <View style={[estilos.linhaDetalhe, estilos.bordaCima]}>
                  <Texto style={estilos.textoDetalhes}>Passageiros restantes:</Texto>
                  <Texto style={estilos.textoDetalhes}>{passengers.length-absences.length}</Texto>
               </View>
               <View style={estilos.linhaDetalhe}>
                  <Texto style={estilos.textoDetalhes}>Próximo(a) passageiro(a):</Texto>
               </View>
               {passengers.length > 0 &&
               <>
               <CardPassageiro {...passengers[0]} ausente={absences.includes(String(passengers[0].passengerid))}/>

               <BottomSheetFlatList
                  ListHeaderComponent={TopoLista}
                  data={listaPassageiros}
                  keyExtractor={({ ordem }) => ordem}
                  renderItem={({ item }) => {
                     return <CardPassageiro {...item} ausente={absences.includes(String(item.passengerid))} />;
                  }}
               />
               </>
               }
            </BottomSheet>
         </View>

         <BotoesIdaVolta onConfirm={registerAbstence} userAbsences={userAbsences} />
      </>
   );
}

const estilos = StyleSheet.create({
   container: {
      width: '100%',
      flex: 1,
      backgroundColor: cores.branco,
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
   botao: {
      width: '48%',
      alignSelf: 'flex-start',
      alignItems: 'center',
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
});
[
   {"location":{"latLng":{"latitude":-23.6226412,"longitude":-46.5514371}}}
,{"location":{"latLng":{"latitude":-23.6244463,"longitude":-46.55439}}}
,{"location":{"latLng":{"latitude":-23.6215939,"longitude":-46.53613499999999}}}
,{"location":{"latLng":{"latitude":-23.6215939,"longitude":-46.53613499999999}}}
,{"location":{"latLng":{"latitude":-23.6154004,"longitude":-46.53830019999999}}}
]