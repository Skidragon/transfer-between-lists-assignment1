import React from "react";
import ListItem from "./ListItem";
const List = ({ list, addItem }) => {
  return (
    <div>
      <ul className="transferer-list">
        {list.map(item => {
          return (
            <ListItem key={item.id} id={item.id}>
              {item.name}
            </ListItem>
          );
        })}
      </ul>
      <input
        type="text"
        onKeyDown={e => {
          if (e.keyCode === 13) {
            addItem(e.target.value);
          }
        }}
      />
    </div>
  );
};

export default List;
