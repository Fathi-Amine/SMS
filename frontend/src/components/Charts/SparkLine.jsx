import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';

const salesData = [
    {
        name: 'Jan',
        revenue: 4000,
        profit: 2400,
    },
    {
        name: 'Feb',
        revenue: 3000,
        profit: 1398,
    },
    {
        name: 'Mar',
        revenue: 9800,
        profit: 2000,
    },
    {
        name: 'Apr',
        revenue: 3908,
        profit: 2780,
    },
    {
        name: 'May',
        revenue: 4800,
        profit: 1890,
    },
    {
        name: 'Jun',
        revenue: 3800,
        profit: 2390,
    },
];

// eslint-disable-next-line react/prop-types
const SparkLine = ({data, color}) => {
   /* console.log(width, type, data, id, height, color, currentColor)*/
    return (
        <ResponsiveContainer width={"100%"} height={"100%"}>
            <LineChart
                width={"250px"}
                height={"80px"}
                data={data}
            >
                {/*<CartesianGrid strokeDasharray="3 3" />*/}
                {/*<XAxis dataKey="x" />
                <YAxis dataKey="y"/>*/}
                <Tooltip content={<CustomTooltip />} />
                {/*<Legend />*/}
                <Line type="monotone" dataKey="y" stroke={color} activeDot={{ r:8}} />
                {/*<Line type="monotone" dataKey="y" stroke="#8b5cf6" />*/}
            </LineChart>
        </ResponsiveContainer>
    );
};


export default SparkLine;

const CustomTooltip = ({ active, payload, label }) => {
    console.log(active, payload, label)
    if (active && payload && payload.length) {
        return (
            <div className="p-4 bg-slate-900 flex flex-col gap-4 rounded-md">
                <p className="text-medium text-lg text-white">{label}</p>
                <p className="text-sm text-blue-400">
                    Revenue:
                    {/* eslint-disable-next-line react/prop-types */}
                    <span className="ml-2">${payload[0].value}</span>
                </p>
                {/*<p className="text-sm text-indigo-400">
                    Profit:
                     eslint-disable-next-line react/prop-types
                    <span className="ml-2">${payload[1].value}</span>
                </p>*/}
            </div>
        );
    }
};
