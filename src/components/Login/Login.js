import React from 'react';
import './Login.css';
import { Form, Icon, Input, Button } from 'antd';
import storage from '../../utils/storage.js';

export default class Login  extends React.Component {
    state = {
        username: '',
        password: '',
    }
    handleSubmit = e => {
      e.preventDefault();
      let {username, password } = this.state;
      if((username === 'admin' && password === 'oupeng123') ||
          (username === 'yuqiangl' && password === '123456')
      ) {
          storage.setSession('userInfo', this.state)
          this.props.history.push('/distributorConfig');
      }
    };

    handleChange = (name, e) => {
        const { value } = e.target;
        this.setState({
            [name]: value,
        });
    }

    render() {
        const { username, password } = this.state;
        return (
            <div className="login-box">
                <div className="login-container">
                    <div>登录系统</div>
                    <Form layout="inline" onSubmit={this.handleSubmit}>
                        <Form.Item>
                            <Input
                            value={username}
                            onChange={this.handleChange.bind(this, 'username')}
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Username"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Input
                            value={password}
                            onChange={this.handleChange.bind(this, 'password')}
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="Password"
                            />
                        </Form.Item>
                        <Form.Item>
                        <Button className="subLogin" type="primary" htmlType="submit">
                            Log in
                        </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        );
    }
}
