import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { Card, CardTitle, Outputs } from "../../components";
import { toPascal } from "../../utils";
import { useBusinessInfoQuery } from "../../services/business-services";

const BusinessBasicInfo = ({ setPageTitle }) => {
  useEffect(() => setPageTitle("Basic Info"));
  const { id } = useParams();
  const { data } = useBusinessInfoQuery(id);
  console.log("data", data);

  const {
    business: {
      name,
      code,
      tradename,
      type,
      status,
      line1,
      contactName,
      contactEmail,
      primaryMobileNo,
      primaryPhone,
      about,
    },
  } = data;
  const items = {
    "Business Registered Name": toPascal(name),
    "Business Code": code,
    "Business Trade Name": toPascal(tradename),
    "Business Type": toPascal(type),
    Status: status,
    "Primary Contact Name": toPascal(contactName),
    "Primary Contact Email": toPascal(contactEmail),
    "Primary Contact Telephone": primaryPhone,
    "Primary Contact Mobile": primaryMobileNo,
    About: toPascal(about),
    Address: toPascal(line1),
  };

  return (
    <Card>
      <CardTitle>{toPascal(name)}</CardTitle>
      <Outputs items={items} columnCount={4} />
    </Card>
  );
};

export default BusinessBasicInfo;
