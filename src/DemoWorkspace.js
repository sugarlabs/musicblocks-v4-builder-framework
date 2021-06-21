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
                color: "green",
				category: "flow",
				type: "start",
                blockWidthLines: 3,
                args: []
			},
			{
				id: "1-2",
				position: {
					x: 700,
					y: 500
				},
                color: "pink",
				category: "flow",
				type: "start",
                blockWidthLines: 3,
                args: []
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
