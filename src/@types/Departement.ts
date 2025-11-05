interface Voyant {
  _id: string;
  nom: string;
  planing: string;
  heure?: string;
  destination: string;
  plateau: string;
  num_tel: string;
  chauffeur?: string;
}

interface LigneDepartement {
  salarie: Voyant;
  planning: string;
  heure: string;
  chauffeur: string;
  destination: string;
  plateau: string;
  num_tel: string;
}

interface Departement {
  _id: string;
  lignes: LigneDepartement[];
  date: string;
  createdAt: string;
  updatedAt: string;
}

export default Departement;
