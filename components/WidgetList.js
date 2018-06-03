import React, {Component} from 'react'
import {View, Alert} from 'react-native'
import {Text, ListItem} from 'react-native-elements'

class WidgetList extends Component {
    static navigationOptions = {title: 'WidgetList'}
    render() {
        return(
            <View style={{padding: 15}}>
                <Text>Hello from Widget</Text>
            </View>
        )
    }
}
export default WidgetList