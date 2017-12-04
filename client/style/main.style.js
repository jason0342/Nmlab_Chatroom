import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		flex:1,
		backgroundColor: '#fff',
	},
	header: {
		flexDirection:'row',
		flex:1,
		backgroundColor: 'powderblue',
	},
	main: {
		flex:6,
		backgroundColor: 'skyblue',
    paddingBottom:6,
	},
	footer: {
		flexDirection:'row',
		flex:1,
		backgroundColor: 'steelblue',
	},
	alignCenter:{
	  justifyContent: 'center',
	  alignItems: 'center',
	},
	headerText: {
	  color: 'navy',
	  fontSize: 40,
	},
	footerText: {
	  color: 'white',
	  fontSize:36,
	},
	accountTextInput: {
    width: 200,
	  margin: 24,
	  fontSize: 32,
	  borderRadius: 12,
	  backgroundColor: 'steelblue',
	  paddingLeft: 24,
	  paddingRight: 24,
	},
	loginButton: {
	  height: 36,
	  backgroundColor: 'white',
	  flex:2,
	  borderRadius: 12,
	  alignItems: 'center',
	},
	loginButtonText: {
	  fontSize: 24,
	},
  roomList: {

  },
	grid: {
		aspectRatio:3,
		paddingHorizontal: 9,
    paddingTop: 9,
	},
  roomGridButton:{
    flex:1,
    // backgroundColor: 'steelblue',
    borderRadius: 12,
    flexDirection: 'row',
  },
  roomGridPictureView:{
    flex:1,
    borderRadius: 12,
    paddingVertical: 9,
    paddingLeft: 9,
    paddingRight: 0,
  },
  roomGridPictureBox:{
    flex:1,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 9,
  },
  roomGridTextView:{
    flex:3,
    borderRadius: 12,
    paddingVertical: 9,
    paddingLeft: 9,
    paddingRight: 9,
  },
  roomGridTextBox:{
    flex:1,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 9,
  },
  chatGrid:{
    aspectRatio: 8,
    paddingTop: 6,
    paddingHorizontal: 6,
    // paddingTop: 3,
    flexDirection: 'row',
  },
  chatTextViewSelf:{
    flex:2,
    backgroundColor: '#0084ff',
    borderRadius: 12,
    paddingVertical: 3,
    paddingHorizontal: 6,
  },
  chatTextSelf:{
    color:'white',
    fontSize:24,
    textAlign:'center',
  },
  chatTextView:{
    flex:2,
    backgroundColor: '#dddddd',
    borderRadius: 12,
    paddingVertical: 3,
    paddingHorizontal: 6,
  },
  chatText:{
    color:'black',
    fontSize:24,
    textAlign:'center',
  },
  chatFooter:{
    flex:3,
    flexDirection:'row',
  },
  chatTextInputView:{
    flex:4,
    padding:12,
  },
  chatTextInput:{
    flex:1,
    fontSize: 24,
    borderRadius: 12,
    backgroundColor: 'white',
    paddingLeft: 12,
    paddingRight: 12,
  },
  sendChatTextButtonView:{
    flex:1,
    paddingRight:12,
    paddingVertical:12,
  },
  sendChatTextButton:{
    flex:1,
    backgroundColor: 'white',
    borderRadius: 12,
    alignItems: 'center',
  },
  sendButtonText:{
    fontSize:18,
  },
	defaultImage: {
		flex:1,
		resizeMode:'contain',
	},
});

module.exports = styles