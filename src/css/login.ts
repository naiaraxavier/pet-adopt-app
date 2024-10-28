import { StyleSheet } from "react-native";
import Colors from "../data/constants/Colors";

export default StyleSheet.create({
  containerMain: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: Colors.WHITE,
  },
  image: {
    width: "100%",
    height: 350,
  },
  containerForm: {
    // flex: 1,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  title: {
    fontFamily: "outfit-bold",
    fontSize: 24,
    textAlign: "center",
  },
  subtitle: {
    fontFamily: "outfit",
    fontSize: 18,
    textAlign: "center",
    marginTop: 10,
    color: Colors.GRAY,
  },
  input: {
    fontFamily: "outfit",
    color: Colors.GRAY,
    backgroundColor: Colors.WHITE,
    padding: 14,
    borderColor: Colors.GRAY,
    borderWidth: 1,
    borderRadius: 14,
    width: "100%",
    marginTop: 10,
  },
  errorInput: {
    borderColor: "red",
  },
  button: {
    backgroundColor: Colors.PRIMARY,
    paddingVertical: 14,
    borderRadius: 14,
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  secondaryButton: {
    backgroundColor: Colors.SECONDARY,
    marginTop: 10,
  },
  textButton: {
    fontFamily: "outfit-medium",
    fontSize: 20,
  },
  primaryText: {
    color: Colors.PRIMARY,
  },
  secondaryText: {
    color: Colors.SECONDARY,
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: 5,
  },
  generalError: {
    color: "red",
    fontSize: 16,
    marginTop: 10,
    textAlign: "center",
  },
});
