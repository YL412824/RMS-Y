import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Button, Col, Form, Input, Row } from 'antd';
import Panel from '../../../components/Panel';
import { STAFFDISPATCH_LIST } from '../../../actions/staffdispatch';
import Grid from '../../../components/Sword/Grid';

const FormItem = Form.Item;

@connect(({ staffdispatch, loading }) => ({
  staffdispatch,
  loading: loading.models.staffdispatch,
}))
@Form.create()
class StaffDispatch extends PureComponent {
  // ============ 查询 ===============
  handleSearch = params => {
    const { dispatch } = this.props;
    dispatch(STAFFDISPATCH_LIST(params));
  };

  // ============ 查询表单 ===============
  renderSearchForm = onReset => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    return (
      <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
        <Col md={6} sm={24}>
          <FormItem label="查询名称">
            {getFieldDecorator('name')(<Input placeholder="查询名称" />)}
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
    const code = 'staffdispatch';

    const {
      form,
      loading,
      staffdispatch: { data },
    } = this.props;

    const columns = [
      {
        title: '名称',
        dataIndex: 'name',
      },
      {
        title: '驱动类',
        dataIndex: 'driverClass',
      },
      {
        title: '用户名',
        dataIndex: 'username',
      },
      {
        title: '备注',
        dataIndex: 'remark',
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
export default StaffDispatch;
