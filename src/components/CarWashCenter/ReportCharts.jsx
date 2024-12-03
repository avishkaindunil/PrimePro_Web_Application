import React from 'react'


const ReportCharts = (props) => {
  const report = props.reportType;

  return (
    <div>
      service type{report.type}
    </div>
  )
}

export default ReportCharts
