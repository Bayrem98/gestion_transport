import { useEffect, useState } from "react";
import { Button, ButtonGroup, Table, Input } from "reactstrap";
import Voyant from "../../@types/Voyant";
import { getVoyants } from "../../actions/Voyant/action";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxOpen, faTrash } from "@fortawesome/free-solid-svg-icons";

const fields1 = [
  { key: "22H", name: "22H" },
  { key: "23H", name: "23H" },
  { key: "00H", name: "00H" },
  { key: "01H", name: "01H" },
  { key: "02H", name: "02H" },
  { key: "03H", name: "03H" },
];

const fields2 = [
  { key: "Samir", name: "Samir" },
  { key: "Adel", name: "Adel" },
  { key: "Fathi", name: "Fathi" },
  { key: "Said", name: "Said" },
  { key: "Saber", name: "Saber" },
  { key: "Karim", name: "Karim" },
  { key: "Taxi", name: "Taxi" },
];

interface Props {}

const Depart = (props: Props) => {
  const [voyants, setVoyants] = useState<Voyant[]>([]);
  const [selectedVoyants, setSelectedVoyants] = useState<
    Record<number, string>
  >({});
  const [rows, setRows] = useState<number[]>([]);
  const [currentDate, setCurrentDate] = useState<string>("");

  useEffect(() => {
    getVoyants(null, setVoyants);

    // Obtenir la date actuelle et la formater
    const today = new Date();
    const formattedDate = today.toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    setCurrentDate(formattedDate);
  }, []);

  // Ajouter une nouvelle ligne au tableau
  const addRow = () => {
    setRows((prevRows) => [...prevRows, prevRows.length]);
  };

  // Supprimer une ligne du tableau
  const deleteRow = (index: number) => {
    setRows((prevRows) => prevRows.filter((rowIndex) => rowIndex !== index));
    setSelectedVoyants((prev) => {
      const updated = { ...prev };
      delete updated[index];
      return updated;
    });
  };

  // Mettre à jour le voyant sélectionné pour une ligne spécifique
  const handleSelectChange = (index: number, voyantNom: string) => {
    setSelectedVoyants((prev) => ({ ...prev, [index]: voyantNom }));
  };

  return (
    <>
      <div style={{ paddingTop: 50 }}>
        <p style={{ textAlign: "center", fontSize: 30 }}>
          Départ <span>{currentDate}</span>
        </p>
        {/* Bouton pour ajouter une nouvelle ligne */}
        <Button
          color="primary"
          onClick={addRow}
          style={{ marginBottom: "20px", marginLeft: 20 }}
        >
          Ajouter une ligne
        </Button>
        <div className="" style={{ marginLeft: 20, marginRight: 20 }}>
          <Table bordered responsive hover>
            <thead>
              <tr>
                <th>Salarie</th>
                <th>Planning</th>
                <th>Heure</th>
                <th>Chauffeur</th>
                <th>Destination</th>
                <th>Plateau</th>
                <th>Num-Tel</th>
                <th style={{ textAlign: "center" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.length ? (
                rows.map((index) => {
                  const voyantNom = selectedVoyants[index];
                  const voyantData = voyants.find((v) => v.nom === voyantNom);

                  return (
                    <tr key={index}>
                      <td>
                        <Input
                          type="select"
                          value={voyantNom || ""}
                          onChange={(e) =>
                            handleSelectChange(index, e.target.value)
                          }
                        >
                          <option value="">Sélectionner un voyant</option>
                          {voyants.map((voyant) => (
                            <option key={voyant._id} value={voyant.nom}>
                              {voyant.nom}
                            </option>
                          ))}
                        </Input>
                      </td>

                      <td>{voyantData?.planing || "-"}</td>
                      <td>
                        <Input type="select">
                          {fields1.map((f) => (
                            <option key={f.key} value={f.key}>
                              {f.name}
                            </option>
                          ))}
                        </Input>
                      </td>
                      <td>
                        <Input type="select">
                          {fields2.map((f) => (
                            <option key={f.key} value={f.key}>
                              {f.name}
                            </option>
                          ))}
                        </Input>
                      </td>
                      <td>{voyantData?.destination || "-"}</td>
                      <td>{voyantData?.plateau || "-"}</td>
                      <td>{voyantData?.num_tel || "-"}</td>
                      <td style={{ textAlign: "center" }}>
                        <ButtonGroup>
                          <span onClick={() => deleteRow(index)}>
                            <FontAwesomeIcon
                              icon={faTrash}
                              color="red"
                              size="2xl"
                              style={{ cursor: "pointer" }}
                            />
                          </span>
                        </ButtonGroup>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={8} className="text-center">
                    <FontAwesomeIcon icon={faBoxOpen} size="4x" />
                    <br />
                    Pas de données...
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default Depart;
