import React from "react";
import ListItem from "./ListItem";
const List = ({ list, addItem }) => {
  return (
    <div>
      <ul className="transferer-list">
        {list.map(item => {
          return <ListItem key={item.id} id={item.id} name={item.name} />;
        })}
      </ul>
      <input
        type="text"
        className="transferer-list__add-item-box"
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
