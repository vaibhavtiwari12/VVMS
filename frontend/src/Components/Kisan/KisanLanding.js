import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "reactstrap";
import KisanSearch from "./KisanSearch/KisanSearch";
import KisanTable from "./KisanSearch/KisanTable";
import { getAllKisan } from "../../Utility/utility";
const KisanLanding = () => {
  const history = useHistory();
  const handleAddKisanClick = () => {
    history.push("/addKisan");
  };
  const [kisans, setKisans] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("Name");
  const handleSearchTermChange = (term) => {
    console.log("Term Changed", term);
    setSearchTerm(term);
  };
  const handleSearchTypeChange = (type) => {
    console.log("Type Changed", type);
    setSearchType(type);
  };
  useEffect(() => {
    try {
      const fetchData = async () => {
        setKisans(await getAllKisan());
      };
      fetchData();
    } catch (e) {
      throw new Error("Something Went Wrong ", e);
    }
  }, []);
  useEffect(() => {
    console.log("kisans", kisans);
  }, [kisans]);
  return (
    <div className="mt-3">
      <div className="d-flex">
        <h3 className="flex-fill d-flex justify-content-center">
          Kisan Landing
        </h3>
        <Button
          className="justify-content-end me-3"
          color="primary"
          onClick={handleAddKisanClick}
        >
          + Add Kisan
        </Button>
      </div>
      {/* <AddKisan></AddKisan> */}
      <KisanSearch
        setSearchTermChange={handleSearchTermChange}
        setSearchTermType={handleSearchTypeChange}
      ></KisanSearch>
      <KisanTable
        kisans={kisans}
        term={searchTerm}
        type={searchType}
      ></KisanTable>
    </div>
  );
};
export default KisanLanding;
