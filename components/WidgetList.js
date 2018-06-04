import React, {Component} from 'react'
import {View, Alert} from 'react-native'
import {Text, ListItem} from 'react-native-elements'

class WidgetList extends Component {
    static navigationOptions = {title: 'Widgets'}
    constructor(props) {
        super(props)
        this.state = {
            widgets: [],
            topicId:''
        }
    }
    componentDidMount() {
        const {navigation} = this.props;
        const topicId = navigation.getParam("topicId")

        fetch("https://cs5610-java-server-aparna.herokuapp.com/api/topic/"+topicId+"/widget")
            .then(response => (response.json()))
            .then(widgets => this.setState({widgets}))
    }
    render() {
        return(
            <View style={{padding: 15}}>
                {this.state.widgets.map((widget, index) => (
                    <ListItem
                        key={index}
                        title={widget.text}/>
                ))}
            </View>
        )
    }
}
export default WidgetList