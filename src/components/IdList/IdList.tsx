import React, { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
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

    //загрузка данных
    useEffect(() => {
        // загрузка данных с джейсонки
        axios.get<JobData[]>('/example.json') //запрос
            .then(response => {
                setData(response.data); // запись данных в состояние
                setFilteredData(response.data); //инициализация фильтрованных данных
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    //обработчик изменений в поле фильтрации
    const handleFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value; //получение значения
        setFilterValue(value); //обновление состояния фильтра

        // фильтрация данных по айди
        if (value.trim() === '') {
            setFilteredData(data); //отображение всез данных при пустом фильтре
        } else {
            const filtered = data.filter(item => item.job.job_id.toString().includes(value));
            setFilteredData(filtered); //обновление состояния
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
                <button onClick={resetFilter}>Reset Filter</button>
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
