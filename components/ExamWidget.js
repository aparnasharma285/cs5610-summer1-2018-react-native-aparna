import React, {Component} from 'react'
import {View, Alert, ScrollView} from 'react-native'
import {Text, ListItem} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'

class ExamWidget extends Component {
    static navigationOptions = {title: 'ExamWidget'}

    constructor(props) {
        super(props)
        this.state = {
            essays: [],
            trueFalses: [],
            blanks: [],
            choices: [],
            topicId: '',
            widgetId: ''
        }
        this.createEssayQuestion = this.createEssayQuestion.bind(this);
        this.createTrueOrFalseQuestion = this.createTrueOrFalseQuestion.bind(this);
        this.createMultipleChoiceQuestion = this.createMultipleChoiceQuestion.bind(this);
        this.createFillInTheBlanksQuestion = this.createFillInTheBlanksQuestion.bind(this);
        this.deleteQuestion = this.deleteQuestion.bind(this);
    }


    componentDidMount() {
        const {navigation} = this.props;
        const topicId = navigation.getParam("topicId")
        const widgetId = navigation.getParam("widgetId")

        this.setState({
            topicId: topicId,
            widgetId: widgetId
        })

        this.findEssayQuestions(widgetId);
        this.findBlankQuestions(widgetId);
        this.findChoicesQuestions(widgetId);
        this.findTrueFalseQuestions(widgetId);

    }


    componentWillReceiveProps(newProps) {

        const {navigation} = this.props;
        const topicId = navigation.getParam("topicId")
        const widgetId = navigation.getParam("widgetId")

        this.setState({
            topicId: topicId,
            widgetId: widgetId
        })

        this.findEssayQuestions(widgetId);
        this.findBlankQuestions(widgetId);
        this.findChoicesQuestions(widgetId);
        this.findTrueFalseQuestions(widgetId);

    }

    findEssayQuestions(widgetId) {

        return fetch(("https://cs5610-react-native-aparna.herokuapp.com/api/exam/WID/essay").replace('WID', widgetId))
            .then(response => (response.json()))
            .then(essays => this.setState({
                essays: essays
            }))
    }

    findBlankQuestions(widgetId) {

        return fetch(("https://cs5610-react-native-aparna.herokuapp.com/api/exam/WID/blanks").replace('WID', widgetId))
            .then(response => (response.json()))
            .then(blanks => this.setState({
                blanks: blanks
            }))
    }

    findChoicesQuestions(widgetId) {

        return fetch(("https://cs5610-react-native-aparna.herokuapp.com/api/exam/WID/choice").replace('WID', widgetId))
            .then(response => (response.json()))
            .then(choices => this.setState({
                choices: choices
            }))
    }

    findTrueFalseQuestions(widgetId) {

        return fetch(("https://cs5610-react-native-aparna.herokuapp.com/api/exam/WID/truefalse").replace('WID', widgetId))
            .then(response => (response.json()))
            .then(trueFalses => this.setState({
                trueFalses: trueFalses
            }))
    }


    deleteQuestion(questionId) {

        fetch(("https://cs5610-react-native-aparna.herokuapp.com/api/exam/questions/QID").replace('QID', questionId), {
            method: 'delete'
        }).then(this.findEssayQuestions(this.state.widgetId))
            .then(this.findBlankQuestions(this.state.widgetId))
            .then(this.findChoicesQuestions(this.state.widgetId))
            .then(this.findTrueFalseQuestions(this.state.widgetId))
    }

    createEssayQuestion() {

        fetch(("https://cs5610-react-native-aparna.herokuapp.com/api/exam/EID/essay").replace('EID', this.state.widgetId),
            {
                body: JSON.stringify(
                    {
                        'id': this.state.essays.length + 1,
                        'title': 'default Essay Type Question'
                    }
                ),
                headers: {'Content-Type': 'application/json'},
                method: 'POST'
            })
            .then(this.findEssayQuestions(this.state.widgetId))
    }

    createTrueOrFalseQuestion() {

        fetch(("https://cs5610-react-native-aparna.herokuapp.com/api/exam/EID/truefalse").replace('EID', this.state.widgetId),
            {
                body: JSON.stringify(
                    {
                        'id': this.state.trueFalses.length + 1,
                        'title': 'default True or False Type Question',
                        'isTrue': 'false'
                    }
                ),
                headers: {'Content-Type': 'application/json'},
                method: 'POST'
            })
            .then(this.findTrueFalseQuestions(this.state.widgetId))
    }

    createMultipleChoiceQuestion() {

        fetch(("https://cs5610-react-native-aparna.herokuapp.com/api/exam/EID/choice").replace('EID', this.state.widgetId),
            {
                body: JSON.stringify(
                    {
                        'id': this.state.choices.length + 1,
                        'title': 'default MCQ Type Question',
                        'options': 'Not Available'
                    }
                ),
                headers: {'Content-Type': 'application/json'},
                method: 'POST'
            })
            .then(this.findChoicesQuestions(this.state.widgetId))
    }

