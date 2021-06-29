import uuid from 'uuid/v4';
const workspace = [
    {
		category: "crumbs",
		type: "crumbs",
		id: "1",
		blocks: [
			{
				id: "1-1",
				position: {
					x: 500,
					y: 500
				},
                color: "red",
				category: "flow",
				type: "start",
                blockWidthLines: 3,
				defaultBlockHeightLines: 1,
                args: []
			},
			{
				id: "1-2",
				position: {
					x: 200,
					y: 500
				},
                color: "blue",
				category: "flow",
				type: "start",
                blockWidthLines: 3,
				defaultBlockHeightLines: 1,
                args: []
			},
			{
				id: "1-3",
				position: {
					x: 700,
					y: 500
				},
                color: "yellow",
				category: "flow",
				type: "start",
                blockWidthLines: 3,
				defaultBlockHeightLines: 1,
                args: []
			},
			{
				id: "1-4",
				position: {
					x: 1000,
					y: 500
				},
                color: "green",
				category: "flow",
				type: "start",
                blockWidthLines: 3,
				defaultBlockHeightLines: 1,
                args: []
			},
			{
				id: "1-5",
				position: {
					x: 500,
					y: 800
				},
                color: "orange",
				category: "flow",
				type: "start",
                blockWidthLines: 3,
				defaultBlockHeightLines: 1,
                args: []
			},
			{
				id: "1-6",
				position: {
					x: 800,
					y: 100
				},
                color: "pink",
				category: "flow",
				type: "start",
                blockWidthLines: 3,
				defaultBlockHeightLines: 1,
                args: []
			},
			{
				id: "1-7",
				position: {
					x: 100,
					y: 100
				},
                color: "teal",
				category: "flowClamp",
				type: "start",
                blockWidthLines: 4,
				defaultBlockHeightLines: 2,
                args: [],
				blocks: []
			},
			{
				id: "1-8",
				position: {
					x: 800,
					y: 800
				},
                color: "teal",
				category: "flowClamp",
				type: "start",
                blockWidthLines: 4,
				defaultBlockHeightLines: 2,
                args: [],
				blocks: []
			},
			{
				id: "1-9",
				position: {
					x: 200,
					y: 800
				},
                color: "teal",
				category: "flowClamp",
				type: "start",
                blockWidthLines: 4,
				defaultBlockHeightLines: 2,
                args: [],
				blocks: []
			},
			{
				id: "1-10",
				position: {
					x: 1100,
					y: 600
				},
                color: "green",
				category: "flow",
				type: "start",
                blockWidthLines: 3,
				defaultBlockHeightLines: 1,
                args: []
			},
			{
				id: "1-11",
				position: {
					x: 600,
					y: 900
				},
                color: "orange",
				category: "flow",
				type: "start",
                blockWidthLines: 3,
				defaultBlockHeightLines: 1,
                args: []
			},
			{
				id: "1-12",
				position: {
					x: 900,
					y: 200
				},
                color: "pink",
				category: "flow",
				type: "start",
                blockWidthLines: 3,
				defaultBlockHeightLines: 1,
                args: []
			},
			{
				id: "1-13",
				position: {
					x: 150,
					y: 150
				},
                color: "teal",
				category: "flowClamp",
				type: "start",
                blockWidthLines: 4,
				defaultBlockHeightLines: 2,
                args: [],
				blocks: []
			}
		]
	},
    {
        category: "clamp",
		type: "start",
		avatar: "Some avatar here",
        id: "2",
		position: {
			x: 200,
			y: 200
		},
		defaultBlockHeightLines: 3,
        blocks: []
    }
]

export default workspace;
