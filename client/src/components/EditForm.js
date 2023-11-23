import React, { useEffect, useState } from 'react';

function EditForm({ userId }) {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/dataforms`);
        const forms = await response.json();
        
        
        // Filter the form data based on user_id === userId
        const userFormData = forms.find((form) => form.user_id === userId);

        if (userFormData) {
          // Now, fetch the specific form data using its id
          const formId = userFormData.id;
          const formResponse = await fetch(`http://127.0.0.1:5000/dataforms/${formId}`);
          const formDataById = await formResponse.json();
          console.log(formDataById)

          setFormData(formDataById);
        } else {
          console.log('User does not have a form to edit.');
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleFormSubmit = async () => {
    try {
      // Check if the user has a form to edit
      if (formData.user_id === userId) {
        const formId = formData.id;
        const response = await fetch(`http://127.0.0.1:5000/dataforms/${formId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          console.log('Form data updated successfully!');
        } else {
          console.error('Error updating form data:', response.statusText);
        }
      } else {
        console.log('User does not have permission to update this form.');
      }
    } catch (error) {
      console.error('Error updating form data:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }


  return (
    <div>
      <h1>EditForm Page</h1>
      <form>
        <label>
          Region:
          <input
            type="text"
            value={formData.region || ''}
            onChange={(e) => handleInputChange('region', e.target.value)}
          />
        </label>
  
        <label>
          Hub Name:
          <input
            type="text"
            value={formData.hub_name || ''}
            onChange={(e) => handleInputChange('hub_name', e.target.value)}
          />
        </label>
  
        <label>
          Hub Code:
          <input
            type="text"
            value={formData.hub_code || ''}
            onChange={(e) => handleInputChange('hub_code', e.target.value)}
          />
        </label>
  
        <label>
          Address:
          <input
            type="text"
            value={formData.address || ''}
            onChange={(e) => handleInputChange('address', e.target.value)}
          />
        </label>
  
        <label>
          Ownership:
          <input
            type="text"
            value={formData.ownership || ''}
            onChange={(e) => handleInputChange('ownership', e.target.value)}
          />
        </label>
  
        <label>
          Floor Size:
          <input
            type="text"
            value={formData.floor_size || ''}
            onChange={(e) => handleInputChange('floor_size', e.target.value)}
          />
        </label>
  
        <label>
          Facilities:
          <input
            type="text"
            value={formData.facilities || ''}
            onChange={(e) => handleInputChange('facilities', e.target.value)}
          />
        </label>
  
        <label>
          Input Center:
          <input
            type="text"
            value={formData.input_center || ''}
            onChange={(e) => handleInputChange('input_center', e.target.value)}
          />
        </label>
  
        <label>
          GPRS Longitude:
          <input
            type="text"
            value={formData.gprs_longitude || ''}
            onChange={(e) => handleInputChange('gprs_longitude', e.target.value)}
          />
        </label>
  
        <label>
          GPRS Latitude:
          <input
            type="text"
            value={formData.gprs_latitude || ''}
            onChange={(e) => handleInputChange('gprs_latitude', e.target.value)}
          />
        </label>
  
        <label>
          ID Number:
          <input
            type="text"
            value={formData.id_number || ''}
            onChange={(e) => handleInputChange('id_number', e.target.value)}
          />
        </label>
  
        <label>
          Gender:
          <input
            type="text"
            value={formData.gender || ''}
            onChange={(e) => handleInputChange('gender', e.target.value)}
          />
        </label>
  
        <label>
          Date of Birth:
          <input
            type="text"
            value={formData.date_of_birth || ''}
            onChange={(e) => handleInputChange('date_of_birth', e.target.value)}
          />
        </label>
  
        <label>
          Phone Number:
          <input
            type="text"
            value={formData.phone_number || ''}
            onChange={(e) => handleInputChange('phone_number', e.target.value)}
          />
        </label>
  
        <label>
          First Name:
          <input
            type="text"
            value={formData.firstname || ''}
            onChange={(e) => handleInputChange('firstname', e.target.value)}
          />
        </label>
  
        <label>
          Last Name:
          <input
            type="text"
            value={formData.lastname || ''}
            onChange={(e) => handleInputChange('lastname', e.target.value)}
          />
        </label>
  
        <label>
          Email:
          <input
            type="text"
            value={formData.email || ''}
            onChange={(e) => handleInputChange('email', e.target.value)}
          />
        </label>
  
        <label>
          ID Number 2:
          <input
            type="text"
            value={formData.id_number2 || ''}
            onChange={(e) => handleInputChange('id_number2', e.target.value)}
          />
        </label>
  
        <label>
          Gender 2:
          <input
            type="text"
            value={formData.gender2 || ''}
            onChange={(e) => handleInputChange('gender2', e.target.value)}
          />
        </label>
  
        <label>
          Date of Birth 2:
          <input
            type="text"
            value={formData.date_of_birth2 || ''}
            onChange={(e) => handleInputChange('date_of_birth2', e.target.value)}
          />
        </label>
  
        <label>
          Phone Number 2:
          <input
            type="text"
            value={formData.phone_number2 || ''}
            onChange={(e) => handleInputChange('phone_number2', e.target.value)}
          />
        </label>
  
        <label>
          First Name 2:
          <input
            type="text"
            value={formData.firstname2 || ''}
            onChange={(e) => handleInputChange('firstname2', e.target.value)}
          />
        </label>
  
        <label>
          Last Name 2:
          <input
            type="text"
            value={formData.lastname2 || ''}
            onChange={(e) => handleInputChange('lastname2', e.target.value)}
          />
        </label>
  
        <label>
          Email 2:
          <input
            type="text"
            value={formData.email2 || ''}
            onChange={(e) => handleInputChange('email2', e.target.value)}
          />
        </label>
  
      </form>
  
      <button onClick={handleFormSubmit}>Save Changes</button>
    </div>
  );
  
}

export default EditForm;