import React, { Component } from 'react';
import FontIcon from 'material-ui/FontIcon';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';

import { changeActiveUser, addUser, fetchUsers } from '../actions'

class BottomBar extends Component {
  constructor(props){
    super(props)
    this.state = {
      selectedIndex: 0,
      open: false,
      open2: false,
      name: '',
      selectedUser: {},
    };
  }
  
  componentDidMount() {
    this.props.fetchUsers()
  }

  select (index) {
    this.setState({selectedIndex: index});
  }
  
  handleOpen() {
    this.setState({open: true});
    this.select(0)
  };

  handleClose() {
    this.setState({open: false});
  };
  
  handleOpen2() {
    this.setState({open2: true});
    this.select(1)
  };

  handleClose2() {
    this.setState({open2: false});
  };
  
  addUser() {
    this.handleClose2()
    if (this.state.name !== ''){
      this.props.addUser(this.state.name);
      this.setState({name: ''})
    }
  }
  
  handleChange(e, key, value) {
    this.setState({selectedUser: value})
  }
  
  handleType(e) {
    this.setState({name: e.target.value})
  }
  
  activateUser() {
    this.handleClose()
    this.props.changeActiveUser(this.state.selectedUser)
  }
  
  activeUser() {
    if(this.props.activeUser.name === undefined){
      return 'Choose User'
    } else {
      return 'Welcome ' + this.props.activeUser.name
    }
  }
  
  render() {
    return(
      <div>
        <Paper zDepth={1} style={{position: 'fixed', bottom: '0', width: '100%', zIndex: '50'}}>
          <BottomNavigation selectedIndex={this.state.selectedIndex}>
            <BottomNavigationItem
              label={this.activeUser()}
              icon={<FontIcon className="material-icons">account_circle</FontIcon>}
              onTouchTap={() => this.handleOpen()}
            />
            <BottomNavigationItem
              label="Add New User"
              icon={<FontIcon className="material-icons">add</FontIcon>}
              onTouchTap={() => this.handleOpen2()}
              style={{zIndex: 50}}
            />
          </BottomNavigation>
        </Paper>
        <Dialog
          title="Select Active User"
          actions={<FlatButton
            label="Ok"
            primary={true}
            keyboardFocused={true}
            onTouchTap={()=>{this.activateUser()}}
          />}
          modal={false}
          open={this.state.open}
          onRequestClose={()=>{this.handleClose()}}
        >
        <SelectField
          floatingLabelText="Users"
          value={this.state.selectedUser}
          onChange={(e, key, value)=>{this.handleChange(e, key, value)}}
        >
        {this.props.users.map(user=>
          <MenuItem value={user} key={user.id} primaryText={user.name} />
        )}
        </SelectField>
        </Dialog>
        <Dialog
          title="Add User"
          actions={<FlatButton
            label="Submit"
            primary={true}
            keyboardFocused={true}
            onTouchTap={()=>{this.addUser()}}
          />}
          modal={false}
          open={this.state.open2}
          onRequestClose={()=>{this.handleClose2()}}
        >
        <TextField
          onChange={(e)=>this.handleType(e)}
          value={this.state.name}
          hintText="Name"
        /><br />
        </Dialog>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    activeUser: state.activeUser,
    users: state.users
  }
}

const mapDispatchToProps = (dispatch) => {
  return ({
    changeActiveUser: (user) => {
      return dispatch(changeActiveUser(user))
    },
    addUser: (name) => {
      return dispatch(addUser(name))
    },
    fetchUsers: () => {
      return dispatch(fetchUsers())
    }
  })
}

export default connect(mapStateToProps,mapDispatchToProps)(BottomBar)