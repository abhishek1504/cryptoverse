class MyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            config: {}
        }
    }
 
    getConfig = () => {
        const config = NativeModules.SomeRandomModule.getConfig();
        this.setState({config});
    }
 
    render() {
        return (<Text>{this.state.config.someValue}</Text>);
    }
}
 
componentDidMount() {
	this.getConfig()
}
