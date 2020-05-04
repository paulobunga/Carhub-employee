import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ViewContainer, ListItem, Button } from 'Components';
// import { NavigationType, RentalType } from 'types';
import { Avatar } from 'react-native-elements';
import { textStyle } from 'Constants/textStyles';
import { scaleVer, scaleHor } from 'Constants/dimensions';
import colors from 'Constants/colors';

import { useSelector } from 'react-redux';
// import moment from 'moment';

type PropsType = {
  navigation: {
    state: {
      params: {
        data: [{ label: string, value: string }],
        avatar: String,
        name: String,
        type: 'accept-decline' | 'decline' | 'transaction',
        onConfirm: () => void,
        onDecline: () => void,
      },
    },
    goBack: () => void,
    pop: () => void,
    popToTop: () => void,
  },
};

const RentDetailScreen = ({ navigation }: PropsType) => {
  const { data, type, onConfirm, onDecline } = navigation.state.params;

  const loading = useSelector(state => state.lease.loading);

  const handleBackPress = () => {
    navigation.goBack();
  };

  const renderAction = () => {
    switch (type) {
      case 'accept-decline':
        return (
          <View
            style={{
              flexDirection: 'row',
              marginVertical: scaleVer(12),
              flex: 1,
              alignItems: 'flex-end',
            }}
          >
            <View style={{ flex: 1, marginEnd: scaleHor(8) }}>
              <Button
                label="Decline"
                colorStart={colors.errorLight}
                colorEnd={colors.error}
                onPress={onDecline}
              />
            </View>
            <View style={{ flex: 1, marginStart: scaleHor(8) }}>
              <Button label="Accept" onPress={onConfirm} />
            </View>
          </View>
        );
      case 'decline-transaction':
        return (
          <View
            style={{
              marginVertical: scaleVer(12),
              flex: 1,
              justifyContent: 'flex-end',
            }}
          >
            <Button
              label="Decline request"
              colorStart={colors.errorLight}
              colorEnd={colors.error}
              onPress={onDecline}
              style={styles.button}
            />
            <Button label="Confirm transaction" onPress={onConfirm} />
          </View>
        );
      case 'transaction-accept-decline':
        return (
          <View
            style={{
              marginVertical: scaleVer(12),
              flex: 1,
              justifyContent: 'flex-end',
            }}
          >
            <Button
              label="Confirm transaction"
              onPress={onConfirm}
              style={{ marginBottom: scaleVer(8) }}
            />
            <Button
              label="Reject transaction"
              onPress={onDecline}
              colorStart={colors.errorLight}
              colorEnd={colors.error}
            />
          </View>
        );
      case 'transaction':
        return (
          <View
            style={{
              marginVertical: scaleVer(12),
              flex: 1,
              justifyContent: 'flex-end',
            }}
          >
            <Button
              label="Confirm transaction"
              onPress={onConfirm}
              style={{ marginBottom: scaleVer(8) }}
            />
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <ViewContainer
      title="Booking Detail"
      haveBackHeader
      onBackPress={handleBackPress}
      scrollable
      style={{ flex: 1 }}
      loading={loading}
    >
      <View style={{ flex: 1 }}>
        <View>
          {data.map(
            (item, index) =>
              !item.hide && (
                <ListItem
                  type="detail"
                  pressable={false}
                  {...item}
                  showSeparator={index !== data.length - 1}
                />
              )
          )}
        </View>
        {renderAction()}
      </View>
    </ViewContainer>
  );
};

const styles = StyleSheet.create({
  nameContainer: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: scaleVer(16),
  },
  buttonContainer: {
    marginVertical: scaleVer(16),
  },
  button: {
    marginVertical: scaleVer(8),
  },
});

export default RentDetailScreen;
