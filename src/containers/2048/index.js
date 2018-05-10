import { connect } from 'react-redux'
import Game from '../../components/2048'
import * as actions from '../../actions/game.js'
const { moveCeil, getNums } = actions
const mapState2Props = state => {
    console.log(state)
    return state
}
const mapDispatch2Props = dispatch => {
    return {
        moveCeil: direction => {
            dispatch(moveCeil(direction))
        },
        initGame: () => {
            dispatch(getNums())
        }
    }
}
export default connect(
    mapState2Props,
    mapDispatch2Props
)(Game)