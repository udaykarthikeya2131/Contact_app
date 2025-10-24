const { useState, useEffect } = React;

function App() {
  const [contacts, setContacts] = useState([]);
  const [query, setQuery] = useState('');
  const [filtered, setFiltered] = useState([]);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({ name: '', mail: '', contact_num: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchAll();
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setFiltered(contacts);
      setSelected(null);
      setMessage('');
    }
  }, [contacts]);

  function fetchAll() {
    fetch('/api/contacts')
      .then(r => r.json())
      .then(data => {
        setContacts(data);
        setFiltered(data);
      });
  }

  function searchApi(q) {
    const trimmed = (q || '').trim();
    if (!trimmed) {
      setFiltered(contacts);
      setSelected(null);
      setMessage('');
      return;
    }
    fetch('/api/contacts?search=' + encodeURIComponent(trimmed))
      .then(r => r.json())
      .then(data => {
        setFiltered(data);
        if (data.length === 0) {
          setSelected(null);
          setMessage('No contact found');
        } else {
          setMessage('');
          const exact = data.find(c => c.name.toLowerCase() === trimmed.toLowerCase());
          if (exact) {
            setSelected(exact);
          } else if (data.length === 1) {
            setSelected(data[0]);
          } else {
            setSelected(null);
          }
        }
      });
  }

  function onSearchChange(e) {
    const v = e.target.value;
    setQuery(v);
    searchApi(v);
  }

  function onItemClick(c) {
    setSelected(c);
    setQuery(c.name);
    setFiltered([c]);
    setMessage('');
  }

  function onFormChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function addContact(e) {
    e.preventDefault();
    const { name, mail, contact_num } = form;
    if (!name.trim() || !mail.trim() || !contact_num.trim()) {
      alert('Please fill all fields');
      return;
    }
    fetch('/api/contacts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name.trim(), mail: mail.trim(), contact_num: contact_num.trim() })
    })
    .then(async res => {
      if (!res.ok) {
        const err = await res.json().catch(()=>({error:'Unknown'}));
        throw new Error(err.error || 'Failed to add');
      }
      return res.json();
    })
    .then(newContact => {
      setContacts(prev => [...prev, newContact]);
      if (!query.trim()) {
        setFiltered(prev => [...prev, newContact]);
      } else {
        if (newContact.name.toLowerCase().includes(query.toLowerCase())) {
          searchApi(query);
        }
      }
      setForm({ name: '', mail: '', contact_num: '' });
      setMessage('Contact added');
      setTimeout(()=>setMessage(''), 2000);
    })
    .catch(err => {
      alert('Error: ' + err.message);
    });
  }

  return (
    <div className="container">
      <div className="header">
        <h1>Contact List</h1>
        <div className="search" style={{maxWidth:400}}>
          <input placeholder="Search by name..." value={query} onChange={onSearchChange} />
        </div>
      </div>

      <div className="layout">
        <div className="card">
          <h3 className="small">Contacts</h3>
          <div className="list" role="list">
            {filtered.length === 0 ? (
              <div className="no-found">No contact found</div>
            ) : filtered.map(c => (
              <div
                key={c.id}
                role="listitem"
                className={'item' + (selected && selected.id === c.id ? ' selected' : '')}
                onClick={() => onItemClick(c)}
              >
                <div>{c.name}</div>
              </div>
            ))}
          </div>

          <div className="footer">
            <div>{message}</div>
          </div>
        </div>

        <div className="card details">
          {selected ? (
            <>
              <h2>{selected.name}</h2>
              <p className="small"><strong>Phone:</strong> {selected.contact_num}</p>
              <p className="small"><strong>Email:</strong> {selected.mail}</p>
              <p className="small"><strong>ID:</strong> {selected.id}</p>
            </>
          ) : (
            <>
              <h2>Contact Details</h2>
              <p className="small">Select a contact from the list or search to view details.</p>
            </>
          )}

          <hr style={{margin:'12px 0'}} />

          <h3>Add New Contact</h3>
          <form onSubmit={addContact}>
            <div className="form-row">
              <input name="name" placeholder="Name" value={form.name} onChange={onFormChange} />
              <input name="mail" placeholder="Email" value={form.mail} onChange={onFormChange} />
            </div>
            <div className="form-row">
              <input name="contact_num" placeholder="Contact Number" value={form.contact_num} onChange={onFormChange} />
              <button type="submit" className="button">Add</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
