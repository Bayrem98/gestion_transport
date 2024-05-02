import { Table } from "reactstrap";

const Home = () => {
  return (
    <>
      <div className="">
        <Table bordered responsive hover>
          <thead>
            <tr>
              <th>Voyant</th>
              <th>Planning</th>
              <th>Heure</th>
              <th>Chauffeur</th>
              <th>Destination</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Oscar</td>
              <td>17h-2h</td>
              <td>00H</td>
              <td>Adel</td>
              <td>Hay Riyadh</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </>
  );
};
export default Home;
