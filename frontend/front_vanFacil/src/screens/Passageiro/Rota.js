import React, { useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Texto from '../../components/Texto';
import MapaRotaInativa from '../Shared/Rota/MapaRotaInativa';
import BotoesIdaVolta from './BotoesIdaVolta';
import api from '../../services/api';
import cores from '../../../assets/cores';
import MenuBar from '../Shared/MenuBar';
import { toastApiError } from '../../helpers/toast';

const numConfirmados = 10;
const numTotal = 15;

export default function Rota() {
   const [passengers,setPassengers] = React.useState([])
   const [absences,setAbsences] = React.useState([])
   const [userAbsences,setUserAbsences] = React.useState(undefined)
   const [confirmados,setConfirmados] = React.useState(0)
   const [total,setTotal] = React.useState(0)
   const route = useRoute();
   var { trip_id } = route.params;

   const  getTrip=()=>{
      api.get(`/trip/${trip_id}`)
      .then(trip=>{
         setPassengers(trip.data.passengers);
         setAbsences(trip.data.absences);
         setUserAbsences(trip.data.userAbsences);
         setConfirmados(trip.data.passengers.length-trip.data.absences.length)
         setTotal(trip.data.passengers.length)
      })
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

   React.useEffect(()=>{
      getTrip()
   },[])
   return (
      <>
         <MenuBar nomeTela={'Rota Inativa Passageiro'} mostraBtnPerfil={false} />

         <MapaRotaInativa />

         <View style={estilos.detalhesRota}>
            <View style={estilos.linhaDetalhe}>
               <Texto style={estilos.textoDetalhes}>Passageiros confirmados:</Texto>
               <Texto style={estilos.textoDetalhes}>
                  {confirmados}/{total}
               </Texto>
            </View>

            {/* <View style={estilos.linhaDetalhe}>
               <TouchableOpacity style={estilos.botao}>
                  <Texto style={estilos.textoBotao}>Mensagem</Texto>
               </TouchableOpacity>
               <TouchableOpacity style={estilos.botao}>
                  <Texto style={estilos.textoBotao}>Detalhes</Texto>
               </TouchableOpacity>
            </View> */}

            <BotoesIdaVolta userAbsences={userAbsences} onConfirm={registerAbstence}/>
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
   textoBotao: {
      color: cores.branco,
      fontWeight: 'bold',
      fontSize: 18,
      lineHeight: 30,
   },
});
