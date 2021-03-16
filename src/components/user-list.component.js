import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Items = props => (
  <tr>
    <td>{props.items.username}</td>
    <td>{props.items.item}</td>
    <td>{props.items.quantity}</td>
    <td>{props.items.date.substring(0,10)}</td>
    <td>
      <Link to={"/edit/"+props.items._id}>edit</Link> | <a href="#" onClick={() => { props.deleteItems(props.items._id) }}>delete</a>
    </td>
  </tr>
)

export default class UserList extends Component {
  constructor(props) {
    super(props);

    this.deleteItems = this.deleteItems.bind(this)

    this.state = {items: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/items/')
      .then(response => {
        this.setState({ items: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteItems(id) {
    axios.delete('http://localhost:5000/items/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      items: this.state.items.filter(el => el._id !== id)
    })
  }

  itemsList() {
    return this.state.items.map(currentitems => {
      return <Items items={currentitems} deleteitems={this.deleteitems} key={currentitems._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>Logged Users</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Item</th>
              <th>Quantity</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.itemsList() }
          </tbody>
        </table>
      </div>
    )
  }
}