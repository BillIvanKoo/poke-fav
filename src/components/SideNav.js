import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import MenuItem from 'material-ui/MenuItem';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'

class SideNav extends Component {
  constructor(props){
    super(props)
    this.state = {open: false};
  }
  
  handleToggle(){
    this.setState({open: !this.state.open});
  }
  
  activeUser(){
    if(this.props.activeUser.name !== undefined){
      return (<Link to={"/myfavorites"}><MenuItem>My PokeFavs</MenuItem></Link>)
    } else {
      return <div></div>
    }
  }
  
  render(){
    return(
      <div>
      <AppBar
      title="PokeFav"
      iconClassNameRight="muidocs-icon-navigation-expand-more"
      onLeftIconButtonTouchTap={()=>{this.handleToggle()}}
      style={{position: 'fixed', top: '0'}}
      />
      <Drawer width={200} open={this.state.open} >
        <AppBar title="Menu" iconElementLeft={<IconButton onTouchTap={()=>{this.handleToggle()}}><NavigationClose /></IconButton>}/>
        <Link to="/"><MenuItem>Home</MenuItem></Link>
        <Link to="/pokelist"><MenuItem>PokeList</MenuItem></Link>
        {this.activeUser()}
      </Drawer>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    activeUser: state.activeUser
  }
}

export default connect(mapStateToProps, null)(SideNav)