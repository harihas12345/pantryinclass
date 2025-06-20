import React, { useState } from 'react';
import { createPantryItem } from '../graphql/mutations';
import { StorageManager } from '@aws-amplify/ui-react-storage';
import { GraphQLAPI, graphqlOperation } from '@aws-amplify/api-graphql';


const AddItemForm = () => {
  const [formData, setFormData] = useState({ name: '', quantity: 1, category: '', image: null });

  const handleSubmit = async (e) => {
    e.preventDefault();
    let imageUrl = null;

    if (formData.image) {
      const { name } = formData.image;
      await Storage.put(name, formData.image);
      imageUrl = await Storage.get(name);
    }

    await GraphQLAPI.graphql(graphqlOperation(createPantryItem, {
      input: {
        name: formData.name,
        quantity: parseInt(formData.quantity),
        category: formData.category,

      }
    }));

    setFormData({ name: '', quantity: 1, category: '', image: null });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Item Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
      <input type="number" value={formData.quantity} onChange={(e) => setFormData({ ...formData, quantity: e.target.value })} required />
      <input type="text" placeholder="Category" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} />
      <input type="file" onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })} />
      <button type="submit">Add Item</button>
    </form>
  );
};

export default AddItemForm;
