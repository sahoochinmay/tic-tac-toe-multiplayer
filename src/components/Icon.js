import React from "react";
import { FiberManualRecordOutlined,Close,Create} from '@material-ui/icons'

const Icon = ({ name }) => {
  switch (name) {
    case "circle":
      return <FiberManualRecordOutlined className="icons" />;
    case "cross":
      return <Close className="icons" />;
    default:
      return <Create className="icons" />;
  }
};

export default Icon;
