import { SafeAreaView, StyleSheet, ScrollView, Image, View, Text, StatusBar, Dimensions, TextInput, TouchableOpacity, } from 'react-native';
import React, { useEffect, useState } from 'react'
import ListCard from '../component/ListCard';
import BackgroundCurve from '../component/BackgroundCurve';
import Icon from 'react-native-vector-icons/AntDesign';
import User from 'react-native-vector-icons/FontAwesome5';
import Location from 'react-native-vector-icons/Entypo';
import Train from 'react-native-vector-icons/MaterialCommunityIcons';
import Schedule from 'react-native-vector-icons/MaterialIcons';
import { Button } from '@rneui/themed';
import { useNavigation } from "@react-navigation/native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeHeader from '../component/HomeHeader';
import firestore from '@react-native-firebase/firestore';
import { FlatList } from 'react-native-gesture-handler';
import { firebase } from '@react-native-firebase/firestore';
var el = [];

export default function Home() {
  const navigation = useNavigation();
  const trainRef = firebase.firestore().collection("trains");
  const [trains, setTrains] = useState([]);
  function loadData() {

    //clear previous loaded data
    setTrains([])
    //get all trains
    trainRef
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          //set all trains with previous trains
          setTrains(trains => [...trains, documentSnapshot.data()]);
        });
      });

  }

  useEffect(() => {
    loadData()
  }, [])


  return (

    <View style={styles.container}>
      <HomeHeader title='Railway Department' type="menu" ></HomeHeader>
      <ScrollView style={styles.scrollView}>
        <BackgroundCurve style={styles.svg} />
        <View style={styles.headerContainer}>
          <View style={styles.headerGroupIndicator}>
            <View style={styles.headerGroupIndicatorLeft}>
              <Icon name="setting" color="#fff" size={30} />
            </View>
            <View style={styles.headerGroupIndicatorRight}>
              <User name="user-circle" color="#fff" size={30} />
            </View>
          </View>
          <Text
            style={styles.heading}>{'WELCOME\nTRAIN RESERVATION'}</Text>
          <View style={styles.groupInputContainer}>
            <View style={styles.inputSearchContainer}>
              <TextInput
                style={styles.inputSearch}
                value="Find Your Train "
              />

              <TouchableOpacity
                style={styles.buttonSearch}
              >
                <Icon name="search1" color="gray" size={20} />
              </TouchableOpacity>
            </View>

            <View style={styles.listBtn}>
              <TouchableOpacity style={styles.button}>
                <Train name="train" color="#fff" size={16} />
                <Text style={styles.buttonText}>Train</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: 'transparent' }]}>
                <Location name="location" color="#fff" size={16} />
                <Text style={styles.buttonText}>Location</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Schedule')}
                style={[styles.button, { backgroundColor: 'transparent' }]}>
                <Schedule name="schedule" color="#fff" size={16} />
                <Text style={styles.buttonText}>Schedule</Text>
              </TouchableOpacity>


            </View>
            <View style={styles.viewBtn}>
              <TouchableOpacity style={styles.defaultButton} onPress={() => navigation.navigate('Schedule')} >
                <Text style={{ color: 'white', fontWeight: 'bold' }}>Reserve Ticket</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>


        <View style={styles.cardContainer}>
          <View style={styles.cardHeaderContaner}>
            <Text style={styles.cardHeading}>Your Next Reservation  </Text>
            <Text style={styles.cardMore}>See All</Text>
          </View>


          <View>
            {/* show train list using flatlist */}
            <FlatList

              data={trains}
              renderItem={({ item }) =>
                <TouchableOpacity key={item.id} onPress={() => {
                  navigation.navigate('Schedule', { item });
                }}>
                  <View style={styles.cardBody}>
                    <View style={styles.cardBodyTop}>
                      <Image source={{ uri: item.img }} style={{ width: 180, height: 150, borderRadius: 10, }} />
                      <View style={styles.cardLeftSide}>
                        <Text style={{
                          fontSize: 18,
                          fontWeight: 'bold',
                          color: "#21130d",
                          textAlign: "center",
                          marginRight: 5
                        }}>
                          {item.trainName}
                        </Text>
                        <Text style={{
                          fontSize: 12,
                          color: "#21130d",
                          textAlign: "center",
                          fontWeight: 'bold'
                        }}>
                          ({item.startPoint} - {item.endPoint} )
                        </Text>
                        <View style={styles.iconMore}>
                          <Text style={styles.itemText}>
                            <Ionicons name="train-outline" size={20} style={styles.icon} />
                            Available
                          </Text>

                          <Image source={require('../assest/chair.png')} style={{ width: 30, height: 30, borderRadius: 10, }} />
                        </View>
                      </View>

                    </View>
                  </View>
                </TouchableOpacity>}
            />
          </View>
        </View >
      </ScrollView >

    </View >

  )
} const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: 'white',
  },
  svg: {
    position: 'absolute',
    width: Dimensions.get('window').width,
  },
  itemText: {
    color: '#24333A',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
    marginLeft: 5

  },
  icon: {
    color: '#fff'

  },
  headerContainer: {
    marginTop: 10,
    padding: 15,
  },
  headerGroupIndicator: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerGroupIndicatorLeft: {
    flexDirection: 'row',
  },
  headerGroupIndicatorText: {
    fontWeight: 'bold',
    color: '#fff',
    marginHorizontal: 5,
  },
  heading: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
    // width: 2,
  },
  groupInputContainer: {
    marginTop: 20,
    padding: 10,
  },
  inputSearchContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    // paddingHorizontal: 10,
    borderRadius: 25,
  },
  inputSearch: {
    padding: 12,
    fontSize: 16,
    fontWeight: '500',
    color: 'gray',
    flex: 1,
  },
  buttonSearch: {
    shadowColor: '#222',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    backgroundColor: '#fff',
    padding: 13,
    borderRadius: 30,
    aspectRatio: 1,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#FFC107',
    padding: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  buttonText: {
    fontWeight: '500',
    color: '#fff',
    marginLeft: 10,
  },
  viewBtn: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  listBtn: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 15,
  },
  cardContainer: {
    marginTop: 50,
    padding: 15,
    paddingBottom: 0,
  },
  cardBody: {
    padding: 15,
    backgroundColor: '#9172EC',
    marginTop: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  cardHeaderContaner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardHeading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#7B6C95',
  },
  cardMore: {
    fontWeight: 'bold',
    color: '#7B6C95',
  },
  cardGroupIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardBodyTop: {
    flexDirection: 'row',
  },
  cardLeftSide: {
    alignContent: 'space-between',
    marginLeft: 5,
    paddingTop: 20,
    flex: 1,
  },

  iconMore: {
    marginTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  defaultButton: {
    padding: 15,
    alignItems: 'center',
    backgroundColor: '#F9B90D',
    borderRadius: 10,
    width: 155,
    marginBottom: 10
  },
});