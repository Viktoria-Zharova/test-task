import React, { useState, useEffect, ChangeEvent } from 'react';
import './IdList.css';

//интерфейс (модель структуры данных с файла)
interface JobData {
    id: string;
    job: {
        job_id: number;
        url: string;
    };
    title: string;
}

//состояния для хранения загруженных данных, данных после фильтрации, значений для фильтра
const IdList: React.FC = () => {
    const [data, setData] = useState<JobData[]>([]);
    const [filteredData, setFilteredData] = useState<JobData[]>([]);
    const [filterValue, setFilterValue] = useState<string>('');

    useEffect(() => {
        // загрузка данных с файла
        fetch('/example.json')
            .then(response => response.json())
            .then((jsonData: JobData[]) => {
                setData(jsonData);
                setFilteredData(jsonData);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    //обработчик изменения фильтра
    const handleFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setFilterValue(value);

        // фильтрация данных по введенному числу
        if (value.trim() === '') {
            setFilteredData(data);
        } else {
            const filtered = data.filter(item => item.job.job_id.toString().includes(value));
            setFilteredData(filtered);
        }
    };

    //сброс фильтра
    const resetFilter = () => {
        setFilterValue('');
        setFilteredData(data);
    };

    //рендер компонента
    return (
        <div>
            <div>
                <input
                    type="number"
                    placeholder="Enter Id"
                    value={filterValue}
                    onChange={handleFilterChange}
                />
                <button onClick={resetFilter}>Reset filter</button>
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