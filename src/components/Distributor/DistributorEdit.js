import React from "react";
import { Form, Input , Modal, Radio, message } from 'antd';
import Axios from "axios";

const formItemLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 12 },
};

/**
 * 渠道创建组件
 */
class DistributorEdit extends React.Component{

    /**
     * 构造方法
     * @param props
     */
    constructor(props){
        super(props)
        this.state = {

        }
    }

    /**
     * 点击确认按钮的事件
     */
    handleOk(){
        this.subDistributorEdit();
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
     * 表单input过滤一下state值
     */
    handleChange = (name, e) => {
        const { value } = e.target;
        let data = this.state.distributorConfig;
        data[name] = value;

        this.setState({
            distributorConfig: data
        });
    }

    subDistributorEdit() {
        let param = this.state.distributorConfig;
        // 转为整型
        this.state.distributorConfig.detailRecommendNewsCount = parseInt(this.state.distributorConfig.detailRecommendNewsCount);

        Axios.post('/api/distributor/back/updateDistributor', param).then((res) => {
          let data = res.data;
          if(data.code === 1) {
            message.success('渠道信息修改成功！');
            // 创建成功后请求渠道信息；
            this.props.getDistributorData();
            //关闭模态框
            this.closeModel();
          } else {
            message.error(`${data.msg}`);
          }
        });
    }

    componentWillReceiveProps(prevProps) {// 在组件完成更新后立即调用。在初始化时不会被调用。
        let config = prevProps.distributorConfig;
        if(config.id && config.title) {
            this.setState({
                distributorConfig: config
            })
        }
    }

    /**
     * 渲染组件
     */
    render() {
        if (this.state.distributorConfig && this.state.distributorConfig.code) {
            return (
                <div>
                    {/*渠道编辑模态框*/}
                    <Modal
                        title="渠道编辑"
                        visible={this.props.visible}
                        onOk={this.handleOk.bind(this)}
                        onCancel={this.handleCancel.bind(this)}>
                        <Form>
                            <Form.Item labelAlign="left" {...formItemLayout} label="渠道编码">
                                <Input disabled={true} value={this.state.distributorConfig.code} onChange={this.handleChange.bind(this, 'code')} placeholder="Please input your code" />
                            </Form.Item>
                            <Form.Item labelAlign="left" {...formItemLayout} label="渠道标题">
                                <Input value={this.state.distributorConfig.title} onChange={this.handleChange.bind(this, 'title')} placeholder="Please input your title" />
                            </Form.Item>
                            <Form.Item labelAlign="left" {...formItemLayout} label="资讯Api">
                                <Radio.Group  value={this.state.distributorConfig.newsApiUpstream} onChange={this.handleChange.bind(this, 'newsApiUpstream')} defaultValue="oupeng" buttonStyle="solid">
                                    <Radio.Button value="oupeng">欧朋</Radio.Button>
                                    <Radio.Button value="xiguang" disabled>犀光</Radio.Button>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item labelAlign="left" {...formItemLayout} label="详情页相关推荐Api">
                                <Radio.Group value={this.state.distributorConfig.detailRecommendApiUpstream} onChange={this.handleChange.bind(this, 'detailRecommendApiUpstream')} defaultValue="oupeng" buttonStyle="solid">
                                    <Radio.Button value="oupeng">欧朋</Radio.Button>
                                    <Radio.Button value="disifanshi">第四范式</Radio.Button>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item labelAlign="left" {...formItemLayout} label="渠道入口域名">
                                <Input value={this.state.distributorConfig.domain} onChange={this.handleChange.bind(this, "domain")}/>
                            </Form.Item>
                            <Form.Item labelAlign="left" {...formItemLayout} label="状态">
                                <Radio.Group value={this.state.distributorConfig.status} defaultValue="1" onChange={this.handleChange.bind(this, 'status')} buttonStyle="solid">
                                    <Radio.Button value={1}>启用</Radio.Button>
                                    <Radio.Button value={2}>禁用</Radio.Button>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item labelAlign="left" {...formItemLayout} label="广告蒙层状态">
                                <Radio.Group value={this.state.distributorConfig.adLayerStatus} defaultValue="1" onChange={this.handleChange.bind(this, 'adLayerStatus')} buttonStyle="solid">
                                    <Radio.Button value={1}>启用</Radio.Button>
                                    <Radio.Button value={2}>禁用</Radio.Button>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item labelAlign="left" {...formItemLayout} label="广告下线蒙层状态">
                                <Radio.Group value={this.state.distributorConfig.adDownLayerStatus} defaultValue="2" onChange={this.handleChange.bind(this, 'adDownLayerStatus')} buttonStyle="solid">
                                    <Radio.Button value={1}>启用</Radio.Button>
                                    <Radio.Button value={2}>禁用</Radio.Button>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item labelAlign="left" {...formItemLayout} label="详情页推荐数量">
                                <Input type="number" value={this.state.distributorConfig.detailRecommendNewsCount} onChange={this.handleChange.bind(this, 'detailRecommendNewsCount')} placeholder="请输入详情页推荐数量" />
                            </Form.Item>
                        </Form>

                    </Modal>
                </div>
            )
          } else {
            return null;
        }

    }
}

export default DistributorEdit
