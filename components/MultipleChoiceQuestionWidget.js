import React, {Component} from 'react'
import {View, TextInput, ScrollView, Alert, Picker} from 'react-native'
import {FormLabel, FormInput, FormValidationMessage, Button, Text, Card} from 'react-native-elements'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';


class MultipleChoiceQuestionWidget extends Component {
    static navigationOptions = {title: 'Multiple Choice Question'}

    constructor(props) {
        super(props)
        this.state = {
            instructions: '',
            title: '',
            description: '',
            points: '',
            widgetId: '',
            questionId: '',
            options: 'No option Available',
            correctOption: '',
        }

        this.updateQuestion = this.updateQuestion.bind(this);
    }

    updateForm(newState) {
        this.setState(newState)
    }

    updateQuestion() {

        fetch(("https://cs5610-react-native-aparna.herokuapp.com/api/choice/" + this.state.questionId),
            {
                body: JSON.stringify({
                    'id': this.state.widgetId,
                    'instructions': this.state.instructions,
                    'title': this.state.title,
                    'description': this.state.description,
                    'points': this.state.points,
                    'options': this.state.options,
                    'correctOption': this.state.correctOption
                }),
                headers: {'Content-Type': 'application/json'},
                method: 'PUT'
            })
            .then(this.findQuestionById(this.state.questionId))
            .then(Alert.alert("Changes saved"))
            .then(this.props.navigation.navigate("ExamWidget", {widgetId: this.state.widgetId}))
    }

    findQuestionById(questionId) {
        return fetch(("https://cs5610-react-native-aparna.herokuapp.com/api/choice/EID").replace('EID', questionId))
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
            options: question.options,
            correctOption: question.correctOption
        }))
    }


    render() {

        var optionList = this.state.options.split('\n');
        let radioItems = []
        optionList.map((item, index) => radioItems.push({'label': item, value: index}))

        const pickerItems = optionList.map((option, index) => {
            return (
                <Picker.Item key={index} label={option} value={index}/>
            )
        })

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

                <FormLabel>Options</FormLabel>
                <TextInput style={{marginLeft: 10}} multiline={true} numberOfLines={6} value={this.state.options}
                           onChangeText={
                               text => this.updateForm({options: text})
                           }/>
                <FormValidationMessage>
                    Options is required
                </FormValidationMessage>

                <FormLabel>Correct Option</FormLabel>
                <Card>
                <Picker selectedValue={this.state.correctOption}
                        onValueChange={(itemIndex) => this.updateForm({correctOption: itemIndex})}>
                    {pickerItems}
                </Picker>
                </Card>
                <Text>&nbsp;</Text>
                <Button backgroundColor="green" color="white" title="Save"
                        onPress={() => this.updateQuestion(this.state.questionId)}/>
                <Text>&nbsp;</Text>
                <Button backgroundColor="red" color="white" title="Cancel" onPress={() => this.props.navigation
                    .navigate("ExamWidget", {widgetId: this.state.widgetId})}/>

                <Card style={{padding: 15, marginBottom: 20}}>

                    <Text h3 style={{padding: 15}}>Preview</Text>
                    <View style={{flexDirection: 'row', flex: 1}}>
                        <Text h4 style={{flex: 1, flexWrap: 'wrap'}}>{this.state.title}</Text><Text
                        h4>{this.state.points}pts</Text>
                    </View>

                    <Text style={{padding: 15}}>{this.state.description}</Text>

                    <View style={{padding: 15, marginBottom: 15}}>

                    </View>

                    <Card>
                        <RadioForm
                            radio_props={radioItems}
                            initial={0}
                            style={{alignItems: 'flex-start'}}
                            onPress={() => {Alert.alert("Read only Field !")}}/>
                    </Card>
                </Card>
                <View style={{padding:15}}></View>
            </ScrollView>
        )
    }
}

export default MultipleChoiceQuestionWidget