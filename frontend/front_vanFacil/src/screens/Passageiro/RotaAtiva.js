import React, { useMemo, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';

import MenuBar from '../Shared/MenuBar';
import Texto from '../../components/Texto';
import MapaRotaInativa from '../Shared/Rota/MapaRotaInativa';
import CardPassageiro from '../Shared/CardPassageiro';
import BotoesIdaVolta from './BotoesIdaVolta';

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

export default function RotaAtiva() {
   const route = useRoute();
   var { passageiros } = route.params;
   var listaPassageiros = passageiros.slice(1);

   const bottomSheetRef = useRef(BottomSheet);
   const snapPoints = useMemo(() => [202, '100%'], []);

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
               <View style={{ height: 100 }}>
                  <CardPassageiro {...passageiros[0]} />
               </View>

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

         <BotoesIdaVolta />
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
