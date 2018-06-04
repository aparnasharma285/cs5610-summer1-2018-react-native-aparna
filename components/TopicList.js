import React, {Component} from 'react'
import {View, Alert} from 'react-native'
import {Text, ListItem} from 'react-native-elements'

class TopicList extends Component {
    static navigationOptions = {title: 'Topics'}
    constructor(props) {
        super(props)
        this.state = {
            topics: [],
            lessonId:''
        }
    }
    componentDidMount() {
        const {navigation} = this.props;
        const lessonId = navigation.getParam("lessonId")

        fetch("https://cs5610-java-server-aparna.herokuapp.com/api/lesson/"+lessonId+"/topic")
            .then(response => (response.json()))
            .then(topics => this.setState({topics}))
    }
    render() {
        return(
            <View style={{padding: 15}}>
                {this.state.topics.map((topic, index) => (
                    <ListItem
                        onPress={() => this.props.navigation
                            .navigate("WidgetList", {topicId: topic.id})}
                        key={index}
                        title={topic.title}/>
                ))}
            </View>
        )
    }
}
export default TopicList