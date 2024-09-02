import { Bar, BarChart, CartesianGrid, Cell, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
// eslint-disable-next-line import/extensions
import { isArrayEmpty, randomSetOfColors } from '../../../util/functions';

interface IRentBarChartPropsModel {
	config: { name: string }[];
	width?: string;
	height?: string;
	backgroundColor?: string;
	activeLegend: boolean;
	opacity: number;
}

const RentBarChart = ({
	config,
	width = '100%',
	height = '400px',
	backgroundColor = 'transparent',
	activeLegend = true,
	opacity = 0.85,
}: IRentBarChartPropsModel) => {
	const colors = randomSetOfColors(config?.length);

	return (
		<div className='bar-chart-wrapper' style={{ width: width, height: height, backgroundColor: backgroundColor }}>
			{!isArrayEmpty(config) ? (
				<ResponsiveContainer>
					<BarChart data={config}>
						<XAxis dataKey='name' tickLine={false} axisLine={false} tick={false} />
						<YAxis yAxisId='a' tickLine={false} axisLine={false} />
						{activeLegend && <Legend />}
						<Tooltip cursor={false} />
						<Legend
							payload={config.map((item, index) => ({
								id: item.name,
								type: 'square',
								value: item.name,
								color: colors[index],
							}))}
						/>
						<CartesianGrid vertical={false} />
						<Bar yAxisId='a' dataKey='Category' opacity={opacity}>
							{config.map((_, index) => (
								<Cell key={`cell-${index}`} fill={colors[index]} />
							))}
						</Bar>
					</BarChart>
				</ResponsiveContainer>
			) : (
				<div className='flex items-center justify-center h-full'>no data</div>
			)}
		</div>
	);
};

export default RentBarChart;
