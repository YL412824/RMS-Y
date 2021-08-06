import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Upload, Icon, Button, Col, Form, Input, message, Modal, Row, Tree } from 'antd';
import Panel from '../../../components/Panel';
import Grid from '../../../components/Sword/Grid';
import { USERS_INIT, USERS_LIST, USERS_ROLE_GRANT } from '../../../actions/users';
import { resetPassword } from '../../../services/users';
import { tenantMode } from '../../../defaultSettings';
import { getAccessToken, getToken } from '../../../utils/authority';

const FormItem = Form.Item;
const { TreeNode } = Tree;
const { Dragger } = Upload;

@connect(({ users, loading }) => ({
  users,
  loading: loading.models.users,
}))
@Form.create()
class Users extends PureComponent {
  state = {
    visible: false,
    excelVisible: false,
    confirmLoading: false,
    selectedRows: [],
    checkedTreeKeys: [],
    params: {},
    onReset: () => {},
  };

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(USERS_INIT());
  }

  onSelectRow = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  getSelectKeys = () => {
    const { selectedRows } = this.state;
    return selectedRows.map(row => row.id);
  };

  // ============ 查询 ===============
  handleSearch = params => {
    this.setState({ params });
    const { dispatch } = this.props;
    dispatch(USERS_LIST(params));
  };

  // ============ 处理按钮点击回调事件 ===============
  handleBtnCallBack = payload => {
    const { btn, keys } = payload;
    if (btn.code === 'users_role') {
      if (keys.length === 0) {
        message.warn('请先选择一条数据!');
        return;
      }
      this.showModal();
      return;
    }
    if (btn.code === 'users_reset') {
      if (keys.length === 0) {
        message.warn('请先选择一条数据!');
        return;
      }
      Modal.confirm({
        title: '重置密码确认',
        content: '确定将选择账号密码重置为123456?',
        okText: '确定',
        okType: 'danger',
        cancelText: '取消',
        async onOk() {
          const response = await resetPassword({ usersIds: keys });
          if (response.success) {
            message.success(response.msg);
          } else {
            message.error(response.msg || '重置失败');
          }
        },
        onCancel() {},
      });
    }
  };

  handleGrant = () => {
    const { checkedTreeKeys } = this.state;
    const keys = this.getSelectKeys();

    this.setState({
      confirmLoading: true,
    });

    const { dispatch } = this.props;
    dispatch(
      USERS_ROLE_GRANT({ usersIds: keys, roleIds: checkedTreeKeys.checked }, () => {
        this.setState({
          visible: false,
          confirmLoading: false,
        });
        message.success('配置成功');
        this.setState({
          checkedTreeKeys: [],
        });
      })
    );
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleCancel = () =>
    this.setState({
      visible: false,
    });

  onCheck = checkedTreeKeys => this.setState({ checkedTreeKeys });

  renderTreeNodes = data =>
    data.map(item => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode {...item} />;
    });

  // ============ 查询表单 ===============
  renderSearchForm = onReset => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    this.setState({
      onReset,
    });

    return (
      <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
        <Col md={6} sm={24}>
          <FormItem label="账号">
            {getFieldDecorator('account')(<Input placeholder="请输入账号" />)}
          </FormItem>
        </Col>
        <Col md={6} sm={24}>
          <FormItem label="姓名">
            {getFieldDecorator('realName')(<Input placeholder="请输入姓名" />)}
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

  onClickReset = () => {
    const { onReset } = this.state;
    onReset();
  };

  handleImport = () => {
    this.setState({
      excelVisible: true,
    });
  };

  handleExcelImport = () =>
    this.setState({
      excelVisible: false,
    });

  handleExcelCancel = () =>
    this.setState({
      excelVisible: false,
    });

  handleExport = () => {
    const { params } = this.state;
    Modal.confirm({
      title: '用户导出确认',
      content: '是否导出用户数据?',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        const account = params.account || '';
        const realName = params.realName || '';
        window.open(
          `/api/blade-users/export-users?blade-auth=${getAccessToken()}&account=${account}&realName=${realName}`
        );
      },
      onCancel() {},
    });
  };

  handleTemplate = () => {
    window.open(`/api/blade-users/export-template?blade-auth=${getAccessToken()}`);
  };

  onUpload = info => {
    const { status } = info.file;
    if (status !== 'uploading') {
      window.console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} 数据导入成功!`);
      this.handleExcelCancel();
      this.onClickReset();
    } else if (status === 'error') {
      message.error(`${info.file.response.msg}`);
    }
  };

  renderRightButton = () => (
    <div>
      <Button icon="vertical-align-bottom" onClick={this.handleImport}>
        导入
      </Button>
      <Button icon="vertical-align-top" onClick={this.handleExport} style={{ marginRight: 0 }}>
        导出
      </Button>
    </div>
  );

  render() {
    const code = 'users';

    const { visible, excelVisible, confirmLoading, checkedTreeKeys } = this.state;

    const {
      form,
      loading,
      users: {
        data,
        init: { roleTree },
      },
    } = this.props;

    const uploadProps = {
      name: 'file',
      headers: {
        'Blade-Auth': getToken(),
      },
      action: '/api/blade-users/import-users',
    };

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 16 },
      },
    };

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

    if (!tenantMode) {
      columns.splice(0, 1);
    }

    return (
      <Panel>
        <Grid
          code={code}
          form={form}
          onSearch={this.handleSearch}
          onSelectRow={this.onSelectRow}
          renderSearchForm={this.renderSearchForm}
          renderRightButton={this.renderRightButton}
          btnCallBack={this.handleBtnCallBack}
          loading={loading}
          data={data}
          columns={columns}
        />
        <Modal
          title="权限配置"
          width={350}
          visible={visible}
          confirmLoading={confirmLoading}
          onOk={this.handleGrant}
          onCancel={this.handleCancel}
          okText="确认"
          cancelText="取消"
        >
          <Tree checkable checkStrictly checkedKeys={checkedTreeKeys} onCheck={this.onCheck}>
            {this.renderTreeNodes(roleTree)}
          </Tree>
        </Modal>
        <Modal
          title="用户数据导入"
          width={500}
          visible={excelVisible}
          confirmLoading={confirmLoading}
          onOk={this.handleExcelImport}
          onCancel={this.handleExcelCancel}
          okText="确认"
          cancelText="取消"
        >
          <Form style={{ marginTop: 8 }} hideRequiredMark>
            <FormItem {...formItemLayout} label="模板上传">
              <Dragger {...uploadProps} onChange={this.onUpload}>
                <p className="ant-upload-drag-icon">
                  <Icon type="inbox" />
                </p>
                <p className="ant-upload-text">将文件拖到此处，或点击上传</p>
                <p className="ant-upload-hint">请上传 .xls,.xlsx 格式的文件</p>
              </Dragger>
            </FormItem>
            <FormItem {...formItemLayout} label="模板下载">
              <Button type="primary" icon="download" size="small" onClick={this.handleTemplate}>
                点击下载
              </Button>
            </FormItem>
          </Form>
        </Modal>
      </Panel>
    );
  }
}
export default Users;
