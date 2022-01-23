import { Table } from "reactstrap";
import { Link } from "react-router-dom";
const KisanTable = ({ kisans, term, type }) => {
  return (
    <div>
      <Table striped size="sm" className="mt-3">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Father's Name</th>
            <th>Phone Number</th>
            <th>Address</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {kisans
            .filter((kisan) => {
              if (type.toLowerCase() === "name") {
                return kisan.name.toLowerCase().includes(term.toLowerCase());
              } else if (type.toLowerCase() === "fathername") {
                return kisan.fatherName
                  .toLowerCase()
                  .includes(term.toLowerCase());
              } else {
                return kisan.phone.toString().includes(term);
              }
            })
            .map((kisan, index) => {
              return (
                <tr key={kisan._id}>
                  <th scope="row">{index + 1}</th>
                  <td className="capitalize">
                    <Link to={`kisanDetails/${kisan._id}`}>{kisan.name}</Link>
                  </td>
                  <td className="capitalize">{kisan.fatherName}</td>
                  <td>{kisan.phone}</td>
                  <td className="capitalize">{kisan.address}</td>
                  <td>
                    {kisan.balance < 0 ? (
                      <span class="text-danger">{kisan.balance}</span>
                    ) : (
                      <span class="text-primary">{kisan.balance}</span>
                    )}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </div>
  );
};

export default KisanTable;