    createFillInTheBlanksQuestion() {

        fetch(("https://cs5610-react-native-aparna.herokuapp.com/api/exam/EID/blanks").replace('EID', this.state.widgetId),
            {
                body: JSON.stringify(
                    {
                        'id': this.state.blanks.length + 1,
                        'title': 'default Fill in the Blank Type Question',
                        'variables': 'not available'
                    }
                ),
                headers: {'Content-Type': 'application/json'},
                method: 'POST'
            })
            .then(this.findBlankQuestions(this.state.widgetId))
    }

    render() {

        return (
            <ScrollView style={{padding: 15}}>
                <View style={{flexDirection: 'row', marginTop:10}}>
                    <View style={{width: 250}}>
                        <Text h3 style={{flex: 1, flexWrap: 'wrap'}}>Essay </Text></View>
                    <View style={{width: 100}}>
                <Icon
                    raised
                    reverse
                    name='plus-circle'
                    color='#517fa4'
                    size={50}
                    style={{marginLeft: 20}}
                    type='font-awesome'
                    onPress={() => this.createEssayQuestion()}/></View></View>

                <View style={{padding: 15}}>
                    {this.state.essays.map((question, index) => (
                        <ListItem
                            leftIcon={<Icon
                                raised
                                reverse
                                name='trash'
                                size={30}
                                style={{paddingRight: 20}}
                                type='font-awesome'
                                onPress={() => this.deleteQuestion(question.id)}
                            />}
                            key={index}
                            title={question.title}
                            onPress={() => this.props.navigation
                                .navigate("EssayQuestionWidget", {
                                    widgetId: this.state.widgetId,
                                    questionId: question.id
                                })}/>
                    ))}
                </View>


                <View style={{flexDirection: 'row', marginTop:10}}>
                    <View style={{width: 250}}>
                        <Text h3 style={{flex: 1, flexWrap: 'wrap'}}>True or False </Text></View>
                    <View style={{width: 100}}>
                <Icon
                    raised
                    reverse
                    name='plus-circle'
                    color='#517fa4'
                    size={50}
                    style={{marginLeft: 20}}
                    type='font-awesome'
                    onPress={() => this.createTrueOrFalseQuestion()}/></View></View>

                <View style={{padding: 15}}>
                    {this.state.trueFalses.map((question, index) => (
                        <ListItem
                            leftIcon={<Icon
                                raised
                                reverse
                                name='trash'
                                size={30}
                                style={{paddingRight: 20}}
                                type='font-awesome'
                                onPress={() => this.deleteQuestion(question.id)}
                            />}
                            key={index}
                            title={question.title}
                            onPress={() => this.props.navigation
                                .navigate("TrueOrFalseQuestionWidget", {
                                    widgetId: this.state.widgetId,
                                    questionId: question.id
                                })}/>
                    ))}
                </View>

                <View style={{flexDirection: 'row', marginTop:10}}>
                    <View style={{width: 250}}>
                        <Text h3 style={{flex: 1, flexWrap: 'wrap'}}>Multiple Choice </Text></View>
                    <View style={{width: 100}}>
                <Icon
                    raised
                    reverse
                    name='plus-circle'
                    color='#517fa4'
                    size={50}
                    style={{marginLeft: 20}}
                    type='font-awesome'
                    onPress={() => this.createMultipleChoiceQuestion()}/></View></View>

                <View style={{padding: 15}}>
                    {this.state.choices.map((question, index) => (
                        <ListItem
                            leftIcon={<Icon
                                raised
                                reverse
                                name='trash'
                                size={30}
                                style={{paddingRight: 20}}
                                type='font-awesome'
                                onPress={() => this.deleteQuestion(question.id)}
                            />}
                            key={index}
                            title={question.title}
                            onPress={() => this.props.navigation
                                .navigate("MultipleChoiceQuestionWidget", {
                                    widgetId: this.state.widgetId,
                                    questionId: question.id
                                })}/>
                    ))}
                </View>

                <View style={{flexDirection: 'row', marginTop:10}}>
                    <View style={{width: 250}}>
                        <Text h3 style={{flex: 1, flexWrap: 'wrap'}}>Fill in the blanks </Text></View>
                    <View style={{width: 100}}>
                <Icon
                    raised
                    reverse
                    name='plus-circle'
                    color='#517fa4'
                    size={50}
                    style={{marginLeft: 20}}
                    type='font-awesome'
                    onPress={() => this.createFillInTheBlanksQuestion()}/></View></View>

                <View style={{padding: 15}}>
                    {this.state.blanks.map((question, index) => (
                        <ListItem
                            leftIcon={<Icon
                                raised
                                reverse
                                name='trash'
                                size={30}
                                style={{paddingRight: 20}}
                                type='font-awesome'
                                onPress={() => this.deleteQuestion(question.id)}
                            />}
                            key={index}
                            title={question.title}
                            onPress={() => this.props.navigation
                                .navigate("FillInTheBlanksQuestionWidget", {
                                    widgetId: this.state.widgetId,
                                    questionId: question.id
                                })}/>
                    ))}
                </View>
            </ScrollView>

        )
    }
}

export default ExamWidget