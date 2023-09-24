import Paulo from '../../assets/teste/passageiros/Paulo.png';
import Adiler from '../../assets/teste/passageiros/Adiler.png';

const Motoristas = [
   {
      foto: Paulo,
      nome: 'Macaco Louco',
      descrição: 'O melhor motorista da cidade de Townsville',
      regiaoDeAtuacao: [
         coordnateFabric('-22.846561094834225, -47.88771804163401'),
         coordnateFabric('-22.340916774877666, -47.25458475406366'),
         coordnateFabric('-22.304985191854474, -45.693114928276664'),
         coordnateFabric('-22.721220065798285, -44.683209070802484'),
         coordnateFabric('-23.69935091091557, -44.36470030036832'),
         coordnateFabric('-24.214045588048492, -44.49676491249956'),
         coordnateFabric('-24.31673706885831, -46.01162369871083'),
         coordnateFabric('-24.19633178049377, -47.44879741896254'),
      ],
   },
   {
      foto: Adiler,
      nome: 'Abner',
      descrição: 'abubublé abubublé uhhh ahhh !!!',
      regiaoDeAtuacao: [
         coordnateFabric('-23.63214651600437, -46.60155154236007'),
         coordnateFabric('-23.619092828891446, -46.607731351515476'),
         coordnateFabric('-23.607374857489432, -46.60507060035134'),
         coordnateFabric('-23.59777949690227, -46.59665919344537'),
         coordnateFabric('-23.598801986779876, -46.58112383987415'),
         coordnateFabric('-23.595262564782395, -46.56893588292877'),
         coordnateFabric('-23.602577264963532, -46.55606128052168'),
         coordnateFabric('-23.632461046629444, -46.55134059297241'),
         coordnateFabric('-23.63812246867974, -46.58644534220242'),
      ],
   },
];

function coordnateFabric(x) {
   const valoresSeparados = x.split(',');

   return {
      latitude: parseFloat(valoresSeparados[0]),
      longitude: parseFloat(valoresSeparados[1]),
   };
}

export default Motoristas;
