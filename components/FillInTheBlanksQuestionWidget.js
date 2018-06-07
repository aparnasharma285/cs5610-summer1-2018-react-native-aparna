import React, {Component} from 'react'
import {View, TextInput, ScrollView, Alert, Keyboard} from 'react-native'
import {FormLabel, FormInput, FormValidationMessage, Button, Text, Card} from 'react-native-elements'


class FillInTheBlanksQuestionWidget extends Component {
    static navigationOptions = {title: 'Fill in the Blanks Question'}

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

        var equation = this.state.variables.replace(/\[.*?]/,'<FormInput></FormInput>');

        return (
            <ScrollView>

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


                <FormLabel>Instructions</FormLabel>
                <FormInput value={this.state.instructions} onChangeText={
                    text => this.updateForm({instructions: text})
                }/>


                <FormLabel>Variables</FormLabel>
                <FormInput value={this.state.variables} onChangeText={
                    text => this.updateForm({variables: text})
                }/>



                <Button backgroundColor="green" color="white" title="Save"
                        onPress={() => this.updateQuestion(this.state.questionId)}/>
                <Text>&nbsp;</Text>
                <Button backgroundColor="red" color="white" title="Cancel" onPress={() => this.props.navigation
                    .navigate("ExamWidget", {widgetId: this.state.widgetId})}/>

                <Card style={{padding: 15, marginBottom: 10}}>

                    <Text h3 style={{padding: 15}}>Preview</Text>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{width: 250}}>
                            <Text h4 style={{flex: 1, flexWrap: 'wrap'}}> {this.state.title} </Text>
                        </View>
                        <View style={{width: 100}}>
                            <Text h4> {this.state.points}pts</Text>
                        </View>
                    </View>
                    <Text style={{padding: 15}}>{this.state.description}</Text>

                    {equation}
                </Card>
                <View style={{padding:15}}></View>
            </ScrollView>
        )
    }
}

export default FillInTheBlanksQuestionWidget