import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class EditUser extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeItem = this.onChangeItem.bind(this);
    this.onChangeQuantity = this.onChangeQuantity.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      item: '',
      quantity: 1,
      date: new Date(),
      users: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/items/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          username: response.data.username,
          item: response.data.item,
          quantity: response.data.quantity,
          date: new Date(response.data.date)
        })   
      })
      .catch(function (error) {
        console.log(error);
      })

    axios.get('http://localhost:5000/users/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map(user => user.username),
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }

  onChangeItem(e) {
    this.setState({
      item: e.target.value
    })
  }

  onChangeQuantity(e) {
    this.setState({
      quantity: e.target.value
    })
  }

  onChangeDate(date) {
    this.setState({
      date: date
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const items = {
      username: this.state.username,
      item: this.state.item,
      quantity: this.state.quantity,
      date: this.state.date
    }

    console.log(items);

    axios.post('http://localhost:5000/items/update/' + this.props.match.params.id, items)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
    <div>
      <h3>Edit User Log</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Username: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}>
              {
                this.state.users.map(function(user) {
                  return <option 
                    key={user}
                    value={user}>{user}
                    </option>;
                })
              }
          </select>
        </div>
        <div className="form-group"> 
          <label>Item: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.item}
              onChange={this.onChangeItem}
              />
        </div>
        <div className="form-group">
          <label>Quantity (in Kilos): </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.quantity}
              onChange={this.onChangeQuantity}
              />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Edit User Log" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}