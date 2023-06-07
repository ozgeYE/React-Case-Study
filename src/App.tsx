import React, {useCallback, useEffect, useState} from 'react';
import './App.css';
import Grid from "./components/Grid";
import dataList from './data.json';

const ONE_DAY = 24 * 60 * 60 * 1000;

export interface User {
    name: string,
    mailReceivedDate: string,
    solutionSentDate: string,
    isBackgroundColorRed?: boolean;
}

export default function App() {
    let sourceProp = dataList;
    const [data, setData] = useState<User[]>([]);
    const [today, setToday] = useState('');
    const [count, setCount] = useState(0);
    const [limit, setLimit] = useState('');

    const readTable = useCallback(async () => {
        // don't send again while we are sending
        const tBody = document.getElementsByTagName('tbody')[0];
        const tableRow = tBody.getElementsByTagName('tr');
        const items = [];

        for (var t = 0; t < tableRow.length; t++) {
            const item = tableRow[t].innerText.split('\t');
            const itemObject: User = {
                name: item[0],
                mailReceivedDate: item[1],
                solutionSentDate: item[2],
                isBackgroundColorRed: tableRow[t].attributes.length > 0
            }
            items.push(itemObject);
        }

        setData(items);
    }, [])

    useEffect(() => {
        control(new Date(today), +limit);
    }, [data])

    const control = (today: Date, limit: number) => {
        data.forEach((item: User) => {

            const diffDayTimestamp = (new Date(today).getTime() - limit*ONE_DAY)- new Date(item.mailReceivedDate).getTime();
            if((diffDayTimestamp/ONE_DAY) > 5 && !item.isBackgroundColorRed) {
                setCount(count => count+1);
            }
        });
    }

    return (
        <div>
            <h1>Dgpays Case Study </h1>
            <Grid source={sourceProp}></Grid>
            <hr/>
            <input placeholder="enter date yyyy-MM-dd" value={today}  onChange={e => setToday(e.target.value)}/>
            <input placeholder="enter limit" value={limit} onChange={e => setLimit(e.target.value)} type="number"/>
            <button onClick={() => readTable()}>Check Table</button>
            <p>Wrong Table Row Count {count}</p>
            <hr/>
        </div>
    );
}
