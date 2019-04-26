import React from 'react'
import {
    Layout, Breadcrumb,
} from 'antd';
import {connect} from 'react-redux'
import Store from '../../redux/store'
import {switchMenu} from '../../redux/action'
import './index.less'
import Headers from '../../components/header';
import Footers from '../../components/footer'
import Menus from '../../components/menu'

const {  Content,  Sider } = Layout;
class Index extends React.Component{
    state = {
        collapsed: false,
        breadcrumb:[],
        menuName:[]
    };
    componentWillMount() {
        let src = window.location.href
        let {menuName} = this.props
        console.log("99999999999999----->",menuName,src)
        // console.log("//---------------------//",this.props)
        this.setState({
            menuName:menuName
        },this.breadcrumb)
        // this.breadcrumb();
        // let key = Store.subscribe(switchMenu())
        // console.log("key-------",key)
    }
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        let  menuNames = nextProps.menuName
        let {menuName} = this.props
        // console.log("menuNameaaaaaaaaaaa",this.props)
        // console.log("99999999999999---888888-->",menuNames,menuName)
        if(menuName == menuNames){
            return false
        }else {
            this.setState({
                menuName:menuName
            },this.breadcrumb)
            return true

        }
        // console.log("---------->",menuName,nextState)
    }
    breadcrumb=()=>{
        // let breadcrumb =["userCore", "userManage"]
        let breadcrumb = this.state.menuName
        console.log("breadcrumb-------11-----",breadcrumb)
        let breadcrumbItem = breadcrumb && breadcrumb.map((item)=>{
                                return (<Breadcrumb.Item key={item}>{item}</Breadcrumb.Item>)
                            })
        this.setState({breadcrumb:breadcrumbItem})
    }
    render(){

        return (
            <Layout>
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={this.state.collapsed}
                    className="menu-left"
                    style={{ background: '#fff', padding: 0 ,overflow: 'auto',position:'fixed',top:0, height: '100vh', }}
                >
                    <div className="logo" />
                    <Menus></Menus>
                </Sider>
                <Layout >
                    <Headers></Headers>
                    <Content style={{  marginTop: 64,marginLeft:200 }}>
                        <Breadcrumb style={{ margin: '6px 15px' }}>
                            {/*<Breadcrumb.Item>User</Breadcrumb.Item>*/}
                            {/*<Breadcrumb.Item>Bill</Breadcrumb.Item>*/}
                            {this.state.breadcrumb}
                        </Breadcrumb>
                        <div className='modular-main'>
                            {this.props.children}
                        </div>
                    </Content>
                    <Footers style={{ textAlign: 'center' }}></Footers>
                </Layout>
            </Layout>
        )
    }
}
const mapStateToProps =(state)=>{
    console.log("ssssssssss",state)
    return {
        menuName:state.menuName,
        // list:state.list
    }
}

const mapDispatchToProps =(dispatch)=>{
    return{
        changeInputValue(e){
            console.log("1111111",e)
            // const action=changeValue(e.target.value)
            // dispatch(action)
        },
        //新增数据
        handleAddClick(){
            // const action =additem()
            // dispatch(action)
        },
        //删除数据
        handleDelete(index){
            // const action=deleteItem(index)
            // dispatch(action)
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Index);