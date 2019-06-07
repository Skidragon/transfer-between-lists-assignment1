import React, { Component } from "react";
import List from "./List";

class ListsTransfererContainer extends Component {
  state = {
    items1: [],
    items2: [],
  };

  render() {
    const { items1, items2 } = this.state;
    return (
      <div className="lists-transferer-container">
        <List items={items1} />
        <div className="arrow-buttons">
          <button className="arrow-buttons__left-btn">{"<"}</button>
          <button className="arrow-buttons__right-btn">{">"}</button>
        </div>
        <List items={items2} />
      </div>
    );
  }
}

export { ListsTransfererContainer };
