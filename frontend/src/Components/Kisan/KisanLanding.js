import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, Button } from "reactstrap";
import KisanSearch from "./KisanSearch/KisanSearch";
import KisanTable from "./KisanSearch/KisanTable";
import { getAllKisan } from "../../Utility/utility";
import { FormattedMessage } from "react-intl";

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
    document.title = "VVMS - Kisan";
    try {
      const fetchData = async () => {
        setKisans(await getAllKisan());
      };
      fetchData();
    } catch (e) {
      throw new Error("Something Went Wrong ", e);
    }
  }, []);
  return (
    <div className="mt-3">
      <Breadcrumb className="ps-3 mt-2">
        <BreadcrumbItem>
          <Link className="link-no-decoration-black text-primary" to="/">
            Home
          </Link>
        </BreadcrumbItem>
        <BreadcrumbItem active>Kisan</BreadcrumbItem>
      </Breadcrumb>
      <div className="d-flex">
        <h3 className="flex-fill d-flex justify-content-center">
          <FormattedMessage id="kisanLandingTitle" />
        </h3>
        <Button
          className="justify-content-end me-3"
          color="primary"
          onClick={handleAddKisanClick}
        >
          + <FormattedMessage id="addKisanButtonText" />
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
