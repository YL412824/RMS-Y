import React, { PureComponent } from 'react';
import { Form, Input, Card, Row, Col, Button, InputNumber, TreeSelect, message } from 'antd';
import { connect } from 'dva';
import Panel from '../../../components/Panel';
import styles from '../../../layouts/Sword.less';
import { AUDIENCE_DETAIL, AUDIENCE_INIT, AUDIENCE_SUBMIT } from '../../../actions/audience';

const FormItem = Form.Item;
const { TextArea } = Input;

@connect(({ audience, loading }) => ({
  audience,
  submitting: loading.effects['audience/submit'],
}))
@Form.create()
class AudienceEdit extends PureComponent {
  componentWillMount() {
    const {
      dispatch,
      match: {
        params: { id },
      },
    } = this.props;
    dispatch(AUDIENCE_DETAIL(id));
    dispatch(AUDIENCE_INIT());
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
    const parentId = form.getFieldValue('parentId');
    if (id === parentId.toString()) {
      message.warn('上级部门不能选择自身!');
      return;
    }
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const params = {
          id,
          ...values,
        };
        dispatch(AUDIENCE_SUBMIT(params));
      }
    });
  };

  onParentIdChange = (value, title) => {
    console.log(value);
    console.log(title);
  };

  render() {
    const {
      form: { getFieldDecorator },
      audience: {
        detail,
        init: { tree },
      },
      submitting,
    } = this.props;

    const formItemLayout = {
      labelCol: {
        span: 8,
      },
      wrapperCol: {
        span: 16,
      },
    };

    const formAllItemLayout = {
      labelCol: {
        span: 4,
      },
      wrapperCol: {
        span: 20,
      },
    };

    const action = (
      <Button type="primary" onClick={this.handleSubmit} loading={submitting}>
        提交
      </Button>
    );

    return (
      <Panel title="修改" back="/system/audience" action={action}>
        <Form hideRequiredMark style={{ marginTop: 8 }}>
          <Card title="基本信息" className={styles.card} bordered={false}>
            <Row gutter={24}>
              <Col span={10}>
                <FormItem {...formItemLayout} label="部门名称">
                  {getFieldDecorator('audienceName', {
                    rules: [
                      {
                        required: true,
                        message: '请输入部门名称',
                      },
                    ],
                    initialValue: detail.audienceName,
                  })(<Input placeholder="请输入部门名称" />)}
                </FormItem>
              </Col>
              <Col span={10}>
                <FormItem {...formItemLayout} label="部门全称">
                  {getFieldDecorator('fullName', {
                    rules: [
                      {
                        required: true,
                        message: '请输入部门全称',
                      },
                    ],
                    initialValue: detail.fullName,
                  })(<Input placeholder="请输入部门全称" />)}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={10}>
                <FormItem {...formItemLayout} label="上级部门">
                  {getFieldDecorator('parentId', {
                    initialValue: detail.parentId,
                  })(
                    <TreeSelect
                      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                      treeData={tree}
                      placeholder="请选择上级部门"
                      allowClear
                      showSearch
                      treeNodeFilterProp="title"
                      onChange={this.onParentIdChange}
                    />
                  )}
                </FormItem>
              </Col>
              <Col span={10}>
                <FormItem {...formItemLayout} className={styles.inputItem} label="部门排序">
                  {getFieldDecorator('sort', {
                    rules: [
                      {
                        required: true,
                        message: '请输入部门排序',
                      },
                    ],
                    initialValue: detail.sort,
                  })(<InputNumber placeholder="请输入部门排序" />)}
                </FormItem>
              </Col>
            </Row>
          </Card>
          <Card title="其他信息" className={styles.card} bordered={false}>
            <Row gutter={24}>
              <Col span={20}>
                <FormItem {...formAllItemLayout} label="部门备注">
                  {getFieldDecorator('remark', {
                    initialValue: detail.remark,
                  })(<TextArea rows={4} placeholder="请输入部门备注" />)}
                </FormItem>
              </Col>
            </Row>
          </Card>
        </Form>
      </Panel>
    );
  }
}

export default AudienceEdit;
