import React, { Component } from "react";
import List from "./List";
import "./lists-transferer.scss";
import uuidv1 from "uuid/v1";
import { mockList1, mockList2 } from "./lib/mock-data/mock-lists";
class ListsTransfererContainer extends Component {
  state = {
    list1: [],
    addItemText1: "",
    list2: [],
    addItemText2: "",
  };
  componentDidMount() {
    this.setState({
      list1: mockList1,
      list2: mockList2,
    });
  }
  changeInputTextHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  clearText = e => {
    this.setState({ [e.target.name]: "" });
  };
  addItem = (listName, itemName) => {
    const item = {
      id: uuidv1(),
      name: itemName,
      isChecked: false,
    };
    const list = this.state[listName].slice();
    this.setState({ [listName]: [...list, item] });
  };
  deleteItems = listName => {
    const list = this.state[listName].slice();
    this.setState({
      [listName]: list.filter(item => item.isChecked === false),
    });
  };
  transferListItems = (fromListName, toListName) => {};
  updateItemProps = (listName, itemId, updateProps) => {
    const list = this.state[listName].slice();
    const itemIndex = list.findIndex(item => {
      return item.id === itemId;
    });
    const updatedItem = {
      ...list[itemIndex],
      ...updateProps,
    };

    this.setState({
      [listName]: [
        ...list.slice(0, itemIndex),
        updatedItem,
        ...list.slice(itemIndex + 1),
      ],
    });
  };

  render() {
    const { list1, addItemText1, list2, addItemText2 } = this.state;
    return (
      <div className="lists-transferer-container">
        <button
          onClick={() => {
            this.deleteItems("list1");
          }}>
          Delete
        </button>
        <List
          list={list1}
          addItemText={addItemText1}
          addItemTextName="addItemText1"
          addItem={this.addItem.bind(this, "list1")}
          changeInputTextHandler={this.changeInputTextHandler}
          updateItemProps={this.updateItemProps.bind(this, "list1")}
          clearText={this.clearText}
        />

        <div className="arrow-buttons">
          <button className="arrow-buttons__left-btn">{"<"}</button>
          <button className="arrow-buttons__right-btn">{">"}</button>
        </div>
        <List
          list={list2}
          addItemText={addItemText2}
          addItemTextName="addItemText2"
          addItem={this.addItem.bind(this, "list2")}
          changeInputTextHandler={this.changeInputTextHandler}
          updateItemProps={this.updateItemProps.bind(this, "list2")}
          clearText={this.clearText}
        />
        <button
          onClick={() => {
            this.deleteItems("list2");
          }}>
          Delete
        </button>
      </div>
    );
  }
}

export { ListsTransfererContainer };
