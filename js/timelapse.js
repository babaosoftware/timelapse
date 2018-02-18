'use strict';

import style from './../css/timelapse.css'

export default class TimeLapse extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            'currentImage': '',
            'loaded': false,
        };
        this.data = {
            "title": "Time-lapse Player",
            "desc": "",
            "cacheSize": 10,
            "autoPlay": false,
            "speed": 100,
            "root": "",
            "images": []
        };
        this.imageIndex = 0; 
        this.timeoutid = 0;
    }

    componentDidMount()
    {
        $.get(this.props.imageSource,
            function (data, status)
            { 
                this.data = data;
    
                if (this.data.images.length > 0)
                {
                    this.setState({ 'loaded': true, 'currentImage': this.data.root + this.data.images[0].url });
                    if (this.data.autoPlay)
                        this.onPlay();
                }    
                else
                    this.setState({ 'loaded': true});
            }.bind(this));    
    }

    componentWillUnmount()
    {
        clearTimeout(this.timeoutid);
    }

    render()
    {
        var sliderWidth = this.data.images.length ? ((this.imageIndex + 1) * $(this._sliderOuter).width() / this.data.images.length) : 0;
        var sliderStyle = { 'width': sliderWidth + "px" };
        var controlsStyle = { 'display': this.state.loaded ? "" : "none" };

        return (
            <div className="tl-timelapse">
                <div className="tl-text" >{this.data.title}</div>
                <img className="tl-cameraimage" src={this.state.currentImage}/>
                <div className="tl-sliderouter" style={controlsStyle} ref={(c) => this._sliderOuter = c} onClick={this.onSkip.bind(this)}>
                    <div className="tl-sliderinner" style={sliderStyle}></div>
                </div>
                <ul className="tl-controls" style={controlsStyle}>
                    <li className="tl-control fa fa-backward" onClick={this.onRewind.bind(this)}></li>    
                    <li className="tl-control fa fa-step-backward" onClick={this.onPrevious.bind(this)}></li>    
                    <li className="tl-control fa fa-play" onClick={this.onPlay.bind(this)}></li>    
                    <li className="tl-control fa fa-pause" onClick={this.onPause.bind(this)}></li>    
                    <li className="tl-control fa fa-stop" onClick={this.onStop.bind(this)}></li>    
                    <li className="tl-control fa fa-step-forward" onClick={this.onNext.bind(this)}></li>    
                    <li className="tl-control fa fa-forward" onClick={this.onForward.bind(this)}></li>    
                </ul>
            </div>
        );    
    }

    updateState(forward)
    {
        this.preLoad = [];
        if (forward)
        {
            for (var i = this.imageIndex; i < Math.min(this.imageIndex + this.data.cacheSize, this.data.images.length); i++)
            {
                let img = new Image();
                img.src = this.data.root + this.data.images[i].url;
                this.preLoad.push(img);
            }
        }
        else
        {
            for (var i = Math.max(0, this.imageIndex - this.data.cacheSize); i < Math.min(Math.max(0, this.imageIndex - this.data.cacheSize) + 10, this.data.images.length); i++)
            {
                let img = new Image();
                img.src = this.data.root + this.data.images[i].url;
                this.preLoad.push(img);
            }
        }    
        this.setState({'currentImage': this.data.root + this.data.images[this.imageIndex].url});
    }

    update()
    {
        this.imageIndex++;
        if (this.imageIndex >= this.data.images.length)
            return;
        
        this.updateState(true);
        this.timeoutid = setTimeout(this.update.bind(this), this.data.images[this.imageIndex].speed ? this.data.images[this.imageIndex].speed : this.data.speed);
    }
    
    onRewind()
    {
        clearTimeout(this.timeoutid);
        this.imageIndex = 0;
        this.updateState(true);
    }
    
    onPlay()
    {
        clearTimeout(this.timeoutid);
        if (this.imageIndex >= this.data.images.length - 1 || this.imageIndex == 0)
            this.imageIndex = -1;
        this.update();
    }
    
    onPrevious()
    {
        clearTimeout(this.timeoutid);
        if (this.imageIndex > 0)
        {
            this.imageIndex--;
            this.updateState(false);
        }
    }
    
    onNext()
    {
        clearTimeout(this.timeoutid);
        if (this.imageIndex < this.data.images.length -1)
        {
            this.imageIndex++;
            this.updateState(true);
        }
    }
    
    onStop()
    {
        clearTimeout(this.timeoutid);
        this.imageIndex = 0;
        this.updateState(true);
    }
    
    onPause()
    {
        clearTimeout(this.timeoutid);
    }
    
    onForward()
    {
        clearTimeout(this.timeoutid);
        this.imageIndex = this.data.images.length -1;
        this.updateState(true);
    }
    
    onSkip(e)
    {
        this.imageIndex = Math.floor((e.nativeEvent.offsetX * 1.0) / ($(e.currentTarget).width() * 1.0) * this.data.images.length);
        this.updateState(true);
    }
}

