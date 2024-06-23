import { useState } from "react";

const ToggleAble = (props) => {
  const [visible, setVisible] = useState(false);

  const showWhenVisible = { display: visible ? "" : "none" };
  const hideWhenVisible = { display: visible ? "none" : "" };

  return (
    <>
      <div className="toggelable">
        <div style={hideWhenVisible}>
          <button onClick={() => setVisible(true)}>{props.buttonLabel}</button>
        </div>
        <div style={showWhenVisible}>
          {props.children}
          <button onClick={() => setVisible(false)}>Cancel</button>
        </div>
      </div>
    </>
  );
};

export default ToggleAble;
