import React, { useEffect, useReducer, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import MapView, { Marker, Polygon, PROVIDER_GOOGLE } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Constants from 'expo-constants';

import cores from '../../../../assets/cores';
import Texto from '../../../components/Texto';
import BotaoQuadrado from '../../../components/BotaoQuadrado';
import ModalConfirmacao from '../../../components/ModalConfirmacao';
import { calculaCentro } from '../../../helpers/calculaCentro';

const Color = require('color');
const googleApiKey = Constants.manifest.android.config.googleMaps.apiKey;

export default function DesenhaMapa() {
   const route = useRoute();
   const { regiaoDeAtuacao } = route.params;
   const centro = {
      latitude: -23.65199226671823,
      longitude: -46.57039785158304,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
   };

   useEffect(() => {
      if (regiaoDeAtuacao === undefined) {
         console.log('Primeira vez desenhando');
      } else {
         setMarcadores(regiaoDeAtuacao);
         centro = calculaCentro(regiaoDeAtuacao);
         console.log('Alteração do desenho');
      }
   }, []);

   const navigation = useNavigation();
   const [selecionarLocal, setSelecionarLocal] = useReducer((selecionarLocal) => !selecionarLocal, true);
   const [marcadores, setMarcadores] = useState([]);

   var desabilitaEdicao = selecionarLocal || marcadores.length <= 0;
   var habilitaSalvar = selecionarLocal && marcadores.length >= 3;

   const [region, setRegion] = useState(centro);

   const handleLocationSelect = (data, details) => {
      const { lat, lng } = details.geometry.location;
      setRegion({
         latitude: lat,
         longitude: lng,
         latitudeDelta: 0.004,
         longitudeDelta: 0.004,
      });
   };

   const defineMensagem = () => {
      const msgPosicionar = `Posicione o mapa na região usando a barra de pesquisa de endereço no topo.`;

      const msgDesenhar = `Toque no mapa para definir os pontos e desenhar a área aproximada, tente seguir o contorno da área.`;

      return selecionarLocal ? msgPosicionar : msgDesenhar;
   };

   const defineTitulo = () => {
      return selecionarLocal ? 'Procure a área' : 'Desenhe';
   };

   const criaMarcador = (e) => {
      if (selecionarLocal) return;

      const { coordinate } = e.nativeEvent;
      setMarcadores([...marcadores, coordinate]);
   };

   const estiloBotaoEdicao = { backgroundColor: desabilitaEdicao ? 'gray' : cores.azulProfundo };
   const estiloBotaoToggle = { backgroundColor: selecionarLocal ? cores.azulProfundo : cores.azul };

   const limpaMarcadores = () => {
      setMarcadores([]);
   };

   const desfazUltimo = () => {
      setMarcadores(marcadores.slice(0, -1));
   };

   const salvarArea = () => {
      var regiaoDeAtuacao = marcadores;
      navigation.navigate('CapturaMapa', { regiaoDeAtuacao });
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
            style={{ flex: 1 }}
            rotateEnabled={false}
            pitchEnable={false}
            moveOnMarkerPress={false}
            loadingEnabled={true}
            onPress={criaMarcador}
            currentLocation={true}
         >
            {marcadores.length < 3 &&
               marcadores.map((marcador, index) => (
                  <Marker key={index} coordinate={marcador} image={require('../../../../assets/teste/Marcador.png')} />
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

         <View style={[estilos.containerTitulo, defineCorFundo(selecionarLocal), defineCorBorda(selecionarLocal)]}>
            <Texto style={estilos.titulo}>{defineTitulo()}</Texto>
         </View>
         <View style={estilos.container}>
            <View style={{ justifyContent: 'center' }}>
               <Texto style={estilos.dica}>{defineMensagem()}</Texto>
            </View>
            <View style={estilos.controles}>
               <View style={{ flexDirection: 'row' }}>
                  <BotaoQuadrado
                     tipo={'Ionicons'}
                     icone={'color-palette'}
                     style={[estiloBotaoToggle, { marginRight: 10 }]}
                     onPress={setSelecionarLocal}
                  />

                  <BotaoQuadrado
                     tipo={'Feather'}
                     icone={'trash-2'}
                     style={[estiloBotaoEdicao, { marginRight: 10 }]}
                     disabled={desabilitaEdicao}
                     onPress={mostrarModal}
                  />

                  <BotaoQuadrado
                     tipo={'Ionicons'}
                     icone={'arrow-undo'}
                     style={estiloBotaoEdicao}
                     disabled={desabilitaEdicao}
                     onPress={desfazUltimo}
                  />
               </View>
               <View style={{ flexDirection: 'row' }}>
                  {habilitaSalvar && (
                     <View style={{ alignItems: 'flex-end', marginRight: 10 }}>
                        <Texto style={estilos.salvar}>Pronto? Só salvar!</Texto>
                        <MaterialCommunityIcons name="arrow-right-bottom-bold" size={20} color={cores.azul} />
                     </View>
                  )}
                  <BotaoQuadrado tipo={'Feather'} icone={'save'} disabled={!habilitaSalvar} onPress={salvarArea} />
               </View>
            </View>
         </View>

         <View style={estilos.containerPesquisa}>
            <GooglePlacesAutocomplete
               placeholder="Pesquise um endereço"
               styles={estilos.pesquisa}
               onPress={handleLocationSelect}
               fetchDetails={true}
               query={{
                  key: googleApiKey,
                  language: 'pt',
               }}
            />
         </View>

         <ModalConfirmacao visible={modalVisible} confirmar={confirmar} cancelar={cancelar} />
      </>
   );
}

function makeColorLighter(baseColor, factor) {
   const color = Color(baseColor);
   return color.lighten(factor).hex();
}

function defineCorFundo(selecionarLocal) {
   var cor = selecionarLocal ? makeColorLighter(cores.azulProfundo, 3) : makeColorLighter(cores.azul, 1.2);

   return { backgroundColor: cor };
}

function defineCorBorda(selecionarLocal) {
   var cor = selecionarLocal ? cores.azulProfundo : cores.azul;

   return { borderColor: cor };
}

const larguraTela = Dimensions.get('screen').width;

const estilos = StyleSheet.create({
   containerPesquisa: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
   },
   pesquisa: {
      container: {
         borderColor: cores.azulProfundo,
         borderBottomWidth: 1,
      },
      textInputContainer: {
         backgroundColor: cores.branco,
      },
      textInput: {
         color: cores.cinza,
         fontSize: 18,
         fontFamily: 'RubikRegular',
      },
      description: {
         fontFamily: 'RubikRegular',
      },
   },
   containerTitulo: {
      paddingVertical: 6,
      paddingHorizontal: 10,
      fontSize: 24,
      borderTopWidth: 2,
      borderBottomWidth: 2,
   },
   titulo: {
      fontSize: 24,
   },
   container: {
      backgroundColor: cores.branco,
      padding: 10,
   },
   controles: {
      flexDirection: 'row',
      justifyContent: 'space-between',
   },
   dica: {
      fontSize: 16,
      marginBottom: 10,
   },
   salvar: {
      fontSize: larguraTela * 0.035,
      fontWeight: 'bold',
      color: cores.azul,
   },
});
