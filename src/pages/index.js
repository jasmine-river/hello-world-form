import React from "react"
import axios from "axios"
import Popup from "../components/popup"
import { CopyToClipboard } from "react-copy-to-clipboard"

class IndexPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title_of_quote: "QUOTE & PAY",
      fullname: "",
      companyname: "",
      companyaddress1: "",
      companyaddress2: "",
      companyaddress3: "",
      companyaddress4: "",
      servicedescription: "",
      sub_end_date: "",
      contractterm: "",
      amount: 0,
      servicenote: "",
      OneTimeAmount: 0,
      onetimenote: "",
      vat: 23,
      showPopup: false,
      invoiceURL: "",
      copySuccess: false,
    }
    this.togglePopup = this.togglePopup.bind(this)
  }

  togglePopup = () => {
    this.setState({
      showPopup: !this.state.showPopup,
    })
  }

  closePopup = () => {
    this.togglePopup()
    document.getElementById("subscriptionForm").reset() // Reset form data
  }

  isChecked = () => {
    // Set subscription fee according to contract term
    if (document.getElementById("contracttermDaily").checked) {
      this.setState({ amount: 5 })
    } else if (document.getElementById("contracttermWeekly").checked) {
      this.setState({ amount: 10 })
    } else if (document.getElementById("contracttermMonthly").checked) {
      this.setState({ amount: 15 })
    } else if (document.getElementById("contractterm3Months").checked) {
      this.setState({ amount: 20 })
    } else if (document.getElementById("contracttermBiAnnually").checked) {
      this.setState({ amount: 25 })
    } else if (document.getElementById("contracttermAnnually").checked) {
      this.setState({ amount: 30 })
    }
  }

  copyUrl = () => {
    return (
      <CopyToClipboard
        text={this.state.invoiceURL}
        onCopy={() => this.setState({ copySuccess: true })}
      >
        <button type="reset">Copy Invoice URL</button>
      </CopyToClipboard>
    )
  }

  goToInvoice = () => {
    return (
      <button type="reset" onClick={() => window.open(this.state.invoiceURL)}>
        Go To Invoice
      </button>
    )
  }

  createPopupBox = () => {
    return (
      <Popup show={this.state.showPopup} hide={this.closePopup}>
        <div>
          <p>Form has been successfully submitted</p>
          {this.copyUrl()}
          {this.goToInvoice()}
          {this.state.copySuccess ? (
            <div style={{ color: "green" }}>Invoice URL copied</div>
          ) : null}
        </div>
      </Popup>
    )
  }

  handleInputChange = event => {
    const target = event.target
    const value = target.value
    const name = target.name

    this.setState({
      [name]: value,
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    // alert(`title_of_quote: ${this.state.title_of_quote} fullname: ${this.state.fullname} companyname: ${this.state.companyname}
    //   companyaddress: ${this.state.companyaddress1} ${this.state.companyaddress2} ${this.state.companyaddress3} ${this.state.companyaddress4}
    //   servicedescription: ${this.state.servicedescription} sub_end_date: ${this.state.sub_end_date} contractterm: ${this.state.contractterm}
    //   amount: ${this.state.amount} servicenote: ${this.state.servicenote}
    //   OneTimeAmount: ${this.state.OneTimeAmount} onetimenote: ${this.state.onetimenote} vat: ${this.state.vat}
    //   `)

    let bodyFormData = new FormData()
    bodyFormData.append("title_of_quote", this.state.title_of_quote)
    bodyFormData.append("fullname", this.state.fullname)
    bodyFormData.append("companyname", this.state.companyname)
    bodyFormData.append("companyaddress1", this.state.companyaddress1)
    bodyFormData.append("companyaddress2", this.state.companyaddress2)
    bodyFormData.append("companyaddress3", this.state.companyaddress3)
    bodyFormData.append("companyaddress4", this.state.companyaddress4)
    bodyFormData.append("servicedescription", this.state.servicedescription)
    bodyFormData.append("sub_end_date", this.state.sub_end_date)
    bodyFormData.append("contractterm", this.state.contractterm)
    bodyFormData.append("amount", this.state.amount)
    bodyFormData.append("servicenote", this.state.servicenote)
    bodyFormData.append("OneTimeAmount", this.state.OneTimeAmount)
    bodyFormData.append("onetimenote", this.state.onetimenote)
    bodyFormData.append("vat", this.state.vat)

    axios({
      method: "post",
      url: "https://quotedandpay.xiir.com/submit-invoice.php",
      data: bodyFormData,
    })
      .then(response => {
        console.log("Submitted")
        console.log(response)
        let url = response.data
        this.setState({
          invoiceURL: "https://quotedandpay.xiir.com/" + url,
        })
        console.log(this.state.invoiceURL)
        this.togglePopup()
      })
      .catch(error => {
        console.log(error)
      })
  }

  render() {
    return (
      <form id="subscriptionForm" onSubmit={this.handleSubmit}>
        <input
          id="title_of_quote"
          type="text"
          name="title_of_quote"
          placeholder="QUOTE & PAY"
          value={this.state.title_of_quote}
          onChange={this.handleInputChange}
        />
        <input
          id="fullname"
          type="text"
          name="fullname"
          placeholder="Full Name"
          onChange={this.handleInputChange}
        />
        <input
          id="companyname"
          type="text"
          name="companyname"
          placeholder="Company Name"
          onChange={this.handleInputChange}
        />
        <input
          id="companyaddress1"
          type="text"
          name="companyaddress1"
          placeholder="Company Address Line 1"
          onChange={this.handleInputChange}
        />
        <input
          id="companyaddress2"
          type="text"
          name="companyaddress2"
          placeholder="Company Address Line 2"
          onChange={this.handleInputChange}
        />
        <input
          id="companyaddress3"
          type="text"
          name="companyaddress3"
          placeholder="Company Address Line 3"
          onChange={this.handleInputChange}
        />
        <input
          id="companyaddress4"
          type="text"
          name="companyaddress4"
          placeholder="Company Address Line 4"
          onChange={this.handleInputChange}
        />
        <input
          id="servicedescription"
          type="text"
          name="servicedescription"
          placeholder="Service Description"
          onChange={this.handleInputChange}
        />
        <label htmlFor="sub_end_date">Subscription End Date:</label>
        <input
          id="sub_end_date"
          type="date"
          name="sub_end_date"
          min={new Date().toISOString().split("T")[0]} // Set the minimum date to today
          onKeyDown={e => e.preventDefault()} // Disable keyboard input for date
          required
          onChange={this.handleInputChange}
        />

        <hr />
        <input
          type="radio"
          onClick={this.isChecked}
          name="contractterm"
          id="contracttermDaily"
          value="daily"
          onChange={this.handleInputChange}
        />
        <label htmlFor="contracttermDaily"> Daily </label>
        <input
          type="radio"
          onClick={this.isChecked}
          name="contractterm"
          id="contracttermWeekly"
          value="weekly"
          onChange={this.handleInputChange}
        />
        <label htmlFor="contracttermWeekly"> Weekly </label>
        <input
          type="radio"
          onClick={this.isChecked}
          name="contractterm"
          id="contracttermMonthly"
          value="monthly"
          onChange={this.handleInputChange}
        />
        <label htmlFor="contracttermMonthly">Monthly</label>
        <input
          type="radio"
          onClick={this.isChecked}
          name="contractterm"
          id="contractterm3Months"
          value="3-months"
          onChange={this.handleInputChange}
        />
        <label htmlFor="contractterm3Months"> Every 3 months </label>
        <input
          type="radio"
          onClick={this.isChecked}
          name="contractterm"
          id="contracttermBiAnnually"
          value="bi-annually"
          onChange={this.handleInputChange}
        />
        <label htmlFor="contracttermBiAnnually"> Bi-Annually </label>
        <input
          type="radio"
          onClick={this.isChecked}
          name="contractterm"
          id="contracttermAnnually"
          value="annually"
          onChange={this.handleInputChange}
        />
        <label htmlFor="contracttermAnnually"> Annually </label>

        <hr />
        <label htmlFor="amount">Subscription Fee:</label>
        <input
          type="number"
          name="amount"
          id="amount"
          value={this.state.amount}
          min="0"
          onChange={this.handleInputChange}
        />
        <textarea
          id="servicenote"
          name="servicenote"
          placeholder="Personal note regarding subscription service"
          rows="3"
          onChange={this.handleInputChange}
        ></textarea>
        <label htmlFor="OneTimeAmount">Once-off Payment:</label>
        <input
          type="number"
          name="OneTimeAmount"
          id="OneTimeAmount"
          placeholder="5.00"
          min="0"
          onChange={this.handleInputChange}
        />
        <textarea
          id="onetimenote"
          name="onetimenote"
          placeholder="Personal note regarding one-time charge"
          rows="3"
          onChange={this.handleInputChange}
        ></textarea>
        <label htmlFor="vat">VAT(in %):</label>
        <input
          type="number"
          name="vat"
          id="vat"
          value={this.state.vat}
          min="0"
          step="0.01"
          onChange={this.handleInputChange}
        />

        <button
          type="submit"
          onClick={() => this.setState({ copySuccess: false })} // Reset the value for copySuccess (url)
        >
          Submit
        </button>

        {this.state.showPopup ? this.createPopupBox() : null}
      </form>
    )
  }
}

export default IndexPage
