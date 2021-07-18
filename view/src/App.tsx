import React, { FC, useState } from 'react';
import './App.css';
import 'antd/dist/antd.css';
import { SignUp } from './components/sign-up/sign-up';
import { Login } from './components/login/login';
import { useToken } from './services/token.service';
import Dashboard from './components/dashboard/dashboard';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Layout, Menu } from 'antd';
import { Content, Header } from 'antd/lib/layout/layout';

function App() {
  const { token, setToken } = useToken();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(true);

  const onLogout = () => {
    setToken(null);
  };

  return (
    <div className="App">
      <Layout>
        <Header>
          {token && (
            <Menu theme="dark" mode="horizontal" style={{ float: 'right' }}>
              <Menu.Item key="1" onClick={onLogout}>
                Logout
              </Menu.Item>
            </Menu>
          )}
        </Header>
        <Content style={{ backgroundColor: 'white' }}>
          {!token && isLoginModalOpen && (
            <Login
              setToken={setToken}
              setIsLoginModalOpen={setIsLoginModalOpen}
            />
          )}
          {!token && !isLoginModalOpen && (
            <SignUp setIsLoginModalOpen={setIsLoginModalOpen} />
          )}
          {token && (
            <DndProvider backend={HTML5Backend}>
              <Dashboard />
            </DndProvider>
          )}
        </Content>
      </Layout>
    </div>
  );
}

export default App;
