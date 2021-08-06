import React, { PureComponent } from 'react';
import { Form, Input, Icon, Card, Select, Button, DatePicker, Upload, Tree } from 'antd';
import { formatMessage, FormattedMessage } from 'umi/locale';
import { connect } from 'dva';
import moment from 'moment';
import Panel from '../../../components/Panel';
import { NOTICE_INIT, NOTICE_SUBMIT } from '../../../actions/notice';
import func from '../../../utils/Func';
import { getAccessToken, getToken } from '../../../utils/authority';

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

  handleSubmit = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (err) return;

      const params = {
        ...values,
        releaseTime: func.format(values.releaseTime),
      };

      dispatch(NOTICE_SUBMIT(params));
    });
  };


  onUpload = info => {
    const { status } = info.file;
    if (status !== 'uploading') {
      window.console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} 数据导入成功!`);
      this.handleExcelCancel();
      this.onClickReset();
    } else if (status === 'error') {
      message.error(`${info.file.response.msg}`);
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
      action: '/api/blade-contingencyplan/import-contingencyplan',
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
              {getFieldDecorator('province_name', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'desk.notice.title.validation' }),
                  },
                ],
              })(<Input placeholder={formatMessage({ id: 'desk.notice.title.placeholder' })} />)}
            </FormItem>
            <FormItem {...formItemLayout} label={<FormattedMessage id="desk.notice.province_code" />}>
              {getFieldDecorator('province_code', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'desk.notice.title.validation' }),
                  },
                ],
              })(<Input placeholder={formatMessage({ id: 'desk.notice.title.placeholder' })} />)}
            </FormItem>
            <FormItem {...formItemLayout} label={<FormattedMessage id="desk.notice.city_name" />}>
              {getFieldDecorator('city_name', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'desk.notice.title.validation' }),
                  },
                ],
              })(<Input placeholder={formatMessage({ id: 'desk.notice.title.placeholder' })} />)}
            </FormItem>
            <FormItem {...formItemLayout} label={<FormattedMessage id="desk.notice.city_code" />}>
              {getFieldDecorator('city_code', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'desk.notice.title.validation' }),
                  },
                ],
              })(<Input placeholder={formatMessage({ id: 'desk.notice.title.placeholder' })} />)}
            </FormItem>
            <FormItem {...formItemLayout} label={<FormattedMessage id="desk.notice.county_name" />}>
              {getFieldDecorator('county_name', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'desk.notice.title.validation' }),
                  },
                ],
              })(<Input placeholder={formatMessage({ id: 'desk.notice.title.placeholder' })} />)}
            </FormItem>
            <FormItem {...formItemLayout} label={<FormattedMessage id="desk.notice.county_code" />}>
              {getFieldDecorator('county_code', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'desk.notice.title.validation' }),
                  },
                ],
              })(<Input placeholder={formatMessage({ id: 'desk.notice.title.placeholder' })} />)}
            </FormItem>
            <FormItem {...formItemLayout} label={<FormattedMessage id="desk.notice.location" />}>
              {getFieldDecorator('location', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'desk.notice.title.validation' }),
                  },
                ],
              })(<Input placeholder={formatMessage({ id: 'desk.notice.title.placeholder' })} />)}
            </FormItem>
            <FormItem {...formItemLayout} label={<FormattedMessage id="desk.notice.lat" />}>
              {getFieldDecorator('lat', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'desk.notice.title.validation' }),
                  },
                ],
              })(<Input placeholder={formatMessage({ id: 'desk.notice.title.placeholder' })} />)}
            </FormItem>
            <FormItem {...formItemLayout} label={<FormattedMessage id="desk.notice.lng" />}>
              {getFieldDecorator('lng', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'desk.notice.title.validation' }),
                  },
                ],
              })(<Input placeholder={formatMessage({ id: 'desk.notice.title.placeholder' })} />)}
            </FormItem>
            <FormItem {...formItemLayout} label={<FormattedMessage id="desk.notice.logo_low" />}>
              {getFieldDecorator('logo_low', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'desk.notice.title.validation' }),
                  },
                ],
              })(<Dragger {...uploadProps} onChange={this.onUpload}>
                <p className="ant-upload-drag-icon">
                  <Icon type="inbox" />
                </p>
                <p className="ant-upload-text">将文件拖到此处，或点击上传</p>
                <p className="ant-upload-hint">请上传 .xls,.xlsx 格式的文件</p>
              </Dragger>)}
            </FormItem>
            <FormItem {...formItemLayout} label={<FormattedMessage id="desk.notice.logo_high" />}>
              {getFieldDecorator('logo_high', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'desk.notice.title.validation' }),
                  },
                ],
              })(<Input placeholder={formatMessage({ id: 'desk.notice.title.placeholder' })} />)}
            </FormItem>
            <FormItem {...formItemLayout} label={<FormattedMessage id="desk.notice.imgs" />}>
              {getFieldDecorator('imgs', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'desk.notice.title.validation' }),
                  },
                ],
              })(<Input placeholder={formatMessage({ id: 'desk.notice.title.placeholder' })} />)}
            </FormItem>
            <FormItem {...formItemLayout} label={<FormattedMessage id="desk.notice.username" />}>
              {getFieldDecorator('username', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'desk.notice.title.validation' }),
                  },
                ],
              })(<Input placeholder={formatMessage({ id: 'desk.notice.title.placeholder' })} />)}
            </FormItem>
            <FormItem {...formItemLayout} label={<FormattedMessage id="desk.notice.password" />}>
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'desk.notice.title.validation' }),
                  },
                ],
              })(<Input placeholder={formatMessage({ id: 'desk.notice.title.placeholder' })} />)}
            </FormItem>
            <FormItem {...formItemLayout} label={<FormattedMessage id="desk.notice.desc" />}>
              {getFieldDecorator('desc', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'desk.notice.desc.validation' }),
                  },
                ],
              })(
                <TextArea
                  style={{ minHeight: 32 }}
                  placeholder={formatMessage({ id: 'desk.notice.desc.placeholder' })}
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
