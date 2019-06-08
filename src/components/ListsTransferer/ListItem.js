import React from "react";

const ListItem = ({ id, name }) => {
  return (
    <li className="list-item" id={id}>
      <input type="checkbox" />
      <p>{name}</p>
    </li>
  );
};

export default ListItem;
