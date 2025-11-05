import { useEffect, useState } from "react";
import {
  Table,
  Button,
  Input,
  Alert,
  Card,
  CardHeader,
  CardBody,
} from "reactstrap";
import Departement from "../../@types/Departement";
import {
  getDepartements,
  getDepartementsByDate,
  deleteDepartement,
} from "../../actions/Voyant/action";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faSearch,
  faTrash,
  faEye,
  faBoxOpen,
} from "@fortawesome/free-solid-svg-icons";

const Recap = () => {
  const [departements, setDepartements] = useState<Departement[]>([]);
  const [filteredDepartements, setFilteredDepartements] = useState<
    Departement[]
  >([]);
  const [searchDate, setSearchDate] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);
  const [selectedDepartement, setSelectedDepartement] =
    useState<Departement | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setDepartements([]);
    setFilteredDepartements([]);

    getDepartements((data) => {
      setDepartements(data);
      setFilteredDepartements(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (Array.isArray(departements)) {
      setFilteredDepartements(departements);
    } else {
      setFilteredDepartements([]);
    }
  }, [departements]);

  const handleSearch = () => {
    if (searchDate) {
      setLoading(true);
      getDepartementsByDate(searchDate, (data) => {
        setFilteredDepartements(data);
        setLoading(false);
      });
    } else {
      setFilteredDepartements(departements);
    }
  };

  const handleSearchAll = () => {
    setSearchDate("");
    setFilteredDepartements(departements);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce départ ?")) {
      deleteDepartement(id, () => {
        // ← MAINTENANT CORRECT
        const updatedDepartements = departements.filter(
          (dep) => dep._id !== id
        );
        setDepartements(updatedDepartements);
        setFilteredDepartements(updatedDepartements);
        setMessage("Départ supprimé avec succès");
        setTimeout(() => setMessage(null), 3000);
      });
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("fr-FR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (error) {
      return dateString;
    }
  };

  const totalSalaries = Array.isArray(filteredDepartements)
    ? filteredDepartements.reduce(
        (total, dep) => total + (dep.lignes?.length || 0),
        0
      )
    : 0;

  console.log("departements:", departements);
  console.log("filteredDepartements:", filteredDepartements);
  console.log("loading:", loading);

  if (loading) {
    return (
      <div style={{ padding: 50, textAlign: "center" }}>
        <p>Chargement des données...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h1 style={{ textAlign: "center", marginBottom: 30, color: "#0d6efd" }}>
        <FontAwesomeIcon icon={faCalendar} style={{ marginRight: 10 }} />
        Récapitulatif des Départs
      </h1>

      {message && (
        <Alert color="success" style={{ marginBottom: 20 }}>
          {message}
        </Alert>
      )}

      {/* Carte de recherche */}
      <Card style={{ marginBottom: 30 }}>
        <CardHeader style={{ backgroundColor: "#f8f9fa" }}>
          <h5 style={{ margin: 0 }}>Recherche par date</h5>
        </CardHeader>
        <CardBody>
          <div
            style={{
              display: "flex",
              gap: 10,
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <Input
              type="date"
              value={searchDate}
              onChange={(e) => setSearchDate(e.target.value)}
              style={{ width: 200 }}
            />
            <Button color="primary" onClick={handleSearch}>
              <FontAwesomeIcon icon={faSearch} style={{ marginRight: 5 }} />
              Rechercher
            </Button>
            <Button color="secondary" onClick={handleSearchAll}>
              Voir tous
            </Button>
          </div>
        </CardBody>
      </Card>

      {/* Statistiques */}
      <div
        style={{ display: "flex", gap: 20, marginBottom: 20, flexWrap: "wrap" }}
      >
        <Card color="primary" inverse>
          <CardBody>
            <h4>
              {Array.isArray(filteredDepartements)
                ? filteredDepartements.length
                : 0}
            </h4>
            <p>Départs</p>
          </CardBody>
        </Card>
        <Card color="success" inverse>
          <CardBody>
            <h4>{totalSalaries}</h4>
            <p>Salariés total</p>
          </CardBody>
        </Card>
      </div>

      {/* Liste des départements */}
      {Array.isArray(filteredDepartements) &&
      filteredDepartements.length > 0 ? (
        filteredDepartements.map((departement) => (
          <Card
            key={departement._id}
            style={{ marginBottom: 30, border: "1px solid #dee2e6" }}
          >
            <CardHeader
              style={{
                backgroundColor: "#e9ecef",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h5 style={{ margin: 0 }}>
                Départ du {formatDate(departement.date)}
              </h5>
              <div>
                <Button
                  color="info"
                  size="sm"
                  onClick={() =>
                    setSelectedDepartement(
                      selectedDepartement?._id === departement._id
                        ? null
                        : departement
                    )
                  }
                  style={{ marginRight: 10 }}
                >
                  <FontAwesomeIcon icon={faEye} />
                </Button>
                <Button
                  color="danger"
                  size="sm"
                  onClick={() => handleDelete(departement._id)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              </div>
            </CardHeader>

            {(selectedDepartement?._id === departement._id ||
              filteredDepartements.length === 1) && (
              <CardBody>
                <Table bordered responsive hover>
                  <thead>
                    <tr>
                      <th>Salarié</th>
                      <th>Planning</th>
                      <th>Heure</th>
                      <th>Chauffeur</th>
                      <th>Destination</th>
                      <th>Plateau</th>
                      <th>Téléphone</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(departement.lignes) &&
                      departement.lignes.map((ligne, index) => (
                        <tr key={index}>
                          <td style={{ fontWeight: "bold" }}>
                            {ligne.salarie?.nom || "N/A"}
                          </td>
                          <td>{ligne.planning || "N/A"}</td>
                          <td>{ligne.heure || "N/A"}</td>
                          <td>{ligne.chauffeur || "N/A"}</td>
                          <td>{ligne.destination || "N/A"}</td>
                          <td>{ligne.plateau || "N/A"}</td>
                          <td>{ligne.num_tel || "N/A"}</td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
                <div
                  style={{ marginTop: 10, fontSize: "0.9em", color: "#6c757d" }}
                >
                  Créé le{" "}
                  {new Date(departement.createdAt).toLocaleString("fr-FR")}
                </div>
              </CardBody>
            )}
          </Card>
        ))
      ) : (
        <div style={{ textAlign: "center", padding: 50 }}>
          <FontAwesomeIcon icon={faBoxOpen} size="4x" color="#6c757d" />
          <br />
          <p style={{ marginTop: 20, fontSize: "1.2em" }}>
            {searchDate
              ? `Aucun départ trouvé pour la date ${formatDate(searchDate)}`
              : "Aucun départ enregistré"}
          </p>
        </div>
      )}
    </div>
  );
};

export default Recap;
