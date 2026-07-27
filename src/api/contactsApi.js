import api from './contact-service';

export const getContacts = async () => {
  const { data } = await api.get('/');
  return data;
};

export const addContact = async (contact) => {
  const { data } = await api.post('/', contact);
  return data;
};

export const updateContact = async (contact) => {
  const { data } = await api.put(`/${contact.id}`, contact);
  return data;
};

export const deleteContact = async (id) => {
  await api.delete(`/${id}`);
  return id;
};
