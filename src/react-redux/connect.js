import React,{Component} from 'react'
import PropTypes from 'prop-types'



export const  connect = (mapStateToProps,mapDispatchToProps) => (WrappedComponent) =>{
    class Connent extends Component{
        static contextTypes ={
            store: PropTypes.object
        }

        constructor(){
            super()
            this.state = {allProps: {}}
        }

        componentWillMount(){
            const {store} = this.context
            this._updateProps()
            store.subscribe(()=> this._updateProps())
        }

        _updateProps(){
            const {store} = this.context
            let stateProps = mapStateToProps 
                            ? mapStateToProps(store.getState(),this.props) // 额外传入props，让获取数据更加灵活方便
                            : {} //防止 mapStateToProps 没有传入
            let dispatchProps = mapDispatchToProps
                            ? mapDispatchToProps(store.dispatch,this.props)
                            : {}
            this.setState({
                allProps: {  //整合普通的props 和从state生成的props
                    ...stateProps,
                    ...dispatchProps,
                    ...this.props
                }
            })
        }

        render(){
            return (
                <WrappedComponent {...this.state.allProps}/>
            )
        }
    }
    return Connent
}