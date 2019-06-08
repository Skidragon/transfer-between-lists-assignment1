import React from "react";

const ListItem = ({ id, name }) => {
  return (
    <li className="list-item" id={id}>
      <div>
        <input type="checkbox" />
        <p>{name}</p>
      </div>
    </li>
  );
};

export default ListItem;
