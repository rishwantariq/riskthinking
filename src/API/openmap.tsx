import axios from 'axios';
import nominatim  from 'nominatim-client';

export const reverseGeoCode = async (lat: number, lon: number): Promise<string> => {
    try {
        const client = nominatim.createClient({
            useragent: "MyApp",             // The name of your application
            referer: 'http://example.com',  // The referer link
          });
          
        const { address } = await client.reverse({ lat, lon: lon });
        const country = address.country;
        console.log(country);
        return country;
    }
    catch (error) {
        return 'Unknown';
    }

}
