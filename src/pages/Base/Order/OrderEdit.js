import React, { PureComponent } from 'react';
import { Form, Input, Card, Select, Button, DatePicker } from 'antd';
import { formatMessage, FormattedMessage } from 'umi/locale';
import { connect } from 'dva';
import moment from 'moment';
import Panel from '../../../components/Panel';
import { ORDER_INIT, ORDER_DETAIL, ORDER_SUBMIT } from '../../../actions/order';
import func from '../../../utils/Func';

const FormItem = Form.Item;
const { TextArea } = Input;

@connect(({ order, loading }) => ({
  order,
  submitting: loading.effects['order/submit'],
}))
@Form.create()
class OrderAdd extends PureComponent {
  componentWillMount() {
    const {
      dispatch,
      match: {
        params: { id },
      },
    } = this.props;
    dispatch(ORDER_INIT());
    dispatch(ORDER_DETAIL(id));
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
      dispatch(ORDER_SUBMIT(params));
    });
  };

  disabledDate = current =>
    // Can not select days before today
    current && current < moment().endOf('day');

  render() {
    const {
      form: { getFieldDecorator },
      order: { init, detail },
      submitting,
    } = this.props;

    const { category } = init;

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
      <Panel title={<FormattedMessage id="button.edit.name" />} back="/desk/order" action={action}>
        <Card bordered={false}>
          <Form hideRequiredMark style={{ marginTop: 8 }}>
            <FormItem {...formItemLayout} label={<FormattedMessage id="desk.order.title" />}>
              {getFieldDecorator('title', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'desk.order.title.validation' }),
                  },
                ],
                initialValue: detail.title,
              })(<Input placeholder={formatMessage({ id: 'desk.order.title.placeholder' })} />)}
            </FormItem>
            <FormItem {...formItemLayout} label={<FormattedMessage id="desk.order.category" />}>
              {getFieldDecorator('category', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'desk.order.category.validation' }),
                  },
                ],
                initialValue: detail.category,
              })(
                <Select placeholder={formatMessage({ id: 'desk.order.category.placeholder' })}>
                  {category.map(d => (
                    <Select.Option key={d.dictKey} value={d.dictKey}>
                      {d.dictValue}
                    </Select.Option>
                  ))}
                </Select>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label={<FormattedMessage id="desk.order.date" />}>
              {getFieldDecorator('releaseTime', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'desk.order.date.validation' }),
                  },
                ],
                initialValue: moment(detail.releaseTime, 'YYYY-MM-DD HH:mm:ss'),
              })(
                <DatePicker
                  style={{ width: '100%' }}
                  format="YYYY-MM-DD HH:mm:ss"
                  disabledDate={this.disabledDate}
                  showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label={<FormattedMessage id="desk.order.content" />}>
              {getFieldDecorator('content', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'desk.order.content.validation' }),
                  },
                ],
                initialValue: detail.content,
              })(
                <TextArea
                  style={{ minHeight: 32 }}
                  placeholder={formatMessage({ id: 'desk.order.content.placeholder' })}
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

export default OrderAdd;
