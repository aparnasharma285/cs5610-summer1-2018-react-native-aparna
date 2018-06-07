import React, {Component} from 'react'
import {View, TextInput, ScrollView, Alert, Keyboard} from 'react-native'
import {FormLabel, FormInput, FormValidationMessage, Button, Text, Card} from 'react-native-elements'


class EssayQuestionWidget extends Component {
    static navigationOptions = {title: 'Essay Question Editor'}

    constructor(props) {
        super(props)
        this.state = {
            instructions: '',
            title: '',
            description: '',
            points: '',
            widgetId: '',
            questionId: ''

        }

        this.updateQuestion = this.updateQuestion.bind(this);

    }


    updateForm(newState) {
        this.setState(newState)
    }

    updateQuestion() {
        fetch(("https://cs5610-react-native-aparna.herokuapp.com/api/essay/" + this.state.questionId),
            {
                body: JSON.stringify({
                    'id': this.state.widgetId,
                    'instructions': this.state.instructions,
                    'title': this.state.title,
                    'description': this.state.description,
                    'points': this.state.points
                }),
                headers: {'Content-Type': 'application/json'},
                method: 'PUT'
            })
            .then(this.findQuestionById(this.state.questionId))
            .then(Alert.alert("Changes saved"))
            .then(this.props.navigation.navigate("ExamWidget", {widgetId: this.state.widgetId}))
    }


    findQuestionById(questionId) {
        return fetch(("https://cs5610-react-native-aparna.herokuapp.com/api/essay/EID").replace('EID', questionId))
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
            description: question.description
        }))
    }

    render() {
        return (
            <ScrollView>

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


                <Button backgroundColor="green" color="white" title="Save"
                        onPress={() => this.updateQuestion(this.state.questionId)}/>
                <Text>&nbsp;</Text>
                <Button backgroundColor="red" color="white" title="Cancel" onPress={() => this.props.navigation
                    .navigate("ExamWidget", {widgetId: this.state.widgetId})}/>

                <Card style={{padding: 10, marginBottom: 10}}>

                    <Text h3 style={{padding: 15}}>Preview</Text>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{width: 250}}>
                        <Text h4 style={{flex: 1, flexWrap: 'wrap'}}> {this.state.title} </Text>
                        </View><View style={{width: 100}}><Text
                        h4> {this.state.points}pts</Text></View>
                    </View>

                    <Text style={{padding: 15}}>{this.state.description}</Text>

                    <View>
                        <Text h4 style={{padding: 15}}>Essay Answer</Text>
                        <TextInput editable={false} multiline={true} numberOfLines={5}
                                   style={{
                                       borderRadius: 4,
                                       borderWidth: 1,
                                       marginLeft: 10,
                                       marginRight: 10,
                                       marginBottom: 10
                                   }}/>
                    </View>
                </Card>
                <View style={{padding: 15}}></View>
            </ScrollView>
        )
    }
}

export default EssayQuestionWidget