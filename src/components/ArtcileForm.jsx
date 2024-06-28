import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const ArtcileForm = ({ attributes, onSubmit, initialValues }) => {
  const [fields, setFields] = useState([]);
  const [formData, setFormData] = useState({});
  const { t } = useTranslation();

  const setFormFields = () => {
    const newFields = attributes.map((attribute) => {
      const field = {
        name: attribute.name,
        type: '',
        label: t(attribute.name),
        options: [],
      };

      if (attribute.type === 'integer' || attribute.type === 'decimal') {
        field.type = 'number';
      } else if (attribute.type === 'string') {
        field.type = 'text';
      } else if (attribute.type === 'enum') {
        field.type = 'select';
        let keys = Object.keys(attribute.enum_values);
        for (let i = 0; i < keys.length; i++) {
          let key = keys[i];
          const enumValue = {
            value: key,
            label: t(key),
          };
          field.options.push(enumValue);
        }
      }

      return field;
    });

    setFields(newFields);
  };

  useEffect(() => {
    setFormFields();
  }, [attributes]);

  useEffect(() => {
    const initialFormData = fields.reduce((acc, field) => {
      acc[field.name] = initialValues[field.name] || '';
      return acc;
    }, {});
    setFormData(initialFormData);
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
    <Form onSubmit={handleSubmit}>
      {fields.map((field) => (
        <div key={field.name} style={{ marginBottom: '10px', width: '100%', display: 'flex', justifyContent: 'center' }}>
          <label style={{ width: '80%' }}>
            {field.label}
            {field.type === 'select' ? (
              <select
                name={field.name}
                value={formData[field.name] || ''}
                onChange={handleChange}
                style={{ display: 'block', width: '100%', padding: '8px', margin: '5px 0' }}
              >
                {field.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name] || ''}
                onChange={handleChange}
                style={{ display: 'block', width: '100%', padding: '8px', margin: '5px 0' }}
              />
            )}
          </label>
        </div>
      ))}
    </Form>
  );
};

export default ArtcileForm;
