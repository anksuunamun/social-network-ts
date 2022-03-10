import React from 'react';
import TestRenderer from 'react-test-renderer';
import ProfileStatus from './ProfileStatus';

let instance, updateUserStatusThunkAC, component;

beforeEach(() => {
  updateUserStatusThunkAC = jest.fn();
  component = TestRenderer.create(
    <ProfileStatus userStatus="Test status" updateUserStatusThunkAC={updateUserStatusThunkAC} />,
  );
  instance = component.root;
});

describe('tests for ProfileStatus Component', () => {
  test('status from props should be in the state', () => {
    const instance = component.getInstance();

    expect(instance.state.status).toBe('Test status');
  });

  test('span should be in displayed, but not input', () => {
    expect(instance.findByType('span')).toBeDefined();
    expect(() => instance.findByType('input')).toThrowError();
  });

  test('span should be in displayed with correct status', () => {
    expect(instance.findByType('span').children).toEqual(['Test status']);
  });

  test('input should be displayed in edit mode instead of span', () => {
    const span = instance.findByType('span');
    span.props.onDoubleClick();

    expect(instance.findByType('input')).toBeDefined();
    expect(instance.findAllByProps({ value: 'Test status' }).length).toBe(1);
    expect(instance.findByType('input').props.value).toBe('Test status');
  });

  test('callback should be called', () => {
    expect(updateUserStatusThunkAC.mock.calls).toBe(1);
  });
});
