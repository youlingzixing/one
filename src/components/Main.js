require('normalize.css/normalize.css');
require('styles/App.css');
require('styles/Main.css');

import React from 'react';
let yeomanImage = require('../images/yeoman.png');

class AppComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            contentList:[],
            type:{
                'a': '动画',
                'b': '漫画',
                'c': '游戏',
                'd': '小说',
                'e': '原创',
                'f': '网络',
                'g': '其他'
            }
        };
        this.callApi = this.callApi.bind(this);
    }

    callApi(t) {
        fetch(`https://v1.hitokoto.cn?c=${t}`).then((result)=>{
            return result.json();
        }).then((jsonResult)=>{
            const { id, hitokoto, type, from, creator, created_at } = jsonResult;
            const {contentList: newList} = this.state;
            newList.push({ id, hitokoto, type, from, creator, created_at })
            this.setState({contentList: newList});
        })
    }
    componentWillMount() {
        this.callApi('a');
        this.callApi('b');
        this.callApi('c');
        this.callApi('d');
        this.callApi('e');
        this.callApi('f');
        this.callApi('g');
        this.callApi();
    }
    render() {
        const { contentList,type } = this.state;
        const hitokotoList = contentList.map((item, index)=>{
            return <div key={index} className={`content content${item.type}`}>
                <span className="type">{type[item.type]}</span>
                <div className="context">{item.hitokoto}</div>
                <span className="from">From: {item.from}</span>
            </div>;
        });
        return (
            <div className="index">
                <img src={yeomanImage} alt="Yeoman Generator" />
                {hitokotoList}
                <div className="moreBtn" onClick={()=>this.callApi()}>More...</div>
            </div>
        );
    }
}

AppComponent.defaultProps = {
};

export default AppComponent;
