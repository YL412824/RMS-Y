import React, { PureComponent } from 'react';
import { Form, Input, Card, Row, Col, Button, InputNumber, TreeSelect } from 'antd';
import { connect } from 'dva';
import Panel from '../../../components/Panel';
import styles from '../../../layouts/Sword.less';
import func from '../../../utils/Func';
import { AUDIENCE_INIT, AUDIENCE_SUBMIT, AUDIENCE_DETAIL, AUDIENCE_CLEAR_DETAIL } from '../../../actions/audience';

const FormItem = Form.Item;
const { TextArea } = Input;

@connect(({ audience, loading }) => ({
  audience,
  submitting: loading.effects['audience/submit'],
}))
@Form.create()
class AudienceAdd extends PureComponent {
  componentWillMount() {
    const {
      dispatch,
      match: {
        params: { id },
      },
    } = this.props;
    if (func.notEmpty(id)) {
      dispatch(AUDIENCE_DETAIL(id));
    } else {
      dispatch(AUDIENCE_CLEAR_DETAIL());
    }
    dispatch(AUDIENCE_INIT());
  }

  handleSubmit = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch(AUDIENCE_SUBMIT(values));
      }
    });
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
      <Panel title="新增" back="/system/audience" action={action}>
        <Form hideRequiredMark style={{ marginTop: 8 }}>
          <Card title="基本信息" className={styles.card} bordered={false}>
            <Row gutter={24}>
              <Col span={10}>
                <FormItem {...formItemLayout} label="部门简称">
                  {getFieldDecorator('audienceName', {
                    rules: [
                      {
                        required: true,
                        message: '请输入部门简称',
                      },
                    ],
                  })(<Input placeholder="请输入部门简称" />)}
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
                  })(<Input placeholder="请输入部门全称" />)}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={10}>
                <FormItem {...formItemLayout} label="上级部门">
                  {getFieldDecorator('parentId', {
                    initialValue: detail.id,
                  })(
                    <TreeSelect
                      disabled={func.notEmpty(detail.id)}
                      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                      treeData={tree}
                      allowClear
                      showSearch
                      treeNodeFilterProp="title"
                      placeholder="请选择上级部门"
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
                    initialValue: detail.nextSort,
                  })(<InputNumber placeholder="请输入部门排序" />)}
                </FormItem>
              </Col>
            </Row>
          </Card>
          <Card title="其他信息" className={styles.card} bordered={false}>
            <Row gutter={24}>
              <Col span={20}>
                <FormItem {...formAllItemLayout} label="部门备注">
                  {getFieldDecorator('remark')(<TextArea rows={4} placeholder="请输入部门备注" />)}
                </FormItem>
              </Col>
            </Row>
          </Card>
        </Form>
      </Panel>
    );
  }
}

export default AudienceAdd;
