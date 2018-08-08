import React, {Component} from 'react'
import PropTypes from 'prop-types'
// import { connect } from './connect'
import { connect } from "react-redux";

class ThemeSwitch extends Component{
    static propTypes = {
        themeColor: PropTypes.string,
        onSwichColor: PropTypes.func
    }

    handleSwitchColor(color){
        if(this.props.onSwichColor){
            this.props.onSwichColor(color)
        }
    }

    render(){
        return (
            <div>
                <button 
                    style={{ color: this.props.themeColor }}
                    onClick = {this.handleSwitchColor.bind(this,'red')}>red</button>
                <button 
                    style={{ color: this.props.themeColor }} 
                    onClick = {this.handleSwitchColor.bind(this,'blue')}>blue</button>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
      themeColor: state.themeColor
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        onSwichColor: (color) => {
            dispatch({type: 'CHANGE_COLOR', themeColor: color})
        }
    }
}

ThemeSwitch = connect(mapStateToProps,mapDispatchToProps)(ThemeSwitch)

export default ThemeSwitch