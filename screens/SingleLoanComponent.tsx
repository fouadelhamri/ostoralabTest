import React from "react";
import { StyleSheet, View, Text, useColorScheme } from "react-native";
import { useHeaderHeight } from "@react-navigation/stack";
import Layout from "../constants/Layout";
import Colors from "../constants/Colors";
import DonutComponent from "../components/DonutComponent";
import {
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import SingleLoanUpperGrid from "../components/SingleLoanUpperGrid";
const SingleLoanComponent = (props: any) => {
  const loanData = props.loanData;
  const navigation = props.navigation;
  const theme = useColorScheme();
  const headerBarHeight = useHeaderHeight();
  const screenHeight = Layout.window.height - headerBarHeight;

  const convertDateTimeString = (dateString: string) => {
    let vDateString = dateString.substring(0, 10);
    let vDate = new Date(vDateString);
    //beware THE MONTH is ZERO-INDEXED ! So January is zero 0 NOT one 1
    let formattedDate = `${vDate.getUTCDate()}/${
      vDate.getMonth() + 1
    }/${vDate.getFullYear()}`;
    return formattedDate;
  };
  let AGREEMENT_DATE = convertDateTimeString(loanData.agreement_date);
  let MONTHS_TO_MATURITY = Math.ceil(
    Number(loanData.present_balance) / Number(loanData.installment_amount)
  );

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      horizontal={false}
      bounces={false}
      style={styles.container}
    >
      <View style={[styles.centredView, { height: screenHeight }]}>
        <View style={styles.upperView}>
          <View style={styles.grid}>
            <SingleLoanUpperGrid
              number={loanData.total_loan_amount}
              title={"Loan amount"}
            />
          </View>
          <View style={styles.grid}>
            <SingleLoanUpperGrid
              number={loanData.installment_amount}
              title={"EMI"}
            />
          </View>
          <View style={styles.grid}>
            <SingleLoanUpperGrid number={loanData.tenure} title={"Tenure"} />
          </View>
        </View>
        <TouchableWithoutFeedback
          onPress={() =>
            navigation.navigate("PaymentHistory", {
              accountNo: loanData.account_no,
              status: loanData.status,
            })
          }
        >
          <DonutComponent
            radius={Layout.window.width * 0.35}
            remaining={Number(loanData.present_balance)}
            color={Colors[theme ?? "light"].gaugeColor}
            duration={2000}
            status={loanData.status}
            max={Number(loanData.total_loan_amount)}
          />
        </TouchableWithoutFeedback>
        <View style={styles.bottomView}>
          <Text style={styles.simpleText}>{loanData.product.product_type}</Text>
        </View>
      </View>
      <View style={[{ backgroundColor: "white" }]}>
        <View style={{ marginBottom: 20 }}>
          <View style={styles.rowView}>
            <Text style={styles.rowViewTitleTextFont}>Agreement date</Text>
            <Text
              style={[
                styles.rowViewTitleTextFont,
                { color: Colors.light.primaryColor, fontSize: 20 },
              ]}
            >
              {AGREEMENT_DATE}
            </Text>
          </View>

          <View style={styles.rowView}>
            <Text style={styles.rowViewTitleTextFont}>
              No of mount to maturity
            </Text>
            <Text
              style={[
                styles.rowViewTitleTextFont,
                { color: Colors.light.primaryColor, fontSize: 20 },
              ]}
            >
              {MONTHS_TO_MATURITY}
            </Text>
          </View>

          <View style={styles.rowView}>
            <View>
              <Text style={styles.rowViewTitleTextFont}>Due amount</Text>
              <Text
                style={[
                  styles.rowViewTitleTextFont,
                  { color: Colors.light.primaryColor, fontSize: 20 },
                ]}
              >
                {loanData.amount_due}
              </Text>
            </View>
            {loanData.present_balance != 0 && (
              <View style={styles.button}>
                <Text style={styles.buttonTextFont}>Pay</Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
  },
  centredView: {
    width: Layout.window.width,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.light.lightBlue,
  },
  upperView: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    paddingTop: 10,
    backgroundColor: "white",
  },
  bottomView: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    display: "flex",
  },
  simpleText: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
  grid: {
    width: Layout.window.width * 0.33,
    alignItems: "center",
    justifyContent: "center",
    height: 60,
  },
  rowView: {
    height: 60,
    paddingLeft: 20,
    paddingRight: 15,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: Colors.light.deviderColor,
    borderBottomWidth: 2,
  },
  rowViewTitleTextFont: {
    fontSize: 16,
    fontWeight: "600",
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: Colors.light.redText,
  },
  buttonTextFont: {
    color: "white",
    fontWeight: "bold",
  },
  paginationDots: {
    position: "absolute",
    bottom: 40,
    left: 0,
    right: 0,
    display: "flex",
  },
  dot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: "red",
  },
});

export default SingleLoanComponent;
