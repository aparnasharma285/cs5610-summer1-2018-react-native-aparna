import React, {Component} from 'react'
import {View, TextInput, ScrollView, Alert,Keyboard} from 'react-native'
import {FormLabel, FormInput, FormValidationMessage, Button, Text, Card} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'

class AssignmentWidget extends Component {
    static navigationOptions = {title: 'AssignmentWidget'}

    constructor(props) {
        super(props)
        this.state = {
            name:'',
            title: '',
            description: '',
            points: '',
            widgetId: '',
            topicId: ''

        }

        this.updateAssignment= this.updateAssignment.bind(this);
    }

    updateForm(newState) {
        this.setState(newState)
    }

    updateAssignment() {


         fetch(("https://cs5610-react-native-aparna.herokuapp.com/api/assignment/" + this.state.widgetId),
            {
                body: JSON.stringify({
                    'id':this.state.widgetId,
                    'name': this.state.name,
                    'title': this.state.title,
                    'description': this.state.description,
                    'points': this.state.points
                }),
                headers: {'Content-Type': 'application/json'},
                method: 'PUT'
            })
            .then(this.findAssignmentById(this.state.widgetId))
             .then(Alert.alert("Changes Saved"))

    }


    componentDidMount() {
        const {navigation} = this.props;
        const widgetId = navigation.getParam("widgetId");
        const topicId = navigation.getParam("topicId");
        this.setState({
            topicId: topicId,
            widgetId: widgetId
        })

        this.findAssignmentById(widgetId).then((assignment) => this.setState({
            title: assignment.title,
            name: assignment.name,
            points: assignment.points,
            description: assignment.description

        }))


    }


    findAssignmentById(widgetId) {
        return fetch(("https://cs5610-react-native-aparna.herokuapp.com/api/assignment/AID").replace('AID', widgetId))
            .then(response => (response.json()))

    }

    render() {

        return (
            <ScrollView>
                <FormLabel>Name</FormLabel>
                <FormInput value={this.state.name} onChangeText={
                    text => this.updateForm({name: text})
                }/>
                <FormValidationMessage>
                    Name is required
                </FormValidationMessage>

                <FormLabel>Title</FormLabel>
                <FormInput value={this.state.title} onChangeText={
                    text => this.updateForm({title: text})
                }/>
                <FormValidationMessage>
                    Title is required
                </FormValidationMessage>


                <FormLabel>Points</FormLabel>
                <FormInput
                    value={String(this.state.points)}
                    keyboardType='numeric'
                    onChangeText={
                        text => this.updateForm({points: text})
                    }/>
                <FormValidationMessage>
                    points is required
                </FormValidationMessage>


                <FormLabel>Description</FormLabel>
                <FormInput value={this.state.description} onChangeText={
                    text => this.updateForm({description: text})
                }/>
                <FormValidationMessage>
                    Description is required
                </FormValidationMessage>


                <Button backgroundColor="green" color="white" title="Save"
                        onPress={() => this.updateAssignment(this.state.widgetId)}/>
                <Text>&nbsp;</Text>
                <Button backgroundColor="red" color="white" title="Cancel" onPress={() => this.props.navigation
                    .navigate("WidgetList", {topicId: this.state.topicId})}/>

                <Text h3 style={{padding:15}}>Preview</Text>

                <View style={{flexDirection: 'row', padding:15}}>
                    <Text h4> {this.state.title} </Text><Text h4> {this.state.points}pts</Text>
                </View>

                <Text style={{padding:15}}>{this.state.description}</Text>

                <View>
                <Text h4 style={{padding:15}}>Essay Answer</Text>
                <TextInput editable={false} multiline={true} numberOfLines={3}/>
                </View>
                <Text h4 style={{padding:15}}>Upload File</Text>
                <FormInput style={{border: 2}}/>

                <Text style={{padding:15}} h4> Submit a link</Text>
            </ScrollView>
        )
    }
}

            export default AssignmentWidget