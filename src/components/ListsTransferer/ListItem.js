import React from "react";

const ListItem = props => {
  const { id, name, isChecked } = props.item;
  return (
    <li className="list-item" checked={isChecked}>
      <label htmlFor={id} className="list-item__checkbox-label" />
      <input
        type="checkbox"
        name={id}
        id={id}
        className={"list-item__checkbox"}
        defaultChecked={isChecked}
      />
      <p>{name}</p>
    </li>
  );
};

export default ListItem;
