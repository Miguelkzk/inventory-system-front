import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';

const GenericForm = ({ fields, onSubmit, initialValues }) => {
  const [formData, setFormData] = useState(
    fields.reduce((acc, field) => {
      acc[field.name] = initialValues[field.name] || '';
      return acc;
    }, {})
  );

  useEffect(() => {
    setFormData(
      fields.reduce((acc, field) => {
        acc[field.name] = initialValues[field.name] || '';
        return acc;
      }, {})
    );
  }, [initialValues, fields]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {fields.map((field) => (
        <div key={field.name} style={{ marginBottom: '10px', width: '100%', display: 'flex', justifyContent: 'center' }}>
          <label style={{ width: '80%' }}>
            {field.label}
            <input
              type={field.type}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              style={{ display: 'block', width: '100%', padding: '8px', margin: '5px 0' }}
            />
          </label>
        </div>
      ))}
      <div className='d-flex justify-content-center'>
        <Button type="submit"> Submit</Button>
      </div>
    </form>
  );
};

export default GenericForm;
