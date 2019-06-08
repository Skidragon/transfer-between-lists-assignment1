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
  clearText = stateName => {
    this.setState({ [stateName]: "" });
  };
  addItem = (listName, itemName) => {
    const list1 = this.state.list1.slice();
    const list2 = this.state.list2.slice();

    let itemExists = false;

    itemExists = list1.some(item => {
      return item.name === itemName;
    });
    if (itemExists) {
      return;
    }
    itemExists = list2.some(item => {
      return item.name === itemName;
    });
    if (itemExists) {
      return;
    }
    this.clearText(e.target.name);
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
  transferListItems = (fromListName, toListName) => {
    const fromList = this.state[fromListName].slice();
    const toList = this.state[toListName].slice();

    const itemsToTransfer = [];
    const newFromList = [];
    for (let i = 0; i < fromList.length; i++) {
      let item = fromList[i];
      if (item.isChecked) {
        itemsToTransfer.push({
          ...item,
          isChecked: false,
        });
      } else {
        newFromList.push(item);
      }
    }

    this.setState({
      [toListName]: [...itemsToTransfer, ...toList],
      [fromListName]: newFromList,
    });
  };
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
        />

        <div className="arrow-buttons">
          <button
            className="arrow-buttons__left-btn"
            onClick={() => {
              this.transferListItems("list2", "list1");
            }}>
            {"<"}
          </button>
          <button
            className="arrow-buttons__right-btn"
            onClick={() => {
              this.transferListItems("list1", "list2");
            }}>
            {">"}
          </button>
        </div>
        <List
          list={list2}
          addItemText={addItemText2}
          addItemTextName="addItemText2"
          addItem={this.addItem.bind(this, "list2")}
          changeInputTextHandler={this.changeInputTextHandler}
          updateItemProps={this.updateItemProps.bind(this, "list2")}
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
