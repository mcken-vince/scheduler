import React from "react";

import "components/Button.scss";
import { action } from "@storybook/addon-actions/dist/preview";

export default function Button(props) {
  let buttonClass = "button";

  if (props.confirm) {
    buttonClass += " button--confirm";
  }
  if (props.danger) {
    buttonClass += " button--danger";
  }

   return <button 
            disabled={props.disabled} 
            onClick={action("button-clicked")} 
            className={buttonClass}
          >
            {props.children}
          </button>;
}
