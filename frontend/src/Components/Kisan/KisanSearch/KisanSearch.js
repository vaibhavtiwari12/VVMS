import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import useSearch from "./useSearch";
const KisanSearch = ({ setSearchTermChange, setSearchTermType }) => {
  const {
    handleChange,
    handleSubmit,
    handleSelectChange,
    searchType,
    searchTerm,
    handleReset,
  } = useSearch(setSearchTermChange, setSearchTermType);
  return (
    <div className="mx-3 mt-3 shadow px-3 py-4">
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="searchType">Search By:</Label>
          <Input
            type="select"
            name="select"
            id="searchType"
            value={
              searchType === "Name" || searchType === ""
                ? "Name"
                : searchType === "fatherName"
                ? "fatherName"
                : "phone"
            }
            onChange={(e) => handleSelectChange(e)}
          >
            <option value="Name">Name</option>
            <option value="fatherName">Father's Name</option>
            <option value="phone">Phone</option>
          </Input>
        </FormGroup>
        <FormGroup className="mt-2">
          <Label for="search">Search Kisan</Label>
          <Input
            name="search"
            onChange={(e) => handleChange(e)}
            value={searchTerm}
          />
        </FormGroup>
        <FormGroup inline>
          <Button size="md" color="primary" className="mt-3" type="submit">
            Submit
          </Button>
          <Button
            size="md"
            color="primary"
            onClick={handleReset}
            className="mt-3 ms-2"
          >
            Reset
          </Button>
        </FormGroup>
      </Form>
    </div>
  );
};
export default KisanSearch;
