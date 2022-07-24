import {
  StyleSheet,
  FlatList,
  View,
  TouchableOpacity,
  Text,
} from "react-native";
import React from "react";
import { Icon } from "@rneui/themed";

const data = [
  {
    id: "123",
    icon: "home",
    location: "Home",
    destination: "Code Street, London Uk",
  },
  {
    id: "456",
    icon: "briefcase",
    location: "Work",
    destination: "London Eye, London Uk",
  },
];

const NavFavourites = () => {
  return (
    <View>
      <FlatList
        keyExtractor={(item) => item.id}
        data={data}
        ItemSeparatorComponent={() => {
          return <View className="bg-gray-200" style={{ height: 0.5 }} />;
        }}
        renderItem={({ item: { icon, location, destination } }) => {
          return (
            <TouchableOpacity className="flex-row items-center p-5">
              <Icon
                style={{
                  marginRight: 10,
                  borderRadius: 100,
                  backgroundColor: "rgba(0,0,0,0.3)",
                  padding: 3,
                  width: 40,
                  height: 40,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                size={18}
                color={"#fff"}
                type="ionicon"
                name={icon}
              />
              <View>
                <Text className="font-semibold text-lg">{location}</Text>
                <Text className="text-gray-500">{destination}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default NavFavourites;

const styles = StyleSheet.create({});
