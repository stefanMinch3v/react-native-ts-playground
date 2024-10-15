import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { ReactNode } from "react";

type ProfileCardProps = {
  firstName: string;
  lastName: string;
  children?: ReactNode;
  onPressGithub: () => void;
};

export default function ProfileCard({
  firstName,
  lastName,
  children,
  onPressGithub,
}: ProfileCardProps) {
  return (
    <View style={boxStyles.container}>
      <View style={boxStyles.header}>
        <View>
          <Image
            style={boxStyles.avatar}
            source={{ uri: "https://i.pravatar.cc/300" }}
          />
        </View>
        <View style={boxStyles.description}>
          <Text style={boxStyles.name}>
            {firstName} {lastName} {children}
          </Text>
          <Text>React native development in progress 12 12 12 12 5555</Text>
        </View>
      </View>
      <View style={boxStyles.social}>
        <TouchableOpacity style={boxStyles.socialBtn}>
          <FontAwesome name="twitter" size={24} color="#1DA1F2" />
        </TouchableOpacity>

        <TouchableOpacity style={boxStyles.socialBtn}>
          <FontAwesome name="linkedin-square" size={24} color="#0A66C2" />
        </TouchableOpacity>

        <TouchableOpacity style={boxStyles.socialBtn} onPress={onPressGithub}>
          <FontAwesome name="github" size={24} color="#333" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const boxStyles = StyleSheet.create({
  container: {
    borderRadius: 10,
    padding: 20,
    backgroundColor: "white",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  description: {
    paddingLeft: 15,
    flex: 1,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },
  header: {
    flexDirection: "row",
  },
  social: {
    padding: 10,
    justifyContent: "space-evenly",
    flexDirection: "row",
  },
  socialBtn: {
    borderRadius: 50,
    padding: 10,
    backgroundColor: "#eee",
  },
});
