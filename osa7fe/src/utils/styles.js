const navStyle = (display) => {
  const style = {
     backgroundColor: 'lightgray',
     color: 'gray',
     fontStyle: 'italic'
   }
   style.display = display.display
   return style
 }

const actStyle = () => {
  const style = {
    fontWeight: "bold",
    color: "blue"
  }
}

const blogStyle = () => {
  return {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
}

module.exports = {
  navStyle,
  actStyle,
  blogStyle,
}
