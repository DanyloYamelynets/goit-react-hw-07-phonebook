import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './Contacts/ContactList';
import { nanoid } from 'nanoid';
import {
  Container,
  PhonebookTitle,
  ContactsTitle,
} from './Container/ContainerStyled';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from 'redux/contactsSlice';
import {
  addContactThunk,
  deleteContactThunk,
  fetchContactsThunk,
} from 'redux/operations';
import { useEffect } from 'react';
import Loader from './Loader/Loader';
import {
  selectContacts,
  selectError,
  selectFilter,
  selectFilteredContacts,
  selectIsLoading,
} from 'redux/selectors';

export default function App() {
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContactsThunk());
  }, [dispatch]);

  const onAddContact = contactData => {
    const { name } = contactData;
    const checkName = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (checkName) {
      alert(`${name} is already in contacts.`);
    } else {
      const contact = {
        id: nanoid(),
        ...contactData,
      };
      dispatch(addContactThunk(contact));
    }
  };
  const onFilter = filterContacts => {
    dispatch(setFilter(filterContacts));
  };
  const onDeleteContact = contactId => {
    dispatch(deleteContactThunk(contactId));
  };

  const filteredContacts = useSelector(selectFilteredContacts);

  return (
    <Container>
      <PhonebookTitle>Phonebook</PhonebookTitle>
      <ContactForm onAddContact={onAddContact} />
      <ContactsTitle>Contacts</ContactsTitle>
      {isLoading && <Loader />}
      {error && <div>Error: {error}</div>}
      <Filter
        filter={filter}
        onFilter={onFilter}
        title="Find contacts by name"
      />
      <ContactList
        contacts={filteredContacts}
        onDeleteContact={onDeleteContact}
      />
    </Container>
  );
}
