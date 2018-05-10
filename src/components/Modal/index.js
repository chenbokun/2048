import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import styles from './index.scss'
class Modal extends Component {
    constructor(props){
        super(props)
        this.init = false
    }
    _render(show){
        console.log(styles)
        let modal = (
            <div ref={i=>this.modal=i} style={{}}>
                <div className={styles["modal-mask"]}></div>
                <div className={styles["modal-wrap"]}>
                    <div className={styles["modal"]}>
                        <div className={styles["modal-content"]}>
                            <button className={styles["modal-close"]}></button>
                            <div className={styles["modal-header"]}></div>
                            <div className={styles["modal-body"]}></div>
                            <div className={styles["modal-footer"]}></div>
                        </div>
                    </div>
                </div>
            </div>
        )
        let div = document.createElement('div')
        document.body.append(div)
        ReactDOM.render(modal ,document.body.lastChild)
    }
    componentDidUpdate(){
        const {show,} = this.props
        if(this.init){
            this.modal.style.display = show?'block':'none'
        }else{
            this._render(show)
            this.init = true
        }
        
    }
    render(){
        return null
    }
}

export default Modal