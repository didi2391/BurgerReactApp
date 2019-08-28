import React from "react";

import Aux from "../../hoc/Auxiliary";
import Classes from "./Layout.module.css";

const layout = props => (
  <Aux>
    <div>ToolBar , SideDrawer, BackDrop</div>

    <main className={Classes.Content}>{props.children}</main>
  </Aux>
);

export default layout;
