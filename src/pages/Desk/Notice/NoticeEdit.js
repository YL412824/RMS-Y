import React, { PureComponent } from 'react';
import { Form, Input, Icon, Card, Select, Button, DatePicker, Cascader, Upload,   } from 'antd';
import { formatMessage, FormattedMessage } from 'umi/locale';
import { connect } from 'dva';
import moment from 'moment';
import Panel from '../../../components/Panel';
import { NOTICE_INIT, NOTICE_DETAIL, NOTICE_SUBMIT } from '../../../actions/notice';
import { getAccessToken, getToken } from '../../../utils/authority';
import func from '../../../utils/Func';
import  cityArray  from "./cities";

const FormItem = Form.Item;
const { TextArea } = Input;
const { Dragger } = Upload;

@connect(({ notice, loading }) => ({
  notice,
  submitting: loading.effects['notice/submit'],
}))
@Form.create()
class NoticeAdd extends PureComponent {
  componentWillMount() {
    const {
      dispatch,
      match: {
        params: { id },
      },
    } = this.props;
    dispatch(NOTICE_INIT());
    dispatch(NOTICE_DETAIL(id));
  }

  handleSubmit = e => {
    e.preventDefault();
    const {
      dispatch,
      match: {
        params: { id },
      },
      form,
    } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (err) return;
      const params = {
        id,
        ...values,
        releaseTime: func.format(values.releaseTime),
      };
      dispatch(NOTICE_SUBMIT(params));
    });
  };

  disabledDate = current =>
    // Can not select days before today
    current && current < moment().endOf('day');

  render() {
    const {
      form: { getFieldDecorator },
      notice: { init, detail },
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
      <Panel title={<FormattedMessage id="button.edit.name" />} back="/desk/notice" action={action}>
        <Card bordered={false}>
          <Form hideRequiredMark style={{ marginTop: 8 }}>

              <FormItem {...formItemLayout} label={<FormattedMessage id="desk.notice.name" />}>
                {getFieldDecorator('name', {
                  rules: [
                    {
                      required: true,
                      message: formatMessage({ id: 'desk.notice.title.validation' }),
                    },
                  ],
                  initialValue: detail.name,
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
                  initialValue: detail.provinceName,
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
                  initialValue: detail.location,
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
                  initialValue: detail.lat,
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
                  initialValue: detail.lng,
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
                  initialValue: detail.logoLow,
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
                  initialValue: detail.logoHigh,
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
                  initialValue: detail.imgs,
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
                  initialValue: detail.username,
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
                  initialValue: detail.pwd,
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
                  initialValue: detail.description,
                })(
                  <TextArea
                    style={{ minHeight: 32 }}
                    placeholder={formatMessage({ id: 'desk.notice.description.placeholder' })}
                    rows={10}
                  />
                )}
              </FormItem>

          </Form>
        </Card>
      </Panel>
    );
  }
}

export default NoticeAdd;
