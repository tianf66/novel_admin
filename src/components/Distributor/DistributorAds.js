import React from "react";
import { Input, Modal, message } from "antd";
import Axios from "axios";
const { TextArea } = Input;
/**
 * 渠道创建组件
 */
class DistributorAds extends React.Component {
  /**
   * 构造方法
   * @param props
   */
  constructor(props) {
    super(props);
    this.state = {
      distributorConfig: this.props.distributorConfig
    };
  }

  /**
   * 点击确认按钮的事件
   */
  handleOk() {
    this.subDistributorEditAds();
    console.log(this.state);
  }

  /**
   * 点击取消按钮的事件
   */
  handleCancel() {
    this.closeModel();
  }

  /**
   * 关闭模态框
   */
  closeModel() {
    this.props.close();
  }

  /**
   * 表单input过滤一下state值
   */
  handleChange = (name, type, e) => {
    const { value } = e.target;

    let data = this.state.distributorConfig;
    let ads = data.AdPos;
    if (type === "id") ads[name].id = value;
    if (type === "adlayerProbability") ads[name].adlayerProbability = parseInt(value);
    if (type === "interval") ads[name].interval = parseInt(value);
    if (type === "showCount") ads[name].showCount = value;

    this.setState({
      distributorConfig: data
    });
  };

  subDistributorEditAds() {
    let config = this.state.distributorConfig;
    let param = {
      id: config.ID,
      title: config.Title,
      summary: config.Summary,
      status: config.Status,
      adPos: config.AdPos
    }
    Axios.post("/api/distributor/updateDistributor", param).then(res => {
      let data = res.data;
      if (data.Code === 0) {
        message.success("渠道广告修改成功！");
        this.props.getDistributorData();
        this.closeModel();
      } else {
        message.error(`${data.msg}`);
      }
    });
  }

  getAdTitle(name) {
    let title = "";
    if (name === "bookdetailBottom") title = "书目页底部浮层";
    if (name === "bookdetailMiddle") title = "书目页中部";
    if (name === "bookdetailPop") title = "书目页弹窗";
    if (name === "bookdetailTop") title = "书目页顶部浮层";
    if (name === "listMiddle") title = "列表页中部";
    if (name === "categoryPop") title = "分类页弹窗";
    if (name === "homeBookshelfCategoryBottom") title = "首页\书架\分类底部浮层";
    if (name === "homeBookshelfCategoryTop") title = "首页\书架\分类顶部浮层";
    if (name === "homeCenter") title = "首页中部";
    if (name === "listMiddle") title = "列表页中部";
    if (name === "listStart") title = "列表页首部";
    if (name === "meCenter") title = "个人中心中部";
    if (name === "openscreen") title = "首页开屏";
    if (name === "readbookBottom") title = "内容详情页底部浮层";
    if (name === "readbookMiddle") title = "内容详情页中部";
    if (name === "readbookPop") title = "内容详情页弹窗";
    if (name === "readbookTop") title = "内容详情页顶部浮层";
    return title;
  }

  isDisabled(type) {
    return typeof type == "undefined";
  }

  componentWillReceiveProps(prevProps) {
    // 在组件完成更新后立即调用。在初始化时不会被调用。
    let config = prevProps.distributorConfig;
    if (config.AdPos) {
      this.setState({
        distributorConfig: config
      });
    }
  }

  /**
   * 渲染组件
   */
  render() {
    const adConfig = this.state.distributorConfig.AdPos;
    return (
      <div>
        {/*修改广告模态框*/}
        <Modal
          title="广告配置"
          width={920}
          visible={this.props.visible}
          onOk={this.handleOk.bind(this)}
          onCancel={this.closeModel.bind(this)}
        >
          <table className="table" border="1">
            <tbody>
              <tr>
                <th>广告名称</th>
                <th>广告编号</th>
                <th>插入间隔</th>
                {/* <th>最大循环次数</th> */}
                <th>广告蒙层概率([1-100])</th>
              </tr>

              {adConfig &&
                Object.keys(adConfig).map((key, i) => (
                  <tr key={i}>
                    <td style={{width: '170px'}}>{this.getAdTitle(key)}</td>
                    <td>
                      <TextArea
                        onChange={this.handleChange.bind(this, key, "id")}
                        value={`${adConfig[key].id}`}
                        autoSize={{ minRows: 1}}
                      />
                    </td>
                    <td>
                      <TextArea
                        onChange={this.handleChange.bind(this, key, "interval")}
                        value={`${adConfig[key].interval || ""}`}
                        autoSize={{ minRows: 1}}
                        disabled={this.isDisabled(adConfig[key].interval)}
                      />
                    </td>
                    {/* <td>
                      <Input
                        onChange={this.handleChange.bind(
                          this,
                          key,
                          "showCount"
                        )}
                        value={`${adConfig[key].showCount || ""}`}
                        disabled={this.isDisabled(adConfig[key].showCount)}
                      />
                    </td> */}
                    <td>
                      <Input
                        onChange={this.handleChange.bind(
                          this,
                          key,
                          "adlayerProbability"
                        )}
                        value={`${adConfig[key].adlayerProbability || ""}`}
                        disabled={this.isDisabled(
                          adConfig[key].adlayerProbability
                        )}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </Modal>
      </div>
    );
  }
}

export default DistributorAds;
