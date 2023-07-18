import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import cores from '../../../assets/cores';

import CardRota from '../Shared/CardRota';

import FundoRota1 from '../../../assets/teste/GradientBackground1.png';
import FundoRota2 from '../../../assets/teste/GradientBackground2.png';
import Gataruga from '../../../assets/teste/Gataruga.png';
import Espaço from '../../../assets/teste/Espaço.png';
import Haingrindi from '../../../assets/teste/Haingrindi.png';
export default function Inicial() {
   return (
      <ScrollView>
         <View style={estilos.container}>
            <CardRota imagem={FundoRota1} nome="USCS - Manhã" />
            <CardRota imagem={FundoRota2} nome="USCS - Noite" />
            <CardRota imagem={Espaço} nome="Rota espacial" />
            <CardRota imagem={Gataruga} nome="Rota do Gataruga" />
            <CardRota imagem={Haingrindi} nome="Rota do bruxo" />
         </View>
      </ScrollView>
   );
}
const estilos = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
   },
});
