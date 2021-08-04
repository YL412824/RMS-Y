import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Button, Col, Form, Input, Row } from 'antd';
import Panel from '../../../components/Panel';
import { TOURROUTES_LIST } from '../../../actions/tourroutes';
import Grid from '../../../components/Sword/Grid';

const FormItem = Form.Item;

@connect(({ tourroutes, loading }) => ({
  tourroutes,
  loading: loading.models.tourroutes,
}))
@Form.create()
class Tourroutes extends PureComponent {
  // ============ 查询 ===============
  handleSearch = tourroutess => {
    const { dispatch } = this.props;
    dispatch(TOURROUTES_LIST(tourroutess));
  };

  // ============ 查询表单 ===============
  renderSearchForm = onReset => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    return (
      <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
        <Col md={6} sm={24}>
          <FormItem label="参数名称">
            {getFieldDecorator('tourroutesName')(<Input placeholder="请输入参数名称" />)}
          </FormItem>
        </Col>
        <Col md={6} sm={24}>
          <FormItem label="参数键名">
            {getFieldDecorator('tourroutesKey')(<Input placeholder="请输入参数键名" />)}
          </FormItem>
        </Col>
        <Col md={6} sm={24}>
          <FormItem label="参数键值">
            {getFieldDecorator('tourroutesValue')(<Input placeholder="请输入参数键值" />)}
          </FormItem>
        </Col>
        <Col>
          <div style={{ float: 'right' }}>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={onReset}>
              重置
            </Button>
          </div>
        </Col>
      </Row>
    );
  };

  render() {
    const code = 'tourroutes';

    const {
      form,
      loading,
      tourroutes: { data },
    } = this.props;

    const columns = [
      {
        title: '参数名称',
        dataIndex: 'tourroutesName',
      },
      {
        title: '参数键名',
        dataIndex: 'tourroutesKey',
      },
      {
        title: '参数键值',
        dataIndex: 'tourroutesValue',
      },
    ];

    return (
      <Panel>
        <Grid
          code={code}
          form={form}
          onSearch={this.handleSearch}
          renderSearchForm={this.renderSearchForm}
          loading={loading}
          data={data}
          columns={columns}
        />
      </Panel>
    );
  }
}
export default Tourroutes;
