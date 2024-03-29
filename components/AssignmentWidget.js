import React, {Component} from 'react'
import {View, TextInput, ScrollView, Alert, Keyboard} from 'react-native'
import {FormLabel, FormInput, FormValidationMessage, Button, Text, Card} from 'react-native-elements'


class AssignmentWidget extends Component {
    static navigationOptions = {title: 'AssignmentWidget'}

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            title: '',
            description: '',
            points: '',
            widgetId: '',
            topicId: ''

        }

        this.updateAssignment = this.updateAssignment.bind(this);
    }

    updateForm(newState) {
        this.setState(newState)
    }

    updateAssignment() {


        fetch(("https://cs5610-react-native-aparna.herokuapp.com/api/assignment/" + this.state.widgetId),
            {
                body: JSON.stringify({
                    'id': this.state.widgetId,
                    'name': this.state.name,
                    'title': this.state.title,
                    'description': this.state.description,
                    'points': this.state.points
                }),
                headers: {'Content-Type': 'application/json'},
                method: 'PUT'
            })
            .then(this.findAssignmentById(this.state.widgetId))
            .then(Alert.alert("Changes saved"))
            .then(this.props.navigation.navigate("WidgetList", {topicId: this.state.topicid}))

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

                <FormLabel>Title</FormLabel>
                <FormInput value={this.state.title} onChangeText={
                    text => this.updateForm({title: text})
                }/>

                <FormLabel>Points</FormLabel>
                <FormInput
                    value={String(this.state.points)}
                    keyboardType='numeric'
                    onChangeText={
                        text => this.updateForm({points: text})
                    }/>

                <FormLabel>Description</FormLabel>
                <FormInput value={this.state.description} onChangeText={
                    text => this.updateForm({description: text})
                }/>

                <View style={{padding:10}}></View>

                <Button backgroundColor="green" color="white" title="Save"
                        onPress={() => this.updateAssignment(this.state.widgetId)}/>
                <Text>&nbsp;</Text>
                <Button backgroundColor="red" color="white" title="Cancel" onPress={() => this.props.navigation
                    .navigate("WidgetList", {topicId: this.state.topicId})}/>

                <Card style={{padding: 15}}>

                    <Text h3 style={{padding: 15}}>Preview</Text>
                    <View style={{flexDirection: 'row', padding: 15}}>
                        <Text h4> {this.state.name}</Text><Text h4> {this.state.points}pts</Text>
                    </View>

                    <Text style={{padding: 15}}>{this.state.description}</Text>

                    <View>
                        <Text h4 style={{padding: 15}}>Essay Answer</Text>
                        <TextInput editable={false} multiline={true} numberOfLines={5}
                                   style={{borderRadius: 4, borderWidth: 1, marginLeft: 10, marginRight: 10}}/>
                    </View>
                    <Text h4 style={{padding: 15}}>Upload File</Text>
                    <Card>
                        <View style={{flexDirection: 'row'}}>
                        <Button buttonStyle={{width:100,marginLeft:0}} title="Choose File" onPress={()=>{}}/>
                            <Text>No file chosen</Text>
                        </View>
                    </Card>

                    <FormInput editable={false} style={{border: 2}}/>

                    <Text editable={false} style={{padding: 15}} h4> Submit a link</Text>
                    <FormInput editable={false} style={{border: 2, marginBottom: 10}}/>

                    <Text>&nbsp;</Text>
                    <View style={{flexDirection: 'row'}}>
                        <Button  buttonStyle={{borderRadius:5, width:90}} backgroundColor="#f44e42" color="white" title="Cancel" onPress={() => {}}/>
                        <Button buttonStyle={{borderRadius:5, width:90}}backgroundColor="#419af4" color="white" title="Submit" onPress={() => {}}/>
                    </View>

                </Card>
                <View style={{padding:15}}></View>
            </ScrollView>
        )
    }
}

export default AssignmentWidget