import React from "react"
import axios from "axios"

class IndexPage extends React.Component {
  state = {
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
    oneTimeAmount: 0,
    onetimenote: "",
    vat: 23,
  }

  isChecked = event => {
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

  // isValidDate = (event, date) => {
  //   var dateString = date
  //   // First check for the pattern
  //   if (!/^\d{4}\/\d{1,2}\/\d{1,2}$/.test(dateString)) return false
  //
  //   console.log("date format validation passed")
  //
  //   // Parse the date parts to integers
  //   var parts = dateString.split("/")
  //   var day = parseInt(parts[2], 10)
  //   var month = parseInt(parts[1], 10)
  //   var year = parseInt(parts[0], 10)
  //
  //   var currentDate = new Date()
  //   var currentDay = String(currentDate.getDate()).padStart(2, "0")
  //   var currentMonth = String(currentDate.getMonth() + 1).padStart(2, "0")
  //   var currentYear = currentDate.getFullYear()
  //
  //   // Check the ranges of month and year
  //   if (
  //     year < currentYear ||
  //     (year < currentYear && month < currentMonth && day < currentDay) ||
  //     month == 0 ||
  //     month > 12
  //   )
  //     return false
  //
  //   console.log("date range validation passed")
  //
  //   var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  //
  //   // Adjust for leap years
  //   if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
  //     monthLength[1] = 29
  //
  //   // Check the range of the day
  //   return day > 0 && day <= monthLength[month - 1]
  // }
  //
  // validateInvoice = event => {
  //   let sub_end_date = this.state.sub_end_date
  //
  //   console.log(sub_end_date)
  //   console.log("validating values...")
  //
  //   if (this.isValidDate(sub_end_date)) {
  //     console.log("valid!")
  //     this.handleSubmit()
  //   } else {
  //     console.log("not valid!")
  //     alert(
  //       "Invalid date entered. Make sure that it is past the current date and in the format YYYY/MM/DD."
  //     )
  //   }
  // }

  // copyUrl = (event, invoiceURL) => {
  //   let url = document.createElement("input"),
  //     text = "quotedandpay.xiir.com/" + invoiceURL
  //
  //   document.body.appendChild(url)
  //   url.value = text
  //
  //   url.select()
  //   document.execCommand("copy")
  //   document.body.removeChild(url)
  //
  //   alert("Copied the url: " + text)
  // }
  //
  // createPopUpBox = (event, invoiceURL) => {
  //   console.log(invoiceURL)
  //
  //   let form = document.getElementsByClassName("subscriptionForm")[0]
  //
  //   //pop up box
  //   let popUpBox = document.createElement("div")
  //   popUpBox.setAttribute("id", "invoiceModal")
  //   popUpBox.setAttribute("class", "modal")
  //
  //   //div holding content inside pop up box
  //   let modalContent = document.createElement("div")
  //   modalContent.setAttribute("class", "modalContent")
  //   popUpBox.appendChild(modalContent)
  //
  //   //close button
  //   let span = document.createElement("span")
  //   span.setAttribute("class", "close")
  //   let spanText = document.createTextNode("X")
  //   span.appendChild(spanText)
  //   modalContent.appendChild(span)
  //
  //   //verification text
  //   let center = document.createElement("center")
  //   let textBox = document.createElement("p")
  //   let text = document.createTextNode("Form has been successfully submitted")
  //   textBox.appendChild(text)
  //   center.appendChild(textBox)
  //   modalContent.appendChild(center)
  //
  //   //copy button
  //   let copyButton = document.createElement("button")
  //   copyButton.setAttribute("class", "btn btn-primary login-btn btn-block")
  //   copyButton.addEventListener("click", function () {
  //     this.copyUrl(invoiceURL)
  //   })
  //   let copyButtonText = document.createTextNode("Copy Invoice URL")
  //   copyButton.appendChild(copyButtonText)
  //   modalContent.appendChild(copyButton)
  //
  //   //redirect button
  //   let redirectButton = document.createElement("button")
  //   redirectButton.setAttribute("class", "btn btn-primary login-btn btn-block")
  //   redirectButton.setAttribute("style", "margin-top: 10px;")
  //   redirectButton.addEventListener("click", function () {
  //     window.location = "quotedandpay.xiir.com/" + invoiceURL
  //   })
  //   let redirectButtonText = document.createTextNode("Go To Invoice")
  //   redirectButton.appendChild(redirectButtonText)
  //   modalContent.appendChild(redirectButton)
  //
  //   //add popup box to form
  //   form.appendChild(popUpBox)
  //
  //   //display modal
  //   popUpBox.style.display = "block"
  //
  //   //close modal when X is clicked
  //   span.onclick = function () {
  //     popUpBox.style.display = "none"
  //   }
  // }

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
    alert(`title: ${this.state.title_of_quote} name: ${this.state.fullname} company: ${this.state.companyname}
      address: ${this.state.companyaddress1} ${this.state.companyaddress2} ${this.state.companyaddress3} ${this.state.companyaddress4}
      description: ${this.state.servicedescription} sub_end_date: ${this.state.sub_end_date} contractterm: ${this.state.contractterm}
      sub amount: ${this.state.amount} serv note: ${this.state.servicenote}
      onetime amount: ${this.state.oneTimeAmount} onetime note: ${this.state.onetimenote} vat: ${this.state.vat}
      `)

    axios({
      method: "post",
      url: "https://quotedandpay.xiir.com/submit-invoice.php",
      data: this.state,
    })
      .then(function (response) {
        console.log("Submitted")
        console.log(response)
        let invoiceURL = response.data
        console.log(invoiceURL)
        //this.createPopUpBox(invoiceURL)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  render() {
    return (
      <form className="subscriptionForm">
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
          value={this.state.fullname}
          onChange={this.handleInputChange}
        />
        <input
          id="companyname"
          type="text"
          name="companyname"
          placeholder="Company Name"
          value={this.state.companyname}
          onChange={this.handleInputChange}
        />
        <input
          id="companyaddress1"
          type="text"
          name="companyaddress1"
          placeholder="Company Address Line 1"
          value={this.state.companyaddress1}
          onChange={this.handleInputChange}
        />
        <input
          id="companyaddress2"
          type="text"
          name="companyaddress2"
          placeholder="Company Address Line 2"
          value={this.state.companyaddress2}
          onChange={this.handleInputChange}
        />
        <input
          id="companyaddress3"
          type="text"
          name="companyaddress3"
          placeholder="Company Address Line 3"
          value={this.state.companyaddress3}
          onChange={this.handleInputChange}
        />
        <input
          id="companyaddress4"
          type="text"
          name="companyaddress4"
          placeholder="Company Address Line 4"
          value={this.state.companyaddress4}
          onChange={this.handleInputChange}
        />
        <input
          id="servicedescription"
          type="text"
          name="servicedescription"
          placeholder="Service Description"
          value={this.state.servicedescription}
          onChange={this.handleInputChange}
        />
        <input
          id="sub_end_date"
          type="text"
          name="sub_end_date"
          placeholder="Subscription End Date (YYYY/MM/DD)"
          required
          value={this.state.sub_end_date}
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
        <label htmlFor="contractterm"> Daily </label>
        <input
          type="radio"
          onClick={this.isChecked}
          name="contractterm"
          id="contracttermWeekly"
          value="weekly"
          onChange={this.handleInputChange}
        />
        <label htmlFor="contractterm"> Weekly </label>
        <input
          type="radio"
          onClick={this.isChecked}
          name="contractterm"
          id="contracttermMonthly"
          value="monthly"
          onChange={this.handleInputChange}
        />
        <label htmlFor="contractterm">Monthly</label>
        <input
          type="radio"
          onClick={this.isChecked}
          name="contractterm"
          id="contractterm3Months"
          value="3-months"
          onChange={this.handleInputChange}
        />
        <label htmlFor="contractterm"> Every 3 months </label>
        <input
          type="radio"
          onClick={this.isChecked}
          name="contractterm"
          id="contracttermBiAnnually"
          value="bi-annually"
          onChange={this.handleInputChange}
        />
        <label htmlFor="contractterm"> Bi-Annually </label>
        <input
          type="radio"
          onClick={this.isChecked}
          name="contractterm"
          id="contracttermAnnually"
          value="annually"
          onChange={this.handleInputChange}
        />
        <label htmlFor="contractterm"> Annually </label>

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
        <label htmlFor="amount">Once-off Payment:</label>
        <input
          type="number"
          name="oneTimeAmount"
          id="oneTimeAmount"
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
        <label htmlFor="amount">VAT(in %):</label>
        <input
          type="text"
          name="vat"
          id="vat"
          value={this.state.vat}
          min="0"
          step="0.01"
          onChange={this.handleInputChange}
        />

        <button type="button" onClick={this.handleSubmit}>
          Submit
        </button>
      </form>
    )
  }
}

export default IndexPage
