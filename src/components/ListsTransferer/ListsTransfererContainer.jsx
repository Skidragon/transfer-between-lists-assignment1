import React, { Component } from "react";
import List from "./List";
import "./lists-transferer.scss";
import { mockList1, mockList2 } from "./lib/mock-data/mock-lists";
import { withStatusManager } from "../../modifier-components/withStatusManager";
import { Item } from "./lib/classes/Item";
class ListsTransfererContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list1: [],
      addItemText1: "",
      list2: [],
      addItemText2: "",
    };
    this.dragColor = "#8080802f";
    this.beforeUnload = () => {
      window.localStorage.setItem("addItemText1", this.state.addItemText1);
      window.localStorage.setItem("addItemText2", this.state.addItemText2);
    };
  }

  componentDidMount() {
    this.setState({
      list1: mockList1,
      list2: mockList2,
      //TODO: Because there could be 2 ListsTransfererContainer
      //having a unique local storage key for each one would need to be implemented
      addItemText1: window.localStorage.getItem("addItemText1") || "",
      addItemText2: window.localStorage.getItem("addItemText2") || "",
    });
    window.addEventListener("beforeunload", this.beforeUnload);
  }
  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.beforeUnload);
  }
  changeInputTextHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  clearText = stateName => {
    this.setState({ [stateName]: "" });
  };
  addItem = (listName, e) => {
    const itemName = e.target.value;
    const { errorOccurred } = this.props.statusManager;
    if (itemName === "") {
      errorOccurred("Sorry, can't add a blank item name.");
      return;
    }
    //Checks every list if item exists
    let itemExists = false;
    let listNum = 1;
    while (this.state[`list${listNum}`]) {
      itemExists = this.state[`list${listNum}`].some(item => {
        return itemName.toLowerCase() === item.name.toLowerCase();
      });
      if (itemExists) {
        errorOccurred(
          `Sorry, item with the name of ${itemName} exists in one of the lists.`,
        );
        return;
      }
      listNum++;
    }
    this.clearText(e.target.name);
    const item = new Item({ isChecked: false, name: itemName });

    const list = this.state[listName].slice();
    this.setState({ [listName]: [...list, item], hasError: false });
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
  transferListItemByDrag = e => {
    //origin
    const itemId = e.dataTransfer.getData("item_id");
    const originListId = e.dataTransfer.getData("origin_list_id");
    const originList = this.state[originListId];

    //destination
    const itemName = e.dataTransfer.getData("item_name");

    const item = new Item({ isChecked: false, name: itemName });

    if (e.target.nodeName === "UL") {
      let dropzoneId = e.target.id;
      const dropzoneList = this.state[dropzoneId];
      if (originListId === dropzoneId) {
        return;
      }
      this.setState({
        [dropzoneId]: [...dropzoneList, item],
        [originListId]: originList.filter(item => item.id !== itemId),
      });
    } else if (e.target.nodeName === "LABEL") {
      let dropzoneId = e.target.parentNode.parentNode.id;
      const dropzoneList = this.state[dropzoneId];
      if (originListId === dropzoneId) {
        return;
      }
      const dropzoneItemId = e.target.control.id;
      const dropzoneItemIndex = dropzoneList.findIndex(item => {
        return item.id === dropzoneItemId;
      });

      this.setState({
        [originListId]: originList.filter(item => item.id !== itemId),
        [dropzoneId]: [
          ...dropzoneList.slice(0, dropzoneItemIndex + 1),
          item,
          ...dropzoneList.slice(dropzoneItemIndex + 1),
        ],
      });
    }
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
    const { hasError, errorMsg } = this.props.statusManager;
    return (
      <div
        className="lists-transferer-container"
        onDragStart={e => {
          e.target.style.opacity = 0.4;
          e.dataTransfer.setData("item_name", e.target.dataset.itemName);
          e.dataTransfer.setData(
            "origin_list_id",
            e.target.dataset.originListId,
          );
          e.dataTransfer.setData("item_id", e.target.dataset.itemId);
        }}
        onDragEnd={e => {
          e.target.style.opacity = 1;
        }}
        onDragOver={e => {
          e.preventDefault();
        }}
        onDrop={e => {
          this.transferListItemByDrag(e);
          e.target.style.background = "initial";
        }}
        onDragEnter={e => {
          const { nodeName } = e.target;
          if (nodeName === "UL" || nodeName === "LABEL") {
            e.target.style.background = this.dragColor;
          }
        }}
        onDragLeave={e => {
          e.target.style.background = "initial";
        }}>
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
          listID="list1"
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
          listID="list2"
        />
        <button
          onClick={() => {
            this.deleteItems("list2");
          }}>
          Delete
        </button>
        {hasError && <p>{errorMsg}</p>}
      </div>
    );
  }
}
const ListsTransfererContainerWithMods = withStatusManager(
  ListsTransfererContainer,
);

export { ListsTransfererContainerWithMods as ListsTransfererContainer };
