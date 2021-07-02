import * as React from "react";
import { useRef, useState } from "react";
import "@progress/kendo-theme-material/dist/all.css";

import {
    Chart,
    ChartLegend,
    ChartSeries,
    ChartSeriesItem,
    ChartSeriesLabels,
    ChartCategoryAxis,
    ChartCategoryAxisItem
} from "@progress/kendo-react-charts";
import "hammerjs";

import { PDFExport, savePDF } from "@progress/kendo-react-pdf";

import sampleData from "./invoice-data.json";
import "./style.css";
import KendokaLogo from "./kendoka-logo.svg";

function DownloadPDF() {
    
    const pdfExportComponent = useRef(null);

    const handleExportWithComponent = event => {
        pdfExportComponent.current.save();
    };

    return (
        <PDFExport ref={pdfExportComponent}>
            <div className={`pdf-page ${layoutSelection.value}`}>
                <div className="inner-page">
                    <div className="pdf-header">
                        <span className="company-logo">
                            <img src={KendokaLogo} alt="Kendoka Company Logo" /> Blauer
                            See Delikatessen
                        </span>
                        <span className="invoice-number">Invoice #23543</span>
                    </div>
                    <div className="pdf-footer">
                        <p>
                            Blauer See Delikatessen
                            <br />
                            Lützowplatz 456
                            <br />
                            Berlin, Germany, 10785
                        </p>
                    </div>
                    <div className="addresses">
                        <div className="for">
                            <h3>Invoice For</h3>
                            <p>
                                Antonio Moreno
                                <br />
                                Naucalpan de Juárez
                                <br />
                                México D.F., Mexico, 53500
                            </p>
                        </div>

                        <div className="from">
                            <h3>From</h3>
                            <p>
                                Hanna Moos <br />
                                Lützowplatz 456
                                <br />
                                Berlin, Germany, 10785
                            </p>
                            <p>
                                Invoice ID: 23543
                                <br />
                                Invoice Date: 12.03.2014
                                <br />
                                Due Date: 27.03.2014
                            </p>
                        </div>
                    </div>
                    <div className="pdf-chart">
                        <Chart style={{ height: 280 }}>
                            <ChartSeries>
                                <ChartSeriesItem
                                    type="donut"
                                    data={sampleData}
                                    categoryField="product"
                                    field="share"
                                >
                                    <ChartSeriesLabels color="#fff" background="none" />
                                </ChartSeriesItem>
                            </ChartSeries>
                        </Chart>
                    </div>
                    <div className="pdf-body">
                        <div id="grid" />
                        <p className="signature">
                            Signature: ________________ <br />
                            <br />
                            Date: 12.03.2014
                        </p>
                    </div>
                </div>
            </div>
        </PDFExport>
    );
}

export default DownloadPDF;
