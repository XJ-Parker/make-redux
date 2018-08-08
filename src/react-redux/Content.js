import React, {Component} from 'react'
import PropTypes from 'prop-types'
import ThemeSwich from './ThemeSwitch'
// import { connect } from './connect'
import { connect } from "react-redux";

class Content extends Component{
    static propTypes = {
        themeColor: PropTypes.string
    }

    render(){
        return (
            <div>
                <p style={{color: this.props.themeColor}}>React.js 小书内容</p>
                <ThemeSwich />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      themeColor: state.themeColor
    }
}
Content = connect(mapStateToProps)(Content)

export default Content