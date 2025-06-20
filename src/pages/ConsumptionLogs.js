import React, { useEffect, useState } from 'react';
import { GraphQLAPI, graphqlOperation } from '@aws-amplify/api-graphql';
import { listConsumptionLogs } from '../graphql/queries';

const ConsumptionLogs = () => {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const result = await GraphQLAPI.graphql(graphqlOperation(listConsumptionLogs));
                setLogs(result.data.listConsumptionLogs.items);
            } catch (error) {
                console.error("Error fetching consumption logs:", error);
            }
        };

        fetchLogs();
    }, []);

    return (
        <div style={{ padding: 20 }}>
            <h2>Consumption Logs</h2>
            {logs.length === 0 ? (
                <p>No logs yet.</p>
            ) : (
                <ul>
                    {logs.map(log => (
                        <li key={log.id}>
                            ✅ {log.item?.name || "Unknown item"} — {log.amount ?? '1'} used by {log.consumedBy || 'Anonymous'} on {log.date ? new Date(log.date).toLocaleDateString() : 'Unknown date'}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ConsumptionLogs;
