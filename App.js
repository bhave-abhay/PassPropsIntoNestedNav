/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, Text, TouchableOpacity, View} from 'react-native';

import {
    createStackNavigator,
    createBottomTabNavigator,
    createSwitchNavigator,
    createDrawerNavigator,
    createAppContainer
} from 'react-navigation';



class HomeTab1 extends Component {
	render() {
		return (
			<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
				<Text>This is home tab 1</Text>
				<Text>navigation param propFoo is {this.props.navigation.getParam('propFoo', 'Not available in Tab1!!')}</Text>
				<Text>navigation param propBar is {this.props.navigation.getParam('propBar', 'Not available in Tab1!!')}</Text>
				<Text>screenProps is {this.props.screenProps === undefined ? 'Undefined!' : this.props.screenProps}</Text>
				<TouchableOpacity
					onPress={()=>this.props.navigation.navigate(
						'OtherScreen',
						{
							'propFoo': this.props.navigation.getParam('propFoo', 'FallbackFoo from Tab1!!'),
							'propBar': this.props.navigation.getParam('propBar', 'FallbackBar from Tab1!!')
						}
					)}
				>
					<Text>Go to other screen</Text>
				</TouchableOpacity>

				<TouchableOpacity
					onPress={()=>this.props.navigation.navigate(
						'HomeTab2',
						{
							'propFoo': this.props.navigation.getParam('propFoo', 'FallbackFoo from Tab1!!'),
							'propBar': this.props.navigation.getParam('propBar', 'FallbackBar from Tab1!!')
						}
					)}
				>
					<Text>Go to other tab</Text>
				</TouchableOpacity>

				<TouchableOpacity
					onPress={()=>this.props.navigation.navigate('OtherScreen')}
				>
					<Text>Go to other screen with no explicit params</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

class HomeTab2 extends Component {
	render() {
		return (
			<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
				<Text>This is home tab 2</Text>
				<Text>navigation param propFoo is {this.props.navigation.getParam('propFoo', 'Not available in Tab2!!')}</Text>
				<Text>navigation param propBar is {this.props.navigation.getParam('propBar', 'Not available in Tab2!!')}</Text>
				<Text>screenProps is {this.props.screenProps === undefined ? 'Undefined!' : this.props.screenProps}</Text>
				<TouchableOpacity
					onPress={()=>this.props.navigation.navigate(
						'OtherScreen',
						{
							'propFoo': this.props.navigation.getParam('propFoo', 'Not available from Tab2!!'),
							'propBar': this.props.navigation.getParam('propBar', 'Not available from Tab2!!')
						}
					)}
				>
					<Text>Go to other screen</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

const HomeScreen = createBottomTabNavigator(
	{
		'HomeTab1': HomeTab1,
		'HomeTab2': HomeTab2,
	},
	{
		'screenProps': ({navigation}) => {
			return {
				'propFoo': this.props.navigation.getParam('propFoo', 'Not available in TabNav!!'),
				'propBar': this.props.navigation.getParam('propBar', 'Not available in TabNav!!')
			}
		}
	}
)

class OtherScreen extends Component {
	render() {
		return (
			<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
				<Text>This is other screen</Text>
				<Text>navigation param propFoo is {this.props.navigation.getParam('propFoo', 'Not available!!')}</Text>
				<Text>navigation param propBar is {this.props.navigation.getParam('propBar', 'Not available!!')}</Text>
				<Text>screenProps is {this.props.screenProps === undefined ? 'Undefined!' : this.props.screenProps}</Text>
				<TouchableOpacity
					onPress={()=>this.props.navigation.navigate('HomeScreen')}
				>
					<Text>Go back to home screen</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

const AppStack = createStackNavigator(
	{
	    'HomeScreen': {
			'screen': HomeScreen,
			'navigationOptions': {
				'title': 'Home'
			}
		},
		'OtherScreen': {
			'screen': OtherScreen,
			'navigationOptions': {
				'title': 'Other'
			}
		}
	}
);

class Splash extends Component {

	constructor(props) {
		super(props);
		this.state={
			secondsRemaining: 5,
			timerID: null
		}
	}

	componentDidMount() {

		var timerID = setInterval(
			()=>{
				this.setState(
					state => {state.secondsRemaining = state.secondsRemaining-1; return state;},
					()=>{
						if(this.state.secondsRemaining === 0) {
							clearInterval(this.state.timerID);
							this.setState(
								{
									timerID: null
								},
								()=> {
									this.props.navigation.navigate('App', {propFoo: 'Foo', propBar: 'Bar'})
								}
							)
						}
					}
				)
			},
			1000
		);
		this.setState({
			timerID: timerID
		})
	}

	render() {
		return (
			<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
				<Text>This is splash screen</Text>
				<Text>Going to App in {this.state.secondsRemaining} seconds</Text>
			</View>
		);
	}
}

const AppSwitchNavigator = createSwitchNavigator(
	{
		'Splash': Splash,
		'App': AppStack
	}
)

export default createAppContainer(AppSwitchNavigator);
