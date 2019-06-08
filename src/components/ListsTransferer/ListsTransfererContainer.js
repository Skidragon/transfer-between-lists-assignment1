import React, { Component } from "react";
import List from "./List";
import "./lists-transferer.scss";
import uuidv4 from "uuid/v4";
class ListsTransfererContainer extends Component {
  state = {
    list1: [],
    list2: [],
  };

  addItem = (listName, itemName) => {
    const item = {
      id: uuidv4(),
      name: itemName,
    };
    const list = this.state[listName].slice();
    this.setState({ [listName]: [...list, item] });
  };

  render() {
    const { list1, list2 } = this.state;
    return (
      <div className="lists-transferer-container">
        <List list={list1} addItem={this.addItem.bind(this, "list1")} />
        <div className="arrow-buttons">
          <button className="arrow-buttons__left-btn">{"<"}</button>
          <button className="arrow-buttons__right-btn">{">"}</button>
        </div>
      </div>
    );
  }
}

export { ListsTransfererContainer };
