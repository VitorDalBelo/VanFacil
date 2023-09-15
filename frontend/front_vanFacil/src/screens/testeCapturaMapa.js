import React, { useRef } from 'react';

import ViewShot from 'react-native-view-shot';
import MapaRegiao from './Shared/Pesquisa/MapaRegiao';
import { Dimensions, Share, StyleSheet, TouchableOpacity, View } from 'react-native';
import Texto from '../components/Texto';
import * as Sharing from 'expo-sharing';
import cores from '../../assets/cores';

export default function TesteCapturaMapa() {
   var regiaoDeAtuacao = [
      coordnateFabric('-23.63214651600437, -46.60155154236007'),
      coordnateFabric('-23.619092828891446, -46.607731351515476'),
      coordnateFabric('-23.607374857489432, -46.60507060035134'),
      coordnateFabric('-23.59777949690227, -46.59665919344537'),
      coordnateFabric('-23.598801986779876, -46.58112383987415'),
      coordnateFabric('-23.595262564782395, -46.56893588292877'),
      coordnateFabric('-23.602577264963532, -46.55606128052168'),
      coordnateFabric('-23.632461046629444, -46.55134059297241'),
      coordnateFabric('-23.63812246867974, -46.58644534220242'),
   ];

   const viewShotRef = useRef();

   const captureView = async () => {
      try {
         const imageURI = await viewShotRef.current.capture();
         console.log('Imagem capturada com sucesso:', imageURI);
         Sharing.shareAsync('file://' + imageURI);
         // Faça algo com a URI da imagem (por exemplo, salve-a)
      } catch (error) {
         console.error('Erro ao capturar a imagem:', error);
      }
   };

   return (
      <View style={estilos.container}>
         <ViewShot style={estilos.caixaMapa} ref={viewShotRef} options={{ fileName: 'TesteCapturaMapa', format: 'png', quality: 0.9 }}>
            <MapaRegiao regiao={regiaoDeAtuacao} />
         </ViewShot>
         <TouchableOpacity style={estilos.botao} onPress={captureView}>
            <Texto style={estilos.textoBotao}>Salvar</Texto>
         </TouchableOpacity>
      </View>
   );
}

function coordnateFabric(x) {
   const valoresSeparados = x.split(',');

   return {
      latitude: parseFloat(valoresSeparados[0]),
      longitude: parseFloat(valoresSeparados[1]),
   };
}

const larguraTela = Dimensions.get('screen').width;
const alturaCard = larguraTela * 0.8;

const estilos = StyleSheet.create({
   container: {
      width: '100%',
      height: '100%',
      alignItems: 'center',
   },
   texto: {
      flex: 1,
      color: cores.preto,
      paddingHorizontal: 10,
      fontSize: 20,
      textAlignVertical: 'center',
      borderWidth: 2,
      borderColor: cores.azulProfundo,
      borderRadius: 5,
   },
   caixaMapa: {
      width: larguraTela - 40,
      height: alturaCard - 90,
      margin: 10,
      overflow: 'hidden',
      borderWidth: 2,
      borderColor: cores.azulProfundo,
      borderRadius: 10,
   },
   botao: {
      width: '48%',
      alignItems: 'center',
      padding: 10,
      borderRadius: 10,
      backgroundColor: cores.azulProfundo,
      color: cores.preto,
      marginVertical: 10,
   },
   textoBotao: {
      color: cores.branco,
      fontWeight: 'bold',
      fontSize: 18,
      lineHeight: 30,
   },
});
