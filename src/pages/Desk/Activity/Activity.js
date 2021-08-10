import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Button, Col, Form, Input, Row, Select, DatePicker } from 'antd';
import { formatMessage, FormattedMessage } from 'umi/locale';
import Panel from '../../../components/Panel';
import Grid from '../../../components/Sword/Grid';
import { ACTIVITY_INIT, ACTIVITY_LIST } from '../../../actions/activity';
import func from '../../../utils/Func';

const FormItem = Form.Item;
const { RangePicker } = DatePicker;

@connect(({ activity, loading }) => ({
  activity,
  loading: loading.models.activity,
}))
@Form.create()
class Activity extends PureComponent {
  // ============ 初始化数据 ===============
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(ACTIVITY_INIT());
  }

  // ============ 查询 ===============
  handleSearch = params => {
    const { dispatch } = this.props;

    const { dateRange } = params;

    const payload = {
      ...params,
      pages:1,
      // begin_date: dateRange ? func.format(dateRange[0], 'YYYY-MM-DD') : null,
      // end_date: dateRange ? func.format(dateRange[1], 'YYYY-MM-DD') : null,
    };

    payload.dateRange = null;
    delete payload.dateRange;
    delete payload.begin_date;
    delete payload.end_date;

    dispatch(ACTIVITY_LIST(payload));
  };

  // ============ 查询表单 ===============
  renderSearchForm = onReset => {
    const {
      form,
      activity: {
        init: { category },
      },
    } = this.props;
    const { getFieldDecorator } = form;

    return (
      <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
        <Col md={6} sm={24}>
          <FormItem label={<FormattedMessage id="desk.activity.category" />}>
            {getFieldDecorator('category')(
              <Select placeholder={formatMessage({ id: 'desk.activity.category.placeholder' })}>
                {category.map(d => (
                  <Select.Option key={d.dictKey} value={d.dictKey}>
                    {d.dictValue}
                  </Select.Option>
                ))}
              </Select>
            )}
          </FormItem>
        </Col>
        <Col md={6} sm={24}>
          <FormItem label={<FormattedMessage id="desk.museum.title" />}>
            {getFieldDecorator('title')(
              <Input placeholder={formatMessage({ id: 'desk.activity.title.placeholder' })} />
            )}
          </FormItem>
        </Col>
        <Col md={6} sm={24}>
          <FormItem label={<FormattedMessage id="desk.activity.date" />}>
            {getFieldDecorator('dateRange')(
              <RangePicker
                placeholder={[
                  formatMessage({ id: 'desk.activity.date.start' }),
                  formatMessage({ id: 'desk.activity.date.end' }),
                ]}
                style={{ width: '100%' }}
              />
            )}
          </FormItem>
        </Col>
        <Col>
          <div style={{ float: 'right' }}>
            <Button type="primary" htmlType="submit">
              <FormattedMessage id="button.search.name" />
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={onReset}>
              <FormattedMessage id="button.reset.name" />
            </Button>
          </div>
        </Col>
      </Row>
    );
  };

  render() {
    const code = 'activity';

    const {
      form,
      loading,
      activity: { data },
    } = this.props;

    const columns = [
      {
        title: formatMessage({ id: 'desk.activity.type_name' }),
        dataIndex: 'type_name',
      },
      {
        title: formatMessage({ id: 'desk.activity.location' }),
        dataIndex: 'location',
      },
      {
        title: formatMessage({ id: 'desk.activity.num' }),
        dataIndex: 'num',
      },
      {
        title: formatMessage({ id: 'desk.activity.title' }),
        dataIndex: 'title',
      },
      {
        title: formatMessage({ id: 'desk.activity.museum_name' }),
        dataIndex: 'museum_name',
      },
      {
        title: formatMessage({ id: 'desk.activity.start_time' }),
        dataIndex: 'start_time',
      },
      {
        title: formatMessage({ id: 'desk.activity.end_time' }),
        dataIndex: 'end_time',
      },
      {
        title: formatMessage({ id: 'desk.activity.link_name' }),
        dataIndex: 'link_name',
      },
      {
        title: formatMessage({ id: 'desk.activity.link_phone' }),
        dataIndex: 'link_phone',
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
export default Activity;
