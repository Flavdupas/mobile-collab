import { StyleSheet } from "react-native";

const global = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: "space-between",
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  title: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
  },
  subtitle: {
    color: "#fff",
    opacity: 0.8,
    fontWeight: "400",
  },
  error: {
    textAlign: "center",
    marginTop: 10,
    color: "#FF7373",
  },
  logo: {
    width: 73.04,
    height: 80,
  },
   container: {
      alignItems: "center",
      gap: 15,
    },
});

export default global;
