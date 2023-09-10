import React , {useEffect,useContext} from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import MenuBar from '../Shared/MenuBar';
import ListaRotas from '../Shared/Inicial/ListaRotas';
import BtnNovaRota from '../Shared/Inicial/BtnNovaRota';

import { AuthContext } from '../../context/Auth/AuthContext';

export default function Inicial() {
   const navigation = useNavigation();
   const {user,handleLogout} = useContext(AuthContext)

   useEffect(()=>{
      if(!user.name) handleLogout();
   })


   return (
      <View style={estilos.container}>
         <MenuBar nomeTela={'Home Passageiro'} />
         <ListaRotas telaMotorista={false} />
         <BtnNovaRota telaMotorista={false} />
      </View>
   );
}

const estilos = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: 'center',
   },
});
