import React from 'react';
import IdList from './components/IdList/IdList.tsx';
import './App.css'
const App: React.FC = () => {
    return (
        <div>
            <h1>Id List</h1>
            <IdList />
        </div>
    );
};

export default App;