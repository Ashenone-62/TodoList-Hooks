import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

/*
引入边框，初始化，部分UI样式
手机动态设置字体大小，通过fastclick库处理快速点击的一些问题
*/  
import './assets/css/border.css'
import './assets/css/resets.css'
import './assets/css/ui.css'
import './assets/js/common.js'

ReactDOM.render(
    <App />,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
