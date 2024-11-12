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

const fields = [
  { key: "Astragale", name: "Astragale" },
  { key: "Hannibal", name: "Hannibal" },
  { key: "Phoning", name: "Phoning" },
  { key: "Ulysse", name: "Ulysse" },
  { key: "Pénélope", name: "Pénélope" },
];

interface VoyantAddPropsType {
  refresh: () => void;
}
const VoyantAdd = (props: VoyantAddPropsType) => {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  // form states
  const [nom, setNom] = useState<string>("");
  const [planing, setPlaning] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const [plateau, setPlateau] = useState<string>(fields[0].key);
  const [num_tel, setNum_tel] = useState<string>("");

  const handleNomChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNom(event.target.value);
  };
  const handlePlaningChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPlaning(event.target.value);
  };
  const handleChauffeurChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNum_tel(event.target.value);
  };
  const handleDestinationChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDestination(event.target.value);
  };

  const submit = () => {
    const newVoyant = {
      nom,
      planing,
      destination,
      plateau,
      num_tel,
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
    setNum_tel("");
    setDestination("");
    setPlateau(fields[0].key);
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
export default VoyantAdd;
