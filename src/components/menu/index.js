import React from 'react'
import './index.less'
import {Menu, Icon} from "antd";
import {NavLink} from 'react-router-dom'
import {switchMenu} from '../../redux/action'
import Store from '../../redux/store'
import MenuConfig from './menuConfig'
const SubMenu = Menu.SubMenu;

export default class Menus extends React.Component{
    state = {
        curSelectedMenuKey:[],

    }
    componentDidMount() {

    }

    componentWillMount(){
        let curSelectedMenuKey = ['/home']
        // let key = Store.getState(switchMenu())
        // console.log("1",key.menuName)
        Store.dispatch(switchMenu(curSelectedMenuKey)) //存入全局状态管理
        let menuList = this.readerMenu(MenuConfig)
        this.setState({
            menuTreeNode:menuList,
            curSelectedMenuKey:curSelectedMenuKey
        })

    }
    onMenuClick = (e ) =>{
        let breadcrumb = e.key;
        // breadcrumb = key.key.split("/");
        console.log("key---999--",e)
        this.setState({
            curSelectedMenuKey:[breadcrumb]
        })
        Store.dispatch(switchMenu([breadcrumb])) //存入全局状态管理
        // console.log("11111111",)


    }
    readerMenu = (data)=>{
        return  data.map((item)=>{
            if(item.children){
                return (
                    <SubMenu key={item.key} title={<span><Icon type="user" /><span>{item.title}</span></span>} >
                        {this.readerMenu(item.children)}
                    </SubMenu>
                )
            }
            if(item.hierarchy){
                return (
                    <Menu.Item key={item.key} data-id={item.key}>
                        <NavLink to={item.key}><span><Icon type="user" /><span>{item.title}</span></span></NavLink>
                    </Menu.Item>
                )
            }else{
                return (
                    <Menu.Item key={item.key} data-id={item.key}>
                        <NavLink to={item.key}>{item.title}</NavLink>
                    </Menu.Item>
                )
            }

        })

    }

    render() {
        return (
            <Menu theme="light"
                  selectedKeys={this.state.curSelectedMenuKey}
                  mode="inline"
                  onClick={this.onMenuClick}
                  style={{ border:'none',marginLeft: '-1px'}}
            >
                {this.state.menuTreeNode}
            </Menu>
        )
    }
}