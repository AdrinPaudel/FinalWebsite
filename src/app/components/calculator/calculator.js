import "./calculator.css"
export default function Calculator({ insured_amount, income }) {

    var year = 0
    var expense = 0.5 * income

    var total_amount = insured_amount
    var interest = 0.1 * total_amount

    while (total_amount > 0) {
        total_amount += interest
        total_amount -= expense
        expense += 0.6 * expense
        year += 1
    }
    return (
        <div className="calculatorCard">
    <div className="yearHeading">
      Insured amount covers family expenses for approximately 
      <span className="lastingYear">{year}  </span> 
        Years
    </div>
    <div className="subDetails">(Click to see how it's calculated)</div>
  </div>
    )
}