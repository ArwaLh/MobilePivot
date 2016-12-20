/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  PanResponder,
  ScrollView,
  AsyncStorage,
  View
} from 'react-native';

import HeaderUp from '../components/headerUp';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import {Button, List, ListItem, Header, InputGroup, Input, Card, CardItem, Picker} from 'native-base';
import Slider from 'react-native-slider';
import { Col, Row, Grid } from "react-native-easy-grid";
const Item = Picker.Item;
import GestionNaevus from './gestionNaevus';
import LocatePic from './locatePic';
import firebase from 'firebase';
import DatePicker from 'react-native-datepicker';
export default class newPatient extends Component {
	constructor (props) {
    super(props);
	this.itemsRef = firebase.database().ref();
    this.state = {
		loaded:true,
		types1: [{label: 'Régulier', value: 0}, {label: 'Irrégulier', value: 1}],
		value1: 0,
		value1Index: 0,
		types2: [{label: 'Brun foncé', value: 0}, {label: 'Brun clair', value: 1}],
		value2: 0,
		value2Index: 0,
		types3: [{label: 'Oui', value: 0}, {label: 'Non', value: 1}],
		value3: 0,
		value3Index: 0,
		chickenWings: 1.5,
		value: 1.0,
		selectedItem: undefined,
		antec_perso: 'oui',
		antec_fam: 'oui',
		nbreGrain: 'sup',
		items_pat:[],
		date:"",
		username_med: '',
		patient_id: '',
		dateNaissance_pat: ''
	}}
	 componentWillMount(){
		this.setState({
			loaded: false
		});
	 }
	 componentDidMount(){
		 this.setState({
			loaded: true
		});
	 }
    onValueChangePerso (value: string) {
        this.setState({
            antec_perso : value
        });
    }
	onValueChangeFam (value: string) {
        this.setState({
            antec_fam : value
        });
    }
	onValueChangeNbreGrain (value: string) {
        this.setState({
			nbreGrain: value
        });
    }
  
