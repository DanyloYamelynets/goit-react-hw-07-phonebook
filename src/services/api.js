import axios from 'axios';

axios.defaults.baseURL = 'https://64c234deeb7fd5d6ebcf6bdf.mockapi.io';

export const getAllContacts = async () => {
  const { data } = await axios('/contacts');
  return data;
};
export const addContact = async contact => {
  const { data } = await axios.post('/contacts', contact);
  return data;
};
export const deleteContact = async id => {
  const { data } = await axios.delete(`/contacts/${id}`);
  return data;
};
