import React from "react"
import Rodal from "rodal"
import "rodal/lib/rodal.css" // Popup box styles

class Popup extends React.Component {
  render() {
    return (
      <div>
        <Rodal visible={this.props.show} onClose={this.props.hide}>
          {this.props.children}
        </Rodal>
      </div>
    )
  }
}

export default Popup
