import React, { Component } from 'react'
import styles from './index.scss'
class Num extends Component {
    constructor(props){
        super(props)
    }
    render() {
        const { nums, styleConfig} = this.props
        let arr = []
        for(let x = 0;x<4;x++){
            for(let y = 0;y<4;y++){
                let cell = nums[x][y]
                if(cell.num){
                    let style = {
                        position: 'absolute',
                        left:y*styleConfig.width+styleConfig.margin+styleConfig.unit,
                        top:x*styleConfig.width+styleConfig.margin +styleConfig.unit
                    }
                    arr.push(
                        <div key={cell.key} style={style} data-key={cell.key} className={cell.new?styles["new-cell"]:(cell.merge.length?styles['merge-cell']:'')}>
                            <div className={styles['num-'+cell.num] +' '+ styles.num}>
                                {cell.num}
                            </div>
                        </div>)
                    cell.new = false

                    if(cell.merge){
                        for(let item of cell.merge){
                            arr.push(
                                <div key={item.key} style={{...style, visibility:'hidden'}} data-key={item.key}>
                                    <div className={styles['num-'+item.num] +' '+ styles.num}>
                                        {item.num}
                                    </div>
                                </div>)
                        }
                        cell.merge = []
                    }
                }
            }
        }
        return (
            <div className={styles.numcontainer}>
                {arr}
            </div>
        )
    }
}

export default Num