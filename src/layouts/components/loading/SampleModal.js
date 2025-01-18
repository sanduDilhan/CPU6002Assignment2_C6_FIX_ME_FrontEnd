/**
 * Created by WebStorm.
 * User: athukorala
 * Date: 5/6/20
 * Time: 11:24 AM
 */
import React from "react"
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap"

class ModalBasic extends React.Component {

  state = {
    modal: false
  }

  toggleModal = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }))
  }

  render() {
    return (
      <div>
        <Button
          color="primary"
          className="btn-block"
          size="lg"
          outline
          onClick={this.toggleModal}
        >
          Launch Modal
        </Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggleModal}
          className="modal-dialog-centered"
        >
          <ModalHeader toggle={this.toggleModal}>
            Vertically Centered
          </ModalHeader>
          <ModalBody className="modal-dialog-centered">
            Oat cake ice cream candy chocolate cake chocolate cake
            cotton candy dragée apple pie. Brownie carrot cake candy
            canes bonbon fruitcake topping halvah. Cake sweet roll cake
            cheesecake cookie chocolate cake liquorice.
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggleModal}>
              Accept
            </Button>{" "}
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

export default ModalBasic
