import { useState } from 'react';
import { useDiagram } from '../context/DiagramContext';

const Sidebar = () => {
    const { nodes, setNodes, edges, setEdges } = useDiagram();
    const [nodeLabel, setNodeLabel] = useState('');
    const [parentNodeId, setParentNodeId] = useState('');
    const [selectedNodeId, setSelectedNodeId] = useState('');
    const [editNodeLabel, setEditNodeLabel] = useState('');

    const [selectedEdgeId, setSelectedEdgeId] = useState('');
    const [editEdgeSource, setEditEdgeSource] = useState('');
    const [editEdgeTarget, setEditEdgeTarget] = useState('');

    const positionOffset = 100;
    const startingX = 100;
    const startingY = 100;

    const addNode = () => {
        const newNode = {
            id: `${Math.random()}`,
            data: { label: nodeLabel },
            position: { x: 0, y: 0 }
        };

        if (parentNodeId) {
            const parentNode = nodes.find(node => node.id === parentNodeId);
            if (parentNode) {
                // Count children of the parent node
                const children = nodes.filter(node =>
                    node.id !== parentNodeId &&
                    edges.some(edge => edge.source === parentNodeId && edge.target === node.id)
                );

                const childIndex = children.length - 1;
                newNode.position = {
                    x: parentNode.position.x + positionOffset * (childIndex + 1),
                    y: parentNode.position.y + positionOffset,
                };

                // Create edge to the new node
                const newEdge = {
                    id: `edge ` + parentNode.data.label + `-` + newNode.data.label,
                    source: parentNodeId,
                    target: newNode.id,
                    animated: true,
                };
                setEdges((prev) => [...prev, newEdge]);
            }
        } else {
            // If no parent, add as a root node
            newNode.position = {
                x: Math.random() * 400,
                y: Math.random() * 400
            };
        }

        setNodes((prev) => [...prev, newNode]);
        setNodeLabel('');
        setParentNodeId('');
    };

    const addEdge = () => {

        if (parentNodeId) {
            const parentNode = nodes.find(node => node.id === parentNodeId);
            const newEdge = {
                id: `e-` + parentNode.data.label + `-` + nodes[nodes.length - 1].data.label,
                source: parentNodeId,
                target: nodes[nodes.length - 1].id,
                animated: true,
            };
            setEdges((prevEdges) => [...prevEdges, newEdge]);
            setParentNodeId('');
        }
    };

    const editNode = () => {
        setNodes((prevNodes) =>
            prevNodes.map((node) =>
                node.id === selectedNodeId
                    ? { ...node, data: { ...node.data, label: editNodeLabel } }
                    : node
            )
        );
        setSelectedNodeId('');
        setEditNodeLabel('');
    };

    const deleteNode = () => {
        setNodes((prevNodes) => prevNodes.filter((node) => node.id !== selectedNodeId));
        setEdges((prevEdges) => prevEdges.filter((edge) => edge.source !== selectedNodeId && edge.target !== selectedNodeId));
        setSelectedNodeId('');
    };

    const editEdge = () => {
        setEdges((prevEdges) =>
            prevEdges.map((edge) =>
                edge.id === selectedEdgeId
                    ? { ...edge, source: editEdgeSource, target: editEdgeTarget }
                    : edge
            )
        );
        setSelectedEdgeId('');
        setEditEdgeSource('');
        setEditEdgeTarget('');
    };

    const deleteEdge = () => {
        setEdges((prevEdges) => prevEdges.filter((edge) => edge.id !== selectedEdgeId));
        setSelectedEdgeId('');
    };

    return (
        <div className="sidebar">
            <h3>Sidebar</h3>
            <h4>Add</h4>
            <input
                type="text"
                value={nodeLabel}
                onChange={(e) => setNodeLabel(e.target.value)}
                placeholder="Node label"
            />
            <select
                value={parentNodeId}
                onChange={(e) => setParentNodeId(e.target.value)}
            >
                <option value="">Select Parent Node</option>
                {nodes.map((node) => (
                    <option key={node.id} value={node.id}>
                        {node.data.label}
                    </option>
                ))}
            </select>
            <button onClick={addNode}>Add Node</button>
            <button onClick={addEdge}>Add Edge</button>

            <h4>Edit / Delete</h4>
            <select
                value={selectedNodeId}
                onChange={(e) => setSelectedNodeId(e.target.value)}>
                <option value="">Select Node to Edit</option>
                {nodes.map((node) => (
                    <option key={node.id} value={node.id}>
                        {node.data.label}
                    </option>
                ))}
            </select>

            {selectedNodeId && (
                <>
                    <input
                        type="text"
                        value={editNodeLabel}
                        onChange={(e) => setEditNodeLabel(e.target.value)}
                        placeholder="New Node Label"
                    />
                    <button onClick={editNode}>Edit Node</button>
                </>
            )}
            {selectedNodeId && (
                <button onClick={deleteNode} style={{ backgroundColor: 'red', color: 'white' }}>
                    Delete Node
                </button>
            )}

            <select
                value={selectedEdgeId}
                onChange={(e) => setSelectedEdgeId(e.target.value)}
            >
                <option value="">Select Edge to Edit</option>
                {edges.map((edge) => (
                    <option key={edge.id} value={edge.id}>
                        {edge.id}
                    </option>
                ))}
            </select>

            {selectedEdgeId && (
                <>
                    <select
                        value={editEdgeSource}
                        onChange={(e) => setEditEdgeSource(e.target.value)}
                    >
                        <option value="">Select New Source Node</option>
                        {nodes.map((node) => (
                            <option key={node.id} value={node.id}>
                                {node.data.label}
                            </option>
                        ))}
                    </select>

                    <select
                        value={editEdgeTarget}
                        onChange={(e) => setEditEdgeTarget(e.target.value)}
                    >
                        <option value="">Select New Target Node</option>
                        {nodes.map((node) => (
                            <option key={node.id} value={node.id}>
                                {node.data.label}
                            </option>
                        ))}
                    </select>

                    <button onClick={editEdge}>Edit Edge</button>
                </>
            )}

            {selectedEdgeId && (
                <button onClick={deleteEdge} style={{ backgroundColor: 'red', color: 'white' }}>
                    Delete Edge
                </button>
            )}

        </div>
    );
};

export default Sidebar;
