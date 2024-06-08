import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserAddOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { Outlet, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const { Header, Sider, Content } = Layout;

const MainLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const location = useLocation();
  const selectedKey = location.pathname === "/" ? "/users" : location.pathname;

  return (
    <Layout style={{ height: "100vh" }}>
      <Header style={{ padding: 0, background: colorBgContainer }}>
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{
            fontSize: "16px",
            width: 64,
            height: 64,
          }}
        />
      </Header>
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          className="pt-[20px] flex flex-col justify-between "
       
        >
         <div className="h-[95%]">
              <Menu
                theme="dark"
                mode="inline"
                selectedKeys={[selectedKey]}
                items={[
                  {
                    key: "/users",
                    icon: <UserOutlined />,
                    label: <Link to="/users">All Users</Link>,
                  },
                  {
                    key: "/add",
                    icon: <UserAddOutlined />,
                    label: <Link to="/add" >Add User</Link>,
                  },
                ]}
              />
            </div>
            {/* <div className="mb-4">
              <Button
                type="text"
                icon={<LogoutOutlined />}
                style={{ color: '#fff' }}
                onClick={() => console.log('Logout')}
              >
                Logout
              </Button>
            </div> */}

        
        </Sider>

        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