	locatePic(){
		AsyncStorage.getItem('medecin_username').then((medecin_usernamee) => {
			this.itemsRef.child('medecins/'+medecin_usernamee).child('patients/').on('value', (snap) => {
				let items=[];
				// get children as an array
				snap.forEach((child) => {
					items.push({
						antecedents_familiaux :child.val().antecedents_familiaux,
					  _key: child.key,
					});
				});
				const items_pat = items;
				this.setState({ items_pat });
			});

			alert(this.state.items_pat.length);
			this.setState({patient_id:this.state.nom_pat+'_'+this.state.prenom_pat+'_'+this.state.items_pat.length});
			this.itemsRef.child('medecins/'+medecin_usernamee).child('patients/'+this.state.patient_id).set({ 
				nom_pat: this.state.nom_pat, 
				prenom_pat: this.state.prenom_pat, 
				date_de_naissance_pat: this.state.dateNaissance_pat, 
				lieu_pat: this.state.lieu_pat, 
				profession_pat: this.state.profession_pat, 
				telephone_patient: this.state.telephone_patient, 
				antecedents_personnels: this.state.antec_perso, 
				antecedents_familiaux: this.state.antec_fam, 
				nombre_grain_de_beaute: this.state.nbreGrain, 
			})
			//récupérer la liste des dossiers
			this.itemsRef.child('medecins/'+medecin_usernamee+'/patients/'+this.state.patient_id+'/dossiers_medicaux/').on('value', (snap) => {
			let items=[];
			// get children as an array
			snap.forEach((child) => {
				items.push({
					date_creation_dossier: child.val().date_creation_dossier,
					date_MAJ_dossier: child.val().date_MAJ_dossier,
					nom_patient_dossier: child.val().nom_patient_dossier,
					prenom_patient_dossier: child.val().prenom_patient_dossier,
					nombre_images_dossier: child.val().nombre_images_dossier,
					_key: child.key
				});
			});
			//const patients_array = items;
			const dossiers_medicaux = items; 
			this.setState({ dossiers_medicaux });
			});
			let dossier_id=medecin_usernamee+'_'+this.state.patient_id+'_'+this.state.dossiers_medicaux.length;
			this.itemsRef.child('medecins/'+medecin_usernamee+'/patients/'+this.state.patient_id).child('dossiers_medicaux/'+dossier_id).set({ 
				date_creation_dossier: new Date(),
				date_MAJ_dossier: new Date(),
				nom_patient_dossier: this.state.nom_pat,
				prenom_patient_dossier: this.state.prenom_pat,
				nombre_images_dossier: 0
			})
		AsyncStorage.setItem('patient_medecin',JSON.stringify({"medecin_id":medecin_usernamee,"patient_id":this.state.patient_id,"nom_pat":this.state.nom_pat,"prenom_pat":this.state.prenom_pat}));
		});
		alert("sucesss patient added"); 
		this.props.navigator.push({
          component: LocatePic
        });
	}
	goBack() {
		this.props.navigator.pop();
		return true; // do not exit app
	}
  render() {
    return ( 
	<View>
	<HeaderUp text="1/4 Ajouter un patient" loaded={true} onpress={this.goBack.bind(this)}/>
	<ScrollView>
		<View> 
				<TextInput
					style={styles.textinput_new_patinet}
					placeholderTextColor="#29235c"
					onChangeText={(text) => this.setState({nom_pat: text})}
					value={this.state.nom_pat}
					placeholder={"Nom"}
					underlineColorAndroid="#53507c"/>
				<TextInput
					style={styles.textinput_new_patinet}
					placeholderTextColor="#29235c"
					onChangeText={(text) => this.setState({prenom_pat: text})}
					value={this.state.prenom_pat}
					placeholder={"Prénom"}
					underlineColorAndroid="#53507c"/>					
				 <Grid style={{marginTop:10}}>
					  <Col>
						<Text style={styles.date_de_naissance}>Date de naissance</Text>
					  </Col>
					  <Col>
					  	<DatePicker
							style={{width: 200,marginTop:10}}
							date={this.state.dateNaissance_pat}
							mode="date"
							placeholder={this.state.dateNaissance_pat}
							format="YYYY-MM-DD"
							minDate="1980-01-01"
							maxDate="2030-01-01"
							confirmBtnText="Confirm"
							cancelBtnText="Cancel"
							customStyles={{
							  dateTouch: {
								width: 142
							  },
							  dateTouchBody: {
								flexDirection: 'row',
								height: 40,
								width:150,
								alignItems: 'center',
								justifyContent: 'center'
							  },
							  dateIcon: {
								width: 32,
								height: 32,
								marginLeft: 5,
								marginRight: 5,
							  },
							  iconSource: {
							  source: './img/calendar.png'
							  },
							  dateInput: {
								flex: 1,
								height: 40,
								borderWidth: 1,
								borderColor: '#29235c',
								alignItems: 'center',
								justifyContent: 'center'
							  },
							  dateText: {
								color: '#333'
							  },
							  placeholderText: {
								color: '#29235c'
							  },
							  datePickerMask: {
								flex: 1,
								alignItems: 'flex-end',
								flexDirection: 'row',
								backgroundColor: '#00000077'
							  },
							  datePickerCon: {
								backgroundColor: '#fff',
								height: 0,
								overflow: 'hidden'
							  },
							  btnText: {
								position: 'absolute',
								top: 0,
								height: 42,
								padding: 20,
								flexDirection: 'row',
								alignItems: 'center',
								justifyContent: 'center'
							  },
							  btnTextText: {
								fontSize: 16,
								color: '#29235c'
							  },
							  btnTextCancel: {
								color: '#29235c'
							  },
							  btnCancel: {
								left: 0
							  },
							  btnConfirm: {
								right: 0
							  },
							  datePicker: {
								marginTop: 42,
								borderTopColor: '#ccc',
								borderTopWidth: 1,
								backgroundColor: '#29235c'
							  },
							  disabled: {
								backgroundColor: '#eee'
							  }
							}}
							onDateChange={(date) => {this.setState({dateNaissance_pat: date})}}
						  />
					  </Col>
				 </Grid>  
				<TextInput
					style={styles.textinput_new_patinet}
					placeholderTextColor="#29235c"
					onChangeText={(text) => this.setState({lieu_pat: text})}
					value={this.state.lieu_pat}
					placeholder={"Lieu de résidence"}
					underlineColorAndroid="#29235c"/>		 
				<TextInput
					style={styles.textinput_new_patinet}
					placeholderTextColor="#29235c"
					onChangeText={(text) => this.setState({profession_pat: text})}
					value={this.state.profession_pat}
					placeholder={"Profession"}
					underlineColorAndroid="#29235c"/> 	
					
				<TextInput
					style={styles.textinput_new_patinet}
					placeholderTextColor="#29235c"
					onChangeText={(text) => this.setState({telephone_patient: text})}
					value={this.state.telephone_patient}
					keyboardType = 'numeric'
					placeholder={"Téléphone"}
					maxLength = {20}
					dataDetectorTypes ='phoneNumber'
					underlineColorAndroid="#53507c"/>	

				  <Grid style={{marginTop:10}}>
					  <Col>
							<Text style={styles.a_a_n}>Antécédents personnel</Text>
					  </Col>
					  <Col style={{marginLeft:150}}>
							<Picker
								iosHeader="Select one"
								mode="dropdown"
								selectedValue={this.state.antec_perso}
								onValueChange={this.onValueChangePerso.bind(this)}>
								<Item label="oui" value="oui" />
								<Item label="non" value="non" />  
						   </Picker>
					 </Col> 
				   </Grid>			 
				  <Grid>
					  <Col>
							<Text style={styles.a_a_n}>Antécédents familiaux </Text>
					  </Col>
					  <Col style={{marginLeft:150}}>
							 <Picker
								iosHeader="Select one"
								mode="dropdown"
								selectedValue={this.state.antec_fam}
								onValueChange={this.onValueChangeFam.bind(this)}>
								<Item label="oui" value="oui" />
								<Item label="non" value="non" />  
						   </Picker>
					 </Col> 
				   </Grid>			 
				<Grid>
					<Col>
						<Text style={styles.a_a_n}>Nombre de grain de beauté</Text>
					</Col>
					<Col style={{marginLeft:140}}>
						<Picker
							style={{width:110}}
							iosHeader="Select one"
							mode="dropdown"
							selectedValue={this.state.nbreGrain}
							onValueChange={this.onValueChangeNbreGrain.bind(this)}>
							<Item label="> 50" value="> 50" />
							<Item label="< 50" value="< 50" />  
						</Picker>
					</Col>
				</Grid>
			
			<Button
				onPress={this.locatePic.bind(this)}
				style={{flex:9,backgroundColor: "#29235c",width:200,height:40,marginLeft:80,marginBottom:30,marginTop:10,alignItems:'center'}}
				textStyle={{fontSize: 14, color:'#fff',fontFamily: 'Roboto'}}>Localiser le grain de beauté</Button>
		</View>
	</ScrollView>   
	</View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  component: {
   marginBottom: 15,
   marginLeft: 20,
  },
  radioStyle: {
	/* borderRightWidth: 1,
    borderColor: '#2196f3',
    marginLeft: 50, */
  },
  radioButtonWrap: {
    marginRight: 30,
	
  },
  textinput_new_patinet: {
    height: 40,
	width: 340,
	color: "#29235c",
	fontFamily: 'Roboto',
	fontSize: 17,
	margin: 10,
	marginBottom:0
  },
  date_de_naissance: {
	fontFamily: 'Roboto',
	fontSize:17,
	color:'#29235c',
	marginTop:10,
	margin:12  
  },
  a_a_n: {
	width:250,
	fontFamily: 'Roboto',
	fontSize:17,
	color:'#29235c',
	marginTop:10,
	margin:12,
	marginBottom:0
  },
  title_upload:{
	  color:"#fff",
	  fontSize:18,
	  paddingTop:10,
	  height:40,
      fontWeight:'bold'}
  });

AppRegistry.registerComponent('newPatient', () => newPatient);