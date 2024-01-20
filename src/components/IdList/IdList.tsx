import React, { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import 'IdList.css';


interface JobData {
    id: string;
    job: {
        job_id: number;
        url: string;
    };
    title: string;
}

const IdList: React.FC = () => {
    const [data, setData] = useState<JobData[]>([]);
    const [filteredData, setFilteredData] = useState<JobData[]>([]);
    const [filterValue, setFilterValue] = useState<string>('');

    useEffect(() => {
        // Загрузка данных из example.json
        axios.get<JobData[]>('/example.json')
            .then(response => {
                setData(response.data);
                setFilteredData(response.data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setFilterValue(value);

        // фильтрация данных по айди
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
