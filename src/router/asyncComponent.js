import React, { Component } from 'react';

export default componentImport => {
    return class AsyncComponent extends Component {
        state = {
            Component: null
        }

        async componentDidMount() {
            if (this.state.Component !== null) return;
            try {
                const { default: Component } = await componentImport();
                this.setState({
                    Component
                });
            } catch{

            }
        }

        render() {
            let { Component } = this.state;
            return Component ? <Component {...this.props} /> : null;
        }
    }
}