import React from "react";
import ListItem from "./ListItem";
const List = ({
  //state
  list,
  addItemText,
  addItemTextName,
  //methods
  addItem,
  changeInputTextHandler,
  updateItemProps,
}) => {
  return (
    <div>
      <ul
        className="transferer-list"
        onClick={e => {
          const { id, checked } = e.target;
          if (id) {
            updateItemProps(id, {
              isChecked: checked,
            });
          }
        }}>
        {list.map(item => {
          return <ListItem key={item.id} item={item} />;
        })}
      </ul>
      <input
        type="text"
        className="transferer-list__add-item-box"
        value={addItemText}
        name={addItemTextName}
        onChange={changeInputTextHandler}
        onKeyDown={e => {
          if (e.keyCode === 13) {
            addItem(e);
          }
        }}
      />
    </div>
  );
};

export default List;
