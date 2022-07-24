import React from "react";
import { View, SafeAreaView, Image } from "react-native";
import NavOptions from "../components/NavOptions";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAP_APIKEY } from "@env";
import { useDispatch } from "react-redux";
import { setOrigin, setDestination } from "../slices/navSlice";
import NavFavourites from "../components/NavFavourites";

const HomeScreen = () => {
  const dispatch = useDispatch();
  return (
    <SafeAreaView className="bg-white h-full">
      <View className="p-5">
        <Image
          style={{
            width: 100,
            height: 100,
            resizeMode: "contain",
          }}
          source={{
            uri: "https://links.papareact.com/gzs",
          }}
        />
        <GooglePlacesAutocomplete
          placeholder="Where from?"
          debounce={400}
          styles={{
            container: {
              flex: 0,
            },
            textInput: {
              fontSize: 18,
            },
          }}
          nearbyPlacesAPI="GooglePlacesSearch"
          minLength={2}
          enablePoweredByContainer={false}
          query={{
            key: GOOGLE_MAP_APIKEY,
            language: "en",
          }}
          onPress={(data, details = null) => {
            // console.log(data, details);
            dispatch(
              setOrigin({
                location: details.geometry.location,
                description: data.description,
              })
            );
            dispatch(setDestination(null));
          }}
          fetchDetails={true}
        />
        <NavOptions />
        <NavFavourites />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
