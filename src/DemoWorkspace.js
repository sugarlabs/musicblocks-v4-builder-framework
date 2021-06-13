import uuid from 'uuid/v4';
export const workspace = [
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
				type: "forward",
                args: []
			}
		]
	}
]