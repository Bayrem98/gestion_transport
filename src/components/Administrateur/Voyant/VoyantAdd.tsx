import { ChangeEvent, useState } from "react";
import { addVoyant } from "../../../actions/Voyant/action";
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
import { faPlus } from "@fortawesome/free-solid-svg-icons";

interface VoyantAddPropsType {
  refresh: () => void;
}
const VoyantAdd = (props: VoyantAddPropsType) => {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  // form states
  const [nom, setNom] = useState<string>("");
  const [planing, setPlaning] = useState<string>("");
  const [heure, setHeure] = useState<string>("");
  const [chauffeur, setChauffeur] = useState<string>("");
  const [destination, setDestination] = useState<string>("");

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
      nom,
      planing,
      heure,
      chauffeur,
      destination,
    };
    addVoyant(newVoyant, () => {
      props.refresh();
      setIsOpened(false);
      reset();
    });
  };

  const reset = () => {
    setNom("");
    setPlaning("");
    setHeure("");
    setChauffeur("");
    setDestination("");
  };

  return (
    <>
      <span onClick={() => setIsOpened(true)} style={{ cursor: "pointer" }}>
        <FontAwesomeIcon icon={faPlus} size="2xl" color="green" />
      </span>
      <Modal
        centered
        scrollable
        isOpen={isOpened}
        toggle={() => setIsOpened(!isOpened)}
      >
        <ModalHeader toggle={() => setIsOpened(!isOpened)}>
          <span>Ajouter Voyant</span>
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
export default VoyantAdd;
