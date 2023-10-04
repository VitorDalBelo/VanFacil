import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { AuthContext } from '../../context/Auth/AuthContext';
import Texto from '../../components/Texto';
import cores from '../../../assets/cores';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import useMotoristas from '../../hooks/useMotoristas';

export default function MenuBar({ nomeTela, mostraBtnPerfil = true, telaMotorista = true }) {
   return (
      <View style={estilos.menuBar}>
         <Texto style={estilos.nomeTela}>{nomeTela}</Texto>

         <BotaoMenu />

         {mostraBtnPerfil && <BotaoPerfil telaMotorista={telaMotorista} />}
      </View>
   );
}

function BotaoMenu() {
   const navigation = useNavigation();
   return (
      <TouchableOpacity
         style={estilos.botaoMenu}
         onPress={() => {
            if (navigation.canGoBack()) {
               navigation.goBack();
            }
         }}
      >
         <Feather name="menu" style={estilos.iconeMenu} />
      </TouchableOpacity>
   );
}

function BotaoPerfil({ telaMotorista }) {
   const navigation = useNavigation();
   const motoristas = useMotoristas();
   const {photoUri,user} = React.useContext(AuthContext)

   const defineCaminho = () => {
      if (user.profile=="driver") {
         return navigation.navigate('M_Perfil', motoristas[1]);
      } else {
         return navigation.navigate('Perfil');
      }
   };

   return (
      <TouchableOpacity style={estilos.botaoPerfil} onPress={defineCaminho}>
         <Image source={{uri:photoUri}} style={estilos.fotoPerfil} />
      </TouchableOpacity>
   );
}

const estilos = StyleSheet.create({
   menuBar: {
      width: '100%',
      height: 50,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: cores.cinzaClaro,
      paddingVertical: 5,
      paddingHorizontal: 20,
   },
   botaoMenu: {
      width: 33,
      height: 33,
      alignItems: 'center',
      justifyContent: 'center',
   },
   iconeMenu: {
      fontSize: 30,
   },
   botaoPerfil: {},
   fotoPerfil: {
      width: 33,
      height: 33,
      borderRadius: 50,
   },
   nomeTela: {
      fontSize: 22,
      textAlign: 'center',
      position: 'absolute',
      left: 0,
      right: 0,
   },
});
