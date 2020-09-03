import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/map';
/*geojson文件很大，生产环境中，应该放在public文件夹中，并异步加载*/
import { geoJson } from './regionJsonXc';
import { sqJson } from './regionJsonXc';

let defaultBlue = '#25ade6';
let darkBlue = '#186396'; //详细地图，线条颜色暗一些

// 配置option，一定要查看echarts官方配置文档
let option = {
    // 地图配置
    geo: { 
        show: true,
        map: 'XC',
        label: {
            normal: {
                show: true,
                color: '#ccc',
                fontSize: 14,
            },
            emphasis: {
                show: true,
                color: '#fff'
            }
        },
        roam: true, // 滚轮滚动--放大或缩小
        itemStyle: {
            normal: {
                label: {
                    show: true,
                    color: '#fff',
                    fontSize: 14,
                },
                areaColor: 'rgba(24,99,150,0.05)',
                borderColor: #186396,
                shadowColor: #186396,
                shadowBlur: 10,
            },
            emphasis: {
                label: {
                    show: false,
                    color: '#fff',
                    shadowColor: '#25ade6',
                    shadowBlur: 10,
                },
                areaColor: 'rgba(24,99,150,0.5)',
            },
        },
        zoom: 1
    },
    series: []
};

let myChart = null;

class XcMap extends Component {

    state = {
        option: option,
        detail: false, // 是否使用详细地图
        curMap:geoJson,
    }

    componentDidMount() {
        this.draw(geoJson);
    }
    
    drawMap = (json) => {
        const { option } = this.state;
        let echartElement = document.getElementById('xc-map');
        myChart = echarts.init(echartElement);

        echarts.registerMap('XC', json);
        myChart.setOption(option, true);

        myChart.on('georoam', this.onDatazoom); // 缩放监听事件
    }

    
    /*
        获取zoom和center
        zoom:地图缩放值，
        center:中心位置，地图拖动之后会改变
    */
    getZoom = () => {
        if(myChart){
            let { zoom, center } = myChart.getOption().geo[0];
            return { zoom, center }
        }
        return;
    }
    
    /*
        保存缩放值和中心位置，
    */
    saveZoom = () => {
        let { zoom, center } = this.getZoom();
        const { option } = this.state;
        option.geo.zoom = zoom;
        option.geo.center = center;
       this.setState({option});
    }
    
    /**
     * 地图缩小/放大
     */
    onDatazoom = () => {

        const { detail, option } = this.state;
        const { zoom } = this.getZoom();
        const threshold = 1.7;
        
        this.saveZoom(); // 地图缩放后，将缩放值和center保存在状态中

        if (zoom >= threshold && !detail) {
            // 切换详细地图
            option.geo.itemStyle.normal.borderColor = darkBlue;
            option.geo.itemStyle.normal.shadowColor = darkBlue;
            this.setState({
                detail:true,
                option,
                curMap:sqJson
            });
            this.drawMap(sqJson);
        } else if (detail && zoom < threshold) {
            // 切换默认地图
            option.geo.itemStyle.normal.borderColor = defaultBlue;
            option.geo.itemStyle.normal.shadowColor = defaultBlue;
            this.setState({
                detail:false,
                option,
                curMap:geoJson
            });
            this.drawMap(geoJson);
        }
    }

    render() {
        const {  position } = this.state;
        console.log({option})
        return (<div>
            <div id="xc-map" className={styles.map}></div>
        </div>);
    }
}

export default XcMap;