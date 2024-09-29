class MyList extends Component {
    handleDrillDown = index => {
    }
  
    render = () => {
      let data = // Whatever data here
      return (
        <View style={styles.container}>
          <FlatList
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <MyListItem
                onCaretPress={this.handleDrillDown}
                item={item}
              />
            )}
          />
        </View>
      );
    };
  }
  export default MyList;


class MyListItem extends Component {
  handleTextPress = () => {
    if (this.props.onTextPress) this.props.onTextPress(this.props.item.id);
  };

  handleIconPress =() => {
    if (this.props.onCaretPress) this.props.onCaretPress(this.props.item.id)
  }

  render = () => {
    return (
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text onPress={this.handleTextPress}>{this.props.item.title}</Text>
        </View>
        <View style={styles.iconContainer}>
          <Button onPress={this.handleIconPress}>
            <Icon name="ios-arrow-forward"/>
          </Button>
        </View>
      </View>
    );
  };
}


  