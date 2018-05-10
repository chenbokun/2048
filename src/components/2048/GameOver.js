import React, { Component } from 'react'
import styles from './index.scss'

function GameOver(props){
    return (
        <div className={styles.gameover}>
            <p>游戏结束!</p>
            <div>
                <button className={styles.gamebtn} onClick={props.tryagain}>再试一次</button>
            </div>
        </div>
    )
}
export default GameOver