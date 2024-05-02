import { useEffect, useState } from "react";
import { ButtonGroup, Input, Table } from "reactstrap";
import Voyant from "../../../@types/Voyant";
import { getVoyants } from "../../../actions/Voyant/action";
import VoyantAdd from "./VoyantAdd";
import VoyantDelete from "./VoyantDelete";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxOpen } from "@fortawesome/free-solid-svg-icons";

interface Props {}

const VoyantsTable = (props: Props) => {
  const [voyants, setVoyants] = useState<Voyant[]>([]);
  const [filter, setFilter] = useState<string>("");

  useEffect(() => {
    getVoyants(null, setVoyants);
  }, []);

  return (
    <div className="background-app">
      <div
        className="d-flex justify-content-between"
        style={{ paddingTop: 80, paddingLeft: 25, paddingRight: 25 }}
      >
        <h3 style={{ color: "white" }}>Tableau des Voyants</h3>
        <div className="">
          <Input
            type="text"
            placeholder="Chercher içi..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
        <VoyantAdd refresh={() => getVoyants(null, setVoyants)} />
      </div>
      <br />
      <div style={{ marginLeft: 50, marginRight: 50, paddingBottom: 420 }}>
        <Table bordered responsive hover>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Planning</th>
              <th>Heure</th>
              <th>Chauffeur</th>
              <th>Destination</th>
              <th style={{ textAlign: "center" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {voyants.length ? (
              voyants
                .filter((voyant) =>
                  voyant.nom.toLowerCase().includes(filter.toLowerCase())
                )
                .map((voyant) => (
                  <tr key={voyant._id}>
                    <td>{voyant.nom}</td>
                    <td>{voyant.planing}</td>
                    <td>{voyant.heure}</td>
                    <td>{voyant.chauffeur}</td>
                    <td>{voyant.destination}</td>
                    <td style={{ textAlign: "center" }}>
                      <ButtonGroup>
                        <VoyantDelete
                          voyant={voyant}
                          refresh={() => getVoyants(null, setVoyants)}
                        />
                      </ButtonGroup>
                    </td>
                  </tr>
                ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center">
                  <FontAwesomeIcon icon={faBoxOpen} size="4x" />
                  <br />
                  Pas des données...
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default VoyantsTable;
