import { useEffect, useState } from "react";
import {
  Table,
  Button,
  Input,
  Alert,
  Card,
  CardHeader,
  CardBody,
  Badge,
} from "reactstrap";
import Departement from "../../@types/Departement";
import Ramassage from "../../@types/Ramassage";
import {
  getDepartements,
  getDepartementsByDate,
  deleteDepartement,
} from "../../actions/Departement/action";
import {
  getRamassages,
  getRamassagesByDate,
  deleteRamassage,
} from "../../actions/Ramassage/action";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faSearch,
  faTrash,
  faEye,
  faBoxOpen,
  faCar,
  faHome,
} from "@fortawesome/free-solid-svg-icons";

interface DayStats {
  date: string;
  departCount: number;
  ramassageCount: number;
  totalSalaries: number;
}

const Recap = () => {
  const [departements, setDepartements] = useState<Departement[]>([]);
  const [ramassages, setRamassages] = useState<Ramassage[]>([]);
  const [searchDate, setSearchDate] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<{
    type: string;
    id: string;
  } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [dayStats, setDayStats] = useState<DayStats[]>([]);

  useEffect(() => {
    setDepartements([]);
    setRamassages([]);

    // Charger les deux types de données
    Promise.all([
      new Promise<void>((resolve) =>
        getDepartements((data) => {
          setDepartements(data);
          resolve();
        })
      ),
      new Promise<void>((resolve) =>
        getRamassages((data) => {
          setRamassages(data);
          resolve();
        })
      ),
    ]).then(() => {
      setLoading(false);
    });
  }, []);

  // Calculer les statistiques par jour
  useEffect(() => {
    const allDates = new Set([
      ...departements.map((d) => d.date),
      ...ramassages.map((r) => r.date),
    ]);

    const stats: DayStats[] = Array.from(allDates).map((date) => {
      const departForDate = departements.filter((d) => d.date === date);
      const ramassageForDate = ramassages.filter((r) => r.date === date);

      const departCount = departForDate.length;
      const ramassageCount = ramassageForDate.length;
      const totalSalaries =
        departForDate.reduce(
          (total, dep) => total + (dep.lignes?.length || 0),
          0
        ) +
        ramassageForDate.reduce(
          (total, ram) => total + (ram.lignes?.length || 0),
          0
        );

      return { date, departCount, ramassageCount, totalSalaries };
    });

    // Trier par date (du plus récent au plus ancien)
    stats.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    setDayStats(stats);
  }, [departements, ramassages]);

  const handleSearch = () => {
    if (searchDate) {
      setLoading(true);
      Promise.all([
        new Promise<void>((resolve) =>
          getDepartementsByDate(searchDate, (data) => {
            setDepartements(data);
            resolve();
          })
        ),
        new Promise<void>((resolve) =>
          getRamassagesByDate(searchDate, (data) => {
            setRamassages(data);
            resolve();
          })
        ),
      ]).then(() => {
        setLoading(false);
      });
    } else {
      // Recharger tout
      setLoading(true);
      Promise.all([
        new Promise<void>((resolve) =>
          getDepartements((data) => {
            setDepartements(data);
            resolve();
          })
        ),
        new Promise<void>((resolve) =>
          getRamassages((data) => {
            setRamassages(data);
            resolve();
          })
        ),
      ]).then(() => {
        setLoading(false);
      });
    }
  };

  const handleSearchAll = () => {
    setSearchDate("");
    setLoading(true);
    Promise.all([
      new Promise<void>((resolve) =>
        getDepartements((data) => {
          setDepartements(data);
          resolve();
        })
      ),
      new Promise<void>((resolve) =>
        getRamassages((data) => {
          setRamassages(data);
          resolve();
        })
      ),
    ]).then(() => {
      setLoading(false);
    });
  };

  const handleDelete = (type: string, id: string) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer ce ${type} ?`)) {
      if (type === "depart") {
        deleteDepartement(id, () => {
          setDepartements(departements.filter((dep) => dep._id !== id));
          setMessage("Départ supprimé avec succès");
          setTimeout(() => setMessage(null), 3000);
        });
      } else {
        deleteRamassage(id, () => {
          setRamassages(ramassages.filter((ram) => ram._id !== id));
          setMessage("Ramassage supprimé avec succès");
          setTimeout(() => setMessage(null), 3000);
        });
      }
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

  // Fusionner et trier tous les éléments par date
  const allItems = [
    ...departements.map((item) => ({ ...item, type: "depart" as const })),
    ...ramassages.map((item) => ({ ...item, type: "ramassage" as const })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

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
        Récapitulatif Général
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

      {/* Statistiques par jour */}
      <Card style={{ marginBottom: 30 }}>
        <CardHeader style={{ backgroundColor: "#f8f9fa" }}>
          <h5 style={{ margin: 0 }}>Statistiques par Jour</h5>
        </CardHeader>
        <CardBody>
          <Table bordered>
            <thead>
              <tr>
                <th>Date</th>
                <th>Départs</th>
                <th>Ramassages</th>
                <th>Total Salariés</th>
              </tr>
            </thead>
            <tbody>
              {dayStats.map((stat, index) => (
                <tr key={index}>
                  <td style={{ fontWeight: "bold" }}>
                    {formatDate(stat.date)}
                  </td>
                  <td>
                    <Badge color="primary" style={{ fontSize: "1em" }}>
                      {stat.departCount}
                    </Badge>
                  </td>
                  <td>
                    <Badge color="success" style={{ fontSize: "1em" }}>
                      {stat.ramassageCount}
                    </Badge>
                  </td>
                  <td>
                    <Badge color="info" style={{ fontSize: "1em" }}>
                      {stat.totalSalaries}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>

      {/* Liste unifiée des départs et ramassages */}
      {allItems.length > 0 ? (
        allItems.map((item) => (
          <Card
            key={`${item.type}-${item._id}`}
            style={{ marginBottom: 30, border: "1px solid #dee2e6" }}
          >
            <CardHeader
              style={{
                backgroundColor: item.type === "depart" ? "#e3f2fd" : "#e8f5e8",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <FontAwesomeIcon
                  icon={item.type === "depart" ? faCar : faHome}
                  color={item.type === "depart" ? "#0d6efd" : "#198754"}
                />
                <Badge color={item.type === "depart" ? "primary" : "success"}>
                  {item.type === "depart" ? "DÉPART" : "RAMASSAGE"}
                </Badge>
                <h5 style={{ margin: 0 }}>
                  {item.type === "depart" ? "Départ" : "Ramassage"} du{" "}
                  {formatDate(item.date)}
                </h5>
              </div>
              <div>
                <Button
                  color="info"
                  size="sm"
                  onClick={() =>
                    setSelectedItem(
                      selectedItem?.id === item._id &&
                        selectedItem?.type === item.type
                        ? null
                        : { type: item.type, id: item._id }
                    )
                  }
                  style={{ marginRight: 10 }}
                >
                  <FontAwesomeIcon icon={faEye} />
                </Button>
                <Button
                  color="danger"
                  size="sm"
                  onClick={() => handleDelete(item.type, item._id)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              </div>
            </CardHeader>

            {selectedItem?.id === item._id &&
              selectedItem?.type === item.type && (
                <CardBody>
                  <Table bordered responsive hover>
                    <thead>
                      <tr>
                        <th>Salarié</th>
                        <th>Planning Voyant</th>
                        <th>
                          Heure{" "}
                          {item.type === "depart" ? "Départ" : "Ramassage"}
                        </th>
                        <th>Chauffeur</th>
                        <th>Destination</th>
                        <th>Plateau</th>
                        <th>Téléphone</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array.isArray(item.lignes) &&
                        item.lignes.map((ligne, index) => (
                          <tr key={index}>
                            <td style={{ fontWeight: "bold" }}>
                              {ligne.salarie?.nom || "N/A"}
                            </td>
                            <td>{ligne.salarie?.planing || "N/A"}</td>
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
                    style={{
                      marginTop: 10,
                      fontSize: "0.9em",
                      color: "#6c757d",
                    }}
                  >
                    Créé le {new Date(item.createdAt).toLocaleString("fr-FR")}
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
              ? `Aucune donnée trouvée pour la date ${formatDate(searchDate)}`
              : "Aucune donnée enregistrée"}
          </p>
        </div>
      )}
    </div>
  );
};

export default Recap;
