import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Button, Col, Form, Input, Row } from 'antd';
import Panel from '../../../components/Panel';
import Grid from '../../../components/Sword/Grid';
import { COMMONRESOURCE_LIST } from '../../../actions/commonresource';

const FormItem = Form.Item;

@connect(({ commonresource, loading }) => ({
  commonresource,
  loading: loading.models.commonresource,
}))
@Form.create()
class CommonResource extends PureComponent {
  // ============ 查询 ===============
  handleSearch = params => {
    const { dispatch } = this.props;
    dispatch(COMMONRESOURCE_LIST(params));
  };

  // ============ 查询表单 ===============
  renderSearchForm = onReset => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    return (
      <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
        <Col md={8} sm={24}>
          <FormItem label="菜单编号">
            {getFieldDecorator('code')(<Input placeholder="请输入菜单编号" />)}
          </FormItem>
        </Col>
        <Col md={8} sm={24}>
          <FormItem label="菜单名称">
            {getFieldDecorator('name')(<Input placeholder="请输入菜单名称" />)}
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
    const code = 'commonresource';

    const {
      form,
      loading,
      commonresource: { data },
    } = this.props;

    const columns = [
      {
        title: '菜单名称',
        dataIndex: 'name',
      },
      {
        title: '菜单编号',
        dataIndex: 'code',
      },
      {
        title: '菜单别名',
        dataIndex: 'alias',
      },
      {
        title: '路由地址',
        dataIndex: 'path',
      },
      {
        title: '排序',
        dataIndex: 'sort',
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
export default CommonResource;
