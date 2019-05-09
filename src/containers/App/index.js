/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages.
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types'; 
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {EditorState, convertToRaw} from 'draft-js';

import Editor from '../../components/Editor';
import { Layout, Menu, Icon, Input, Button } from 'antd';
import styles from './styles';

// action imports
import { 
  searchNotes, 
  addNote, 
  deleteNote, 
  changeSelected, 
  changeEditorState ,
  saveNote
} from './actions';
import { 
  makeSelectLoading, 
  makeSelectNotes, 
  makeSelectError, 
  makeSelectSelected 
} from './selectors';

const {
  Header, Content, Footer, Sider, 
} = Layout;
const { Search } = Input;
const ButtonGroup = Button.Group;

class App extends Component{

  constructor(props){
    super(props);
    this.state = {search : ''}
    this.handleAdd = this.handleAdd.bind(this); 
    this.handleDelete = this.handleDelete.bind(this); 
    this.handleSelect = this.handleSelect.bind(this); 
  }

  componentDidMount(){
    // call the request with empty string
    this.props.dispatch(searchNotes(this.state.search));
  }

  handleSearch(searchText){
    // contains the search text
    this.props.dispatch(searchNotes(searchText))
  }

  handleSelect(items){
    const {notes} = this.props; 
    let index = 0;
    notes.forEach((note,i) => {
      if(note.id === Number(items.selectedKeys[0])) index = i; 
    })
    this.props.dispatch(changeSelected(items.selectedKeys, index)); 
  }

  handleAdd(e){
    // creating the empty state
    let emptyFirstState = {
      title : '', 
      text  : convertToRaw(EditorState.createEmpty().getCurrentContent())
    }
    this.props.dispatch(addNote(emptyFirstState)); 
  }

  handleDelete(e){
    // send the key of the currently selected note to the action
    this.props.dispatch(deleteNote(this.props.selected.keys[0])); 
    this.setState({search : ''})
  }
  
  renderMenuList(){
    const {loading, notes, selected, error} = this.props;  
    if(loading) return <div style={styles.AddButtonGroup}>Loading...</div>
    if(error) return <div style={styles.AddButtonGroup}>Error occured !</div>
    if(notes.length){
      return (
        <Menu 
          theme="dark" 
          mode="inline" 
          selectedKeys={selected.keys} 
          onSelect={this.handleSelect}
          style={styles.Menu}
        >
          {notes.map(item=>{
            return(
                <Menu.Item key={item.id}>
                  <Icon type="snippets" />
                  <span className="nav-text">{item.id} - {item.title}</span>
                </Menu.Item>
            )
          })}
        </Menu>
      ) 
    }
  }

  render(){
    const {notes, selected : {index}} = this.props; 
    return (
      <Layout style={styles.Layout}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => { console.log(broken); }}
        onCollapse={(collapsed, type) => { console.log(collapsed, type); }}
      >
        <Search
          placeholder="Search Notes"
          value={this.state.search ? this.state.search : ''}
          onSearch={val => this.handleSearch(val)}
          onChange={(e) => this.setState({search : e.target.value})}
          onPressEnter={e => this.handleSearch(e.target.value)}
          enterButton
          style={styles.Search}
        />
        <ButtonGroup style={styles.AddButtonGroup}>
            <Button onClick={this.handleAdd} type="primary" style={styles.AddButton}>
              ADD <Icon type="plus" />
            </Button>
            <Button onClick={this.handleDelete} type="primary" style={styles.SubtractButton}>
              DELETE <Icon type="minus" />
            </Button>
        </ButtonGroup>
          {this.renderMenuList()}
      </Sider>
      <Layout>
        <Header style={styles.Header}>
          <div style={styles.Title}>Fuzzy Notes</div>
        </Header>
        <Content style={{ margin: '24px 16px 0' }}>
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            <Editor 
              index={index} 
              notes={notes}
              selected={this.props.selected}
              dispatch={this.props.dispatch} 
              changeEditorState={this.props.changeEditorState}
              saveNote={this.props.saveNote}
            />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
    )
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loading : makeSelectLoading(), 
  notes : makeSelectNotes(), 
  selected : makeSelectSelected(), 
  error : makeSelectError()
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    changeEditorState,
    saveNote
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
)(App);
