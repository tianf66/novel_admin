import React, {Component} from "react";
import { Form, Input, Modal } from "antd";
import axios from "axios";
import {message} from "antd";


/**
 * 渠道复制
 */
class DistributorCopy extends Component{
    state = {
        distributorCopy: {
            oldDid: this.props.distributorConfig.id,
            newCode: "",
            newTitle: ""
        }
    }

    constructor(props){
        super(props);
        this.state = {
            distributorCopy: {
                oldDid: this.props.distributorConfig.id,
                newCode: "",
                newTitle: ""
            }
        }
    }

    /**
     * 点击确认按钮的事件
     */
    handleOk(){
        // 复制渠道
        this.onCopyDistributor();

        this.closeModel();
    }

    /**
     * 点击取消按钮的事件
     */
    handleCancel(){
        this.closeModel();
    }

    /**
     * 关闭模态框
     */
    closeModel(){
        this.props.close();
    }

    /**
     * 处理表单change事件
     * @param appCssUrl
     * @param e
     */
    handleChange = (key, e) => {
        // 更新this.state.frontStaticResource的属性值
        let distributorCopy = Object.assign(this.state.distributorCopy, {
            [key]: e.target.value
        });
        this.setState({
            distributorCopy: distributorCopy
        });
    }

    /**
     * 复制渠道
     * @param item
     */
    onCopyDistributor = () => {
        let reqBody = {
            oldDid: this.props.distributorConfig.id,
            newCode: this.state.distributorCopy.newCode,
            newTitle: this.state.distributorCopy.newTitle
        };
        axios.post("/api/distributor/back/copyDistributor", reqBody).then(resp => {
            message.info("复制渠道, 完成");

            // 父组件重新获取渠道列表
            this.props.getDistributorData();

            // 父组件关闭渠道复制模态框
            this.props.close();
        })
    }

    render() {
        const formItemLayout = {
            labelCol: {
                xs: { span: 8 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 16 },
                sm: { span: 16 },
            }
        };

        return (
            <Modal title="复制渠道"
                   visible={this.props.visible}
                   onOk={this.handleOk.bind(this)}
                   onCancel={this.handleCancel.bind(this)}>
                <Form {...formItemLayout}>
                    <Form.Item label={"旧渠道ID"}>
                        <Input value={this.props.distributorConfig.id} disabled={true}/>
                    </Form.Item>
                    <Form.Item label={"新渠道编码"}>
                        <Input value={this.state.distributorCopy.newCode} onChange={this.handleChange.bind(this, "newCode")}/>
                    </Form.Item>
                    <Form.Item label={"新渠道标题"}>
                        <Input value={this.state.distributorCopy.newTitle} onChange={this.handleChange.bind(this, "newTitle")}/>
                    </Form.Item>
                </Form>
            </Modal>
        )
    }
}

export default DistributorCopy;
