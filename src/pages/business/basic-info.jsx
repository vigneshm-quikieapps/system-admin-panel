import {
  Card,
  CardTitle,
  CardActions,
  IconButton,
  ImgIcon,
  Outputs,
} from "../../components";
import { moreIcon } from "../../assets/icons";

const BusinessBasicInfo = () => (
  <Card>
    <CardTitle>Card Title</CardTitle>
    <CardActions>
      <IconButton>
        <ImgIcon>{moreIcon}</ImgIcon>
      </IconButton>
    </CardActions>
    <Outputs items={{ first: "first Item", second: "secondItem" }} />
  </Card>
);

export default BusinessBasicInfo;
