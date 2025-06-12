import React, { useEffect, useState } from "react";
import { listPantryItems } from '../graphql/queries';
import { GraphQLAPI, graphqlOperation } from '@aws-amplify/api-graphql';
import PantryItemCard from "../components/PantryItemCard";

const Pantry = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchItems = async () => {
            const result = await GraphQLAPI.graphql(graphqlOperation(listPantryItems));
            ;
            setItems(result.data.listPantryItems.items);
        };
        fetchItems();
    }, []);

    return (
        <div>
            <h2>Pantry Inventory</h2>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
                {items.map(item => <PantryItemCard key={item.id} item={item} />)}
            </div>
        </div>
    );
};

export default Pantry;
