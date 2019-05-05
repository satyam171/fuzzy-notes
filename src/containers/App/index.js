/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages.
 *
 */

import React from 'react';
import Editor from '../Editor';
import { Layout, Menu, Icon, Input } from 'antd';
import styles from './styles';

const {
  Header, Content, Footer, Sider, 
} = Layout;
const { Search } = Input;

export default function App() {
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
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
        <Menu.Item key="1">
          <Icon type="snippets" />
          <span className="nav-text">nav 1</span>
        </Menu.Item>
        <Menu.Item key="2">
          <Icon type="snippets" />
          <span className="nav-text">nav 2</span>
        </Menu.Item>
        <Menu.Item key="3">
          <Icon type="snippets" />
          <span className="nav-text">nav 3</span>
        </Menu.Item>
        <Menu.Item key="4">
          <Icon type="snippets" />
          <span className="nav-text">nav 4</span>
        </Menu.Item>
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
  );
}
