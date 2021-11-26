import { useEffect } from "react";
import {
  Card,
  CardTitle,
  CardActions,
  IconButton,
  ImgIcon,
  Outputs,
} from "../../components";
import { moreIcon } from "../../assets/icons";

const BusinessBasicInfo = ({ setPageTitle }) => {
  useEffect(() => setPageTitle("Basic Info"));

  return (
    <Card>
      <CardTitle>Zippy Totz Pre-school Gymnastics</CardTitle>
      <CardActions>
        <IconButton>
          <ImgIcon>{moreIcon}</ImgIcon>
        </IconButton>
      </CardActions>
      <Outputs items={{ first: "first Item", second: "secondItem" }} />
    </Card>
  );
};

export default BusinessBasicInfo;
