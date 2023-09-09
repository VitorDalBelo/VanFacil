import React, { useMemo, useReducer, useRef } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';

import MenuBar from '../Shared/MenuBar';
import Texto from '../../components/Texto';
import MapaRotaInativa from '../Shared/Rota/MapaRotaInativa';
import CardPassageiro from '../Shared/CardPassageiro';

import cores from '../../../assets/cores';
import { useRoute } from '@react-navigation/native';

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

const funcaoEstilo = (vai, volta) =>
   StyleSheet.create({
      botaoIda: {
         backgroundColor: vai ? cores.azul : cores.vermelho,
      },
      botaoVolta: {
         backgroundColor: volta ? cores.azul : cores.vermelho,
      },
   });

export default function RotaAtiva() {
   const route = useRoute();
   var { passageiros } = route.params;
   var listaPassageiros = passageiros.slice(1);

   const [vai, inverterVai] = useReducer((vai) => !vai, true);
   const [volta, inverterVolta] = useReducer((volta) => !volta, true);

   const bottomSheetRef = useRef(BottomSheet);
   const snapPoints = useMemo(() => [202, '100%'], []);

   function Botoes() {
      const estilosSwitch = funcaoEstilo(vai, volta);
      return (
         <View style={[estilos.linhaDetalhe, estilos.teste]}>
            <TouchableOpacity style={[estilos.botao, estilosSwitch.botaoIda]} onPress={inverterVai}>
               <Texto style={estilos.textoBotao}>{vai ? 'Vou' : 'Não vou'}</Texto>
            </TouchableOpacity>
            <TouchableOpacity style={[estilos.botao, estilosSwitch.botaoVolta]} onPress={inverterVolta}>
               <Texto style={estilos.textoBotao}>{volta ? 'Volto' : 'Não volto'}</Texto>
            </TouchableOpacity>
         </View>
      );
   }

   return (
      <>
         <MenuBar nomeTela={'Rota Ativa Passageiro'} mostraBtnPerfil={false} />
         <View style={estilos.container}>
            <MapaRotaInativa />
            <BottomSheet ref={bottomSheetRef} index={0} snapPoints={snapPoints}>
               <View style={[estilos.linhaDetalhe, estilos.bordaCima]}>
                  <Texto style={estilos.textoDetalhes}>Passageiros restantes:</Texto>
                  <Texto style={estilos.textoDetalhes}>{passageiros.length}</Texto>
               </View>
               <View style={estilos.linhaDetalhe}>
                  <Texto style={estilos.textoDetalhes}>Próximo(a) passageiro(a):</Texto>
               </View>
               <CardPassageiro {...passageiros[0]} />

               <BottomSheetFlatList
                  ListHeaderComponent={TopoLista}
                  data={listaPassageiros}
                  keyExtractor={({ ordem }) => ordem}
                  renderItem={({ item }) => {
                     return <CardPassageiro {...item} />;
                  }}
               />
            </BottomSheet>
         </View>
         <Botoes />
      </>
   );
}

const estilos = StyleSheet.create({
   container: {
      width: '100%',
      flex: 1,
      backgroundColor: 'white',
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
   textoBotao: {
      color: cores.branco,
      fontWeight: 'bold',
      fontSize: 18,
      lineHeight: 30,
   },
   switchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
   },
   switch: {
      marginLeft: 5,
   },
   teste: {},
});
