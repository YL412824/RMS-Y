import React, { PureComponent } from 'react';
import { Form, Input, Card, Button } from 'antd';
import { connect } from 'dva';
import Panel from '../../../components/Panel';
import styles from '../../../layouts/Sword.less';
import { TOURROUTES_DETAIL, TOURROUTES_SUBMIT } from '../../../actions/tourroutes';

const FormItem = Form.Item;
const { TextArea } = Input;

@connect(({ tourroutes, loading }) => ({
  tourroutes,
  submitting: loading.effects['tourroutes/submit'],
}))
@Form.create()
class TourroutesAdd extends PureComponent {
  componentWillMount() {
    const {
      dispatch,
      match: {
        tourroutess: { id },
      },
    } = this.props;
    dispatch(TOURROUTES_DETAIL(id));
  }

  handleSubmit = e => {
    e.preventDefault();
    const {
      dispatch,
      match: {
        tourroutess: { id },
      },
      form,
    } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const tourroutess = {
          id,
          ...values,
        };
        console.log(tourroutess);
        dispatch(TOURROUTES_SUBMIT(tourroutess));
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
      tourroutes: { detail },
      submitting,
    } = this.props;

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
        提交
      </Button>
    );

    return (
      <Panel title="修改" back="/system/tourroutes" action={action}>
        <Form hideRequiredMark style={{ marginTop: 8 }}>
          <Card title="基本信息" className={styles.card} bordered={false}>
            <FormItem {...formItemLayout} label="参数名称">
              {getFieldDecorator('tourroutesName', {
                rules: [
                  {
                    required: true,
                    message: '请输入参数名称',
                  },
                ],
                initialValue: detail.tourroutesName,
              })(<Input placeholder="请输入参数名称" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="参数键名">
              {getFieldDecorator('tourroutesKey', {
                rules: [
                  {
                    required: true,
                    message: '请输入参数键名',
                  },
                ],
                initialValue: detail.tourroutesKey,
              })(<Input placeholder="请输入参数键名" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="参数键值">
              {getFieldDecorator('tourroutesValue', {
                rules: [
                  {
                    required: true,
                    message: '请输入参数键值',
                  },
                ],
                initialValue: detail.tourroutesValue,
              })(<Input placeholder="请输入参数键值" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="参数描述">
              {getFieldDecorator('remark', { initialValue: detail.tourroutesValue })(
                <TextArea placeholder="请输入参数描述" />
              )}
            </FormItem>
          </Card>
        </Form>
      </Panel>
    );
  }
}

export default TourroutesAdd;
