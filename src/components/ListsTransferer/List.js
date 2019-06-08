import React from "react";
import ListItem from "./ListItem";
const List = ({
  //state
  list,
  addItemText,
  //methods
  addItem,
  changeInputTextHandler,
  clearText,
}) => {
  return (
    <div>
      <ul
        className="transferer-list"
        onClick={e => {
          console.log(e.target.checked);
        }}>
        {list.map(item => {
          return <ListItem key={item.id} item={item} />;
        })}
      </ul>
      <input
        type="text"
        className="transferer-list__add-item-box"
        value={addItemText}
        name={"addItemText1"}
        onChange={changeInputTextHandler}
        onKeyDown={e => {
          if (e.keyCode === 13) {
            addItem(e.target.value);
            clearText(e);
          }
        }}
      />
    </div>
  );
};

export default List;
