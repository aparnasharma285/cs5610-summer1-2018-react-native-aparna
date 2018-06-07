import React, {Component} from 'react'
import {View, TextInput, ScrollView, Alert, Keyboard} from 'react-native'
import {FormLabel, FormInput, FormValidationMessage, Button, Text, Card} from 'react-native-elements'


class FillInTheBlanksQuestionWidget extends Component {
    static navigationOptions = {title: 'Fill in the Blanks Question Editor'}

    constructor(props) {
        super(props)
        this.state = {
            instructions: '',
            title: '',
            description: '',
            points: '',
            widgetId: '',
            questionId: '',
            variables: ''

        }

        this.updateQuestion = this.updateQuestion.bind(this);

    }

    updateForm(newState) {
        this.setState(newState)
    }


    updateQuestion() {
        fetch(("https://cs5610-react-native-aparna.herokuapp.com/api/blanks/" + this.state.questionId),
            {
                body: JSON.stringify({
                    'id': this.state.widgetId,
                    'instructions': this.state.instructions,
                    'title': this.state.title,
                    'description': this.state.description,
                    'points': this.state.points,
                    'variables': this.state.variables
                }),
                headers: {'Content-Type': 'application/json'},
                method: 'PUT'
            })
            .then(this.findQuestionById(this.state.questionId))
            .then(Alert.alert("Changes saved"))
            .then(this.props.navigation.navigate("ExamWidget", {widgetId: this.state.widgetId}))
    }

    findQuestionById(questionId) {
        return fetch(("https://cs5610-react-native-aparna.herokuapp.com/api/blanks/EID").replace('EID', questionId))
            .then(response => (response.json()))

    }

    componentDidMount() {
        const {navigation} = this.props;
        const widgetId = navigation.getParam("widgetId");
        const questionId = navigation.getParam("questionId");
        this.setState({
            questionId: questionId,
            widgetId: widgetId
        })

        this.findQuestionById(questionId).then((question) => this.setState({
            title: question.title,
            instructions: question.instructions,
            points: question.points,
            description: question.description,
            variables: question.variables
        }))
    }

    render() {

        return (
            <ScrollView style={{padding: 10, marginBottom: 10}}>

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

                <FormLabel>Instructions</FormLabel>
                <FormInput value={this.state.instructions} onChangeText={
                    text => this.updateForm({instructions: text})
                }/>
                <FormValidationMessage>
                    Instruction is required
                </FormValidationMessage>

                <FormLabel>Variables</FormLabel>
                <FormInput value={this.state.variables} onChangeText={
                    text => this.updateForm({variables: text})
                }/>
                <FormValidationMessage>
                    Variables is required
                </FormValidationMessage>


                <Button backgroundColor="green" color="white" title="Save"
                        onPress={() => this.updateQuestion(this.state.questionId)}/>
                <Text>&nbsp;</Text>
                <Button backgroundColor="red" color="white" title="Cancel" onPress={() => this.props.navigation
                    .navigate("ExamWidget", {widgetId: this.state.widgetId})}/>

                <Card style={{padding: 15, marginBottom: 10}}>

                    <Text h3 style={{padding: 15}}>Preview</Text>
                    <View style={{flexDirection: 'row', padding: 15}}>
                        <Text h4> {this.state.title} </Text><Text h4> {this.state.points}pts</Text>
                    </View>

                    <Text style={{padding: 15}}>{this.state.description}</Text>

                </Card>
            </ScrollView>
        )
    }
}

export default FillInTheBlanksQuestionWidget