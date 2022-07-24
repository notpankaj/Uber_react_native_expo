import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAP_APIKEY } from "@env";
import { setDestination } from "../slices/navSlice";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import NavFavourites from "./NavFavourites";
import { Icon } from "@rneui/base";

const NavigateCard = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  return (
    <SafeAreaView className="bg-white flex-1">
      <Text className="text-xl py-5 text-center">Goog Morning , User</Text>
      <View className="border-t border-gray-200 flex-shrink">
        <View>
          <GooglePlacesAutocomplete
            placeholder="Where to?"
            debounce={400}
            styles={toInputBoxStyles}
            nearbyPlacesAPI="GooglePlacesSearch"
            minLength={2}
            fetchDetails={true}
            enablePoweredByContainer={false}
            query={{
              key: GOOGLE_MAP_APIKEY,
              language: "en",
            }}
            onPress={(data, details = null) => {
              dispatch(
                setDestination({
                  location: details.geometry.location,
                  description: data.description,
                })
              );
              navigation.navigate("RideOptionsCard");
            }}
          />
        </View>

        <NavFavourites />
      </View>
      <View className="flex-row bg-white justify-evenly py-2 mt-auto border-t border-gray-100">
        <TouchableOpacity
          onPress={() => navigation.navigate("RideOptionsCard")}
          className="flex-row bg-black w-24 px-4 py-3 rounded-full justify-between"
        >
          <Icon name="car" type="font-awesome" color="white" size={16} />
          <Text className="text-white text-center ">Rides</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("")}
          className="flex-row  w-24 px-4 py-3 rounded-full justify-between"
        >
          <Icon
            name="fast-food-outline"
            type="ionicon"
            color="black"
            size={16}
          />
          <Text className="text-center">Eats</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default NavigateCard;

const toInputBoxStyles = StyleSheet.create({
  container: {
    flex: 0,
    backgroundColor: "white",
    paddingTop: 20,
    flex: 0,
  },
  textInput: {
    fontSize: 18,
    borderRadius: 0,
    backgroundColor: "#DDDDDF",
  },
  textInputContainer: {
    paddingBottom: 0,
    paddingHorizontal: 20,
  },
});
