export function calculaCentro(regiao) {
   let maxLatitude = -90; // Valor mínimo possível de latitude
   let minLatitude = 90; // Valor máximo possível de latitude
   let maxLongitude = -180; // Valor mínimo possível de longitude
   let minLongitude = 180; // Valor máximo possível de longitude

   // Encontra os valores máximos e mínimos de latitude e longitude
   regiao.forEach((coord) => {
      if (coord.latitude > maxLatitude) {
         maxLatitude = coord.latitude;
      }
      if (coord.latitude < minLatitude) {
         minLatitude = coord.latitude;
      }
      if (coord.longitude > maxLongitude) {
         maxLongitude = coord.longitude;
      }
      if (coord.longitude < minLongitude) {
         minLongitude = coord.longitude;
      }
   });

   // Calcula as diferenças máximas de latitude e longitude
   const latitudeDelta = maxLatitude - minLatitude;
   const longitudeDelta = maxLongitude - minLongitude;

   // Adiciona uma margem extra
   const margemExtra = 0.002;

   return {
      latitude: (maxLatitude + minLatitude) / 2,
      longitude: (maxLongitude + minLongitude) / 2,
      latitudeDelta: latitudeDelta + margemExtra,
      longitudeDelta: longitudeDelta + margemExtra,
   };
}
