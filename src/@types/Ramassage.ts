import Voyant from "./Voyant";

interface LigneRamassage {
  salarie: Voyant;
  planning: string;
  heure: string;
  chauffeur: string;
  destination: string;
  plateau: string;
  num_tel: string;
}

interface Ramassage {
  _id: string;
  lignes: LigneRamassage[];
  date: string;
  createdAt: string;
  updatedAt: string;
}

export default Ramassage;
