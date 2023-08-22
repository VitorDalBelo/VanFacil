import React from "react";
import { View,StyleSheet,ScrollView, Dimensions, Image } from "react-native";
import MenuBar from "./Shared/MenuBar";
import Texto from "../components/Texto";
import { useRoute } from "@react-navigation/native";

export default function Perfil(item){
    const route = useRoute();
    const {foto, nome, descrição} = route.params;
    

    return(  <>
        <MenuBar/>
        <ScrollView>
            <View>
                <Image source={foto} style={estilos.foto}/>
                <Texto>{nome}</Texto>
                <Texto>{descrição}</Texto>
            </View>
            <View>

            </View>
            
        </ScrollView>
    </>
)}

const estilos = StyleSheet.create({
    foto:{
        flex: 1 ,

    },


});