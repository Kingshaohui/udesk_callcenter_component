import Alert from './Alert';
import CallConfig from '../CallConfig';
import * as Const from '../Const';
import React from 'react';
import NumberInput from './NumberInput';
import Keyboard from './Keyboard';
import CallButton from './CallButton';
import { makeCall } from '../CallUtil';
import CallInfo from '../CallInfo';

export default class HangupPanel extends React.Component {
    constructor() {
        super();
        this.state = {
            inputNumber: '',
            displayKeyboard: false
        };
    }

    render() {
        return <div>
            <NumberInput onChange={this.getInputNumber.bind(this)} value={this.state.inputNumber}
                         onKeyboardBtnClick={this.toggleKeyboard.bind(this)}/>
            <Keyboard className={this.state.displayKeyboard ? '' : 'hide'} onClick={(number) => {
                this.setState({inputNumber: this.state.inputNumber + number});
            }}/>
            <CallButton onClick={this.callout.bind(this)}/>
            {(() => {
                if (this.props.showManualScreenPop) {
                    return <button className="btn-manual-screen-pop" onClick={CallInfo.manualScreenPop.bind(CallInfo)}>
                        手动弹屏</button>;
                }
            })()}
        </div>;
    }

    getInputNumber(e) {
        this.setState({
            inputNumber: e.target.value
        });
    }

    callout() {
        let number = this.state.inputNumber;
        if (CallConfig.agent_work_state === Const.OFFLINE) {
            Alert.error('离线状态无法外呼！');
            return;
        }

        makeCall(number, function() {
        }, function(error) {
            Alert.error(error.message);
        });
    }

    toggleKeyboard() {
        this.setState({
            displayKeyboard: !this.state.displayKeyboard
        });
    }
};

