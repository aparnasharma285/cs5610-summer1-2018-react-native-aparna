import React, {Component} from 'react'
import {View, TextInput, ScrollView, Alert} from 'react-native'
import {FormLabel, FormInput, FormValidationMessage, Button, Text, Card, CheckBox} from 'react-native-elements'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';


class TrueOrFalseQuestionWidget extends Component {
    static navigationOptions = {title: 'True False Question'}

    constructor(props) {
        super(props)
        this.state = {
            instructions: '',
            title: '',
            description: '',
            points: '',
            widgetId: '',
            questionId: '',
            examName:'',
            isTrue: false

        }

        this.updateQuestion = this.updateQuestion.bind(this);

    }


    updateForm(newState) {
        this.setState(newState)
    }

    updateQuestion() {


        fetch(("https://cs5610-react-native-aparna.herokuapp.com/api/exam/" + this.state.widgetId), {
            body: JSON.stringify({
                'name':this.state.examName
            }),
            headers: {'Content-Type': 'application/json'},
            method: 'PUT'
        })

        fetch(("https://cs5610-react-native-aparna.herokuapp.com/api/truefalse/" + this.state.questionId),
            {
                body: JSON.stringify({
                    'id': this.state.questionId,
                    'instructions': this.state.instructions,
                    'title': this.state.title,
                    'description': this.state.description,
                    'points': this.state.points,
                    'isTrue': this.state.isTrue
                }),
                headers: {'Content-Type': 'application/json'},
                method: 'PUT'
            })
            .then(this.findQuestionById(this.state.questionId))
            .then(Alert.alert("Changes saved"))
            .then(this.props.navigation.navigate("ExamWidget", {widgetId: this.state.widgetId}))
    }

    findQuestionById(questionId) {
        return fetch(("https://cs5610-react-native-aparna.herokuapp.com/api/truefalse/EID").replace('EID', questionId))
            .then(response => (response.json()))

    }

    findExamById(examId){
        return fetch(("https://cs5610-react-native-aparna.herokuapp.com//api/exam/EID").replace('EID', examId))
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
            isTrue: question.isTrue
        }))

        this.findExamById(widgetId).then((exam) => this.setState({examName:exam.name}))
    }


    render() {


        var radio_props = [
            {label: 'True ', value: 0},
            {label: 'False', value: 1}
        ];
        return (
            <ScrollView>

                <FormLabel>Exam Name</FormLabel>
                <FormInput value={this.state.examName} onChangeText={
                    text => this.updateForm({examName: text})
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

                <FormLabel>Instructions</FormLabel>
                <FormInput value={this.state.instructions} onChangeText={
                    text => this.updateForm({instructions: text})
                }/>


                <CheckBox onPress={() => this.updateForm({isTrue: !this.state.isTrue})}
                          checked={this.state.isTrue} title='Check if Answer is True'/>
                <Text>&nbsp;</Text>
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

                    <View style={{padding: 15, marginBottom: 15}}>
                        <RadioForm
                            radio_props={radio_props}
                            initial={0}
                            formHorizontal={true}
                            onPress={() => {}}/>
                    </View>
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

export default TrueOrFalseQuestionWidget