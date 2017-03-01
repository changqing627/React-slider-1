var SliderBox=React.createClass({

    getInitialState(){
        return{zIndex:0};
    },
    Move(){

        var step=this.props.width/10;
        document.querySelectorAll('ul')[0].style.left='-'+this.state.zIndex*parseFloat(this.props.width)+step+'px';
        this.setState({zIndex:this.state.zIndex==this.props.children.length?0:this.state.zIndex+1})
        //left:this.state.zIndex==this.props.children.length?-this.props.width:'-'+this.state.zIndex*parseFloat(this.props.width)+'px'

    },
    MoveLeft(){
        this.setState({zIndex:this.state.zIndex==0?this.props.children.length:this.state.zIndex-1})
    },
    componentDidMount(){
        this.timer=setInterval(this.Move,1000)
    },
    overhander(){
        clearInterval(this.timer)
    },
    outhander(){
        this.timer=setInterval(this.Move,1000)
    },
    render(){
        var liW=this.props.width;
        var first=this.props.children[0];

        return(

            <div className="slider-wrap" style={{width:liW,height:this.props.height}} onMouseOver={this.overhander} onMouseOut={this.outhander}>
                <span onClick={this.MoveLeft} className="btn-left">左翻</span>
                <ul style={{position:"absolute",left:0,top:0,width:(this.props.children.length+1)*parseFloat(this.props.width)+'px'}}>
                    {


                        this.props.children.map(function (item, index) {
                            return <li style={{width:liW}} key={index}>{index}<a href={item.props.href}><img src={item.props.src} alt=""/></a></li>
                        })
                    }
                    <li style={{width:liW}}><a href={first.props.href}><img src={first.props.src} alt=""/></a></li>
                </ul>
                <span onClick={this.Move} className="btn-right">右翻</span>
            </div>
        )
    }
});
ReactDOM.render(
    <SliderBox width="800px" height="400px">
        <span src="images/1.jpg" href="http://zfpx.com/1"></span>
        <span src="images/2.jpg" href="http://zfpx.com/2"></span>
        <span src="images/3.jpg" href="http://zfpx.com/3"></span>
        <span src="images/4.jpg" href="http://zfpx.com/4"></span>
    </SliderBox>
    ,document.querySelector('#app'));