import { Fruit } from '../interfaces/Fruit';

export const fruits: Fruit[] = [
  {
    id: 1,
    nom: 'Banane',
    description: 'Banane mûre et sucrée, source de potassium et d\'énergie. Idéale pour le petit-déjeuner.',
    prixAchat: 1500,
    prixVente: 2000,
    categorie: 'Fruits frais',
    stock: 75,
    image: require('../../assets/images/banane.jpg')
  },
  {
    id: 2,
    nom: 'Citron',
    description: 'Citron frais et juteux, riche en vitamine C. Parfait pour assaisonner vos plats et boissons.',
    prixAchat: 500,
    prixVente: 1000,
    categorie: 'Agrumes',
    stock: 60,
    image: require('../../assets/images/citron.jpg')
  },
  {
    id: 3,
    nom: 'Fraise',
    description: 'Fraise sucrée et parfumée, pleine de saveur. Parfaite pour les desserts et salades de fruits.',
    prixAchat: 2000,
    prixVente: 3000,
    categorie: 'Baies',
    stock: 30,
    image: require('../../assets/images/fraise.jpg')
  },
  {
    id: 4,
    nom: 'Mandarine',
    description: 'Mandarine douce et facile à éplucher, riche en vitamine C. Idéale pour les collations.',
    prixAchat: 600,
    prixVente: 800,
    categorie: 'Agrumes',
    stock: 45,
    image: require('../../assets/images/madarine.jpg')
  },
  {
    id: 5,
    nom: 'Mangue',
    description: 'Mangue sucrée et juteuse, exotique et savoureuse. Parfaite pour les desserts tropicaux.',
    prixAchat: 1800,
    prixVente: 3500,
    categorie: 'Fruits frais',
    stock: 35,
    image: require('../../assets/images/mangue.jpg')
  },
  {
    id: 6,
    nom: 'Papaye',
    description: 'Papaye fraîche et sucrée, riche en enzymes digestives. Excellent fruit tropical.',
    prixAchat: 2200,
    prixVente: 4800,
    categorie: 'Fruits frais',
    stock: 25,
    image: require('../../assets/images/papaye.jpg')
  }
];

