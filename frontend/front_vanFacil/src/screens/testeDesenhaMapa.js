import React, { useReducer, useState } from 'react';
import { Modal, StyleSheet, TouchableOpacity, View } from 'react-native';
import MapView, { Marker, Polygon, PROVIDER_GOOGLE } from 'react-native-maps';
import { Ionicons, Feather } from '@expo/vector-icons';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Constants from 'expo-constants';

const googleApiKey = Constants.manifest.android.config.googleMaps.apiKey;

const Color = require('color');

import cores from '../../assets/cores';
import Texto from '../components/Texto';
import MenuBar from '../screens/Shared/MenuBar';

export default function TesteDesenhaMapa() {
   const [mexerMapa, setMexerMapa] = useReducer((mexerMapa) => !mexerMapa, true);
   const [marcadores, setMarcadores] = useState([]);

   var desabilitaEdicao = mexerMapa || marcadores.length <= 0;

   const [region, setRegion] = useState({
      latitude: -23.65199226671823,
      longitude: -46.57039785158304,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
   });

   const handleLocationSelect = (data, details) => {
      // Extrair a latitude e a longitude dos detalhes selecionados e atualizar a região
      const { lat, lng } = details.geometry.location;
      setRegion({
         latitude: lat,
         longitude: lng,
         latitudeDelta: 0.0922,
         longitudeDelta: 0.0421,
      });
   };

   const defineMensagem = () => {
      return mexerMapa
         ? 'Posicione o mapa na região usando a barra de pesquisa de endereço no topo.\n\nToque no botão para alternar para o modo de desenho.'
         : 'Toque no mapa para definir os pontos e desenhar a área aproximada, tente seguir o contorno da área.\n\nToque no botão novamente para travar o desenho.';
   };

   const defineTitulo = () => {
      return mexerMapa ? 'Procure a área' : 'Desenhe';
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

   const [modalVisible, setModalVisible] = useState(false);

   const mostrarModal = () => {
      setModalVisible(true);
   };

   const confirmar = () => {
      limpaMarcadores();
      setModalVisible(false);
   };

   const cancelar = () => {
      setModalVisible(false);
   };

   return (
      <>
         <MapView
            region={region}
            provider={PROVIDER_GOOGLE}
            style={estilos.mapa}
            rotateEnabled={false}
            pitchEnable={false}
            moveOnMarkerPress={false}
            loadingEnabled={true}
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

         <View style={[estilos.containerTexto, { backgroundColor: defineCorFundo(mexerMapa) }]}>
            <Texto style={estilos.texto}>{defineTitulo()}</Texto>
         </View>
         <View style={estilos.container}>
            <Texto style={estilos.dica}>{defineMensagem()}</Texto>
            <View style={estilos.controles}>
               <TouchableOpacity style={[estilos.botao, mexerMapa ? {} : { backgroundColor: cores.azul }]} onPress={setMexerMapa}>
                  <Ionicons name="color-palette" size={24} style={estilos.img} />
               </TouchableOpacity>

               <TouchableOpacity
                  style={[estilos.botao, desabilitaEdicao ? { backgroundColor: 'gray' } : {}]}
                  onPress={mostrarModal}
                  disabled={desabilitaEdicao}
               >
                  <Feather name="trash-2" size={24} style={estilos.img} />
               </TouchableOpacity>

               <TouchableOpacity
                  style={[estilos.botao, desabilitaEdicao ? { backgroundColor: 'gray' } : {}]}
                  onPress={desfazUltimo}
                  disabled={desabilitaEdicao}
               >
                  <Ionicons name="arrow-undo" size={24} style={estilos.img} />
               </TouchableOpacity>
            </View>
         </View>

         <View style={estilos.pesquisa}>
            <GooglePlacesAutocomplete
               placeholder="Pesquise um endereço"
               onPress={handleLocationSelect}
               fetchDetails={true}
               query={{
                  key: googleApiKey,
                  language: 'pt',
               }}
            />
         </View>

         <Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={cancelar}>
            <View style={modal.overlay}>
               <View style={modal.caixaCentral}>
                  <View style={modal.titleContainer}>
                     <Texto style={modal.titulo}>Confirmação</Texto>
                  </View>
                  <Texto>Deseja apagar o desenho e os pontos?</Texto>
                  <View style={modal.linhaBotoes}>
                     <TouchableOpacity style={[modal.button, modal.btnConfirmar]} onPress={confirmar}>
                        <Texto style={modal.buttonText}>Confirmar</Texto>
                     </TouchableOpacity>
                     <TouchableOpacity style={[modal.button, modal.btnCancelar]} onPress={cancelar}>
                        <Texto style={modal.buttonText}>Cancelar</Texto>
                     </TouchableOpacity>
                  </View>
               </View>
            </View>
         </Modal>
      </>
   );
}

function makeColorLighter(baseColor, factor) {
   const color = Color(baseColor);
   return color.lighten(factor).hex();
}

function defineCorFundo(mexerMapa) {
   return mexerMapa ? makeColorLighter(cores.azulProfundo, 3) : makeColorLighter(cores.azul, 1.2);
}

const estilos = StyleSheet.create({
   pesquisa: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
   },
   mapa: {
      flex: 1,
   },
   containerTexto: {
      padding: 10,
      fontSize: 24,
   },
   texto: {
      fontSize: 24,
   },
   container: {
      backgroundColor: cores.branco,
      padding: 10,
   },
   controles: {
      flexDirection: 'row',
   },
   dica: {
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

const modal = StyleSheet.create({
   overlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
   },
   caixaCentral: {
      width: 310,
      backgroundColor: cores.branco,
      borderRadius: 10,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: cores.cinzaClaro,
   },
   titleContainer: {
      alignItems: 'center',
      backgroundColor: cores.cinzaClaro,
      padding: 10,
      borderTopLeftRadius: 9,
      borderTopRightRadius: 9,
      width: '100%',
      marginBottom: 10,
   },
   titulo: {
      fontSize: 22,
      fontWeight: 'bold',
   },
   texto: {
      fontSize: 16,
      marginBottom: 20,
   },
   textoPrincipal: {
      fontSize: 16,
      marginBottom: 20,
      fontWeight: 'bold',
   },
   linhaBotoes: {
      flexDirection: 'row',
      justifyContent: 'space-between',
   },
   button: {
      flex: 1,
      alignItems: 'center',
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderRadius: 5,
      margin: 10,
   },
   buttonText: {
      color: cores.branco,
      fontWeight: 'bold',
   },
   btnConfirmar: {
      backgroundColor: cores.azul,
      marginRight: 10,
      alignSelf: 'flex-start',
   },
   btnCancelar: {
      backgroundColor: cores.vermelho,
      marginLeft: 10,
      alignSelf: 'flex-end',
   },
});
