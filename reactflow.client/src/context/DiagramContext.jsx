import { createContext, useContext, useState } from 'react';

const DiagramContext = createContext();

export const useDiagram = () => useContext(DiagramContext);

export const DiagramProvider = ({ children }) => {
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);

    return (
        <DiagramContext.Provider value={{ nodes, setNodes, edges, setEdges }}>
            {children}
        </DiagramContext.Provider>
    );
};
