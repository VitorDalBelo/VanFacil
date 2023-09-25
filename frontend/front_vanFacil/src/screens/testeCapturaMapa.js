import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Button, Dimensions, StyleSheet, TouchableOpacity, View ,Image } from 'react-native';
import { useRoute } from '@react-navigation/native';
import ViewShot from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';

import Texto from '../components/Texto';
import MapaRegiao from './Shared/pesquisa/MapaRegiao';
import cores from '../../assets/cores';
import api from '../services/api';
import toast,{toastApiError} from '../helpers/toast';

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
         // const blob = await fetch(imageURI).then((response) => response.blob()); setImagem(blob);
         // setImagem('file://' + imageURI);
         setImagem(imageURI);
      } catch (error) {
         console.error('Erro ao capturar a imagem:', error);
      }
   };

   const enviaDados = () => {
      Sharing.shareAsync(imagem);
   };


   useEffect(() => {
      if (imagem) {
         const form = new FormData();
         form.append("regiaoDeAtuacao",JSON.stringify(regiaoDeAtuacao));
         form.append("imagem",imagem)
         api.post("/users/drivers/area",form,{					
            headers: {
            "Content-Type": "multipart/form-data",
         }})
         .then(()=>{
            console.log("Deu certo");
            toast("Alteração feita com sucesso","success")
         })
         .catch((e)=>{
            console.log("Deu errado",e);
            toastApiError(e)
         })
      }
   }, [imagem]);

   return (
      <View style={estilos.container}>
         <ViewShot style={estilos.caixaMapa} ref={viewShotRef} options={{ fileName: 'TesteCapturaMapa', format: 'png', result:"base64", quality: 0.9 }}>
            <MapaRegiao regiao={regiaoDeAtuacao} movimentar={false} onMapReady={handleMapReady} />
         </ViewShot>
         <Texto style={estilos.texto}>Salvando</Texto>
         <ActivityIndicator size="large" color={cores.azulProfundo} />
         {/* {imagem && <Image source={{uri:imagem}}/>} */}
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
