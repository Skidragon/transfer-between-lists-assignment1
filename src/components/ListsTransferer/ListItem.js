import React from "react";

const ListItem = ({ id, name, isChecked }) => {
  return (
    <li className="list-item" id={id} checked={isChecked}>
      <label htmlFor={name} className="list-item__checkbox-label" />
      <input type="checkbox" name={name} id={name} defaultChecked={isChecked} />
      <p>{name}</p>
    </li>
  );
};

export default ListItem;
