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
  { key: "Astragale", name: "Astragale" },
  { key: "Hannibal", name: "Hannibal" },
  { key: "Phoning", name: "Phoning" },
  { key: "Ulysse", name: "Ulysse" },
  { key: "Pénélope", name: "Pénélope" },
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
  const [destination, setDestination] = useState<string>(voyant.destination);
  const [plateau, setPlateau] = useState<string>(voyant.plateau);
  const [num_tel, setNum_tel] = useState<string>(voyant.num_tel);

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
    setNum_tel(event.target.value);
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
      destination,
      plateau,
      num_tel,
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
    setNum_tel(voyant.num_tel);
    setDestination(voyant.destination);
    setPlateau(voyant.plateau);
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
              <Label for="destination">Destination</Label>
              <Input
                value={destination}
                id="destination"
                name="destination"
                onChange={handleDestinationChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="plateau">Plateau</Label>
              <Input
                value={plateau}
                id="plateau"
                name="plateau"
                type="select"
                onChange={(e) => setPlateau(e.target.value)}
              >
                {fields.map((f) => (
                  <option key={f.key} value={f.key}>
                    {f.name}
                  </option>
                ))}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="num_tel">Num-Tel</Label>
              <Input
                value={num_tel}
                id="num_tel"
                name="num_tel"
                onChange={handleChauffeurChange}
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
export default VoyantEdit;
