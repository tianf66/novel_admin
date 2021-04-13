import React from "react";
import {Form, Input, Modal, Radio, message} from 'antd';
import Axios from "axios";

const formItemLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 12 },
};
/**
 * 创建渠道form表单初始化
 */
const distributorCreateForm = {
    code: "",
    title: "",
    status: "1",
    adPos: {
        "openscreen": {"id": "", "adlayerProbability": 0},
        "homeBookshelfCategoryTop": {"id": "","adlayerProbability": 0},
        "homeCenter": {"id": "","adlayerProbability": 0},
        "categoryPop": {"id": "","adlayerProbability": 0},
        "bookdetailPop": {"id": "","adlayerProbability": 0},
        "readbookPop": {"id": "","interval": "","adlayerProbability": 0},
        "listStart": {"id": "","interval": "","adlayerProbability": 0},
        "listMiddle": {"id": "","interval": "","adlayerProbability": 0},
        "homeBookshelfCategoryBottom": {"id": "","adlayerProbability": 0},
        "bookdetailTop": {"id": "","adlayerProbability": 0},
        "bookdetailMiddle": {"id": "","adlayerProbability": 0},
        "bookdetailBottom": {"id": "","adlayerProbability": 0},
        "readbookTop": {"id": "","adlayerProbability": 0},
        "readbookMiddle": {"id": "","adlayerProbability": 0},
        "readbookBottom": {"id": "","adlayerProbability": 0},
        "meCenter": {"id": "","adlayerProbability": 0}
    }
}

/**
 * 渠道创建组件
 */
class DistributorCreate extends React.Component{

    /**
     * 构造方法
     * @param props
     */
    constructor(props){
        super(props)
        this.state = {
            ...distributorCreateForm
        }
    }

    /**
     * 点击确认按钮的事件
     */
    handleOk(){
        this.subDistributorCerate();

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
        this.setState(distributorCreateForm);
        this.props.close();
    }

    /**
     * 表单input过滤一下state值
     */
    handleChange = (name, e) => {
        const { value } = e.target;
        this.setState({
            [name]: value,
        });
    }

    subDistributorCerate() {
        let param = this.state;
        //转为整型
        param.status = parseInt(param.status);
        console.log(param);
        Axios({
            method: 'post',
            url: '/api/distributor/addDistributor',
            data: param
        }).then((res) => {
          let data = res.data;
          if(data.Code === 0) {
            message.success('渠道创建成功！');
            // 创建成功后请求渠道信息；
            this.props.getDistributorData();
            //关闭模态框
            this.closeModel();
          } else {
            message.error(`${data.msg}`);
          }
        });
    }

    /**
     * 渲染组件
     */
    render() {
        const { code, title, status } = this.state;
        return (
            <div>
                {/*新增渠道模态框*/}
                <Modal
                    title="新增渠道"
                    visible={this.props.visible}
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel.bind(this)}>
                    <Form>
                        <Form.Item labelAlign="left" {...formItemLayout} label="渠道编码">
                            <Input value={code} onChange={this.handleChange.bind(this, 'code')} placeholder="Please input your code" />
                        </Form.Item>
                        <Form.Item labelAlign="left" {...formItemLayout} label="渠道标题">
                            <Input value={title} onChange={this.handleChange.bind(this, 'title')} placeholder="Please input your title" />
                        </Form.Item>
                        <Form.Item labelAlign="left" {...formItemLayout} label="状态">
                            {/* 1启用，2禁用，3删除 */}
                            <Radio.Group value={status} defaultValue="1" onChange={this.handleChange.bind(this, 'status')} buttonStyle="solid">
                                <Radio.Button value="1">启用</Radio.Button>
                                <Radio.Button value="2">禁用</Radio.Button>
                            </Radio.Group>
                        </Form.Item>
                        {/* <Form.Item labelAlign="left" {...formItemLayout} label="广告蒙层状态">
                            <Radio.Group value={adLayerStatus} defaultValue="1" onChange={this.handleChange.bind(this, 'adLayerStatus')} buttonStyle="solid">
                                <Radio.Button value={1}>启用</Radio.Button>
                                <Radio.Button value={2}>禁用</Radio.Button>
                            </Radio.Group>
                        </Form.Item> */}
                        {/* <Form.Item labelAlign="left" {...formItemLayout} label="广告下线蒙层状态">
                            <Radio.Group value={adDownLayerStatus} defaultValue="2" onChange={this.handleChange.bind(this, 'adDownLayerStatus')} buttonStyle="solid">
                                <Radio.Button value={1}>启用</Radio.Button>
                                <Radio.Button value={2}>禁用</Radio.Button>
                            </Radio.Group>
                        </Form.Item> */}
                    </Form>

                </Modal>
            </div>
        )
    }
}

export default DistributorCreate
