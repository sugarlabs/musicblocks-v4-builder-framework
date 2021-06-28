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
        blocks: []
    }
]

export default workspace;
