import React, { useState } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { TextInputField } from '../atoms/TextInputField';

export const ComplaintSection: React.FC = () => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  return (
    <View style={styles.container}>
      <TextInputField
        label="Subject"
        value={subject}
        onChangeText={setSubject}
      />
      <TextInputField
        label="Complaint"
        value={message}
        onChangeText={setMessage}
        multiline
        style={{ height: 100, textAlignVertical: 'top' }}
      />
      <Button title="Submit Complaint" onPress={() => {}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginTop: 12,
  },
});
