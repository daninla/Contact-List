export const saveToLocalStorage = (contacts) => {
  localStorage.setItem('contacts', JSON.stringify(contacts));
};
