import { StackScreenProps } from "@react-navigation/stack";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  ActivityIndicator,
  Text,
  Animated,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { ILoan, RootStackParamList } from "../types";
import { SafeAreaView } from "react-native-safe-area-context";
import { getLoans } from "../services/loan.service";
import Colors from "../constants/Colors";
import { View } from "../components/Themed";
import Layout from "../constants/Layout";
import SingleLoanScreen from "./SingleLoanScreen";
const AccountScreen = ({
  navigation,
}: StackScreenProps<RootStackParamList, "Account">) => {
  const [loans, setLoans] = useState<[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeItem, setActiveItem] = useState<number>(0);
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const screenWidth = Layout.window.width;

  useEffect(() => {
    const fetchLoans = async () => {
      setIsLoading(true);
      getLoans().then(({ data }) => {
        setLoans(data.data);
        setIsLoading(false);
      });
    };
    fetchLoans();
  }, []);

  useEffect(() => {
    navigation.setOptions({ title: `${loans[activeItem]?.account_no ?? ""}` });
  }, [activeItem, loans]);

  const handleScrollX = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    let newActiveItem = Number(
      Number(event.nativeEvent.contentOffset.x / screenWidth).toFixed(0)
    );
    if (newActiveItem !== activeItem) {
      setActiveItem(newActiveItem);
    }
    Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
      useNativeDriver: true,
    });
  };
  if (isLoading)
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" color="gray"></ActivityIndicator>
      </SafeAreaView>
    );

  return (
    <View style={styles.container}>
      <View style={styles.paginationDots}>
        {loans?.map((loan, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              index == activeItem && {
                backgroundColor: Colors.light.primaryColor,
              },
            ]}
          ></View>
        ))}
      </View>
      <Animated.FlatList
        data={loans}
        horizontal={true}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScrollX}
        keyExtractor={(item) => `${item?.account_no}_${item.present_balance}`}
        renderItem={({ item }) => (
          <View
            style={{
              backgroundColor: Colors.light.lightBlue,
              alignItems: "center",
              width: Layout.window.width,
              height: "auto",
            }}
          >
            <SingleLoanScreen loanData={item} navigation={navigation} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.lightBlue,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
  },
  btn: { backgroundColor: "green", padding: 20 },
  paginationDots: {
    position: "absolute",
    bottom: 55,
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 8,
    justifyContent: "center",
    display: "flex",
    flexDirection: "row",
    backgroundColor: Colors.light.darkBackground,
    zIndex: 10000,
  },
  dot: {
    height: 8,
    width: 8,
    marginLeft: 3,
    borderRadius: 4,
    backgroundColor: "white",
  },
});

export default AccountScreen;
