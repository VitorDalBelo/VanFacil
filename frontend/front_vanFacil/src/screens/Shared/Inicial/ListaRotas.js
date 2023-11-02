import React, { useContext, useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import api from '../../../services/api';
import CardRota from '../../Shared/Inicial/CardRota';
import { AuthContext } from '../../../context/Auth/AuthContext';
import { toastApiError } from '../../../helpers/toast';

export default function ListaRotas() {
   const {user} = useContext(AuthContext)
   const [trips,setTrips] = useState([])
   const getTrips = async () => {
         await api.get("/users/trips")
         .then(resp=>{
            const {trips} = resp.data;
            setTrips(trips)
         })
         .catch(e=>{
            console.log(e)
            toastApiError(e)
         })
      }
   
   useEffect(()=>{
      getTrips()
   },[])

   return (
      <FlatList
         data={trips}
         renderItem={({ item, }) => {
            return <CardRota {...item}  telaMotorista={user.profile=="driver"} />;
         }}
         keyExtractor={(trip) => trip.trip.trip_id}
      />
   );
}
