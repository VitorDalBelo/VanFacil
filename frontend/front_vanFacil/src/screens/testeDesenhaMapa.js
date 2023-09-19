import React, { useReducer, useState } from 'react';
import { Modal, StyleSheet, TouchableOpacity, View } from 'react-native';
import MapView, { Marker, Polygon } from 'react-native-maps';
import { Ionicons, Feather } from '@expo/vector-icons';

import cores from '../../assets/cores';
import Texto from '../components/Texto';
import MenuBar from '../screens/Shared/MenuBar';

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
         <MenuBar nomeTela={'Área de atuação'} />
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
