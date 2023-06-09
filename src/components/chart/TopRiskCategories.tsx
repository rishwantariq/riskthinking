import { useEffect, useMemo, useState } from "react";
import MY_APP_BASE_URL from '../../../config';
import { ResponseData } from "@/app/api/riskdata/route";
import Cards from "../interactive-items/Cards";

export interface SortData {
    assetName: string;
    latitude: number;
    longitude: number;
    risk: number;
}

const TopRiskCategories = () => {
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

    useMemo(() => {

        if (unfilteredData && unfilteredData.Data && unfilteredData.Data.length > 0) {
            const groupedUnfilteredData: { [key: string]: { riskSum: number, count: number, lat: number, long: number, businessCategory: string, year: number } } = {};
            unfilteredData?.Data?.reduce((acc, item) => {
                if (!item) {
                    console.log(item);
                    return acc;
                }

                if (!acc[item.businessCategory]) {
                    acc[item.businessCategory] = {
                        riskSum: 0,
                        lat: item.lat,
                        long: item.long,
                        businessCategory: item.businessCategory,
                        year: item.year,
                        count: 0
                    };
                }

                acc[item.businessCategory].riskSum += item.riskRating;
                acc[item.businessCategory].count++;

                return acc;
            }, groupedUnfilteredData);


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

    return (
        <div>
            <Cards data={sortedDataFiltered} subheading={'High Risk Business Categoires'} info={'Data is aggregated from 2000 random entries'} />
        </div>
    );

};
export default TopRiskCategories;
