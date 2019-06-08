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

  render() {
    const { list1, addItemText1 } = this.state;
    return (
      <div className="lists-transferer-container">
        <List
          list={list1}
          addItemText={addItemText1}
          addItem={this.addItem.bind(this, "list1")}
          changeInputTextHandler={this.changeInputTextHandler}
          clearText={this.clearText}
        />
        <div className="arrow-buttons">
          <button className="arrow-buttons__left-btn">{"<"}</button>
          <button className="arrow-buttons__right-btn">{">"}</button>
        </div>
      </div>
    );
  }
}

export { ListsTransfererContainer };
