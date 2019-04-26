// src\redux\store\index.js
/*
 *  引入createStore 保存数据源
 */
import  {createStore} from 'redux'
import reducer from './../reducer'

const store = createStore(reducer)
export default store;