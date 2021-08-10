import React, { PureComponent } from 'react';
import { Icon, Upload, Row, Col, Form, Input, Card, Select, Button, DatePicker, message } from 'antd';
import { formatMessage, FormattedMessage } from 'umi/locale';
import { connect } from 'dva';
import moment from 'moment';
import Panel from '../../../components/Panel';
import { ACTIVITY_INIT, ACTIVITY_SUBMIT } from '../../../actions/activity';
import { getAccessToken, getToken } from '../../../utils/authority';
import func from '../../../utils/Func';
import styles from './Activity.less';

const FormItem = Form.Item;
const { TextArea } = Input;
const { Dragger } = Upload;
const { Option } = Select;

@connect(({ activity, loading }) => ({
  activity,
  submitting: loading.effects['activity/submit'],
}))
@Form.create()
class ActivityAdd extends PureComponent {
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(ACTIVITY_INIT());
  }

  // handleSubmit = e => {
  //   e.preventDefault();
  //   const { dispatch, form } = this.props;
  //   form.validateFieldsAndScroll((err, values) => {
  //     if (err) return;

  //     const params = {
  //       ...values,
  //       releaseTime: func.format(values.releaseTime),
  //     };

  //     dispatch(ACTIVITY_SUBMIT(params));
  //   });
  // };
  onChange = value => console.log(value)
  handleSubmit = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      let that = this;
      if (err) return;
      var imgarr = [];
      if(values.imgs.fileList.length>0){
        for(var i=0;i<values.imgs.fileList.length;i++){
          imgarr.push(values.imgs.fileList[i].response.res.path)
          // values.imgs.push(values.imgs.fileList[i].response.res.path)
        }
      }
      values.id = '';
      values.logoHigh = values.logoHigh.file.response.res.path;
      values.logoLow = values.logoLow.file.response.res.path;
      values.provinceCode = values.provinceName[0]
      values.cityCode = values.provinceName[1];
      values.countyCode = values.provinceName[2];
      values.provinceName = that.state.label[0].label;
      values.cityName = that.state.label[1].label;
      values.countyName = that.state.label[2].label;
      console.log(values.imgs);
      values.imgs ="" +imgarr+ "";
      console.log(values.imgs);
      console.log(values);
      const params = {
        ...values,
        releaseTime: func.format(values.releaseTime),
      };

      dispatch(ACYIVITY_SUBMIT(params));
    });
  };


  handleChange = (value) => {
    console.log(`selected ${value}`);
  }
  handleExcelCancel = () =>
    this.setState({
      excelVisible: false,
      onReset: () => {},
      value: '',
    });

  onChanget = (value,label) => {
    console.log(value);
    console.log(label);
    this.setState({ value,label });
  };
  onClickReset = () => {
    const { onReset } = this.state;
    onReset();
  };
  onUpload = info => {
    const { status } = info.file;
    if (status !== 'uploading') {
      window.console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      console.log(message);
      message.success(`${info.file.name} 数据导入成功!`);
      this.handleExcelCancel();
      this.onClickReset();
    } else if (status === 'error') {
      message.error(`${info.file.response}`);
    }
  };
  onUploads = info => {
    const { status } = info.file;
    if (status !== 'uploading') {
      window.console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      console.log(message);
      message.success(`${info.file.name} 数据导入成功!`);
      this.handleExcelCancel();
      this.onClickReset();
    } else if (status === 'error') {
      message.error(`${info.file.response}`);
    }
  };

  render() {
    const {
      form: { getFieldDecorator },
      activity: { init },
      submitting,
    } = this.props;

    const { category } = init;
    const uploadProps = {
      name: 'file',
      headers: {
        'Blade-Auth': getToken(),
      },
      // action: '/api/blade-contingencyplan/import-contingencyplan',
      action: 'http://106.14.40.94:8088/upload/upload',
    };
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
      <Button type="primary" onClick={this.handleSubmit} loading={submitting}>
        <FormattedMessage id="button.submit.name" />
      </Button>
    );
    const boxcontent = {
      background: '#EDEDED',
      width: 375,
      height:230,
      marginLeft: -10,
      marginTop: 11,
      padding:20,
      overflowY: 'scroll',
    }
    return (
      <Panel title={<FormattedMessage id="button.add.name" />} back="/desk/activity" action={action}>
        <div>
           <Row style={{background: '#fff'}}>
             <Col span={12} push={12}>
                <Form hideRequiredMark style={{ marginTop: 8 }}>
                  <Card bordered={false}>
                      <div  style={{width: '100%',background: '#fff',display: 'flex',justifyContent: 'center',alignItems: 'center',}}>                          <img style={{width: 375,minHeight: 403,display: 'inline-block',height: 'auto',maxWidth: '100%',maxHeight: 320}} loading="lazy" src="http://106.14.40.94:8088/file/1628565640151_84c3.png" />                          <div style={{background: '#fff',position: 'absolute',width:375,top:130,paddingLeft:10}}>
                            <img style={{width:355,height:199,marginBottom: 10,}} src='http://106.14.40.94:8088/file/1628566806894_3601.png' />
                            <h3>子慕予裳——汉服体验</h3>
                            <span style={{display: 'block',width: '100%',color: '#666666'}}>活动时间 | 2021年08月21日</span>
                            <span style={{display: 'block',width: '100%',color: '#666666'}}>活动地点 | 盐城市博物馆</span>
                            <div style={boxcontent}  className={styles.boxContent} >
                              	<span style={{display:'inline-block',width: 10,height: 20,marginRight: 10, background: '#B9AC90',borderRadius: 2}}></span>
                                <span style={{display:'inline-block',color: '#B9AC90',verticalAlign: 'top', marginBottom: '15px'}}>活动内容</span>
                                <div style={{marginBottom: 15}}>
                                “中国有礼仪之大，古称华夏；有服章之美，谓之华。
                                华夏一也。” 这句话准确地点明了中华民族含有精美
                                的服饰与悠久的礼仪等内涵，是衣冠上国与礼仪之邦
                                合而为一。悠远多姿的华夏服饰，不仅美观大方，体
                                现了华夏民族的审美追求，而且蕴含着无比丰富的思
                                想内涵，在中国思想文化中具有不可替代的重要地位。
                                华夏服饰文化也可以理解为一种礼仪文化、儒家文化，
                                彰显出了华夏之魂的独特魅力。当天我馆将向观众提
                                供不同种类的汉服，让观众穿着汉服在展厅里徜徉，
                                在历史的长河中充分体验华夏民族的审美追求，以及
                                服饰所蕴含的无比丰富的思想内涵。
                                </div>
                                <span style={{display:'inline-block',width: 10,height: 20,marginRight: 10, background: '#B9AC90',borderRadius: 2}}></span>
                                <span style={{display:'inline-block',color: '#B9AC90',verticalAlign: 'top', marginBottom: '15px'}}>活动背景</span>
                                <div style={{marginBottom: 15}}>
                                	随着博物馆服务群体的转变，博物馆的服务观念也
                                  在不断创新， 观众对博物馆的需求也由原先单一的
                                  参观展览变成了全方位的感官体验，如何满足市民
                                  不断增长的文化需求，释放出文化惠民利民的信号，
                                  让观众与博物馆更好的连接。在盐城市博物馆开馆
                                  之际，我馆一改传统的开放模，创新服务观念、丰
                                  富服务内容，为观众精心筹划了“章服并举、文萃大
                                  观”博物馆奇妙夜活动。此次活动从关注物，到关注
                                  人和关注人与物之间的关系、侧重文物背后的故事
                                  和互动体验。通过展览、教育活动、文创产品等多
                                  种方式向观众呈现一个中国传统文化和盐城本地特
                                  色文化相结合的历史盛宴，让观众在盐城市博物馆
                                  有个特殊而难忘的体验。
                                </div>
                                <span style={{display:'inline-block',width: 10,height: 20,marginRight: 10, background: '#B9AC90',borderRadius: 2}}></span>
                                <span style={{display:'inline-block',color: '#B9AC90',verticalAlign: 'top', marginBottom: '15px'}}>活动目的</span>
                                <div style={{marginBottom: 15}}>
                                  推动建立文化自信，更好的向观众阐释中国优秀的
                                  传统文化、向观众展示古人们的美好生活以及当时
                                  的审美情趣和风韵雅事。
                                </div>
                                <span style={{display:'inline-block',width: 10,height: 20,marginRight: 10, background: '#B9AC90',borderRadius: 2}}></span>
                                <span style={{display:'inline-block',color: '#B9AC90',verticalAlign: 'top', marginBottom: '15px'}}>活动对象</span>
                                <div style={{marginBottom: 15}}>
                                  	全体市民。
                                </div>
                                <span style={{display:'inline-block',width: 10,height: 20,marginRight: 10, background: '#B9AC90',borderRadius: 2}}></span>
                                <span style={{display:'inline-block',color: '#B9AC90',verticalAlign: 'top', marginBottom: '15px'}}>人员安排</span>
                                <div style={{marginBottom: 15}}>
                                  		汉服体验：徐政
                                </div>
                            </div>
                          </div>
                      </div>
                  </Card>
                </Form>
             </Col>
             <Col span={12} pull={12}>
                <Form hideRequiredMark style={{ marginTop: 8 }}>
                  <Card bordered={false}>
                    <FormItem {...formItemLayout} label='活动标题'>
                      {getFieldDecorator('title', {
                        rules: [
                          {
                            required: true,
                            message: '请输入活动标题',
                          },
                        ],
                      })(<Input placeholder='请输入活动标题' onChange={this.tchange}/>)}
                    </FormItem>
                    <FormItem {...formItemLayout} label={<FormattedMessage id="desk.activity.banner" />}>
                      {getFieldDecorator('banner', {
                        rules: [
                          {
                            required: true,
                            message: '请上传banner图' ,
                          },
                        ],
                      })(<Dragger {...uploadProps} onChange={this.onUpload}>
                        <p className="ant-upload-drag-icon">
                          <Icon type="inbox" />
                        </p>
                        <p className="ant-upload-text">将文件拖到此处，或点击上传</p>
                        <p className="ant-upload-hint">请上传 .png,.jpg 格式的文件</p>
                      </Dragger>)}
                    </FormItem>
                    <FormItem {...formItemLayout} label={<FormattedMessage id="desk.activity.category" />}>
                      {getFieldDecorator('category', {
                        rules: [
                          {
                            required: true,
                            message: formatMessage({ id: 'desk.activity.category.placeholder' }),
                          },
                        ],
                      })(
                        <Select placeholder='请选择活动类型'  onChange={this.handleChange}>
                          <Option value="标题">A</Option>
                          <Option value="图片">B</Option>
                          <Option value="内容">C</Option>
                        </Select>
                      )}
                    </FormItem>
                    <FormItem {...formItemLayout} label={<FormattedMessage id="desk.activity.date" />}>
                      {getFieldDecorator('releaseTime', {
                        rules: [
                          {
                            required: true,
                            message: formatMessage({ id: 'desk.activity.date.placeholder' }),
                          },
                        ],
                      })(
                        <DatePicker
                          style={{ width: '100%' }}
                          format="YYYY-MM-DD HH:mm:ss"
                          disabledDate={this.disabledDate}
                          showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                        />
                      )}
                    </FormItem>
                    <FormItem {...formItemLayout} label='活动地点'>
                      {getFieldDecorator('location', {
                        rules: [
                          {
                            required: true,
                            message: '请输入活动地点',
                          },
                        ],
                      })(<Input placeholder='请输入活动地点' />)}
                    </FormItem>
                    <FormItem {...formItemLayout} label='内容插入'>
                        {getFieldDecorator('content', {
                          rules: [
                            {
                              required: true,
                              message: '请选择插入的内容',
                            },
                          ],
                        })( <Select placeholder='请选择插入的内容'  onChange={this.handleChange}>
                          <Option value="标题">标题</Option>
                          <Option value="图片">图片</Option>
                          <Option value="内容">内容</Option>
                        </Select>
                      )}
                    </FormItem>
                    <FormItem {...formItemLayout} label='内容标题' style={{display:'none'}}>
                      {getFieldDecorator('acttitle', {
                        rules: [
                          {
                            required: true,
                            message: formatMessage({ id: 'desk.activity.content.placeholder' }),
                          },
                        ],
                      })(
                        <Input placeholder='请输入内容标题'/>
                      )}
                    </FormItem>
                    <FormItem {...formItemLayout} label='图片' style={{display:'block'}}>
                      {getFieldDecorator('content', {
                        rules: [
                          {
                            required: true,
                            message: formatMessage({ id: 'desk.activity.content.placeholder' }),
                          },
                        ],
                      })(
                        <Dragger {...uploadProps} onChange={this.onUpload}>
                          <p className="ant-upload-drag-icon">
                            <Icon type="inbox" />
                          </p>
                          <p className="ant-upload-text">将文件拖到此处，或点击上传</p>
                          <p className="ant-upload-hint">请上传 .png,.jpg 格式的文件</p>
                        </Dragger>
                      )}
                    </FormItem>
                    <FormItem {...formItemLayout} label='活动内容' style={{display:'none'}}>
                      {getFieldDecorator('content', {
                        rules: [
                          {
                            required: true,
                            message: formatMessage({ id: 'desk.activity.content.placeholder' }),
                          },
                        ],
                      })(
                        <TextArea
                          style={{ minHeight: 32 }}
                          placeholder='请输入活动内容'
                          rows={5}
                        />
                      )}
                    </FormItem>
                    <Button type="primary">添加</Button>
                  </Card>
                </Form>

             </Col>
           </Row>
         </div>
       </Panel>
    );
  }
}

export default ActivityAdd;
