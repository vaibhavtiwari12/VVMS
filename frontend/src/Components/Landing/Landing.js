import { useEffect } from "react";
import { FormattedMessage } from "react-intl";

const Landing = () => {
  useEffect(() => {
    document.title = "VVMS - Home";
  }, []);
  return (
    <div>
      <h1 className="text-center text-primary mt-4">
        <FormattedMessage id="welcomeMsg" />
      </h1>
      <h1 className="text-center text-primary mt-4">
        <FormattedMessage id="brandName" />
      </h1>
    </div>
  );
};

export default Landing;
