import React from 'react';

import classes from '../../assets/stylesheets/modal.module.css';
import Aux from '../../hocs/Wrap';
import Backdrop from './BackDrop';

class Modal extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
        return (
            nextProps.show !== this.props.show ||
            nextProps.children !== this.props.children
        );
    }

    render() {
        return (
            <Aux>
                <Backdrop
                    show={this.props.show}
                    clicked={this.props.modalClosed}
                />
                <div
                    className={classes.Modal}
                    style={{
                        transform: this.props.show
                            ? 'translateY(0)'
                            : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0',
                    }}>
                    {this.props.children}
                </div>
            </Aux>
        );
    }
}

export default Modal;
