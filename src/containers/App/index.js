/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages.
 *
 */

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types'; 
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {EditorState} from 'draft-js';

import Editor from '../../components/Editor';
import { Layout, Menu, Icon, Input, Button } from 'antd';
import styles from './styles';

// action imports
import { searchNotes } from './actions';
import { makeSelectLoading, makeSelectNotes, makeSelectError } from './selectors';

const {
  Header, Content, Footer, Sider, 
} = Layout;
const { Search } = Input;
const ButtonGroup = Button.Group;

class App extends Component{

  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.props.dispatch(searchNotes());
  }

  handleAdd(e){

  }

  handleDelete(e){

  } 

  render(){
    const {notes} = this.props;
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
          // value={search ? search : null}
          // onSearch={val => this.handleFilter(val, 'search')}
          // onChange={(e) => this.setState({search : e.target.value})}
          // onPressEnter={e => this.handleFilter(e.target.value, 'search')}
          // enterButton
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
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['0']}>
          {notes.map(item => {
            return(
              <Menu.Item key={item.id}>
                <Icon type="snippets" />
                <span className="nav-text">nav {item.id}</span>
              </Menu.Item>
            )
          })}
        </Menu>
      </Sider>
      <Layout>
        <Header style={styles.Header}>
          <div style={styles.Title}>Fuzzy Notes</div>
        </Header>
        <Content style={{ margin: '24px 16px 0' }}>
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            <Editor/>
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
  error : makeSelectError()
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
)(App);
