import { NextRequest, NextResponse } from 'next/server';
import * as XLSX from "xlsx";

export interface RiskFactor {
  number: number,
  assetName: string;
  lat: number,
  long: number,
  businessCategory: string,
  riskFactors: NaturalRiskFactors,
  riskRating: number,
  year: number,
  country: string
}
export interface NaturalRiskFactors {
  [key: string]: number;
  tornado: number,
  seaLevelRise: number,
  wildfire: number,
  earthquake: number, 
  drought: number
  hurricane: number, 
  extremeCold: number,
  extremeHeat: number,
  flooding: number,
  volcano: number
} 
export interface ResponseData {
  Data: RiskFactor[],
  hasNext: boolean,
  totalPages: Number,
  pageSize: Number
}

type FilterParams = {
  [key: string]: string;
};

function getFilters(request: NextRequest) {
  const filters: FilterParams = {};
  const query = request.nextUrl.searchParams.getAll('filter');

  if (query) {
    const filterParams = query.flatMap((param: string) => param.split('|'));
    filterParams.forEach((param) => {
      const [key, value] = param.split(':');
      const decodedValue = decodeURIComponent(value);
      filters[key] = decodedValue;
    });
  }
  return filters;
}
//named http exports
export async function GET(request: NextRequest) {
  
  //filters
  let filters: FilterParams = {};
  filters = getFilters(request);
  //compute pagination logic
  const page = request.nextUrl.searchParams.get('page');
  const perPage = Number(request.nextUrl.searchParams.get('pagesize'));
  const startIndex = (Number(page) - 1) * Number(perPage);;
  const endIndex = startIndex + Number(perPage);
  const riskData: ResponseData = await parseData(startIndex, endIndex, perPage, filters);
  return NextResponse.json(riskData);
}

  //Data Processing
async function parseData(startIndex: number, endIndex: number, perPage: number, filters: FilterParams = {}) {
    //read dataset
  const publicPath = process.env.PUBLIC_PATH;
  const workbook = XLSX.readFile(`./public/UI_UX Developer Work Sample Data.xlsx`);
  const worksheet = workbook.Sheets["sample_data"];
  const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as string[][];
  var pageSize = endIndex - startIndex + 1;
  var selectedRows = rows; // get paginated data
  var hasNext = rows.length > endIndex || (rows.length === endIndex && pageSize > 0);
  var totalPages = rows.length;
  const headers = rows[0];
  var filteredRows = rows.slice(1);

  //we want to paginate later, if we also have filters (pagination will apply to filteed data)
  if (perPage != 0 && Object.values(filters).length == 0)
  {
    selectedRows = rows.slice(startIndex, endIndex + 1); // get paginated data
  }
    //filter dataset
  if (Object.values(filters).length != 0) {
    
for (const filterKey in filters) {
    const filterValue = filters[filterKey];

    const filterIndex = headers.indexOf(filterKey);
    if (filterIndex !== -1) {
      filteredRows = filteredRows.filter((row) => {
        const rowValue = row[filterIndex];
        // convert the filter value to the same data type as the row value
        const convertedFilterValue = typeof rowValue === 'number' ? parseFloat(filterValue) : filterValue.toString();
        return rowValue === convertedFilterValue;
    });
    
  }
}
    
  if (perPage != 0) {
    selectedRows = filteredRows.slice(startIndex, endIndex + 1);
  }
  else {
    selectedRows = filteredRows;

  }
    hasNext = selectedRows.length > endIndex || (selectedRows.length === endIndex && pageSize > 0);
  }

  //Parse data to interface
  const parsedData: RiskFactor[] = selectedRows
    .slice(1) // Skip the header row
    .map((row, index) => ({
      number: Number(index),
      assetName: row[0],
      lat: Number(row[1]),
      long: Number(row[2]),
      businessCategory: row[3],
      riskRating: Number(row[4]),
      riskFactors: Object.keys(JSON.parse(row[5])).reduce((acc, key) => {
      let normalizedKey = key.replace(/\s+/g, '').toLowerCase();
      normalizedKey = normalizedKey.charAt(0).toLowerCase() + normalizedKey.slice(1);

      if (!Object.prototype.hasOwnProperty.call(acc, normalizedKey)) {
          acc[normalizedKey] = 0;
      }

      const parsedData = JSON.parse(row[5]);
      acc[normalizedKey] = parsedData[key];
      return acc;
}, {} as NaturalRiskFactors),
      year: Number(row[6]),
      country: ''
    }));
  
    // Add pagination logic here if needed
  const responseData: ResponseData = {
    Data: parsedData,
    hasNext: hasNext,
    pageSize: perPage,
    totalPages: totalPages
  }
    return responseData;
  }

