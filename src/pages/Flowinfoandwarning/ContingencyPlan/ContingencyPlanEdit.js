import React, { PureComponent } from 'react';
import { Form, Input, Card, Row, Col, Button, TreeSelect, DatePicker, Select } from 'antd';
import moment from 'moment';
import { connect } from 'dva';
import Panel from '../../../components/Panel';
import func from '../../../utils/Func';
import styles from '../../../layouts/Sword.less';
import { CONTINGENCYPLAN_CHANGE_INIT, CONTINGENCYPLAN_DETAIL, CONTINGENCYPLAN_UPDATE } from '../../../actions/contingencyplan';
import { tenantMode } from '../../../defaultSettings';

const FormItem = Form.Item;

@connect(({ contingencyplan, loading }) => ({
  contingencyplan,
  submitting: loading.effects['contingencyplan/submit'],
}))
@Form.create()
class ContingencyPlanEdit extends PureComponent {
  componentWillMount() {
    const {
      dispatch,
      match: {
        params: { id },
      },
    } = this.props;
    dispatch(CONTINGENCYPLAN_DETAIL(id)).then(() => {
      const {
        contingencyplan: { detail },
      } = this.props;
      dispatch(CONTINGENCYPLAN_CHANGE_INIT({ tenantId: detail.tenantId }));
    });
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
      if (!err) {
        const params = {
          id,
          ...values,
          roleId: func.join(values.roleId),
          deptId: func.join(values.deptId),
          postId: func.join(values.postId),
          birthday: func.format(values.birthday),
        };
        dispatch(CONTINGENCYPLAN_UPDATE(params));
      }
    });
  };

  handleChange = value => {
    const { dispatch, form } = this.props;
    form.resetFields(['roleId', 'deptId', 'postId']);
    dispatch(CONTINGENCYPLAN_CHANGE_INIT({ tenantId: value }));
  };

  render() {
    const {
      form: { getFieldDecorator },
      contingencyplan: {
        detail,
        init: { roleTree, deptTree, postList, tenantList },
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
        ??????
      </Button>
    );

    return (
      <Panel title="??????" back="/system/contingencyplan" action={action}>
        <Form hideRequiredMark style={{ marginTop: 8 }}>
          <Card title="????????????" className={styles.card} bordered={false}>
            <Row gutter={24}>
              <Col span={20}>
                <FormItem {...formAllItemLayout} label="????????????">
                  {getFieldDecorator('account', {
                    rules: [
                      {
                        required: true,
                        message: '?????????????????????',
                      },
                    ],
                    initialValue: detail.account,
                  })(<Input placeholder="?????????????????????" />)}
                </FormItem>
              </Col>
            </Row>
            {tenantMode ? (
              <Row gutter={24}>
                <Col span={20}>
                  <FormItem {...formAllItemLayout} label="????????????">
                    {getFieldDecorator('tenantId', {
                      rules: [
                        {
                          required: true,
                          message: '?????????????????????',
                        },
                      ],
                      initialValue: detail.tenantId,
                    })(
                      <Select
                        showSearch
                        onChange={this.handleChange}
                        filterOption={(input, option) =>
                          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        allowClear
                        placeholder="?????????????????????"
                      >
                        {tenantList.map(d => (
                          <Select.Option key={d.tenantId} value={d.tenantId}>
                            {d.tenantName}
                          </Select.Option>
                        ))}
                      </Select>
                    )}
                  </FormItem>
                </Col>
              </Row>
            ) : null}
            <Row gutter={24}>
              <Col span={10}>
                <FormItem {...formItemLayout} label="????????????">
                  {getFieldDecorator('name', {
                    rules: [
                      {
                        required: true,
                        message: '?????????????????????',
                      },
                    ],
                    initialValue: detail.name,
                  })(<Input placeholder="?????????????????????" />)}
                </FormItem>
              </Col>
              <Col span={10}>
                <FormItem {...formItemLayout} label="????????????">
                  {getFieldDecorator('realName', {
                    rules: [
                      {
                        required: true,
                        message: '?????????????????????',
                      },
                    ],
                    initialValue: detail.realName,
                  })(<Input placeholder="?????????????????????" />)}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={10}>
                <FormItem {...formItemLayout} label="????????????">
                  {getFieldDecorator('roleId', {
                    rules: [
                      {
                        required: true,
                        message: '?????????????????????',
                      },
                    ],
                    initialValue: func.split(detail.roleId),
                  })(
                    <TreeSelect
                      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                      treeData={roleTree}
                      allowClear
                      showSearch
                      treeNodeFilterProp="title"
                      multiple
                      placeholder="?????????????????????"
                    />
                  )}
                </FormItem>
              </Col>
              <Col span={10}>
                <FormItem {...formItemLayout} label="????????????">
                  {getFieldDecorator('deptId', {
                    rules: [
                      {
                        required: true,
                        message: '?????????????????????',
                      },
                    ],
                    initialValue: func.split(detail.deptId),
                  })(
                    <TreeSelect
                      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                      treeData={deptTree}
                      allowClear
                      showSearch
                      treeNodeFilterProp="title"
                      multiple
                      placeholder="?????????????????????"
                    />
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={10}>
                <FormItem {...formItemLayout} label="????????????">
                  {getFieldDecorator('code', {
                    initialValue: detail.code,
                  })(<Input placeholder="?????????????????????" />)}
                </FormItem>
              </Col>
              <Col span={10}>
                <FormItem {...formItemLayout} label="????????????">
                  {getFieldDecorator('postId', {
                    rules: [
                      {
                        required: true,
                        message: '?????????????????????',
                      },
                    ],
                    initialValue: func.split(detail.postId),
                  })(
                    <Select
                      mode="multiple"
                      showSearch
                      filterOption={(input, option) =>
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                      }
                      allowClear
                      placeholder="?????????????????????"
                    >
                      {postList.map(d => (
                        <Select.Option key={d.id} value={d.id}>
                          {d.postName}
                        </Select.Option>
                      ))}
                    </Select>
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={10}>
                <FormItem {...formItemLayout} label="????????????">
                  {getFieldDecorator('phone', {
                    initialValue: detail.phone,
                  })(<Input placeholder="?????????????????????" />)}
                </FormItem>
              </Col>
              <Col span={10}>
                <FormItem {...formItemLayout} label="????????????">
                  {getFieldDecorator('email', {
                    initialValue: detail.email,
                  })(<Input placeholder="?????????????????????" />)}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={10}>
                <FormItem {...formItemLayout} label="????????????">
                  {getFieldDecorator('sex', {
                    initialValue: detail.sex,
                  })(
                    <Select placeholder="?????????????????????">
                      <Select.Option key={1} value={1}>
                        ???
                      </Select.Option>
                      <Select.Option key={2} value={2}>
                        ???
                      </Select.Option>
                      <Select.Option key={3} value={3}>
                        ??????
                      </Select.Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col span={10}>
                <FormItem {...formItemLayout} label="????????????">
                  {getFieldDecorator('birthday', {
                    initialValue: func.moment(detail.birthday),
                  })(
                    <DatePicker
                      style={{ width: '100%' }}
                      format="YYYY-MM-DD HH:mm:ss"
                      showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                      placeholder="?????????????????????"
                    />
                  )}
                </FormItem>
              </Col>
            </Row>
          </Card>
        </Form>
      </Panel>
    );
  }
}

export default ContingencyPlanEdit;
