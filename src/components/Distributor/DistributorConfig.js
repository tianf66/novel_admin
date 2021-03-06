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
const { confirm } = Modal;
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
     * ???????????????????????????????????????
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

    componentDidMount() {//?????????????????????????????????????????????????????????
        this.getDistributorData();
    }

    /**
     * ??????????????????;
     */
    getDistributorData() {
        //?????????????????? ?????????????????????
        this.setState({
            distributorList: [],
            distributorConfig: {}
        })
        //axios??????post??????;
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
     * ???????????? ????????????????????????
     */
    menuTemplate() {
        return (<Menu>
            {/* <Menu.Item onClick={this.editDistributor.bind(this)}><Icon type="plus-circle" />??????</Menu.Item> */}
            {/* <Menu.Item onClick={this.channelDistributor.bind(this)}><Icon type="plus-circle" />????????????</Menu.Item> */}
            <Menu.Item onClick={this.adsDistributor.bind(this)}><Icon type="gift" />????????????</Menu.Item>
            <Menu.Item style={{color: 'red'}} onClick={this.deleteDistributor.bind(this)}><Icon type="issues-close" />????????????</Menu.Item>
            {/* <Menu.Item onClick={this.copyDistributor.bind(this)}><Icon type="plus-circle" />????????????</Menu.Item> */}
            {/* <Menu.Item onClick={this.redirectDistributor.bind(this)}><Icon type="plus-circle" />?????????????????????</Menu.Item> */}
        </Menu>)
    }

    /**
     * ?????????????????????
     */
    redirectDistributor() {
        this.setState({
            isRedirectDistributorModel: true
        });
    }

    /**
     * ?????????????????????
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
     * ?????????????????????
     */
    closeRedirectDistributor() {
        this.setState({
            isRedirectDistributorModel: false
        });
    }

    /**
     *
     * ?????????????????????
     */
    redirectStatushandleChange(e) {
        let val = e.target.value;
        this.setState({
            redirectStatus: val
        })
    }

    /**
     * ????????????function
     */
    deleteDistributor() {
        let disdata = this.state.distributorConfig;
        let _this = this;
        confirm({
            title: '????????????????????????????',
            content: `????????????${disdata.Title}',      ????????????${disdata.Code}???`,
            okText: '??????',
            okType: 'danger',
            cancelText: '??????',
            onOk() {
                axios.delete('/api/distributor/deleteDisributor', {data : {id: disdata.ID}}).then((res) => {
                    let data = res.data;
                    if(data.Code === 0) {
                        message.success('????????????');
                        _this.getDistributorData();
                    }
                });
            },
            onCancel() {
              console.log('Cancel');
            },
          });
    }

    /**
     * ?????? ???????????? Model
     **/
    createDistributor(){
        this.setState({
            distributorCreateModelVisible: true
        })
    }

    /**
     * ?????? ???????????? Model
     **/
    copyDistributor(){
        this.setState({
            distributorCopyModelVisible: true
        })
    }

    /**
     * ?????? ???????????? Model
     * */
    closeDistributorCreateModel(){
        this.setState({
            distributorCreateModelVisible: false
        })
    }

    /**
     * ?????? ???????????? Model
     * */
    closeDistributorCopyModel(){
        this.setState({
            distributorCopyModelVisible: false
        })
    }

    /**
     * ?????? ????????????Model
     */
    closeDistributorAdsModel() {
        this.setState({
            distributorAdsModelVisible: false,
            distributorConfig: {}
        })
    }

    /**
     * ?????? ????????????Model
     */
    adsDistributor(){
        this.setState({
            distributorAdsModelVisible: true
        })
    }


    /**
     * ?????? ????????????Model
     */
    closeDistributorEditModel() {
        this.setState({
            distributorEditModelVisible: false,
            distributorConfig: {}
        })
    }

    /**
     * ?????? ????????????Model
     */
    editDistributor(){
        this.setState({
            distributorEditModelVisible: true
        })
    }

    /**
     * ?????? ????????????Model
     */
    closeDistributorChannelModel() {
        this.setState({
            distributorChannelModelVisible: false,
            distributorConfig: {}
        })
    }

    /**
     * ?????? ????????????Model
     */
    channelDistributor(){
        this.setState({
            distributorChannelModelVisible: true
        })
    }

    render() {
        return (
            <div>
                {/* ????????? */}
                <div className="toolbar">
                    {/*??????????????????*/}
                    <Button icon="plus" onClick={this.createDistributor.bind(this)}>????????????</Button>
                </div>

                {/* Table start */}
                <Table bordered={true} dataSource={this.state.distributorList} rowKey={row=>row.ID}>
                    <Column align="center" title="??????ID" dataIndex="ID" />
                    <Column align="center" title="????????????" dataIndex="Code" />
                    <Column align="center" title="????????????" dataIndex="Title" />
                    {/* <Column
                        title="????????????"
                        align="center"
                        render={(text, record) => (
                        <a target="blank" href={text.visitUrl}>{text.visitUrl}</a>

                        )}
                    /> */}
                    {/* <Column
                        title="??????"
                        align="center"
                        render={(text, record) => (
                        <span>{text.Status === 1 ? '??????' : text.Status === 2 ? '??????' : '??????'}</span>
                        )}
                    /> */}
                    {/* <Column
                        title="??????????????????"
                        align="center"
                        render={(text, record) => (
                        <span>{text.adLayerStatus === 1 ? '??????' : '??????'}</span>
                        )}
                    /> */}
                    {/* <Column
                        title="????????????????????????"
                        align="center"
                        render={(text, record) => (
                        <span>{text.adDownLayerStatus === 1 ? '??????' : '??????'}</span>
                        )}
                    /> */}
                    <Column
                        title="?????????"
                        key="action"
                        align="center"
                        render={(text, record) => (
                            <div>
                                {/* <Button type="danger">Delete</Button> */}
                                <Divider type="vertical" />
                                <Dropdown overlay={this.menuTemplate()} trigger={['click']}>
                                    <Button onClick={this.getConfigItem.bind(this, text)}>
                                        ???????????? <Icon type="down" />
                                    </Button>
                                </Dropdown>
                            </div>
                        )}
                    />
                </Table>
                {/* Table end */}

                {/*start ??????????????????*/}
                <DistributorCreate getDistributorData={this.getDistributorData.bind(this)} visible={this.state.distributorCreateModelVisible} close={this.closeDistributorCreateModel.bind(this)}></DistributorCreate>
                {/*end ??????????????????*/}

                {/*start ??????????????????*/}
                <DistributorCopy getDistributorData={this.getDistributorData.bind(this)} distributorConfig={this.state.distributorConfig} visible={this.state.distributorCopyModelVisible} close={this.closeDistributorCopyModel.bind(this)}></DistributorCopy>
                {/*end ??????????????????*/}

                {/* start ???????????????????????? */}
                <DistributorAds getDistributorData={this.getDistributorData.bind(this)} distributorConfig={this.state.distributorConfig} visible={this.state.distributorAdsModelVisible} close={this.closeDistributorAdsModel.bind(this)}></DistributorAds>
                {/* end ???????????????????????? */}

                {/* start ?????????????????? */}
                <DistributorEdit getDistributorData={this.getDistributorData.bind(this)} distributorConfig={this.state.distributorConfig} visible={this.state.distributorEditModelVisible} close={this.closeDistributorEditModel.bind(this)}></DistributorEdit>
                {/* end  ??????????????????*/}

                {/* start ?????????????????? */}
                <DistributorChannel getDistributorData={this.getDistributorData.bind(this)} distributorConfig={this.state.distributorConfig} visible={this.state.distributorChannelModelVisible} close={this.closeDistributorChannelModel.bind(this)}></DistributorChannel>
                {/* end ??????????????????*/}

                <Modal width={"800px"}
                    title="?????????????????????"
                    visible={this.state.isRedirectDistributorModel}
                    onOk={this.subRedirectDistributor.bind(this)}
                    onCancel={this.closeRedirectDistributor.bind(this)}>
                        <Form>
                        <Form.Item labelAlign="left" {...formItemLayout} label="????????????????????????">
                            {this.state.distributorConfig.title}
                        </Form.Item>
                        <Form.Item labelAlign="left" {...formItemLayout} label="??????">
                            {/* 1?????????2?????????3?????? */}
                            <Radio.Group value={this.state.redirectStatus} onChange={this.redirectStatushandleChange.bind(this)} buttonStyle="solid">
                                <Radio.Button value={1}>??????</Radio.Button>
                                <Radio.Button value={2}>??????</Radio.Button>
                            </Radio.Group>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        );
    }
}
