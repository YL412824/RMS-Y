import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Button, Col, Form, Input, Row } from 'antd';
import Panel from '../../../components/Panel';
import Grid from '../../../components/Sword/Grid';
import { AUDIENCE_LIST } from '../../../actions/audience';
import { tenantMode } from '../../../defaultSettings';

const FormItem = Form.Item;

@connect(({ audience, loading }) => ({
  audience,
  loading: loading.models.audience,
}))
@Form.create()
class Audience extends PureComponent {
  // ============ 查询 ===============
  handleSearch = params => {
    const { dispatch } = this.props;
    dispatch(AUDIENCE_LIST(params));
  };

  // ============ 查询表单 ===============
  renderSearchForm = onReset => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    return (
      <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
        <Col md={6} sm={24}>
          <FormItem label="部门名称">
            {getFieldDecorator('audienceName')(<Input placeholder="请输入部门名称" />)}
          </FormItem>
        </Col>
        <Col md={6} sm={24}>
          <FormItem label="租户ID">
            {getFieldDecorator('tenantId')(<Input placeholder="请输入角色名称" />)}
          </FormItem>
        </Col>
        <Col md={6} sm={24}>
          <FormItem label="部门全称">
            {getFieldDecorator('fullName')(<Input placeholder="请输入部门全称" />)}
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
    const code = 'audience';

    const {
      form,
      loading,
      audience: { data },
    } = this.props;

    const columns = [
      {
        title: '租户ID',
        dataIndex: 'tenantId',
      },
      {
        title: '部门名称',
        dataIndex: 'audienceName',
      },
      {
        title: '部门全称',
        dataIndex: 'fullName',
      },
      {
        title: '排序',
        dataIndex: 'sort',
      },
    ];

    if (!tenantMode) {
      columns.splice(0, 1);
    }

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
export default Audience;
