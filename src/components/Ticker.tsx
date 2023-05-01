import { Typography } from "@mui/material";
import React, { useState } from "react";
import { HorizontalTicker,  VerticalTicker} from "react-infinite-ticker";

const boxes = [
  {
    id: 0,
    heading1: "Next.js",
    heading2: "Next.js 13 Beta",
    backgroundColor: "black",
    image: 'https://d2nir1j4sou8ez.cloudfront.net/wp-content/uploads/2021/12/nextjs-boilerplate-logo.png'

  },
  {
    id: 1,
    heading1: "Netlify",
    heading2: "Netlify",
    backgroundColor: "black",
    image: 'https://imgtr.ee/images/2023/04/25/8rT5i.png'


  },
  {
    id: 3,
    heading1: "Highcharts",
    heading2: "Highcharts",
    backgroundColor: "black",
    image: 'https://imgtr.ee/images/2023/04/25/8rm8n.png'

  },
  {
    id: 4,
    heading1: "Material UI",
    heading2: "Material UI",
    backgroundColor: "black",
    image: 'https://imgtr.ee/images/2023/04/25/8rY3r.png'
  },

];

function Ticker() {
  const [duration, setDuration] = useState(11000);
  const [delay, setDelay] = useState(2000);
  const [easing, setEasing] = useState("linear");
  const [reverse, setReverse] = useState(false);

  return (
    <div>
    
  </div>
    
  );
}

export default Ticker;