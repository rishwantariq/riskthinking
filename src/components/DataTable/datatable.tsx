import { DataGrid, GridHeader, GridCellParams, GridColDef, GridValueGetterParams, GridToolbarExport, GridToolbarContainer, GridToolbarFilterButton, GridToolbarColumnsButton } from '@mui/x-data-grid';
import { ResponseData, RiskFactor, NaturalRiskFactors } from '@/app/api/riskdata/route';
import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { BorderLinearProgress, StyledDataGrid } from '@/app/theme/theme';
import MY_APP_BASE_URL from '../../../config';
import Cards from '../cards';
import InfoIcon from '@mui/icons-material/Info';

export function Datatable() {
  const [data, setData] = useState<ResponseData>({ Data: [], hasNext: false, totalPages: 0, pageSize: 0 });
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 50,
  });
  const riskColumns = [
  'tornado',
  'sealevelrise',
  'wildfire',
  'earthquake', 
  'drought',
  'hurricane', 
  'extremecold',
  'extremeheat',
  'flooding',
  'volcano'
  ];
  type Factor = {
    [factor: string]: number;
  };
  function CustomToolbar() {
    return (
      <div style={{ borderColor: '#949494', borderBottom: '2px solid #949494' }}>
        <GridToolbarContainer style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{display: 'flex', justifyContent: 'start', alignContent: 'center', alignItems: 'center',  marginTop: '0'}}>
            <img style={{width: '190px', height:'90px'}} src="https://imgtr.ee/images/2023/04/27/JMcWb.png" alt="" />
          </div>
          <div style={{display: 'flex', gap: '5px'}}>
            <GridToolbarFilterButton style={{ color: 'white' }} />
            <GridToolbarColumnsButton style={{ color: 'white' }}/>
            <GridToolbarExport style={{marginRight: '10px', color: 'white'}} />
          </div>
          
        </GridToolbarContainer>
      </div>
    );
  }
  
  const fetchPageData = async (page: number) => {
    try {
      setLoading(true);
      const res = await fetch(`${MY_APP_BASE_URL}/api/riskdata?page=${paginationModel.page+1}&pagesize=${paginationModel.pageSize}`);
      const data: ResponseData = await res.json();
      setData(data);
      setTotalPages(Number(data.totalPages));
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  

  let factorCounts: Factor = {};
  let factorSums: Factor = {};

  data.Data.forEach(item => {
    Object.keys(item.riskFactors).forEach(riskFactor => {
      if (!factorCounts[riskFactor]) {
        factorCounts[riskFactor] = 0;
        factorSums[riskFactor] = 0;
      }
      factorCounts[riskFactor]++;
      factorSums[riskFactor] += item.riskFactors[riskFactor];
    });
  });
  
  let factorAve: Factor = {};
  
  Object.keys(factorCounts).forEach(riskFactor => {
    factorAve[riskFactor] = factorSums[riskFactor] / factorCounts[riskFactor];
  });

  const sortedData = Object.entries(factorAve)
    .sort((a, b) => b[1] - a[1])
    .map(([riskFactorName, avg]) => ({ assetName: riskFactorName, latitude: 0, longitude: 0, risk: Number(Number(avg*100).toFixed(0))}));
      
  
  useEffect(() => {
    fetchPageData(paginationModel.page);
  }, [paginationModel.page, paginationModel.pageSize]);

  const columns: GridColDef[] = [
    {
      field: 'assetName', headerName: 'Asset Name', width: 300,
      align: 'left',
      headerAlign: 'left',
      valueGetter: (params: GridValueGetterParams) => params.value,
        renderCell: (params: GridCellParams) => {
        const Name : String = String(params.value);
          return <Typography fontWeight={'medium'} color={'text'}>{Name}</Typography>
        }
    },
    {
      field: 'lat',
      headerName: 'Latitude',
      type: 'number',
      width: 150,
      align: 'left',
      sortable: false,
      headerAlign: 'left',
      valueGetter: (params: GridValueGetterParams) => params.value,
        renderCell: (params: GridCellParams) => {
        const lat : Number = Number(params.value);
          return <Typography fontWeight={'regular'} color={'text.secondary'}>{lat.toString()}</Typography>
        }
    },
    {
      field: 'long',
      headerName: 'Longitude',
      type: 'number',
      sortable: false,
      width: 150,
      align: 'left',
      headerAlign: 'left',
      valueGetter: (params: GridValueGetterParams) => params.value,
        renderCell: (params: GridCellParams) => {
        const long : Number = Number(params.value);
          return <Typography fontWeight={'regular'} color={'text.secondary'}>{long.toString()}</Typography>
        }
    },
    {
      field: 'businessCategory',
      headerName: 'Business Category',
      width: 240,
      align: 'left',
      headerAlign: 'left',
      valueGetter: (params: GridValueGetterParams) => params.value,
        renderCell: (params: GridCellParams) => {
        const Category : String = String(params.value);
          return <Typography fontWeight={'medium'} color={'text.secondary'}>{Category}</Typography>
        }
    },
    {
      field: 'year',
      headerName: 'Year',
      type: 'number',
      width: 200,
      align: 'left',
      headerAlign: 'left',
      valueGetter: (params: GridValueGetterParams) => params.value,
      renderCell: (params: GridCellParams) => {
      const year : String = String(params.value);
        return <Typography fontWeight={'medium'} color={'text.secondary'}>{year}</Typography>
      }
    },
    {
      field: 'riskRating',
      headerName: 'Risk Rating',
      type: 'number',
      width: 200,
      align: 'left',
      headerAlign: 'left',
      renderCell: (params: GridCellParams) => {
        const value: number = params.value as number;
        const formattedValue: string = `${(value*100).toFixed(0)}%`;
        
        return <div>
          <Typography fontWeight={'bold'} color={'text.secondary'} style={{ width: 50 }}>{formattedValue}
          </Typography>
          <BorderLinearProgress  variant="determinate" value={Number((Number(params.value)*100).toFixed(0))} />
          </div>
      }
    },
    
    ...riskColumns.map((factor) => ({
      field: factor,
      headerName: factor.includes('sealevelrise') ? 'Sea Level Rise' : factor.includes('extremeheat') ? 'Extreme Heat' : factor.includes('extremecold') ? 'Extreme Cold' : factor.charAt(0).toUpperCase() + factor.slice(1),
      width: 150,
      align: 'left',
      headerAlign: 'left',
      valueGetter: (params: GridValueGetterParams) => params.row.riskFactors[factor],
      renderCell: (params: GridCellParams) => {
        const value: number = params.value as number;
        const formattedValue: string = `${(value*100).toFixed(0)}%`;
        return <div>
          <Typography fontWeight={params.value ? 'bold' : 'medium'}
            fontSize={`${params.value ? '1rem' : '0.8rem'}`}
            color={params.value ? 'text.secondary' : '#FF6961'}
            align='center'
            style={{ width: 50 }}>
            <span style={{display: `${params.value ? '' : 'flex'}`}}>
            {params.value ? formattedValue : 'No Data'}
            </span>
          </Typography>
          <BorderLinearProgress sx={{display: `${params.value ? 'block' : 'none'}`}}  variant="determinate" value={Number((Number(params.value)*100).toFixed(0))} />
          </div>
      }
    })) as GridColDef[]
  ];

  const getRowId = (data: any) => data.number;

  return (
    <div style={{ height: '100%'}}>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '8%', marginBottom: '4%', flexWrap: 'wrap' }}>
        <Cards data={sortedData.splice(0, 3)} subheading='High Risk Factors' info='Data is aggregated for the given page' />
      </div>    
      <div style={{ background: '#242F39', marginLeft: '16px', marginRight: '16px', alignItems: 'center', height: '100%', width: '' }}>
        <StyledDataGrid
          getRowId={getRowId}
          rows={data.Data}
          columns={columns}
          rowCount={totalPages}
          pageSizeOptions={[50, 100]}
          paginationModel={paginationModel}
          paginationMode="server"
          onPaginationModelChange={setPaginationModel}
          loading={isLoading}
          components={{ Toolbar: CustomToolbar }}
          style={{ minWidth: '100%', minHeight: '60vh' }}
        />
      </div>
    </div>
  );
}
