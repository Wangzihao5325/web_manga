import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import store from '../../../store/index';
import { tab_navi_unshow } from '../../../store/actions/tabBottomNaviAction';
import { HeaderPro } from '../../../component/header/index';
import { CLIENT_WIDTH, CLIENT_HEIGHT } from '../../../global/sizes';
import Api from '../../../socket/index';
import _ from 'lodash';
import 'antd/dist/antd.css';
import { Upload, Icon, Modal } from 'antd';
import './index.css';

const textReg = { content: '', mail: '' };

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

class KeyWordsItem extends PureComponent {

    static defaultProps = {
        title: '    ',
        isSelect: false,
        value: ''
    }

    render() {
        let color = this.props.isSelect ? 'rgb(255,42,49)' : 'rgb(245,245,245)';
        let textColor = this.props.isSelect ? 'rgb(255,255,255)' : 'rgb(138,138,138)';
        let length = this.props.title.length * 13 + 24;
        return (
            <div onClick={this.itemSelect} style={{ marginTop: 10, marginLeft: 5, marginRight: 5, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: 34, width: length, borderRadius: 17, backgroundColor: color }}>
                <div className='text_div' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginLeft: 12, marginRight: 12, color: textColor, fontSize: 13, }}>
                    {this.props.title}
                </div>
            </div>
        );
    }

    itemSelect = () => {
        if (this.props.clickCallback) {
            this.props.clickCallback(this.props.index, this.props.isSelect, this.props.value)
        }
    }
}

class Feedback extends PureComponent {

    state = {
        keyWords: [],
        selectKeyWordsValue: [],
        previewVisible: false,
        previewImage: '',
        fileList: [],
    }

    componentDidMount() {
        store.dispatch(tab_navi_unshow());
        Api.feedbackKeywords((e) => {
            this.setState({
                keyWords: e
            });
        });
    }

    render() {
        let num = this.state.selectKeyWordsValue.length;
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (
            <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column' }} >
                <HeaderPro title='意见反馈' back={this.goBack} />
                <div style={{ color: 'rgb(34,34,34)', fontSize: 14, marginTop: 19, marginLeft: 12 }} >{`请选择问题出现场景${num}/3(必选)`}</div>
                <div style={{ alignSelf: 'center', display: 'flex', width: CLIENT_WIDTH - 14, flexDirection: 'row', justifyContent: 'flex-start', flexWrap: 'wrap' }}>
                    {
                        this.state.keyWords.map((item, index) => {
                            return <KeyWordsItem clickCallback={this.itemClick} isSelect={item.isSelect} index={index} key={index} value={item.key} title={item.value} />
                        })
                    }
                </div >
                <div style={{ borderRadius: 2, marginTop: 30, backgroundColor: 'rgb(245,245,245)', height: 262, width: CLIENT_WIDTH - 24, alignSelf: 'center', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <textarea onChange={this.textOnChange} style={{ outline: 'none', fontSize: 15, alignSelf: 'center', borderRadius: 5, borderColor: 'rgb(245,245,245)', borderStyle: 'solid', borderWidth: 1, marginTop: 18, height: 100, width: CLIENT_WIDTH - 30, backgroundColor: 'rgb(245,245,245)' }} placeholder='请用10~200字描述问题的详细情况,有助于我们快速帮您解决' />
                    </div>
                    <div className='box' style={{ alignSelf: 'center', width: 336, height: 112, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Upload
                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            listType="picture-card"
                            fileList={fileList}
                            onPreview={this.handlePreview}
                            onChange={this.handleChange}
                        >
                            {fileList.length >= 3 ? null : uploadButton}
                        </Upload>
                    </div>
                </div>

                <input onChange={this.textOnChange} style={{ outline: 'none', fontSize: 15, alignSelf: 'center', borderRadius: 5, borderColor: 'rgb(245,245,245)', borderStyle: 'solid', borderWidth: 1, marginTop: 18, height: 50, width: CLIENT_WIDTH - 30, backgroundColor: 'rgb(245,245,245)' }} placeholder='邮箱/Telegram/Potato,方便我们联系(选填)' />
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </div>
        );
    }

    mailOnchange = ({ target }) => {
        textReg.mail = target.value;
    }

    textOnChange = ({ target }) => {
        textReg.content = target.value;
    }

    handleCancel = () => this.setState({ previewVisible: false });

    handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
        });
    };

    handleChange = ({ fileList }) => this.setState({ fileList });

    itemClick = (index, isSelect, value) => {
        if (isSelect) {
            let dataReg = [...this.state.keyWords];
            dataReg[index].isSelect = false;
            let valueReg = [...this.state.selectKeyWordsValue];
            _.pull(valueReg, value);
            this.setState({
                keyWords: dataReg,
                selectKeyWordsValue: valueReg
            });
        } else {
            if (this.state.selectKeyWordsValue.length >= 3) {
                return;
            } else {
                let dataReg = [...this.state.keyWords];
                dataReg[index].isSelect = true;
                let valueReg = [...this.state.selectKeyWordsValue];
                valueReg.push(value);
                this.setState({
                    keyWords: dataReg,
                    selectKeyWordsValue: valueReg
                });
            }
        }
    }

    goBack = () => {
        this.props.history.goBack();
    }
}

const FeedbackWithRouter = withRouter(Feedback);
export default FeedbackWithRouter;