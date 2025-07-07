// __tests__/HomeScreen.test.tsx
import { publishMessage } from '@/core/mqtt';
import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import HomeScreen, { PayloadPompaA, PayloadPompaB, sendActionButtonA, sendActionButtonB } from '../DemoMQTT/_layout';

jest.mock('@/components/Header', () => () => <></>);
jest.mock('@/core/mqtt', () => ({
  connectToBroker: jest.fn(),
  publishMessage: jest.fn(),
}));
jest.mock('@/constants/Config', () => ({
  PUBLIC_TOPIC_ID: 'demo/mqtt/data',
}));

describe('HomeScreen (Expo)', () => {
  it('menampilkan status MQTT default sebagai Disconnected', () => {
    const { getByText } = render(<HomeScreen />);
    expect(getByText('Status MQTT')).toBeTruthy();
    expect(getByText('Disconnected')).toBeTruthy();
  });

  it('render tombol Pompa A dan Pompa B', () => {
    const { getByText } = render(<HomeScreen />);
    expect(getByText('Pompa A')).toBeTruthy();
    expect(getByText('Pompa B')).toBeTruthy();
  });

  it('tombol Pompa A dapat ditekan', () => {
    const { getByText } = render(<HomeScreen />);
    fireEvent.press(getByText('Pompa A'));
    expect(getByText('Pompa A')).toBeTruthy();
  });

  it('tombol Pompa B dapat ditekan', () => {
    const { getByText } = render(<HomeScreen />);
    fireEvent.press(getByText('Pompa B'));
    expect(getByText('Pompa B')).toBeTruthy();
  });

  it('should publish correct payload to topic pompaA', () => {
    const payload: PayloadPompaA = { PompaA: true };
    sendActionButtonA(payload);

    expect(publishMessage).toHaveBeenCalledWith({
      topic: 'demo/mqtt/data/action/pompaA',
      payload: JSON.stringify(payload),
    });
  });

  it('should publish correct payload to topic pompaB', () => {
    const payload: PayloadPompaB = { PompaB: true };
    sendActionButtonB(payload);

    expect(publishMessage).toHaveBeenCalledWith({
      topic: 'demo/mqtt/data/action/pompaB',
      payload: JSON.stringify(payload),
    });
  });
});
