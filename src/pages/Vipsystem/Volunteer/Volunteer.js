import React, { Fragment, PureComponent } from 'react';
import { connect } from 'dva';
import { Button, Col, Divider, Form, Input, message, Modal, Row, Tag } from 'antd';
import Panel from '../../../components/Panel';
import { VOLUNTEER_LIST } from '../../../actions/volunteer';
import Grid from '../../../components/Sword/Grid';
import { reportUrl } from '../../../defaultSettings';
import { remove } from '../../../services/volunteer';

const FormItem = Form.Item;

@connect(({ volunteer, loading }) => ({
  volunteer,
  loading: loading.models.volunteer,
}))
@Form.create()
class Volunteer extends PureComponent {
  state = {
    params: {},
  };

  // ============ 查询 ===============
  handleSearch = params => {
    const { dispatch } = this.props;
    this.setState({ params });
    dispatch(VOLUNTEER_LIST(params));
  };

  handleRemove = id => {
    const { params } = this.state;
    const refresh = this.handleSearch;
    Modal.confirm({
      title: '删除确认',
      content: '确定删除该条记录?',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        remove({ ids: id }).then(resp => {
          if (resp.success) {
            message.success(resp.msg);
            refresh(params);
          } else {
            message.error(resp.msg || '删除失败');
          }
        });
      },
      onCancel() {},
    });
  };

  handleDesign = name => {
    window.open(`${reportUrl}/designer?_u=blade-${name}`);
  };

  handlePreview = name => {
    window.open(`${reportUrl}/preview?_u=blade-${name}`);
  };

  // ============ 查询表单 ===============
  renderSearchForm = onReset => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    return (
      <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
        <Col md={6} sm={24}>
          <FormItem label="查询文件名">
            {getFieldDecorator('name')(<Input placeholder="查询文件名" />)}
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

  renderActionButton = (keys, rows) => (
    <Fragment key="copy">
      <a
        onClick={() => {
          this.handleRemove(keys[0]);
        }}
      >
        删除
      </a>
      <Divider type="vertical" />
      <a
        onClick={() => {
          this.handleDesign(rows[0].name);
        }}
      >
        设计
      </a>
      <Divider type="vertical" />
      <a
        onClick={() => {
          this.handlePreview(rows[0].name);
        }}
      >
        预览
      </a>
    </Fragment>
  );

  render() {
    const code = 'volunteer';

    const {
      form,
      loading,
      volunteer: { data },
    } = this.props;

    
    const columns = [
      {
        title: '用户身份名称',
        dataIndex: 'type_name',
      },
      {
        title: '博物馆名称',
        dataIndex: 'museum_name',
      },
      {
        title: '用户名',
        dataIndex: 'username',
      },
      {
        title: '密码',
        dataIndex: 'password',
      },
      {
        title: '创建人名称',
        dataIndex: 'create_name',
      },
      {
        title: '创建时间',
        dataIndex: 'create_time',
      },
      {
        title: '修改人名称',
        dataIndex: 'update_name',
      },
      {
        title: '审核状态',
        dataIndex: 'audit_state',
      },
      {
        title: '审核人名称',
        dataIndex: 'audit_name',
      },
    ];

    return (
      <Panel>
        <Grid
          code={code}
          form={form}
          onSearch={this.handleSearch}
          renderSearchForm={this.renderSearchForm}
          renderActionButton={this.renderActionButton}
          loading={loading}
          data={data}
          columns={columns}
        />
      </Panel>
    );
  }
}
export default Volunteer;
