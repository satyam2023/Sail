import debounce from "lodash.debounce";
import throttle from 'lodash.throttle';
import React from "react";


export const debounceHOC = (WrappedComponent) => {
  class PreventDoubleClick extends React.PureComponent {
    debouncedOnPress = () => {
      this.props.onPress && this.props.onPress();
    };

    onPress = throttle(this.debouncedOnPress, 300, {
      leading: true,
      trailing: false,
    });

    render() {
      return <WrappedComponent {...this.props} onPress={this.onPress} />;
    }
  }

  PreventDoubleClick.displayName = `debounceHOC(${
    WrappedComponent.displayName || WrappedComponent.name 
  })`;
  return PreventDoubleClick;
};
