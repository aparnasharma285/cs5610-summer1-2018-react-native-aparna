import React, {Component} from 'react'
import {View, Alert, StyleSheet} from 'react-native'
import {Text, ListItem, Button} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'

class WidgetList extends Component {
    static navigationOptions = {title: 'Widgets'}

    constructor(props) {
        super(props)
        this.state = {
            assignments: [],
            exams: [],
            topicId: ''
        }
        this.deleteWidget = this.deleteWidget.bind(this);
    }


    componentDidMount() {
        const {navigation} = this.props;
        const topicId = navigation.getParam("topicId")
        this.setState({
            topicId: topicId
        })
        this.findAllAssignment(topicId);
        this.findAllExams(topicId);
    }

    findAllAssignment(topicId) {

        return fetch("https://cs5610-react-native-aparna.herokuapp.com/api/topic/" + topicId + "/assignment")
            .then(response => (response.json()))
            .then(assignments => this.setState({assignments}))
    }

    findAllExams(topicId) {

        return fetch("https://cs5610-react-native-aparna.herokuapp.com/api/topic/" + topicId + "/exam")
            .then(response => (response.json()))
            .then(exams => this.setState({exams}))
    }

    deleteWidget(widgetId) {
        fetch(("https://cs5610-react-native-aparna.herokuapp.com/api/widget/WID").replace('WID', widgetId), {
            method: 'delete'
        }).then(this.findAllAssignment(this.state.topicId))
            .then(this.findAllExams(this.state.topicId))

    }


    render() {
        return (
            <View style={{padding: 15}}>

                <Text h3>Assignments <Icon
                    raised
                    reverse
                    name='plus-circle'
                    color='#517fa4'
                    size={40}
                    style={{marginLeft: 20}}
                    type='font-awesome'
                    onPress={() => this.props.navigation
                        .navigate('AssignmentEditor')}
                />
                </Text>
                <View style={{padding: 15}}>
                    {this.state.assignments.map((assignment, index) => (
                        <ListItem
                            leftIcon={<Icon
                                raised
                                reverse
                                name='trash'
                                size={20}
                                style={{paddingRight: 20}}
                                type='font-awesome'
                                onPress={() => this.deleteWidget(assignment.id)}
                            />}
                            key={index}
                            title={assignment.name}/>
                    ))}
                </View>

                <Text h3>Exams <Icon
                    raised
                    reverse
                    name='plus-circle'
                    color='#517fa4'
                    size={40}
                    style={{marginLeft: 20}}
                    type='font-awesome'
                    onPress={() => this.props.navigation
                        .navigate('AssignmentEditor')}
                /></Text>
                <View style={{padding: 15}}>
                    {this.state.exams.map((exam, index) => (
                        <ListItem
                            leftIcon={<Icon
                                raised
                                reverse
                                name='trash'
                                size={20}
                                style={{paddingRight: 20}}
                                type='font-awesome'
                                onPress={() => this.deleteWidget(exam.id)}
                            />}
                            key={index}
                            title={exam.name}/>
                    ))}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({

    addButton: {
        backgroundColor: '#68a0cf',
        overflow: 'hidden',
    },
});

export default WidgetList