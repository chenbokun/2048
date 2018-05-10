import React, { Component } from 'react'
import Modal from '../Modal'
import styles from './index.scss'
import Num from './Num.js'
import GameOver from './GameOver.js'
import { moveCeil } from '../../actions/game';
function Grid(props) {
    let {x=4,y=4} = props
    let row = new Array(Number(x)).fill(1)
    let cell = new Array(Number(y)).fill(1)
    return <div className={styles.container}>
                {row.map((i,index_x)=>(
                    <div className={styles.row} key={index_x}>
                        {cell.map((i,index_y)=>(
                            <div className={styles.cell} key={index_y}></div>
                        ))}
                    </div>
                ))}
            </div>
}
class Game extends Component {
    constructor(props){
        super(props)
        this.state = {
            show:false,
            styleConfig:this._getStyle()
        }
    }
    _getStyle(){
        if(document.documentElement.clientWidth<490){
            return {
                width:2.3,
                margin:0.3,
                unit:'rem'
            }
        }else{
            return {
                width:115,
                margin:15,
                unit:'px'
            }
        }
    }
    resetGame(){
        window.gameOver = false
        localStorage.removeItem("initNums")
        this.props.initGame()
    }
    tryagain(){
        this.resetGame()
    }
    showModal(){
        this.setState(prevState=>(
            {show:!prevState.show}
        ))
    }
    handlePress(e){
        if(window.gameOver){
            return false
        }
        const {moveCeil} = this.props
        switch(e.key){
            case 'ArrowUp':
            case 'ArrowDown':
            case 'ArrowLeft':
            case 'ArrowRight':
                moveCeil(e.key.match(/Arrow(.+)/)[1].toUpperCase())
                break;
            default:
                return false;
        }
    }

    handleTouch(){
        const {moveCeil} = this.props
        let over = false
        var mybody = document.getElementsByTagName('body')[0];
        //滑动处理
        var startX, startY, moveEndX, moveEndY, X, Y;   

        mybody.addEventListener('touchstart', function(e) {
            over = false

            e.preventDefault();

            startX = e.touches[0].pageX;

            startY = e.touches[0].pageY;

        }, false);

        mybody.addEventListener('touchmove', function(e) {
            if(over){
                return false
            }
            over = true
            e.preventDefault();

            moveEndX = e.changedTouches[0].pageX;

            moveEndY = e.changedTouches[0].pageY;

            X = moveEndX - startX;

            Y = moveEndY - startY;

            if ( Math.abs(X) > Math.abs(Y) && X > 0 ) {
                moveCeil('RIGHT')
            }
            else if ( Math.abs(X) > Math.abs(Y) && X < 0 ) {
                moveCeil('LEFT')
            }
            else if ( Math.abs(Y) > Math.abs(X) && Y > 0) {
                moveCeil('DOWN')
            }
            else if ( Math.abs(Y) > Math.abs(X) && Y < 0 ) {
                moveCeil('UP')
            }
            else{
                return false
            }
        },{ passive: false});
    }
    componentWillMount(){
        document.body.addEventListener('keydown', (e)=>this.handlePress(e))
    }
    componentDidMount(){
        let _this = this
        window.onresize = () =>{
            _this.setState({
                styleConfig:_this._getStyle()
            })
        }
        this.handleTouch()
    }
    render() {
        const {show,styleConfig} = this.state
        return (
            <div className={styles.outcontainer}>
                <div className={styles.incontainer}>
                <div className={styles.saa}>
                    <header className={styles.title}>2048</header>
                    <button className={styles.gamebtn} onClick={()=>{this.resetGame()}}>重新开始</button>
                </div>
                <div className={styles.gamecontainer}>
                    {window.gameOver&&<GameOver tryagain={()=>this.tryagain()} />}
                    <Grid x={4} />
                    <Num nums={this.props.nums} styleConfig={styleConfig}/>
                </div>
                </div>
            </div>
        )
    }
}

export default Game