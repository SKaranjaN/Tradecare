import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../../src/styles/forms.css';

function Forms({ userId }) {
  const [user_id, setUser_id] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [ownership, setOwnership] = useState('');
  const [input, setInput] = useState('');
  const [buildingType, setBuildingType] = useState('');

  const dateInputRef = useRef(null);

  
  console.log(`Form after fetch ${userId}`)
  const handleChange = (e) => {
    // Handle changes as needed
  };

  const handleOwnershipChange = (e) => {
    setOwnership(e.target.value);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleBuildingTypeChange = (e) => {
    setBuildingType(e.target.value);
  };

  const handleDateOfBirthChange = (e) => {
    setDateOfBirth(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const selectedFacilities = [
      e.target.charcoal_cooler.checked && 'Charcoal Cooler',
      e.target.hand_washing_facility.checked && 'Hand Washing Facility',
      e.target.washrooms.checked && 'Washrooms',
      e.target.others.checked && 'Others',
    ].filter(Boolean);

    const facilitiesString = selectedFacilities.join(', ');

    const formData = {
      region: e.target.region.value,
      hub_name: e.target.hub_name.value,
      hub_code: e.target.hub_code.value,
      address: e.target.address.value,
      year_established: e.target.year_established.value,
      ownership: ownership,
      floor_size: e.target.floor_size.value,
      facilities: facilitiesString,
      input_center: input,
      type_of_building: buildingType,
      gprs_longitude: e.target.gprs_longitude.value,
      gprs_latitude: e.target.gprs_latitude.value,
      firstname: e.target.firstname.value,
      lastname: e.target.lastname.value,
      id_number: e.target.id_number.value,
      gender: e.target.gender.value,
      date_of_birth: e.target.date_of_birth.value,
      email: e.target.email.value,
      phone_number: e.target.phone_number.value,
      lastname2: e.target.lastname2.value,
      firstname2: e.target.firstname2.value,
      id_number2: e.target.id_number2.value,
      gender2: e.target.gender2.value,
      date_of_birth2: e.target.date_of_birth2.value,
      email2: e.target.email2.value,
      phone_number2: e.target.phone_number2.value,
      user_id: userId,
    };

    console.log('Form Data:', formData);

    fetch('http://127.0.0.1:5000/dataforms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };


  return (
    <div className="forms">
      <h2>Forms</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-pair">
          <label>Region</label>
          <input type="text" name="region" onChange={handleChange} required />
          <br />
          <label>HUB name</label>
          <input type="text" name="hub_name" onChange={handleChange} required />
          <br />
          <label>HUB code</label>
          <input type="text" name="hub_code" onChange={handleChange} required />
          <br />
          <label>Address</label>
          <input type="text" name="address" onChange={handleChange} required />
          <br />
          <label>Year Established</label>
          <select name="year_established">
            <option value="2009">2009</option>
            <option value="2010">2010</option>
            <option value="2011">2011</option>
          </select>
          <br />
          <h2>Ownership</h2>
          <label>
            <input
              type="radio"
              name="ownership"
              value="owned"
              checked={ownership === 'owned'}
              onChange={handleOwnershipChange}
              required
            />
            Owned
            <br />
          </label>
          <label>
            <input
              type="radio"
              name="ownership"
              value="leased"
              checked={ownership === 'leased'}
              onChange={handleOwnershipChange}
              required
            />
            Leased
            <br />
          </label>
          <br />
          <label>Floor Size</label>
          <input type="text" name="floor_size" onChange={handleChange} required />
          <br />
          <h2>Facilities</h2>
          <label>
            <input type="checkbox" name="charcoal_cooler" onChange={handleChange} required />
            Charcoal cooler
            <br />
          </label>
          <label>
            <input
              type="checkbox"
              name="hand_washing_facility"
              onChange={handleChange}
              required
            />
            Hand washing facility
            <br />
          </label>
          <label>
            <input type="checkbox" name="washrooms" onChange={handleChange} required />
            Washrooms
            <br />
          </label>
          <label>
            <input type="checkbox" name="others" onChange={handleChange} required />
            Others
            <br />
          </label>
          <h2>Input Centers</h2>
          <label>
            <input
              type="radio"
              name="input_center"
              value="yes"
              checked={input === 'yes'}
              onChange={handleInputChange}
              required
            />
            Yes
            <div className="yes-option">
            <label>
                <input type="checkbox" name="input-A" required />
                Input A
              </label>
              <label>
                <input type="checkbox" name="input-B" required />
                Input B
              </label>
              <label>
                <input type="checkbox" name="input-C" required />
                Input C
              </label>
            </div>
            <br />
          </label>
          <label>
            <input
              type="radio"
              name="input_center"
              value="no"
              checked={input === 'no'}
              onChange={handleInputChange}
              required
            />
            No
            <br />
          </label>
          <label>Type of Building</label>
          <select name="type_of_building" onChange={handleBuildingTypeChange} value={buildingType}>
            <option value="Permanent">Permanent</option>
            <option value="Semi-Permanent">Semi-Permanent</option>
          </select>
          <br />
          <h2>GPRS</h2>
          <label>Longitude</label>
          <input type="text" name="gprs_longitude" onChange={handleChange} required />
          <br />
          <label>Latitude</label>
          <input type="text" name="gprs_latitude" onChange={handleChange} required />
          <br />
          <h2>Key Contact 1</h2>
          <label>Last Name</label>
          <input type="text" name="lastname" onChange={handleChange} required />
          <br />
          <label>First Name</label>
          <input type="text" name="firstname" onChange={handleChange} required />
          <br />
          <label>ID Number</label>
          <input type="number" name="id_number" onChange={handleChange} required />
          <br />
          <label>Gender</label>
          <input type="text" name="gender" onChange={handleChange} required />
          <br />
          <label>Date of Birth</label>
          <input
            type="date"
            name="date_of_birth"
            onChange={handleChange}
            ref={dateInputRef}
            required
          />
          <br />
          <label>Email</label>
          <input type="text" name="email" onChange={handleChange} required />
          <br />
          <label>Phone Number</label>
          <input type="text" name="phone_number" onChange={handleChange} required />
          <br />
          <h2>Key Contact 2</h2>
          <label>Last Name</label>
          <input type="text" name="lastname2" onChange={handleChange} required />
          <br />
          <label>First Name</label>
          <input type="text" name="firstname2" onChange={handleChange} required />
          <br />
          <label>ID Number</label>
          <input type="number" name="id_number2" onChange={handleChange} required />
          <br />
          <label>Gender</label>
          <input type="text" name="gender2" onChange={handleChange} required />
          <br />
          <label>Date of Birth</label>
          <input
            type="date"
            name="date_of_birth2"
            onChange={handleChange}
            ref={dateInputRef}
            required
          />
          <br />
          <label>Email</label>
          <input type="text" name="email2" onChange={handleChange} required />
          <br />
          <label>Phone Number</label>
          <input type="text" name="phone_number2" onChange={handleChange} required />
          <br />
        </div>
        <button className="submit-btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Forms;


