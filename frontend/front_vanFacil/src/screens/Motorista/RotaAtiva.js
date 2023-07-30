import React, { useCallback, useMemo, useRef } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';

import Texto from '../../components/Texto';
import MapaRotaInativa from '../Shared/Rota/MapaRotaInativa';
import listaPassageiros from '../../mocks/passageiros';
import CardPassageiro from '../Shared/CardPassageiro';

import fotoPassageiro from '../../../assets/teste/Haingrindi.png';

import cores from '../../../assets/cores';

const restantes = 10;

const passageiro = {
   nome: 'Revert Richards',
   distancia: 3,
};

export default function RotaAtiva() {
   const bottomSheetRef = useRef(BottomSheet);
   const snapPoints = useMemo(() => [200, '100%'], []);

   return (
      <>
         <View style={styles.container}>
            <MapaRotaInativa />
            <BottomSheet ref={bottomSheetRef} index={0} snapPoints={snapPoints}>
               <View style={estilos.detalhesRota}>
                  <View style={estilos.linhaDetalhe}>
                     <Texto style={estilos.textoDetalhes}>Passageiros restantes:</Texto>
                     <Texto style={estilos.textoDetalhes}>{restantes}</Texto>
                  </View>
                  <View style={estilos.linhaDetalhe}>
                     <Texto style={estilos.textoDetalhes}>Próximo(a) passageiro(a):</Texto>
                  </View>
                  <View style={estilos.linhaDetalhe}>
                     <ProximoPassageiro {...passageiro} />
                  </View>
               </View>
               <BottomSheetFlatList
                  data={listaPassageiros}
                  keyExtractor={({ ordem }) => ordem}
                  renderItem={({ item }) => {
                     return <CardPassageiro {...item} />;
                  }}
                  contentContainerStyle={styles.contentContainer}
               />
            </BottomSheet>
         </View>
      </>
   );
}

function ProximoPassageiro({ nome, distancia }) {
   return (
      <View style={estilos.passageiro}>
         <Image source={fotoPassageiro} style={estilos.fotoPassageiro} />
         <View>
            <Texto style={estilos.texto}>{nome}</Texto>
            <Texto style={estilos.textoAbaixo}>{distancia} km de distância</Texto>
         </View>
      </View>
   );
}

function Passageiro({ foto, nome }) {
   return (
      <View style={estilos.passageiro}>
         <Image source={foto} style={estilos.fotoPassageiro} />
         <Texto style={estilos.texto}>{nome}</Texto>
      </View>
   );
}

const estilos = StyleSheet.create({
   detalhesRota: {
      width: '100%',
      backgroundColor: cores.branco,
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
   passageiro: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 5,
   },
   texto: {
      fontSize: 18,
   },
   fotoPassageiro: {
      width: 80,
      height: 80,
      borderRadius: 10,
      borderColor: cores.preto,
      borderWidth: 0.3,
      marginRight: 15,
   },
   textoAbaixo: {
      marginTop: 5,
      fontSize: 16,
      color: '#777777',
   },
});

const styles = StyleSheet.create({
   container: {
      width: '100%',
      flex: 1,
      backgroundColor: 'white',
   },
});
