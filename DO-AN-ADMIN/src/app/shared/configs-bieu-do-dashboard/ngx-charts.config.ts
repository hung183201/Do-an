import * as shape from 'd3-shape';
//Bar Chart

export var barChartView: any[] = [550, 400];

// options
export var barChartShowXAxis = true;
export var barChartShowYAxis = true;
export var barChartGradient = false;
export var barChartShowLegend = false;
export var barChartShowXAxisLabel = true;
export var barChartXAxisLabel = 'Đơn vị hành chính';
export var barChartShowYAxisLabel = true;
export var barChartYAxisLabel = 'Số lượng hồ sơ';

export var barChartColorScheme = {
    domain: ['#009DA0', '#FF8D60', '#FF586B', '#AAAAAA']
};

//Pie CHart

export var pieChartView: any[] = [550, 400];

// options
export var pieChartShowLegend = false;

export var pieChartColorScheme = {
    domain: ['#009DA0', '#FF8D60', '#FF586B', '#AAAAAA']
};

// pie
export var pieChartShowLabels = true;
export var pieChartExplodeSlices = false;
export var pieChartDoughnut = true;
export var pieChartGradient = false;

export var pieChart1ExplodeSlices = true;
export var pieChart1Doughnut = false;

//Line Charts

export var lineChartView: any[] = [550, 400];

// options
export var lineChartShowXAxis = true;
export var lineChartShowYAxis = true;
export var lineChartGradient = false;
export var lineChartShowLegend = false;
export var lineChartShowXAxisLabel = true;
export var lineChartXAxisLabel = 'Tháng';
export var lineChartShowYAxisLabel = true;
export var lineChartYAxisLabel = 'Số lượng hồ sơ';

export var lineChartColorScheme = {
    domain: ['#009DA0', '#FF8D60', '#FF586B', '#AAAAAA']
};

// line, area
export var lineChartAutoScale = true;
export var lineChartLineInterpolation = shape.curveBasis;

//Area Charts
export var areaChartView: any[] = [550, 400];

// options
export var areaChartShowXAxis = true;
export var areaChartShowYAxis = true;
export var areaChartGradient = false;
export var areaChartShowLegend = false;
export var areaChartShowXAxisLabel = true;
export var areaChartXAxisLabel = 'Country';
export var areaChartShowYAxisLabel = true;
export var areaChartYAxisLabel = 'Population';

export var areaChartColorScheme = {
    domain: ['#FF8D60', '#FF586B', '#1CBCD8', '#AAAAAA']
};

// line, area
export var areaChartAutoScale = true;
export var areaChartLineInterpolation = shape.curveBasis;
