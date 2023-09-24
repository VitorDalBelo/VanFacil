import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import ViewShot from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';

import Texto from '../components/Texto';
import MapaRegiao from './Shared/Pesquisa/MapaRegiao';
import cores from '../../assets/cores';

export default function TesteCapturaMapa() {
   const route = useRoute();
   const { regiaoDeAtuacao } = route.params;

   const [imagem, setImagem] = useState('');

   const viewShotRef = useRef();
   const [mapReady, setMapReady] = useState(false);

   const handleMapReady = () => {
      if (!mapReady) {
         setTimeout(() => {
            setMapReady(true);
            captureView();
         }, 1000);
      }
   };

   const captureView = async () => {
      try {
         const imageURI = await viewShotRef.current.capture();
         setImagem('file://' + imageURI);
      } catch (error) {
         console.error('Erro ao capturar a imagem:', error);
      }
   };

   const enviaDados = () => {
      Sharing.shareAsync(imagem);
   };

   useEffect(() => {
      if (imagem) {
         enviaDados();
      }
   }, [imagem]);

   return (
      <View style={estilos.container}>
         <ViewShot style={estilos.caixaMapa} ref={viewShotRef} options={{ fileName: 'TesteCapturaMapa', format: 'png', quality: 0.9 }}>
            <MapaRegiao regiao={regiaoDeAtuacao} movimentar={false} onMapReady={handleMapReady} />
         </ViewShot>
         <Texto style={estilos.texto}>Salvando</Texto>
         <ActivityIndicator size="large" color={cores.azulProfundo} />
      </View>
   );
}

const larguraTela = Dimensions.get('screen').width;
const alturaCard = larguraTela * 0.8;

const estilos = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: cores.branco,
   },
   texto: {
      color: cores.preto,
      padding: 10,
      fontSize: 20,
      textAlignVertical: 'center',
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
});
