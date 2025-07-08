"use client";

import Box from "@mui/material/Box";
import {DetailTitle} from "@/components/DetailTitle";
import {DetailInfo} from "@/components/DetailInfo";
import {ChartContainer} from "@/components/ChartContainer";
import {CodeContainer} from "@/components/CodeContainer"
import DetailTypes from "@/types/types";

export const DetailsLayout = ({title, info, chart, code}: DetailTypes) => {

return (
    <Box sx={{ width: "100%", position: "relative" }}>
        <DetailTitle title={title} />
        <DetailInfo info={info} />
        <ChartContainer chart={chart} />
        <CodeContainer code={code} />
    </Box>
);

}
