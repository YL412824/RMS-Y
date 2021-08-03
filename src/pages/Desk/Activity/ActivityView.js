import React, { PureComponent } from 'react';
import { Form, Card, Button } from 'antd';
import router from 'umi/router';
import { FormattedMessage } from 'umi/locale';
import { connect } from 'dva';
import Panel from '../../../components/Panel';
import { ACTIVITY_DETAIL } from '../../../actions/activity';

const FormItem = Form.Item;

@connect(({ activity }) => ({
  activity,
}))
@Form.create()
class ActivityAdd extends PureComponent {
  componentWillMount() {
    const {
      dispatch,
      match: {
        params: { id },
      },
    } = this.props;
    dispatch(ACTIVITY_DETAIL(id));
  }

  handleEdit = () => {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    router.push(`/desk/activity/edit/${id}`);
  };

  render() {
    const {
      activity: { detail },
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
      <Panel title={<FormattedMessage id="button.view.name" />} back="/desk/activity" action={action}>
        <Card bordered={false}>
          <Form hideRequiredMark style={{ marginTop: 8 }}>
            <FormItem {...formItemLayout} label={<FormattedMessage id="desk.activity.title" />}>
              <span>{detail.title}</span>
            </FormItem>
            <FormItem {...formItemLayout} label={<FormattedMessage id="desk.activity.category" />}>
              <span>{detail.categoryName}</span>
            </FormItem>
            <FormItem {...formItemLayout} label={<FormattedMessage id="desk.activity.date" />}>
              <span>{detail.releaseTime}</span>
            </FormItem>
            <FormItem {...formItemLayout} label={<FormattedMessage id="desk.activity.content" />}>
              <span>{detail.content}</span>
            </FormItem>
          </Form>
        </Card>
      </Panel>
    );
  }
}

export default ActivityAdd;
