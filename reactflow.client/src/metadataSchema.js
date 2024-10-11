const metadataSchema = {
    nodes: [
        {
            id: "1",
            type: "default",
            data: { label: "Node 1" },
            position: { x: 250, y: 5 }
        }
    ],
    edges: [
        {
            id: "e1-2",
            source: "1",
            target: "2",
            animated: true
        }
    ]
};

export default metadataSchema;
