import { useEffect, useMemo, useState } from "react";
import MY_APP_BASE_URL from '../../../config';
import { ResponseData } from "@/app/api/riskdata/route";
import Cards from "../cards";

const TopRiskCategories = () => {
    interface SortData {
        assetName: string;
        latitude: number;
        longitude: number;
        risk: number;
    }
      
    const [unfilteredData, setUnfilteredData] = useState<ResponseData>();
    const [loading, setLoading] = useState(false);
    const [sortedDataFiltered, setSortedDataFiltered] = useState<SortData[]>([]);
    const [error, setError] = useState(false);

    const fetchPageDataAll = async () => {
    try {
        setLoading(true);
        const res = await fetch(`${MY_APP_BASE_URL}/api/riskdata?page=1&pagesize=2000`);
        const items: ResponseData = await res.json();
        setUnfilteredData(items);
        setLoading(false);
    } catch (error) {
        console.log(error);
        setError(true);
    }
    };

    useEffect(() => {
    fetchPageDataAll();
    }, []);

    useEffect(() => {
    if (unfilteredData && unfilteredData.Data && unfilteredData.Data.length > 0) {
        const groupedUnfilteredData: { [key: string]: { riskSum: number, count: number, lat: number, long: number, businessCategory: string, year: number } } = {};
        unfilteredData?.Data?.forEach(item => {
        if (!item) {
            return;
        }

        if (!groupedUnfilteredData[item.businessCategory]) {
            groupedUnfilteredData[item.businessCategory] = {
            riskSum: 0,
            lat: item.lat,
            long: item.long,
            businessCategory: item.businessCategory,
            year: item.year,
            count: 0
            };
        }

        groupedUnfilteredData[item.businessCategory].riskSum += item.riskRating;
        groupedUnfilteredData[item.businessCategory].count++;
        });

        const aggregatedUnfilteredData = Object.keys(groupedUnfilteredData).map(item => ({
        name: item,
        riskRating: ((groupedUnfilteredData[item].riskSum / groupedUnfilteredData[item].count) * 100),
        businessCategory: groupedUnfilteredData[item].businessCategory,
        year: groupedUnfilteredData[item].year,
        }));

        const sortedTopThree = aggregatedUnfilteredData?.sort((a, b) => Number(b.riskRating) - Number(a.riskRating))
        .splice(0, 3)
        .map(({ businessCategory, riskRating, year, name }) => ({ assetName: businessCategory, latitude: 0, longitude: 0, risk: riskRating }));

        setSortedDataFiltered(sortedTopThree);
    }
    }, [unfilteredData]);

    if (loading || error) {
    return (
        <div>
        {loading ? <div>Loading...</div> : <div>Error loading data</div>}
        </div>
    );
    }

    return (
    <div>
        <Cards data={sortedDataFiltered} subheading={'High Risk Business Categoires'} info={'Data is aggregated from 2000 random entries'} />
    </div>
    );

};
export default TopRiskCategories;
