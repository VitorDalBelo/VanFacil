import React , {useState,useRef} from "react";
import {View} from "react-native";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapView , {PROVIDER_GOOGLE , Marker}from 'react-native-maps';

export default function MapSearch(props){
    const [lat,setLat] = useState(null);
    const [lon,setLon] = useState(null);
    const mapRef = useRef(null);
    return (
        <View>
        <GooglePlacesAutocomplete
           styles={
               {
                   container:{flex:0,},
                   listView:{position:"absolute",top:45,zIndex:999,height:100}
               }
           }
           placeholder='Search'
           fetchDetails
           onPress={(data,details = null) => {
               console.log("geometry",details.geometry);
               console.log(details.address_components);
               const {location} = details.geometry;
               setLat(location.lat);
               setLon(location.lng); 
               mapRef.current?.animateToRegion({
                   latitude: location.lat,
                   longitude: location.lng,
                   latitudeDelta: 0.00009, 
                   longitudeDelta: 0.00009, 
               })
               if(typeof props.onPress === "function") props.onPress(details);
           }}
           query={{
               key: 'AIzaSyCRQi-6BPBTDYPF4SRAPOoEqnZhQeVyphk',
               language: 'pt-br',
               type:"geocode"
           }}
           />
           <MapView ref={mapRef} style={{width:"100%",height:200,zIndex:-1}} provider={PROVIDER_GOOGLE} >
               {lat && lon && (
                   <Marker
                   coordinate={{
                       latitude:lat,
                       longitude:lon
                   }}
                   />
               )}
           </MapView>
       </View>
    )
}