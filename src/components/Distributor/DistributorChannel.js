import React from "react";
import axios from 'axios';
import { Table, Modal, InputNumber, message } from 'antd';


class DistributorChannel extends React.Component{

    state = {
        channelList: [],
        selectedRows: [],
        did: ''
    }

    rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({
          selectedRows
        });
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      getCheckboxProps: record => ({
        defaultChecked: record.isCheck,
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
      }),
    };

    componentWillReceiveProps(prevProps) {// 在组件完成更新后立即调用。在初始化时不会被调用。
        let config = prevProps.distributorConfig;
        if(config.id && config.title) {
            this.getChannelData(config.id);
        }
    }

    tableColumns() {
      const columns = [
        {
          title: '频道编码',
          dataIndex: 'code',
          align: 'center',
        },
        {
          title: '频道标题',
          dataIndex: 'title',
          align: 'center',
        },
        {
          title: '频道ID',
          align: 'center',
          dataIndex: 'id',
        },
        {
          title: '排序值',
          align: 'center',
          dataIndex: '',
          render: (text, index) => <InputNumber min={0} value={text.sort} onChange={this.handleChange.bind(this, text)} />,
        },
      ];
      return columns;
    }

    /**
     * 表单input过滤一下state值
     */
    handleChange = (item, value) => {
      let data = this.state.channelList;

      data.forEach((data, index) => {
        if(data.id === item.id) {
          data.sort = value;
        }

      });
      this.setState({
          channelList: data,
      });


      /*set提交表单*/
      let selectedList = this.state.selectedRows;
      selectedList.forEach((data, index) => {
        if(data.id === item.id) {
          data.sort = value;
        }
      });
      this.setState({
        selectedRows: selectedList
      });

    }

    /**
     *
     * 获取渠道配置频道信息
     */
    getChannelData(did) {
      //axios发送post请求;
        axios({
            url: '/api/channel/back/findDistributorChannelItemList',
            params: {did}
        }).then((res) => {
          let data = res.data;
          let selectedRowsList = [];
          if(data.channelList) {
            let list = data.channelList;
            this.setState({
                channelList: list,
                did
            });

            /*过滤一下频道是否配置的状态*/
            list.forEach((item, index) => {
              if(item.isCheck === true) {
                selectedRowsList.push(item);
              }
            });
            this.setState({
              selectedRows: selectedRowsList
            });

          }
        });
    }

    /**
     * 点击确认按钮的事件
     */
    handleOk(){
      // this.subDistributorCerate();
      if(this.state.selectedRows.length === 0) return;
      else this.editDistributorChannel();
    }

    editDistributorChannel() {
      let selectedRows = this.state.selectedRows,
          distributorChannelList = [];
      selectedRows.forEach((item, index) => {
        distributorChannelList.push({
          did: this.state.did,
          channelId: item.id,
          sort: item.sort
        });
      });
      let params = {
        did: this.state.did,
        distributorChannelList
      };
      console.log(params, selectedRows);
      axios.put('/api/channel/back/batchAddDistributorChannelFullVersion', params).then((res) => {
          let data = res.data;
          if(data.code === 1) {
            message.success('频道配置成功！');
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

    render() {
        return(
            <div>
              <Modal width={"800px"}
                    title="配置频道"
                    visible={this.props.visible}
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel.bind(this)}>
                      <Table rowKey={row=>row.id} rowSelection={this.rowSelection} columns={this.tableColumns()} dataSource={this.state.channelList} pagination={false} />
              </Modal>
            </div>
        )
    }
}

export default DistributorChannel;
