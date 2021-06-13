import uuid from 'uuid/v4';
const workspace = [
    {
		category: "crumbs",
		type: "crumbs",
		id: uuid(),
		blocks: [
			{
				id: uuid(),
				position: {
					x: 500,
					y: 500
				},
                color: "green",
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
        id: uuid(),
		position: {
			x: 200,
			y: 200
		},
        blocks: []
    }
]

export default workspace;
