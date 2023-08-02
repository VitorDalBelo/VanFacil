import React from 'react';
import { FlatList, StyleSheet,SafeAreaView ,StatusBar} from 'react-native';

import cores from '../../../assets/cores';

import CardRota from '../Shared/Inicial/CardRota';
import BtnNovaRota from '../Shared/Inicial/BtnNovaRota';

import rotas from '../../mocks/rotas';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MenuBar from '../Shared/MenuBar';


export default function Inicial() {
   return (
      <GestureHandlerRootView style={{ flex: 1 }}>
          <SafeAreaView style={estilos.container} onLayout={onLayoutRootView}>
             <StatusBar style="auto" />
             <MenuBar nomeTela={'USCS - Noite'} />
             <ListaRotas />
            <BtnNovaRota />
          </SafeAreaView>
       </GestureHandlerRootView>
   );
}
function ListaRotas() {
   return (
      <FlatList
         data={rotas.lista1}
         renderItem={({ item }) => {
            return <CardRota {...item} />;
         }}
         keyExtractor={({ nome }) => nome}
      />
   );
}


const estilos = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#ffffff',
      alignItems: 'center',
   },
});
