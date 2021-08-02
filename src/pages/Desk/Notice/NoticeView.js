import React, { PureComponent } from 'react';
import { Form, Card, Button } from 'antd';
import router from 'umi/router';
import { FormattedMessage } from 'umi/locale';
import { connect } from 'dva';
import Panel from '../../../components/Panel';
import { NOTICE_DETAIL } from '../../../actions/notice';

const FormItem = Form.Item;

@connect(({ notice }) => ({
  notice,
}))
@Form.create()
class NoticeAdd extends PureComponent {
  componentWillMount() {
    const {
      dispatch,
      match: {
        params: { id },
      },
    } = this.props;
    dispatch(NOTICE_DETAIL(id));
  }

  handleEdit = () => {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    router.push(`/desk/notice/edit/${id}`);
  };

  render() {
    const {
      notice: { detail },
    } = this.props;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };

    const action = (
      <Button type="primary" onClick={this.handleEdit}>
        <FormattedMessage id="button.edit.name" />
      </Button>
    );

    return (
      <Panel title={<FormattedMessage id="button.view.name" />} back="/desk/notice" action={action}>
        <Card bordered={false}>
          <Form hideRequiredMark style={{ marginTop: 8 }}>
            <FormItem {...formItemLayout} label={<FormattedMessage id="desk.notice.museum_name" />}>
              <span>{detail.title}</span>
            </FormItem>
            <FormItem {...formItemLayout} label={<FormattedMessage id="desk.notice.location" />}>
              <span>{detail.categoryName}</span>
            </FormItem>
            <FormItem {...formItemLayout} label={<FormattedMessage id="desk.notice.create_name" />}>
              <span>{detail.releaseTime}</span>
            </FormItem>
            <FormItem {...formItemLayout} label={<FormattedMessage id="desk.notice.create_time" />}>
              <span>{detail.content}</span>
            </FormItem>
          </Form>
        </Card>
      </Panel>
    );
  }
}

export default NoticeAdd;
