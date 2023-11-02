import React, { useRef } from 'react';
import { View, StyleSheet } from 'react-native';

import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import cores from '../../../../assets/cores';

import appConfig from '../../../../app.json';

const apiKey = appConfig.config.googleMaps.apiKey;

export default function PesquisaLocal(props) {
   const { loading, endereco, setEndereco } = props;
   const mapRef = useRef(null);

   function getAdrresJson(array) {
      const jsonResult = {};

      for (const item of array) {
         if (item.types.includes('street_number')) {
            jsonResult.numero = parseInt(item.long_name);
         } else if (item.types.includes('route')) {
            jsonResult.logradouro = item.long_name;
         } else if (item.types.includes('sublocality_level_1')) {
            jsonResult.bairro = item.long_name;
         } else if (item.types.includes('administrative_area_level_2')) {
            jsonResult.cidade = item.long_name;
         } else if (item.types.includes('administrative_area_level_1')) {
            jsonResult.uf = item.short_name;
         } else if (item.types.includes('country')) {
            jsonResult.pais = item.long_name;
         }
      }

      return jsonResult;
   }

   return (
      <>
         <GooglePlacesAutocomplete
            styles={{
               container: { flex: 0 },
               textInput: [estilos.inputPlaces, estilos.textoInput],
               listView: estilos.placesList,
               row: estilos.placesRow,
               powered: { height: 0 },
            }}
            placeholder="Endereço"
            fetchDetails
            onPress={(data, details = null) => {
               if (!loading) {
                  const { lat, lng } = details.geometry.location;
                  const endereco = getAdrresJson(details.address_components);
                  endereco.latitude = lat;
                  endereco.longitude = lng;
                  setEndereco(endereco);
                  mapRef.current?.animateToRegion({
                     latitude: lat,
                     longitude: lng,
                     latitudeDelta: 0.0005,
                     longitudeDelta: 0.0005,
                  });
               }
            }}
            query={{
               key: apiKey,
               language: 'pt-br',
               type: 'geocode',
            }}
         />
         <View style={estilos.caixaMapa}>
            <MapView
               ref={mapRef}
               style={estilos.mapa}
               provider={PROVIDER_GOOGLE}
               initialRegion={
                  endereco.latitude && endereco.longitude
                     ? {
                          latitude: endereco.latitude,
                          longitude: endereco.longitude,
                          latitudeDelta: 0.0005,
                          longitudeDelta: 0.0005,
                       }
                     : undefined
               }
            >
               {endereco.latitude && endereco.longitude && (
                  <Marker
                     coordinate={{
                        latitude: endereco.latitude,
                        longitude: endereco.longitude,
                     }}
                  />
               )}
            </MapView>
         </View>
      </>
   );
}

const estilos = StyleSheet.create({
   textoInput: {
      fontSize: 16,
      fontFamily: 'RubikRegular',
   },
   inputPlaces: {
      height: 40,
      paddingHorizontal: 10,
      marginTop: 10,
      marginBottom: 0,
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: cores.azulProfundo,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
   },
   placesList: {
      height: 46,
      position: 'absolute',
      top: 50,
      zIndex: 999,
      backgroundColor: cores.gelo,
      borderBottomWidth: 1,
      borderColor: cores.azulProfundo,
   },
   placesRow: {
      fontSize: 16,
      fontFamily: 'RubikRegular',
      borderWidth: 1,
      borderTopWidth: 0,
      borderColor: cores.azulProfundo,
   },
   caixaMapa: {
      height: 300,
      zIndex: -1,
      marginBottom: 10,
      borderColor: cores.azulProfundo,
      borderRadius: 5,
      borderWidth: 1,
      overflow: 'hidden',
      borderTopWidth: 0,
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
   },
   mapa: {
      width: '100%',
      height: '100%',
   },
});
