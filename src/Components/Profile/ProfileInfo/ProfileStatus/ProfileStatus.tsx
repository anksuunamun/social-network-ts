import React, { ChangeEvent, KeyboardEvent } from 'react';
import styles from './ProfileStatus.module.css';

type ProfileStatusPropsType = {
  userStatus: string;
  updateUserStatusThunkAC: (status: string) => void;

  isOwner: boolean;
};
type ProfileStatusStateType = {
  status: string;
  editMode: boolean;
};

class ProfileStatus extends React.PureComponent<ProfileStatusPropsType, ProfileStatusStateType> {
  constructor(props: ProfileStatusPropsType) {
    super(props);
    this.state = {
      status: this.props.userStatus || 'Empty',
      editMode: false,
    };
  }

  onActivateEditMode = () => {
    this.setState({ editMode: true });
  };
  onDeactivateEditMode = () => {
    this.setState({ editMode: false });
    this.props.updateUserStatusThunkAC(this.state.status);
  };
  onStatusChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ status: e.currentTarget.value });
  };
  onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      this.onDeactivateEditMode();
    }
  };

  componentDidUpdate(prevProps: Readonly<ProfileStatusPropsType>) {
    if (prevProps.userStatus !== this.props.userStatus) {
      this.setState({ status: this.props.userStatus });
    }
  }

  render() {
    return (
      <div className={styles.statusWrapper}>
        {this.state.editMode && this.props.isOwner ? (
          <input
            type="text"
            onBlur={this.onDeactivateEditMode}
            value={this.state.status}
            onChange={this.onStatusChangeHandler}
            onKeyPress={this.onKeyPressHandler}
          />
        ) : (
          <span onDoubleClick={this.onActivateEditMode}>{this.props.userStatus || 'Status'}</span>
        )}
      </div>
    );
  }
}

export default ProfileStatus;
