import { Component } from 'react';
import css from './Modal.module.css';

export default class Modal extends Component {
  handleKeyDown = e => {
      if (e.code === 'Escape') {
        this.props.onClose();
      }
    };

    componentDidMount() {
      document.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnmount() {
      document.removeEventListener('keydown', this.handleKeyDown)
    }
    handleOverlayClick = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    return (
      <div className={css.overlay} onClick={this.handleOverlayClick}>
        <div className={css.module}>
          <img src={this.props.image} alt="" />
        </div>
      </div>
    );
  }
};