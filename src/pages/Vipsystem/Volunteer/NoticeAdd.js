import React, { PureComponent } from 'react';
import { Form, Input, Icon, List, Card, Select, Button, DatePicker, Upload, message, Tree, Cascader, } from 'antd';
import { formatMessage, FormattedMessage } from 'umi/locale';
import { connect } from 'dva';
// import { cityArray } from './cityData';
import moment from 'moment';
import Panel from '../../../components/Panel';
import { NOTICE_INIT, NOTICE_SUBMIT } from '../../../actions/notice';
import func from '../../../utils/Func';
import { getAccessToken, getToken } from '../../../utils/authority';
import  cityArray  from "./cities";
const FormItem = Form.Item;
const { TextArea } = Input;
const { TreeNode } = Tree;
const { Dragger } = Upload;
@connect(({ notice, loading }) => ({
  notice,
  submitting: loading.effects['notice/submit'],
}))
@Form.create()
class NoticeAdd extends PureComponent {
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(NOTICE_INIT());
  }
  // onChange = value => console.log(value)
  handleSubmit = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      let that = this;
      if (err) return;
      var imgarr = [];
      if(values.imgs.fileList.length>0){
        for(var i=0;i<values.imgs.fileList.length;i++){
          imgarr.push(values.imgs.fileList[i].response.res.path)
          // values.imgs.push(values.imgs.fileList[i].response.res.path)
        }
      }
      values.id = '';
      values.logoHigh = values.logoHigh.file.response.res.path;
      values.logoLow = values.logoLow.file.response.res.path;
      values.provinceCode = values.provinceName[0]
      values.cityCode = values.provinceName[1];
      values.countyCode = values.provinceName[2];
      values.provinceName = that.state.label[0].label;
      values.cityName = that.state.label[1].label;
      values.countyName = that.state.label[2].label;
      console.log(values.imgs);
      values.imgs ="" +imgarr+ "";
      console.log(values.imgs);
      console.log(values);
      const params = {
        ...values,
        releaseTime: func.format(values.releaseTime),
      };

      dispatch(NOTICE_SUBMIT(params));
    });
  };

  handleExcelCancel = () =>
    this.setState({
      excelVisible: false,
      onReset: () => {},
      value: '',
    });

  onChange = (value,label) => {
    console.log(value);
    console.log(label);
    this.setState({ value,label });
  };
  onClickReset = () => {
    const { onReset } = this.state;
    onReset();
  };

  onUpload = info => {
    const { status } = info.file;
    if (status !== 'uploading') {
      window.console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      console.log(message);
      message.success(`${info.file.name} 数据导入成功!`);
      this.handleExcelCancel();
      this.onClickReset();
    } else if (status === 'error') {
      message.error(`${info.file.response}`);
    }
  };
  disabledDate = current =>
    // Can not select days before today
    current && current < moment().endOf('day');

  render() {
    const {
      form: { getFieldDecorator },
      notice: { init },
      submitting,
    } = this.props;

    const { category } = init;

    const uploadProps = {
      name: 'file',
      headers: {
        'Blade-Auth': getToken(),
      },
      // action: '/api/blade-contingencyplan/import-contingencyplan',
      action: 'http://106.14.40.94:8088/upload/upload',
    };

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };

    const action = (
      <Button type="primary" onClick={this.handleSubmit} loading={submitting}>
        <FormattedMessage id="button.submit.name" />
      </Button>
    );

    return (
      <Panel title={<FormattedMessage id="button.add.name" />} back="/desk/notice" action={action}>
        <Form hideRequiredMark style={{ marginTop: 8 }}>
          <Card bordered={false}>
            <FormItem {...formItemLayout} label={<FormattedMessage id="desk.notice.name" />}>
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'desk.notice.title.validation' }),
                  },
                ],
              })(<Input placeholder={formatMessage({ id: 'desk.notice.title.placeholder' })} />)}
            </FormItem>
            <FormItem {...formItemLayout} label={<FormattedMessage id="desk.notice.province_name" />}>
              {getFieldDecorator('provinceName', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'desk.notice.category.validation' }),
                  },
                ],
              })(<Cascader options={cityArray} onChange={this.onChange} placeholder={formatMessage({ id: 'desk.notice.category.placeholder' })} />)}
            </FormItem>
            <FormItem {...formItemLayout} label={<FormattedMessage id="desk.notice.location" />}>
              {getFieldDecorator('location', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'desk.notice.location.validation' }),
                  },
                ],
              })(<Input placeholder={formatMessage({ id: 'desk.notice.location.placeholder' })} />)}
            </FormItem>
            <FormItem {...formItemLayout} label={<FormattedMessage id="desk.notice.lat" />}>
              {getFieldDecorator('lat', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'desk.notice.title.validation' }),
                  },
                ],
              })(<Input placeholder="请输入lat"/>)}
            </FormItem>
            <FormItem {...formItemLayout} label={<FormattedMessage id="desk.notice.lng" />}>
              {getFieldDecorator('lng', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'desk.notice.title.validation' }),
                  },
                ],
              })(<Input placeholder="请输入lng"/>)}
            </FormItem>
            <FormItem {...formItemLayout} label={<FormattedMessage id="desk.notice.logo_low" />}>
              {getFieldDecorator('logoLow', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'desk.notice.logo_low.validation' }),
                  },
                ],
              })(<Dragger {...uploadProps} onChange={this.onUpload}>
                <p className="ant-upload-drag-icon">
                  <Icon type="inbox" />
                </p>
                <p className="ant-upload-text">将文件拖到此处，或点击上传</p>
                <p className="ant-upload-hint">请上传 .png,.jpg 格式的文件</p>
              </Dragger>)}
            </FormItem>
            <FormItem {...formItemLayout} label={<FormattedMessage id="desk.notice.logo_high" />}>
              {getFieldDecorator('logoHigh', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'desk.notice.logo_high.validation' }),
                  },
                ],
              })(<Dragger {...uploadProps} onChange={this.onUpload}>
                <p className="ant-upload-drag-icon">
                  <Icon type="inbox" />
                </p>
                <p className="ant-upload-text">将文件拖到此处，或点击上传</p>
                <p className="ant-upload-hint">请上传 .png,.jpg 格式的文件</p>
              </Dragger>)}
            </FormItem>
            <FormItem {...formItemLayout} label={<FormattedMessage id="desk.notice.imgs" />}>
              {getFieldDecorator('imgs', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'desk.notice.imgs.validation' }),
                  },
                ],
              })(<Dragger {...uploadProps} onChange={this.onUpload}>
                <p className="ant-upload-drag-icon">
                  <Icon type="inbox" />
                </p>
                <p className="ant-upload-text">将文件拖到此处，或点击上传</p>
                <p className="ant-upload-hint">请上传 .png,.jpg 格式的文件</p>
              </Dragger>)}
            </FormItem>
            <FormItem {...formItemLayout} label={<FormattedMessage id="desk.notice.username" />}>
              {getFieldDecorator('username', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'desk.notice.username.validation' }),
                  },
                ],
              })(<Input placeholder={formatMessage({ id: 'desk.notice.username.placeholder' })} />)}
            </FormItem>
            <FormItem {...formItemLayout} label={<FormattedMessage id="desk.notice.pwd" />}>
              {getFieldDecorator('pwd', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'desk.notice.pwd.validation' }),
                  },
                ],
              })(<Input placeholder={formatMessage({ id: 'desk.notice.pwd.placeholder' })} />)}
            </FormItem>
            <FormItem {...formItemLayout} label={<FormattedMessage id="desk.notice.description" />}>
              {getFieldDecorator('description', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'desk.notice.description.validation' }),
                  },
                ],
              })(
                <TextArea
                  style={{ minHeight: 32 }}
                  placeholder={formatMessage({ id: 'desk.notice.description.placeholder' })}
                  rows={10}
                />
              )}
            </FormItem>
          </Card>
        </Form>
      </Panel>
    );
  }
}

export default NoticeAdd;
