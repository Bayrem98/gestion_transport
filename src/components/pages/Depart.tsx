import { useEffect, useState } from "react";
import { Button, ButtonGroup, Table, Input, Alert } from "reactstrap";
import Voyant from "../../@types/Voyant";
import { getVoyants } from "../../actions/Voyant/action";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxOpen, faTrash, faSave } from "@fortawesome/free-solid-svg-icons";

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
  const [selectedHeures, setSelectedHeures] = useState<Record<number, string>>(
    {}
  );
  const [selectedChauffeurs, setSelectedChauffeurs] = useState<
    Record<number, string>
  >({});
  const [rows, setRows] = useState<number[]>([]);
  const [currentDate, setCurrentDate] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    getVoyants(null, setVoyants);

    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0]; // Format YYYY-MM-DD
    setCurrentDate(formattedDate);
  }, []);

  const addRow = () => {
    setRows((prevRows) => [...prevRows, prevRows.length]);
  };

  const deleteRow = (index: number) => {
    setRows((prevRows) => prevRows.filter((rowIndex) => rowIndex !== index));
    setSelectedVoyants((prev) => {
      const updated = { ...prev };
      delete updated[index];
      return updated;
    });
    setSelectedHeures((prev) => {
      const updated = { ...prev };
      delete updated[index];
      return updated;
    });
    setSelectedChauffeurs((prev) => {
      const updated = { ...prev };
      delete updated[index];
      return updated;
    });
  };

  const handleSelectChange = (index: number, voyantNom: string) => {
    setSelectedVoyants((prev) => ({ ...prev, [index]: voyantNom }));
  };

  const handleHeureChange = (index: number, heure: string) => {
    setSelectedHeures((prev) => ({ ...prev, [index]: heure }));
  };

  const handleChauffeurChange = (index: number, chauffeur: string) => {
    setSelectedChauffeurs((prev) => ({ ...prev, [index]: chauffeur }));
  };

  const handleSubmit = async () => {
    if (rows.length === 0) {
      setMessage(
        "Le tableau est vide. Ajoutez des données avant de soumettre."
      );
      setIsError(true);
      return;
    }

    try {
      // Vérification que tous les voyants sont sélectionnés
      const missingVoyants = rows.filter((index) => !selectedVoyants[index]);
      if (missingVoyants.length > 0) {
        throw new Error(
          "Veuillez sélectionner un voyant pour toutes les lignes"
        );
      }

      const dataToSend = {
        lignes: rows.map((index) => {
          const voyantNom = selectedVoyants[index];
          const voyantData = voyants.find((v) => v.nom === voyantNom);

          if (!voyantData) {
            throw new Error(`Voyant "${voyantNom}" non trouvé`);
          }

          return {
            salarie: voyantData._id, // ID du voyant
            planning: selectedHeures[index] || fields1[0].key,
            heure: selectedHeures[index] || fields1[0].key,
            chauffeur: selectedChauffeurs[index] || fields2[0].key,
            destination: voyantData.destination,
            plateau: voyantData.plateau,
            num_tel: voyantData.num_tel,
          };
        }),
        date: currentDate, // Doit être au format YYYY-MM-DD
      };

      console.log("Envoi des données:", dataToSend);

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/departements`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Erreur serveur");
      }

      setMessage("Départ enregistré avec succès !");
      setIsError(false);

      // Réinitialisation
      setTimeout(() => {
        setRows([]);
        setSelectedVoyants({});
        setSelectedHeures({});
        setSelectedChauffeurs({});
        setMessage(null);
      }, 2000);
    } catch (error: any) {
      console.error("Erreur:", error);
      setMessage(error.message || "Erreur lors de l'enregistrement");
      setIsError(true);
    }
  };

  return (
    <>
      <div style={{ paddingTop: 50 }}>
        <p style={{ textAlign: "center", fontSize: 30 }}>
          Départ{" "}
          <span>{new Date(currentDate).toLocaleDateString("fr-FR")}</span>
        </p>
        {message && (
          <Alert color={isError ? "danger" : "success"} style={{ margin: 20 }}>
            {message}
          </Alert>
        )}
        <div style={{ display: "flex", marginLeft: 20, marginBottom: 20 }}>
          <Button color="primary" onClick={addRow} style={{ marginRight: 10 }}>
            Ajouter une ligne
          </Button>
          <Button
            color="success"
            onClick={handleSubmit}
            style={{ marginRight: 10 }}
          >
            <FontAwesomeIcon icon={faSave} style={{ marginRight: 5 }} />
            Enregistrer
          </Button>
        </div>
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
                          required
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
                        <Input
                          type="select"
                          onChange={(e) =>
                            handleHeureChange(index, e.target.value)
                          }
                          value={selectedHeures[index] || fields1[0].key}
                        >
                          {fields1.map((f) => (
                            <option key={f.key} value={f.key}>
                              {f.name}
                            </option>
                          ))}
                        </Input>
                      </td>
                      <td>
                        <Input
                          type="select"
                          onChange={(e) =>
                            handleChauffeurChange(index, e.target.value)
                          }
                          value={selectedChauffeurs[index] || fields2[0].key}
                        >
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
