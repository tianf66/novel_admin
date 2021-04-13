import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import './Layout.css';

/* Layout 路由配置 */

import {Route, Switch} from 'react-router-dom'
import DistributorConfig from '../Distributor/DistributorConfig.js';
import renderRoutes from "../../router/router";
/* Layout 路由配置 */

//侧边栏菜单
const menuList = [
    {title: '渠道管理', icon: 'pie-chart', path: '/distributorConfig'}
];

const { Header, Content, Footer, Sider } = Layout;

export default class LayoutView  extends React.Component {
    state = {
        collapsed: false,
        theme: 'dark',
        current: '1'
    };

    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
    };

    handlePage(path){
        this.props.history.push(path)
    }

    render() {
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                    <div className="logo">
                        <img src="//s.opfed.com/spider/logo.png" alt="logo"></img>
                    </div>
                    <Menu theme={this.state.theme} mode="inline">
                        {menuList.map((item, index) => (
                            <Menu.Item key={index} onClick={this.handlePage.bind(this, `${item.path}`)}>
                                <Icon type={item.icon} />
                                <span>{item.title}</span>
                                </Menu.Item>
                            ))
                        }
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#006666', padding: 0 }} />
                    <Content style={{ margin: '0 16px' }}>
                        {renderRoutes(this.props.route.routes)}
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>@2021 tianf</Footer>
                </Layout>
            </Layout>);
    }
}
