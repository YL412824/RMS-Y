import React, { PureComponent } from 'react';
import {
  Form,
  Input,
  Card,
  Row,
  Col,
  Button,
  InputNumber,
  TreeSelect,
  Radio,
  Icon,
  Modal,
} from 'antd';
import { connect } from 'dva';
import Panel from '../../../components/Panel';
import styles from '../../../layouts/Sword.less';
import func from '../../../utils/Func';
import { COMMONRESOURCE_INIT, COMMONRESOURCE_SUBMIT, COMMONRESOURCE_DETAIL, COMMONRESOURCE_CLEAR_DETAIL } from '../../../actions/commonresource';
import IconPreview from '../../../components/IconPreview';

const FormItem = Form.Item;
const { TextArea, Search } = Input;
const RadioGroup = Radio.Group;

@connect(({ commonresource, loading }) => ({
  commonresource,
  submitting: loading.effects['commonresource/submit'],
}))
@Form.create()
class CommonResourceAdd extends PureComponent {
  state = { visible: false };

  componentWillMount() {
    const {
      dispatch,
      match: {
        params: { id },
      },
    } = this.props;
    if (func.notEmpty(id)) {
      dispatch(COMMONRESOURCE_DETAIL(id));
    } else {
      dispatch(COMMONRESOURCE_CLEAR_DETAIL());
    }
    dispatch(COMMONRESOURCE_INIT());
  }

  handleSubmit = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch(COMMONRESOURCE_SUBMIT(values));
      }
    });
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
      commonresource: {
        detail,
        init: { tree },
      },
      submitting,
    } = this.props;

    const { visible } = this.state;

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
      <Panel title="??????" back="/system/commonresource" action={action}>
        <Form hideRequiredMark style={{ marginTop: 8 }}>
          <Card title="????????????" className={styles.card} bordered={false}>
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
                  })(<Input placeholder="?????????????????????" />)}
                </FormItem>
              </Col>
              <Col span={10}>
                <FormItem {...formItemLayout} label="????????????">
                  {getFieldDecorator('path', {
                    rules: [
                      {
                        required: true,
                        message: '?????????????????????',
                      },
                    ],
                  })(<Input min={0} placeholder="?????????????????????" />)}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={10}>
                <FormItem {...formItemLayout} label="????????????">
                  {getFieldDecorator('parentId', {
                    initialValue: detail.category === 2 ? detail.parentId : detail.id,
                  })(
                    <TreeSelect
                      disabled={func.notEmpty(detail.id)}
                      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                      treeData={tree}
                      allowClear
                      showSearch
                      treeNodeFilterProp="title"
                      placeholder="?????????????????????"
                    />
                  )}
                </FormItem>
              </Col>
              <Col span={10}>
                <FormItem {...formItemLayout} label="????????????">
                  {getFieldDecorator('source', {
                    initialValue: detail.source,
                  })(
                    <Search
                      prefix={
                        <Icon type={func.isEmpty(detail.source) ? 'setting' : detail.source} />
                      }
                      placeholder="?????????????????????"
                      onSearch={this.showModal}
                      enterButton
                    />
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={10}>
                <FormItem {...formItemLayout} label="????????????">
                  {getFieldDecorator('code', {
                    rules: [
                      {
                        required: true,
                        message: '?????????????????????',
                      },
                    ],
                    initialValue: detail.nextSort,
                  })(<Input placeholder="?????????????????????" />)}
                </FormItem>
              </Col>
              <Col span={10}>
                <FormItem {...formItemLayout} label="????????????">
                  {getFieldDecorator('category', {
                    rules: [
                      {
                        required: true,
                        message: '?????????????????????',
                      },
                    ],
                    initialValue: 1,
                  })(
                    <RadioGroup name="category">
                      <Radio value={1}>??????</Radio>
                      <Radio value={2}>??????</Radio>
                    </RadioGroup>
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={10}>
                <FormItem {...formItemLayout} label="????????????">
                  {getFieldDecorator('alias', {
                    rules: [
                      {
                        required: true,
                        message: '?????????????????????',
                      },
                    ],
                    initialValue: detail.nextSort,
                  })(<Input placeholder="?????????????????????" />)}
                </FormItem>
              </Col>
              <Col span={10}>
                <FormItem {...formItemLayout} label="????????????">
                  {getFieldDecorator('action', {
                    rules: [
                      {
                        required: true,
                        message: '?????????????????????',
                      },
                    ],
                    initialValue: 1,
                  })(
                    <RadioGroup name="action">
                      <Radio value={1}>?????????</Radio>
                      <Radio value={2}>?????????</Radio>
                      <Radio value={3}>???????????????</Radio>
                    </RadioGroup>
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={10}>
                <FormItem {...formItemLayout} className={styles.inputItem} label="????????????">
                  {getFieldDecorator('sort', {
                    rules: [
                      {
                        required: true,
                        message: '?????????????????????',
                      },
                    ],
                    initialValue: detail.nextSort,
                  })(<InputNumber placeholder="?????????????????????" />)}
                </FormItem>
              </Col>
              <Col span={10}>
                <FormItem {...formItemLayout} label="???????????????">
                  {getFieldDecorator('isOpen', {
                    rules: [
                      {
                        required: true,
                        message: '??????????????????????????????',
                      },
                    ],
                    initialValue: 1,
                  })(
                    <RadioGroup name="isOpen">
                      <Radio value={1}>???</Radio>
                      <Radio value={2}>???</Radio>
                    </RadioGroup>
                  )}
                </FormItem>
              </Col>
            </Row>
          </Card>
          <Card title="????????????" className={styles.card} bordered={false}>
            <Row gutter={24}>
              <Col span={20}>
                <FormItem {...formAllItemLayout} label="????????????">
                  {getFieldDecorator('remark')(<TextArea rows={4} placeholder="?????????????????????" />)}
                </FormItem>
              </Col>
            </Row>
          </Card>
        </Form>
        <Modal width={900} visible={visible} onCancel={this.handleCancel} footer={null}>
          <IconPreview onCancel={this.handleCancel} />
        </Modal>
      </Panel>
    );
  }
}

export default CommonResourceAdd;
