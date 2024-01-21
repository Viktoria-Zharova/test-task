import React, { useState, useEffect } from 'react';
import './IdList.css'
const IdList: React.FC = () => {
    const [data, setData] = useState<any[]>([]);
    const [filteredData, setFilteredData] = useState<any[]>([]);
    const [filterValue, setFilterValue] = useState<string>('');

    useEffect(() => {
        // Загрузка данных из файла
        fetch('/example.json')
            .then(response => response.json())
            .then(data => {
                setData(data);
                setFilteredData(data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setFilterValue(value);

        // Фильтрация данных по введенному числу
        if (value.trim() === '') {
            setFilteredData(data);
        } else {
            const filtered = data.filter(item => item.job.job_id.toString().includes(value));
            setFilteredData(filtered);
        }
    };

    const resetFilter = () => {
        setFilterValue('');
        setFilteredData(data);
    };

    return (
        <div>
            <div>
                <input
                    type="number"
                    placeholder="Фильтр по идентификатору"
                    value={filterValue}
                    onChange={handleFilterChange}
                />
                <button onClick={resetFilter}>Сбросить фильтр</button>
            </div>
            <ul>
                {filteredData.map(item => (
                    <li key={item.id}>{item.job.job_id}</li>
                ))}
            </ul>
        </div>
    );
};

export default IdList;