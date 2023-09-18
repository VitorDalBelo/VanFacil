import React, { useReducer, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import MapView, { Marker, Polygon } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';

import cores from '../../assets/cores';
import Texto from '../components/Texto';

export default function TesteDesenhaMapa() {
   const [mexerMapa, setMexerMapa] = useReducer((mexerMapa) => !mexerMapa, true);
   const [marcadores, setMarcadores] = useState([]);

   var desabilitaEdicao = mexerMapa || marcadores.length <= 0;

   const defineMensagem = () => {
      return mexerMapa
         ? 'Posicione o mapa na região e clique no botão para desenhar a área de atuação'
         : 'Agora, clique no mapa para definir os pontos. Tente seguir o contorno da área';
   };

   const criaMarcador = (e) => {
      if (mexerMapa) return;

      const { coordinate } = e.nativeEvent;
      setMarcadores([...marcadores, coordinate]);
   };

   const limpaMarcadores = () => {
      setMarcadores([]);
   };

   const desfazUltimo = () => {
      setMarcadores(marcadores.slice(0, -1));
   };

   return (
      <>
         <MapView
            style={estilos.mapa}
            rotateEnabled={mexerMapa}
            scrollEnabled={mexerMapa}
            zoomEnabled={mexerMapa}
            pitchEnable={mexerMapa}
            loadingEnabled={true}
            moveOnMarkerPress={false}
            onPress={criaMarcador}
         >
            {marcadores.length < 3 &&
               marcadores.map((marcador, index) => (
                  <Marker key={index} coordinate={marcador} image={require('../../assets/teste/Marcador.png')} />
               ))}
            {marcadores.length >= 3 && (
               <Polygon
                  coordinates={marcadores}
                  miterLimit={30}
                  strokeWidth={3}
                  fillColor={cores.roxoTransparente}
                  strokeColor={cores.roxoTransparente}
               />
            )}
         </MapView>

         <View style={estilos.container}>
            <Texto style={estilos.texto}>{defineMensagem()}</Texto>
            <View style={estilos.controles}>
               <TouchableOpacity style={[estilos.botao, mexerMapa ? {} : { backgroundColor: cores.azul }]} onPress={setMexerMapa}>
                  <Ionicons name="color-palette" size={24} style={estilos.img} />
               </TouchableOpacity>
               <TouchableOpacity
                  style={[estilos.botao, desabilitaEdicao ? { backgroundColor: 'gray' } : {}]}
                  onPress={limpaMarcadores}
                  disabled={desabilitaEdicao}
               >
                  <Ionicons name="trash-bin" size={24} style={estilos.img} />
               </TouchableOpacity>
               <TouchableOpacity
                  style={[estilos.botao, desabilitaEdicao ? { backgroundColor: 'gray' } : {}]}
                  onPress={desfazUltimo}
                  disabled={desabilitaEdicao}
               >
                  <Ionicons name="arrow-undo-outline" size={24} style={estilos.img} />
               </TouchableOpacity>
            </View>
         </View>
      </>
   );
}

const estilos = StyleSheet.create({
   mapa: {
      flex: 1,
   },
   container: {
      height: '20%',
      backgroundColor: 'white',
      padding: 10,
   },
   controles: {
      flexDirection: 'row',
   },
   texto: {
      fontSize: 16,
      marginBottom: 10,
   },
   botao: {
      alignSelf: 'flex-start',
      alignItems: 'center',
      padding: 10,
      borderRadius: 10,
      backgroundColor: cores.azulProfundo,
      marginRight: 10,
   },
   img: {
      color: cores.branco,
   },
});
