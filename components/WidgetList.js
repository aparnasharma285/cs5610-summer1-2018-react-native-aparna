import React, {Component} from 'react'
import {View, ScrollView, StyleSheet} from 'react-native'
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
        this.createAssignment = this.createAssignment.bind(this);
        this.createExam = this.createExam.bind(this);
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

        return fetch("http://192.168.0.9:8080/api/topic/" + topicId + "/exam")
            .then(response => (response.json()))
            .then(exams => this.setState({exams}))
    }

    deleteWidget(widgetId) {
        fetch(("https://cs5610-react-native-aparna.herokuapp.com/api/widget/WID").replace('WID', widgetId), {
            method: 'delete'
        }).then(this.findAllAssignment(this.state.topicId))
            .then(this.findAllExams(this.state.topicId))

    }

    createAssignment() {
         fetch(("https://cs5610-react-native-aparna.herokuapp.com/api/topic/TID/assignment").replace('TID', this.state.topicId),
            {
                body: JSON.stringify(
                    {
                        'id': this.state.assignments.length + 1,
                        'name': 'default Assignment'
                    }
                ),
                headers: {'Content-Type': 'application/json'},
                method: 'POST'
            })
            .then(this.findAllAssignment(this.state.topicId))
            .then(this.findAllExams(this.state.topicId))
    }

    createExam() {
         fetch(("https://cs5610-react-native-aparna.herokuapp.com/api/topic/TID/exam").replace('TID', this.state.topicId),
            {
                body: JSON.stringify({
                    "id": this.state.exams.length + 1,
                    "name": 'default Exam'
                }),
                headers: {'Content-Type': 'application/json'},
                method: 'POST'
            }).then(this.findAllAssignment(this.state.topicId))
            .then(this.findAllExams(this.state.topicId))
    }


    render() {
        return (
            <ScrollView style={{padding: 15}}>

                <Text h3>Assignments <Icon
                    raised
                    reverse
                    name='plus-circle'
                    color='#517fa4'
                    size={50}
                    style={{marginLeft: 20}}
                    type='font-awesome'
                    onPress={() => this.createAssignment()}
                />
                </Text>
                <View style={{padding: 15}}>
                    {this.state.assignments.map((assignment, index) => (
                        <ListItem
                            leftIcon={<Icon
                                raised
                                reverse
                                name='trash'
                                size={30}
                                style={{paddingRight: 20}}
                                type='font-awesome'
                                onPress={() => this.deleteWidget(assignment.id)}
                            />}
                            key={index}
                            title={assignment.name}
                            onPress={() => this.props.navigation
                                .navigate("AssignmentEditor", {topicId: topicId, widgetId: assignment.id})}/>
                    ))}
                </View>

                <Text h3>Exams <Icon
                    raised
                    reverse
                    name='plus-circle'
                    color='#517fa4'
                    size={50}
                    style={{marginLeft: 20}}
                    type='font-awesome'
                    onPress={() => this.createExam()}/>
                </Text>
                <View style={{padding: 15}}>
                    {this.state.exams.map((exam, index) => (
                        <ListItem
                            leftIcon={<Icon
                                raised
                                reverse
                                name='trash'
                                size={30}
                                style={{paddingRight: 20}}
                                type='font-awesome'
                                onPress={() => this.deleteWidget(exam.id)}
                            />}
                            key={index}
                            title={exam.name}
                            onPress={() => this.props.navigation
                                .navigate("ExamEditor", {topicId: topicId, widgetId: exam.id})}/>
                    ))}
                </View>
            </ScrollView>
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