import React from "react";

const PrintFile = React.forwardRef((props, ref) => {
    console.log('yes data', props.data)

    return (
        <>
            <div id="invoiceholder" ref={ref}>
                <div id="invoice" className="effect2">

                    <div id="invoice-top">
                        <div className="logo" style={{background: 'url(/media/logo.png) no-repeat'}}></div>
                        {/* <div className="info">
                            <h2>Michael Truong</h2>
                            <p> </p>
                        </div> */}
                        <div className="title">
                            <h1>Invoice #{props.data.invoiceNo}</h1>
                            <p></p>
                        </div>
                    </div>



                    <div id="invoice-mid">

                        <div className="clientlogo"></div>
                        <div className="info">
                            <h2>{props.data.cname}</h2>
                            <p></p>
                        </div>

                        <div id="project">
                            <h2>Project Description</h2>
                            <p>Proin cursus, dui non tincidunt elementum, tortor ex feugiat enim, at elementum enim quam vel purus. Curabitur semper malesuada urna ut suscipit.</p>
                        </div>

                    </div >

                    <div id="invoice-bot">

                        <div id="table">
                            <table>
                                <tr className="tabletitle">
                                    <td><h6>Parking&nbsp;Location</h6></td>
                                    <td><h6>Slot&nbsp;No</h6></td>
                                    <td><h6>Reservation&nbsp;Date</h6></td>
                                    <td><h6>Start&nbsp;Time</h6></td>
                                    <td><h6>End&nbsp;Time</h6></td>
                                    <td><h6>Duration</h6></td>
                                    <td className="Rate"><h6>Rate/Hour</h6></td>
                                    <td className="subtotal"><h6>Sub&nbsp;total</h6></td>
                                </tr>

                                <tr className="service">
                                    <td className="tableitem"><p className="itemtext">{props.data.location}</p></td>
                                    <td className="tableitem"><p className="itemtext">{props.data.slot}</p></td>
                                    <td className="tableitem"><p className="itemtext">{props.data.date}</p></td>
                                    <td className="tableitem"><p className="itemtext">{props.data.stime}</p></td>
                                    <td className="tableitem"><p className="itemtext">{props.data.etime}</p></td>
                                    <td className="tableitem"><p className="itemtext">{props.data.duration} Hours</p></td>
                                    <td className="tableitem"><p className="itemtext">$5.00</p></td>
                                    <td className="tableitem"><p className="itemtext">${props.data.duration * 5}.00</p></td>
                                </tr>

                                <tr className="tabletitle">
                                    <td className="Rate" colSpan={7} style={{textAlign: 'right'}}><h4>Total</h4></td>
                                    <td className="payment"><h4>${props.data.duration * 5}.00</h4></td>
                                </tr>

                            </table>
                        </div>

                        <img src="http://michaeltruong.ca/images/paypal.png" style={{float: 'right', marginTop: '35px'}}/>


                        <div id="legalcopy">
                            <p className="legal"><strong>Thank you for your business!</strong>  Payment is expected within 31 days; please process this invoice within that time. There will be a 5% interest charge per month on late invoices.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
});

export default PrintFile;
