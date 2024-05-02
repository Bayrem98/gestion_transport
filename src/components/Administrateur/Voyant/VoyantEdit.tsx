import { ChangeEvent, useState } from "react";
import Voyant from "../../../@types/Voyant";
import { editVoyant } from "../../../actions/Voyant/action";
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

const fields = [
  { key: "Ramassage", name: "Ramassage" },
  { key: "Depart", name: "Depart" },
];

interface VoyantEditPropsType {
  voyant: Voyant;
  refresh: () => void;
}

const VoyantEdit = ({ voyant, refresh }: VoyantEditPropsType) => {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  const [nom, setNom] = useState<string>(voyant.nom);
  const [planing, setPlaning] = useState<string>(voyant.planing);
  const [heure, setHeure] = useState<string>(voyant.heure);
  const [chauffeur, setChauffeur] = useState<string>(voyant.chauffeur);
  const [destination, setDestination] = useState<string>(voyant.destination);
  const [situation, setSituation] = useState<string>(voyant.situation);

  const handleNomChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNom(event.target.value);
  };
  const handlePlaningChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPlaning(event.target.value);
  };
  const handleHeureChange = (event: ChangeEvent<HTMLInputElement>) => {
    setHeure(event.target.value);
  };
  const handleChauffeurChange = (event: ChangeEvent<HTMLInputElement>) => {
    setChauffeur(event.target.value);
  };
  const handleDestinationChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDestination(event.target.value);
  };

  const submit = () => {
    const newVoyant = {
      _id: voyant._id,
      nom,
      planing,
      heure,
      chauffeur,
      destination,
      situation,
    };
    editVoyant(newVoyant, () => {
      refresh();
      setIsOpened(false);
      reset(newVoyant);
    });
  };

  const reset = (voyant: Voyant) => {
    setNom(voyant.nom);
    setPlaning(voyant.planing);
    setHeure(voyant.heure);
    setChauffeur(voyant.chauffeur);
    setDestination(voyant.destination);
    setSituation(voyant.situation);
  };

  return (
    <>
      <span onClick={() => setIsOpened(true)} style={{ cursor: "pointer" }}>
        <FontAwesomeIcon icon={faPen} size="2xl" color="green" />
      </span>
      <Modal
        centered
        scrollable
        isOpen={isOpened}
        toggle={() => setIsOpened(!isOpened)}
      >
        <ModalHeader toggle={() => setIsOpened(!isOpened)}>
          <span>Modification Etat de Voyant</span>
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="nom">Nom</Label>
              <Input
                value={nom}
                id="nom"
                name="nom"
                type="text"
                onChange={handleNomChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="planing">Planing</Label>
              <Input
                value={planing}
                id="planing"
                name="planing"
                onChange={handlePlaningChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="heure">Heure</Label>
              <Input
                value={heure}
                id="heure"
                name="heure"
                onChange={handleHeureChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="chauffeur">Chauffeur</Label>
              <Input
                value={chauffeur}
                id="chauffeur"
                name="chauffeur"
                onChange={handleChauffeurChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="destination">Destination</Label>
              <Input
                value={destination}
                id="destination"
                name="destination"
                onChange={handleDestinationChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="situation">Situation</Label>
              <Input
                value={situation}
                id="situation"
                name="situation"
                type="select"
                onChange={(e) => setSituation(e.target.value)}
              >
                {fields.map((f) => (
                  <option key={f.key} value={f.key}>
                    {f.name}
                  </option>
                ))}
              </Input>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            style={{
              backgroundColor: "#ddd9d5",
              border: 0,
              color: "black",
              borderRadius: 10,
            }}
            onClick={submit}
          >
            Valider
          </Button>{" "}
          <Button
            style={{
              backgroundColor: "red",
              color: "white",
              border: 0,
              borderRadius: 10,
            }}
            onClick={() => setIsOpened(false)}
          >
            Annuler
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};
export default VoyantEdit;
