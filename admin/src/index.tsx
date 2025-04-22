import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { App as AntdApp } from 'antd'
import reportWebVitals from './reportWebVitals'
import { Provider } from 'react-redux'
import { store } from './app/store'
import { ConfigProvider } from 'antd'
import viVN from 'antd/locale/vi_VN'
import 'antd/dist/reset.css'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <Provider store={store}>
    <AntdApp>
      <ConfigProvider theme={{ hashed: false }} locale={viVN}>
        <App />
      </ConfigProvider>
    </AntdApp>
  </Provider>,
)
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
