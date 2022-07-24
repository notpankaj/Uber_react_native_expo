import {
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  View,
} from "react-native";
import React from "react";
import { Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectOrigin } from "../slices/navSlice";

const data = [
  {
    id: "123",
    title: "Get a ride",
    image: "https://links.papareact.com/3pn",
    screen: "MapScreen",
  },
  {
    id: "456",
    title: "Order food",
    image: "https://links.papareact.com/28w",
    screen: "EatsScreen", //change in future...
  },
];

const NavOptions = () => {
  const navigation = useNavigation(null);
  const origin = useSelector(selectOrigin);
  const handleNavigate = (sName) => {
    if (sName !== "EatsScreen") {
      navigation.navigate(sName);
    }
  };
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item?.id}
      horizontal={true}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity
            disabled={!origin}
            onPress={() => handleNavigate(item?.screen)}
            className="p-2 pl-6 pb-8 pt-4 bg-gray-200 m-2 w-40"
          >
            <View
              style={{
                opacity: origin ? 1 : 0.7,
              }}
            >
              <Image
                source={{ uri: item?.image }}
                style={{
                  width: 120,
                  height: 120,
                }}
                resizeMode="contain"
              />
              <Text className="mt-2 text-lg font-semibold">{item.title}</Text>
              <Icon
                name="arrowright"
                type="antdesign"
                color="#fff"
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 2,
                  backgroundColor: "#000",
                  borderRadius: 100,
                  width: 35,
                  height: 35,
                  marginTop: 4,
                }}
              />
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
};

export default NavOptions;

const styles = StyleSheet.create({});
