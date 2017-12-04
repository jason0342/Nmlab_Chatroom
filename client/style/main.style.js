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
	  fontSize: 36,
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
  roomGridPicture:{
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
  roomGridText:{
    flex:1,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 9,
  },
	defaultImage: {
		flex:1,
		resizeMode:'contain',
	},
});

module.exports = styles