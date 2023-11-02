import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import MenuBar from '../Shared/MenuBar';
import CardPesquisa from '../Shared/pesquisa/CardPesquisa';

import useMotoristas from '../../hooks/useMotoristas';
import api from '../../services/api';
import { toastApiError } from '../../helpers/toast';

export default function Pesquisa() {
   return (
      <View style={estilos.container}>
         <MenuBar nomeTela={'Pesquisa Motorista'} mostraBtnPerfil={false} />
         <ListaPesquisa />
      </View>
   );
}

function ListaPesquisa() {
   // const motoristas = useMotoristas();
   const navigation = useNavigation();
   const [motoristas,setMotoristas] = React.useState([])
   const [loading,setLoading] = React.useState(false)
   const getDrivers = async () =>{
      setLoading(true);
      await api.get('/users/drivers/search')
      .then(resp => {
         setMotoristas(resp.data);
      })
      .catch(e=>{
         toastApiError(e);
      })
      setLoading(false);
   }

   React.useEffect(()=>{
      getDrivers()
   },[])

   return (
      <FlatList
         data={motoristas}
         renderItem={({ item }) => {
            return (
               <CardPesquisa
                  {...item}
                  aoPressionar={() => {
                     navigation.navigate('M_Perfil', { ...item, donoDoPerfil: false });
                  }}
               />
            );
         }}
         keyExtractor={({ nome }) => nome}
      />
   );
}

const estilos = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: 'center',
   },
});
