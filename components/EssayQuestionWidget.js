import React, {Component} from 'react'
import {View, TextInput, ScrollView, Alert,Keyboard} from 'react-native'
import {FormLabel, FormInput, FormValidationMessage, Button, Text, Card} from 'react-native-elements'


class EssayQuestionWidget extends Component {
    static navigationOptions = {title: 'Essay Question Editor'}

    constructor(props) {
        super(props)
        this.state = {
            instructions:'',
            title: '',
            description: '',
            points: '',
            widgetId: '',
            questionId: ''

        }

    }}

    export default EssayQuestionWidget