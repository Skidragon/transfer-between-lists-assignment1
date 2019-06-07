import React from "react";
import ListItem from "./ListItem";
const List = ({ items }) => {
  return (
    <ul className="transferer-list">
      {items.map(item => {
        return (
          <ListItem key={item.id} id={item.id}>
            {item.name}
          </ListItem>
        );
      })}
    </ul>
  );
};

export default List;
