import { connect } from 'react-redux';
import { } from './action';
class Main extends React.Component {
    constructor(props) {
        super(props);
    }

    // Mounting：已插入真实 DOM
    // Updating：正在被重新渲染
    // Unmounting：已移出真实 DOM

    componentWillMount() {
        console.log('组件渲染之后调用，只调用一次');
    }

    componentWillReceiveProps() {
        console.log('组件初始化时不调用，组件接受新的props时调用');
    }
    // shouldComponentUpdate(){
    //     console.log(`react性能优化非常重要的一环。
    //     组件接受新的state或者props时调用，
    //     我们可以设置在此对比前后两个props和state是否相同，
    //     如果相同则返回false阻止更新，
    //     因为相同的属性状态一定会生成相同的dom树，
    //     这样就不需要创造新的dom树和旧的dom树进行diff算法对比，
    //     节省大量性能，
    //     尤其是在dom结构复杂的时候`)
    // }

    componentWillUpdate() {
        console.log('组件初始化时不调用，只有在组件将要更新时才调用，此时可以修改state')
    }

    componentDidUpdate() {
        console.log('组件初始化时不调用，组件更新完成后调用，此时可以获取dom节点。');
    }

    componentWillUnmount() {
        console.log('组件将要卸载时调用，一些事件监听和定时器需要在此时清除。');
    }

    //这里可以做点什么

    render() {
        //这里可以做点什么
        return (<React.Fragment></React.Fragment>)
    }
}
function mapStateToProps(state) {
    return {
    }
}
export default connect(mapStateToProps)(Main)