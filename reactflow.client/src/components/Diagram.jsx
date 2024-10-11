import { useCallback } from 'react';
import ReactFlow, { Controls } from 'react-flow-renderer';
import { useDiagram } from '../context/DiagramContext';

const Diagram = () => {
    const { nodes, setNodes, edges } = useDiagram();

    const onNodesChange = useCallback(
        (changes) => {
            setNodes((nds) => nds.map((node) => {
                const change = changes.find((c) => c.id === node.id);
                return change ? { ...node, position: change.position || node.position } : node;
            }));
        },
        [setNodes]
    );

    const onNodeDragStop = useCallback((event, node) => {
        setNodes((nds) =>
            nds.map((n) => (n.id === node.id ? { ...n, position: node.position } : n))
        );
    }, [setNodes]);


    return (
        <div style={{ height: '100vh', width: '100%' }}>
            <ReactFlow nodes={nodes} edges={edges} style={{ background: '#f0f0f0' }}
                onNodesChange={onNodesChange}
                onNodeDragStop={onNodeDragStop}
                fitView>
                <Controls />
            </ReactFlow>
        </div>
    );
};

export default Diagram;
