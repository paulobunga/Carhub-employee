import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { ViewContainer, InputForm, Button } from 'Components';
import { textStyle } from 'Constants/textStyles';
import { signIn } from '@redux/actions/user';

import { NavigationType } from 'types';
import { connect } from 'react-redux';
import { scaleVer } from 'Constants/dimensions';
import Axios from 'axios';

type PropTypes = {
  navigation: NavigationType,
  signIn: ({ username: string, password: string }) => void,
  loading: Boolean,
};

const SignInScreen = ({ navigation, loading, signIn }: PropTypes) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const onChangeUserName = username => {
    setUsername(username);
  };

  const onChangePassword = password => {
    setPassword(password);
  };

  const handleUserLogin = () => {
    // console.log('come here');
    signIn(
      { username: 'hochiminhemployee', password: '123456' },
      {
        onSuccess() {
          navigation.navigate('MainApp');
        },
        onFailure() {
          setError(true);
        },
      }
    );
  };

  return (
    <ViewContainer loading={loading} requestError={error}>
      {/* <View style={{ flex: 1 }}> */}
      <Text
        style={[
          textStyle.sectionHeading,
          { textAlign: 'center', marginBottom: scaleVer(48) },
        ]}
      >
        Sign in
      </Text>
      <InputForm
        label="Username"
        onChangeText={onChangeUserName}
        value={username}
        containerStyle={{ marginBottom: scaleVer(16) }}
      />
      <InputForm
        label="Password"
        onChangeText={onChangePassword}
        value={password}
      />
      {/* </View> */}

      <Button
        label="Sign in"
        onPress={handleUserLogin}
        style={{ marginTop: scaleVer(32) }}
      />
    </ViewContainer>
  );
};

export default connect(state => ({ loading: state.user.loading }), {
  signIn,
})(SignInScreen);
