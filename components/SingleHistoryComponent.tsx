import React from "react";
import { View, Text } from "./Themed";
import { StyleSheet } from "react-native";
import Layout from "../constants/Layout";
import Colors from "../constants/Colors";

export const SingleHistoryComponent = (props: any) => {
  const historyData = props.historyData;
  const convertDateTimeString = (dateString: string) => {
    let vDateString = dateString.substring(0, 10);
    let vDate = new Date(vDateString);
    //beware THE MONTH is ZERO-INDEXED ! So January is zero 0 NOT one 1
    let formattedDate = `${vDate.getUTCDate()}/${
      vDate.getMonth() + 1
    }/${vDate.getFullYear()}`;
    return formattedDate;
  };
  let DUE_DATE = convertDateTimeString(historyData.due_date);
  let wasAmountReceived = Number(historyData.received_amount) != 0;

  return (
    <View
      style={[styles.col, wasAmountReceived ? styles.darkBackground : null]}
    >
      <Text
        style={[
          styles.bubble,
          {
            backgroundColor: wasAmountReceived
              ? Colors.light.primaryColor
              : Colors.light.redText,
          },
        ]}
      >
        {historyData.number}
      </Text>
      <View style={styles.row}>
        <Text style={styles.textTitleFont}>{`Due date : `} </Text>
        <Text style={styles.textTitleFont}>{DUE_DATE} </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.textTitleFont}>{`Amount : `} </Text>
        <Text style={styles.textTitleFont}>
          {Number(historyData.installment_amount)} KWD
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.textTitleFont}>{`Received amount : `} </Text>
        <Text style={wasAmountReceived ? styles.blueText : styles.redText}>
          {Number(historyData.received_amount)} KWD
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  col: {
    position: "relative",
    flexDirection: "column",
    justifyContent: "center",
    width: Layout.window.width - 15,
    maxHeight: 130,
    marginBottom: 15,
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  darkBackground: {
    backgroundColor: Colors.light.darkBackground,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
    backgroundColor: "transparent",
  },
  textNumberFont: {
    fontSize: 14,
    fontWeight: "bold",
  },
  textTitleFont: {
    fontSize: 14,
    textAlign: "center",
    fontWeight: "700",
  },
  blueText: {
    fontSize: 14,
    color: Colors.light.primaryColor,
    textAlign: "center",
    fontWeight: "700",
  },
  redText: {
    fontSize: 14,
    color: Colors.light.redText,
    textAlign: "center",
    fontWeight: "700",
  },
  bubbleRow: {
    position: "relative",
  },
  bubble: {
    position: "absolute",
    top: -5,
    right: -5,
    height: 25,
    width: 25,
    borderRadius: 12,
    fontSize: 16,
    paddingTop: 2,
    textAlign: "center",
    textAlignVertical: "center",
    color: "white",
    fontWeight: "bold",
    overflow: "hidden",
  },
});
