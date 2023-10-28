import Paulo from '../../assets/teste/passageiros/Paulo.png';
import Adiler from '../../assets/teste/passageiros/Adiler.png';

const Motoristas = [
   {
      "description": null,
      "google_account": false,
      "photo": "avatars/noimage.jpg",
      "name": "Vitor",
      "license_plate": "JLA8E96",
      "van_model": "SPRINTER MARTM5"
  }
];

function coordnateFabric(x) {
   const valoresSeparados = x.split(',');

   return {
      latitude: parseFloat(valoresSeparados[0]),
      longitude: parseFloat(valoresSeparados[1]),
   };
}

export default Motoristas;
