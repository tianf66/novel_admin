import React from 'react';
import axios from 'axios';
import './DistributorConfig.css';
import { Table, Divider, Button, Menu, Dropdown, Icon, Modal, Form, Radio, message} from 'antd';
import DistributorEdit from "./DistributorEdit";
import DistributorCreate from "./DistributorCreate";
import DistributorCopy from "./DistributorCopy";

import DistributorAds from "./DistributorAds";
import DistributorChannel from "./DistributorChannel";

const { Column } = Table;
const formItemLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 12 },
};
let adConfig = {
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
export default class DistributorConfig  extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          distributorList: [],
          distributorConfig: {},
          distributorAdsModelVisible: false,
          distributorEditModelVisible: false,
          distributorCreateModelVisible: false,
          distributorCopyModelVisible: false,
          distributorChannelModelVisible: false,
          isRedirectDistributorModel: false,
          redirectStatus: ''
        }
    };

    /**
     * 点击更多操作，获取渠道信息
     */
    getConfigItem = (item) => {
        if(typeof(item.AdPos) == 'string') {
            item.AdPos = (item.AdPos && JSON.parse(item.AdPos)) || adConfig;
        }
        this.setState({
            distributorConfig: item,
            redirectStatus: item.redirectStatus
        });
    }

    componentDidMount() {//组件已经完全挂载到网页上才会调用被执行
        this.getDistributorData();
    }

    /**
     * 请求渠道信息;
     */
    getDistributorData() {
        //请求信息时， 先清空渠道列表
        this.setState({
            distributorList: [],
            distributorConfig: {}
        })
        //axios发送post请求;
        axios.get('/api/distributor/listDisributor', {}).then((res) => {
          let data = res.data;
          if(data.Code === 0) {
            let list = data.Data;
            this.setState({
              distributorList: list
            });
          }
        });
    }

    /**
     * 更多操作 下拉菜单元素模板
     */
    menuTemplate() {
        return (<Menu>
            {/* <Menu.Item onClick={this.editDistributor.bind(this)}><Icon type="plus-circle" />编辑</Menu.Item> */}
            {/* <Menu.Item onClick={this.channelDistributor.bind(this)}><Icon type="plus-circle" />频道配置</Menu.Item> */}
            <Menu.Item onClick={this.adsDistributor.bind(this)}><Icon type="gift" />广告配置</Menu.Item>
            {/* <Menu.Item style={{color: 'red'}}><Icon type="issues-close" />删除渠道</Menu.Item> */}
            {/* <Menu.Item onClick={this.copyDistributor.bind(this)}><Icon type="plus-circle" />复制渠道</Menu.Item> */}
            {/* <Menu.Item onClick={this.redirectDistributor.bind(this)}><Icon type="plus-circle" />重定向状态更新</Menu.Item> */}
        </Menu>)
    }

    /**
     * 重定向状态更新
     */
    redirectDistributor() {
        this.setState({
            isRedirectDistributorModel: true
        });
    }

    /**
     * 重定向提交按钮
     */
    subRedirectDistributor() {
        let state = this.state;
        let param = {
            did: state.distributorConfig.id,
            redirectStatus: state.redirectStatus
        }
        axios.post('/api/distributor/back/updateRedirectStatus', param).then((res) => {
          let data = res.data;
          if(data.code === 1) {
            message.info(`${data.msg}`);

          }
        });
    }

    /**
     * 重定向取消按钮
     */
    closeRedirectDistributor() {
        this.setState({
            isRedirectDistributorModel: false
        });
    }

    /**
     *
     * 重定向状态更新
     */
    redirectStatushandleChange(e) {
        let val = e.target.value;
        this.setState({
            redirectStatus: val
        })
    }

    /**
     * 显示 创建渠道 Model
     **/
    createDistributor(){
        this.setState({
            distributorCreateModelVisible: true
        })
    }

    /**
     * 显示 复制渠道 Model
     **/
    copyDistributor(){
        this.setState({
            distributorCopyModelVisible: true
        })
    }

    /**
     * 关闭 创建渠道 Model
     * */
    closeDistributorCreateModel(){
        this.setState({
            distributorCreateModelVisible: false
        })
    }

    /**
     * 关闭 复制渠道 Model
     * */
    closeDistributorCopyModel(){
        this.setState({
            distributorCopyModelVisible: false
        })
    }

    /**
     * 关闭 广告修改Model
     */
    closeDistributorAdsModel() {
        this.setState({
            distributorAdsModelVisible: false,
            distributorConfig: {}
        })
    }

    /**
     * 显示 广告修改Model
     */
    adsDistributor(){
        this.setState({
            distributorAdsModelVisible: true
        })
    }


    /**
     * 关闭 渠道编辑Model
     */
    closeDistributorEditModel() {
        this.setState({
            distributorEditModelVisible: false,
            distributorConfig: {}
        })
    }

    /**
     * 显示 渠道编辑Model
     */
    editDistributor(){
        this.setState({
            distributorEditModelVisible: true
        })
    }

    /**
     * 关闭 配置频道Model
     */
    closeDistributorChannelModel() {
        this.setState({
            distributorChannelModelVisible: false,
            distributorConfig: {}
        })
    }

    /**
     * 显示 配置频道Model
     */
    channelDistributor(){
        this.setState({
            distributorChannelModelVisible: true
        })
    }

    render() {
        return (
            <div>
                {/* 工具栏 */}
                <div className="toolbar">
                    {/*新增渠道按钮*/}
                    <Button icon="plus" onClick={this.createDistributor.bind(this)}>新增渠道</Button>
                </div>

                {/* Table start */}
                <Table bordered={true} dataSource={this.state.distributorList} rowKey={row=>row.ID}>
                    <Column align="center" title="渠道ID" dataIndex="ID" />
                    <Column align="center" title="渠道编码" dataIndex="Code" />
                    <Column align="center" title="渠道名称" dataIndex="Title" />
                    {/* <Column
                        title="入口地址"
                        align="center"
                        render={(text, record) => (
                        <a target="blank" href={text.visitUrl}>{text.visitUrl}</a>

                        )}
                    /> */}
                    <Column
                        title="状态"
                        align="center"
                        render={(text, record) => (
                        <span>{text.Status === 1 ? '启用' : text.Status === 2 ? '禁用' : '删除'}</span>
                        )}
                    />
                    {/* <Column
                        title="广告蒙层状态"
                        align="center"
                        render={(text, record) => (
                        <span>{text.adLayerStatus === 1 ? '启用' : '禁用'}</span>
                        )}
                    /> */}
                    {/* <Column
                        title="广告下线蒙层状态"
                        align="center"
                        render={(text, record) => (
                        <span>{text.adDownLayerStatus === 1 ? '启用' : '禁用'}</span>
                        )}
                    /> */}
                    <Column
                        title="操作项"
                        key="action"
                        align="center"
                        render={(text, record) => (
                            <div>
                                {/* <Button type="danger">Delete</Button> */}
                                <Divider type="vertical" />
                                <Dropdown overlay={this.menuTemplate()} trigger={['click']}>
                                    <Button onClick={this.getConfigItem.bind(this, text)}>
                                        更多操作 <Icon type="down" />
                                    </Button>
                                </Dropdown>
                            </div>
                        )}
                    />
                </Table>
                {/* Table end */}

                {/*start 渠道创建组件*/}
                <DistributorCreate getDistributorData={this.getDistributorData.bind(this)} visible={this.state.distributorCreateModelVisible} close={this.closeDistributorCreateModel.bind(this)}></DistributorCreate>
                {/*end 渠道创建组件*/}

                {/*start 渠道复制组件*/}
                <DistributorCopy getDistributorData={this.getDistributorData.bind(this)} distributorConfig={this.state.distributorConfig} visible={this.state.distributorCopyModelVisible} close={this.closeDistributorCopyModel.bind(this)}></DistributorCopy>
                {/*end 渠道复制组件*/}

                {/* start 修改渠道广告信息 */}
                <DistributorAds getDistributorData={this.getDistributorData.bind(this)} distributorConfig={this.state.distributorConfig} visible={this.state.distributorAdsModelVisible} close={this.closeDistributorAdsModel.bind(this)}></DistributorAds>
                {/* end 修改渠道广告信息 */}

                {/* start 编辑渠道组件 */}
                <DistributorEdit getDistributorData={this.getDistributorData.bind(this)} distributorConfig={this.state.distributorConfig} visible={this.state.distributorEditModelVisible} close={this.closeDistributorEditModel.bind(this)}></DistributorEdit>
                {/* end  编辑渠道组件*/}

                {/* start 频道配置信息 */}
                <DistributorChannel getDistributorData={this.getDistributorData.bind(this)} distributorConfig={this.state.distributorConfig} visible={this.state.distributorChannelModelVisible} close={this.closeDistributorChannelModel.bind(this)}></DistributorChannel>
                {/* end 频道配置信息*/}

                <Modal width={"800px"}
                    title="更新重定向状态"
                    visible={this.state.isRedirectDistributorModel}
                    onOk={this.subRedirectDistributor.bind(this)}
                    onCancel={this.closeRedirectDistributor.bind(this)}>
                        <Form>
                        <Form.Item labelAlign="left" {...formItemLayout} label="入口跳转渠道标题">
                            {this.state.distributorConfig.title}
                        </Form.Item>
                        <Form.Item labelAlign="left" {...formItemLayout} label="状态">
                            {/* 1启用，2禁用，3删除 */}
                            <Radio.Group value={this.state.redirectStatus} onChange={this.redirectStatushandleChange.bind(this)} buttonStyle="solid">
                                <Radio.Button value={1}>启用</Radio.Button>
                                <Radio.Button value={2}>禁用</Radio.Button>
                            </Radio.Group>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        );
    }
}
