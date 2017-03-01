const SliderArrow = React.createClass({
    handleArrowClick(option){
        this.props.turn(option);
    },

    render(){
        var style = {
            display: this.props.isShow ? "block" : "none"
        };
        return (
            <div style={style}>
                <a href="javascript:void(0)" className="arrow arrow-left"
                   onClick={this.handleArrowClick.bind(this, -1)}></a>
                <a href="javascript:void(0)" className="arrow arrow-right"
                   onClick={this.handleArrowClick.bind(this, 1)}></a>
            </div>
        );
    }
});
const SliderDots = React.createClass({
    handleClick(i){
        i = i - this.props.nowLocal;
        this.props.turn(i);
    },
    render(){
        var dotsNodes = [];
        var len = this.props.count;
        var step = this.props.nowLocal === 4 ? 0 : this.props.nowLocal;
        for (var i = 0; i < len; i++) {
            dotsNodes.push(<li onClick={this.handleClick.bind(null, i)} key={i}
                               className={i === step ? "selected" : ""}></li>);
        }
        return (
            <ul className="focusList">
                {
                    dotsNodes
                }
            </ul>
        );
    }
});


var ImagesItem = React.createClass({
    render(){
        return (
            <div>
                <img src={this.props.item.src} alt={this.props.item.alt}/>
            </div>
        );
    }
});

var SliserCom = React.createClass({
    getInitialState(){
        return {
            nowLocal: 0,
            isShow: false
        }
    },
    go(n){
        var $bannerInner = $('.bannerInner');
        var _n = this.state.nowLocal + n;
        if (_n < 0) {
            $bannerInner.css({
                left: -3200
            });
            _n = this.props.items.length - 1;
        }
        if (_n == this.props.items.length + 1) {
            $bannerInner.css({
                left: 0
            });
            _n = 1;
        }
        this.setState({
            nowLocal: _n
        }, function () {
            $bannerInner.animate({
                left: -this.state.nowLocal * 800
            }, 500);
        });

    },
    componentDidMount(){
        this.autoPlay();
    },
    autoPlay(){
        this.setState({
            isShow: false
        });
        console.log(this.state.isShow);

        clearInterval(this.autoFlag);
        this.autoFlag = window.setInterval(() => {
            this.go(1);
        }, 2000);

    },
    pauseInterval(){
        this.setState({
            isShow: true
        });
        window.clearInterval(this.autoFlag);
    },

    render(){
        var count = this.props.items.length;
        var arrowNode = <SliderArrow turn={this.go} isShow={this.state.isShow}></SliderArrow>;

        var dotsNode = <SliderDots count={count} nowLocal={this.state.nowLocal} turn={this.go}></SliderDots>;


        return (
            <div className="banner" onMouseOver={this.pauseInterval} onMouseOut={this.autoPlay}>
                <div className="bannerInner">
                    {
                        this.props.items.map((item, index) => {
                            return <ImagesItem count={count} item={item} key={index}></ImagesItem>
                        })
                    }
                    <div>
                        <img src="images/1.jpg" alt="image-1"/>
                    </div>
                </div>
                {
                    arrowNode
                }
                {
                    dotsNode
                }
            </div>



        )
    }
});

var propsObj = {
    items: [
        {
            src: "images/1.jpg",
            alt: "img-1"
        },
        {
            src: "images/2.jpg",
            alt: "img-2"
        },
        {
            src: "images/3.jpg",
            alt: "img-3"
        },
        {
            src: "images/4.jpg",
            alt: "img-4"
        }
    ]
};


ReactDOM.render(<SliserCom {...propsObj}/>, document.getElementById('slider'));