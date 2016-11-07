import React from 'react';

// export default () => {
export default class Header extends React.Component {
  click() {
    console.log('click');
  }

  render() {
    return (
      <header>
        <h1 onClick={this.click}>Header</h1>
      </header>
    )
  }
}
