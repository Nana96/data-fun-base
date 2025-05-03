"use client";

import Box from "@mui/material/Box";
import {DetailTitle} from "@/components/DetailTitle";
import {ChartContainer} from "@/components/ChartContainer";
import {CodeContainer} from "@/components/CodeContainer"
import DetailTypes from "@/types/types";

export const DetailsLayout = ({title, chart, code}: DetailTypes) => {

return (
    <Box>
        <DetailTitle title={title} />
        <ChartContainer chart={chart} />
        <CodeContainer code={code} />
    </Box>
);

}
