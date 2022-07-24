import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Image,
} from "react-native";
import React, { useState } from "react";
import { Icon } from "@rneui/base";
import { useNavigation } from "@react-navigation/native";
import { selectTravelTimeInformation } from "../slices/navSlice";
import { useSelector } from "react-redux";

const data = [
  {
    id: "Uber-X-123",
    title: "Uber-X",
    mutiplier: 1,
    image: "https://links.papareact.com/3pn",
  },
  {
    id: "Uber-XL-456",
    title: "Uber-XL",
    mutiplier: 1.2,
    image: "https://links.papareact.com/5w8",
  },
  {
    id: "Uber-LUX-789",
    title: "Uber-LUX",
    mutiplier: 1.75,
    image: "https://links.papareact.com/7pf",
  },
];
const SURGE_CHARGE_RATE = 1.5;
const RideOptionsCard = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(null);

  const travelTimeInfo = useSelector(selectTravelTimeInformation);
  console.log(travelTimeInfo);
  return (
    <SafeAreaView className="bg-white flex-grow">
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate("NavigateCard")}
          className="absolute top-3 left-5 z-50 p-3 rounded-full"
        >
          <Icon
            name="chevron-left"
            type="font-awesome"
            size={16}
            color="#222"
          />
        </TouchableOpacity>
        <Text className="text-center py-5 text-xl">
          Select a Ride - {travelTimeInfo?.distance?.text}
        </Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item: { id, title, mutiplier, image }, item }) => {
          return (
            <TouchableOpacity
              onPress={() => setSelected(item)}
              className="flex-row justify-between items-center px-10"
              style={
                id === selected?.id
                  ? { backgroundColor: "rgba(0,0,0,0.1)" }
                  : {}
              }
            >
              <Image
                style={{
                  width: 100,
                  height: 100,
                }}
                resizeMode="contain"
                source={{ uri: image }}
              />
              <View className="-ml-6">
                <Text className="font-semibold text-xl">{title}</Text>
                <Text>{travelTimeInfo?.duration?.text} - Travel Time</Text>
              </View>
              <Text className="text-xl">
                {/* {new Intl.NumberFormat("en-gb", {
                  style: "currency",
                  currency: "GBP",
                }).format(
                  (travelTimeInfo?.duration?.value *
                    SURGE_CHARGE_RATE *
                    mutiplier) /
                    100
                )} */}
                ${" "}
                {(
                  (travelTimeInfo?.duration?.value *
                    SURGE_CHARGE_RATE *
                    mutiplier) /
                  100
                ).toFixed(2)}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
      <View>
        <TouchableOpacity
          disabled={!selected}
          className=" py-3 m-3"
          style={{
            backgroundColor: selected ? "#000" : "rgba(0,0,0,0.1)",
          }}
        >
          <Text className="text-center text-white text-xl">
            Choose {selected?.title}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RideOptionsCard;

const styles = StyleSheet.create({});
