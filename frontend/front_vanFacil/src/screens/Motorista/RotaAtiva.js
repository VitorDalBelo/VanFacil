import React, { useMemo, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';

import Texto from '../../components/Texto';
import CardPassageiro from '../Shared/CardPassageiro';

import Mapa_teste from '../Shared/Rota/mapa_teste';

import cores from '../../../assets/cores';
import MenuBar from '../Shared/MenuBar';
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
   const { passageiros } = route.params;
   const listaPassageiros = passageiros.slice(1);

   const bottomSheetRef = useRef(BottomSheet);
   const snapPoints = useMemo(() => [200, '100%'], []);

   return (
      <>
         <View style={estilos.container}>
            <MenuBar nomeTela={'Rota Ativa Motorista'} mostraBtnPerfil={false} />
            <Mapa_teste />
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
});
