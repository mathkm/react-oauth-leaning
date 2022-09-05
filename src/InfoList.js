import React from 'react';

// リストで情報を表示するクラス
class InfoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            authBy: "",
            user: {},
        }
        console.log(this.props)
    }

    render() {
        return (
            <div>
                <p>{this.props.authBy}</p>
                <img src={this.props.user.imgUrl}></img>
                <ul>
                    <li>{this.props.user.userName}</li>
                    <li>{this.props.user.email}</li>
                </ul>
            </div>
        )
    }
}

export default InfoList