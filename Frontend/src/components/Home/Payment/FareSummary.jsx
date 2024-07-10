const FareSummary = ({price}) => {
    return ( 
        <div className="card shadow-lg p-4" style={{ backgroundColor: "#d6efd8", flex: "1", marginLeft: "20px", height: "auto" }}>
          <h3 className="mb-4 text-center">Fare Summary</h3>
          <div>
            <p>Price: {price}</p>
            <p>GST: ₹300</p>
            <p>Seat Charges: ₹150</p>
            <p>Convenience Fee: ₹300</p>
            <hr />
            <h4 className="text-success">Total: ₹ {price + 300 + 150 + 300}</h4>
            <div className="text-center mt-4">
              <i className="fas fa-file-invoice-dollar fa-2x"></i>
            </div>
          </div>
        </div>
     );
}
 
export default FareSummary;