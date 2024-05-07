import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Box, Divider, Typography } from '@mui/material';
import { submitForm } from '../utilities/submit-new-campaign';

const NgoNewCampaign = () => {

  const [formData, setFormData] = useState({
    cause: null,
    totalAmount: null,
    categories: [
      {
        name: null,
        amount: null
      },
      {
        name: null,
        amount: null
      },
      {
        name: null,
        amount: null
      },
      {
        name: null,
        amount: null
      },
      {
        name: null,
        amount: null
      }
    ]
  });

  const handleSubmit = (e) => {

    e.preventDefault();
    
    // Make sure no nulls
    if (formData.cause === null) {
      alert('Please enter a cause');
      return;
    }

    if (formData.totalAmount === null) {
      alert('Please enter a total amount');
      return;
    }

    for (let i = 0; i < formData.categories.length; i++) {
      if (formData.categories[i].name === null) {
        alert(`Please enter a name for category ${i + 1}`);
        return;
      }

      if (formData.categories[i].amount === null) {
        alert(`Please enter an amount for category ${i + 1}`);
        return;
      }
    }

    // Make sure total amount is equal to sum of category amounts
    let sum = 0;
    for (let i = 0; i < formData.categories.length; i++) {
      sum += parseInt(formData.categories[i].amount);
    }

    if (sum !== parseInt(formData.totalAmount)) {
      alert('Total amount must equal sum of category amounts');
      return;
    }

    submitForm(formData.totalAmount, '0xCf17b96a46d758802b51994eC522719634Bb84D9', formData.categories.map((category) => category.amount / formData.totalAmount * 100));

  };

  return (

    <Box sx={{ backgroundColor: '#f4f4f4', position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Box sx={{ backgroundColor: '#ffffff', padding: '16px', borderRadius: '16px', minWidth: '720px', width: '35%', marginTop: '80px', marginBottom: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>

        <Typography sx={{ fontSize: '24px', fontWeight: 'bold', fontFamily: 'Cabin' }}>{`New Fundraising Campaign`}</Typography>

        <Box sx={{ height: '24px' }} />

        <TextField
          required
          type='text'
          fullWidth
          label="Campaign Cause"
          variant="outlined"
          name="cause"
          value={formData.cause}
          onChange={(e) => {
            const cause = e.target.value;
            setFormData({
              ...formData,
              cause: cause
            });
          }}
          inputProps={{style: {fontFamily: 'Cabin'}}} // font size of input text
          InputLabelProps={{style: {fontFamily: 'Cabin'}}} // font size of input label
        />

        <Box sx={{ height: '16px' }} />

        <TextField
          required
          type='number'
          fullWidth
          label="Total Amount (USD)"
          variant="outlined"
          name="total_amount"
          value={formData.totalAmount}
          onChange={(e) => {
            const totalAmount = e.target.value;
            setFormData({
              ...formData,
              totalAmount: totalAmount
            });
          }}
          inputProps={{style: {fontFamily: 'Cabin'}}} // font size of input text
          InputLabelProps={{style: {fontFamily: 'Cabin'}}} // font size of input label

        />

        {formData.categories.map((category, index) => {

          return (
            <React.Fragment key={index}>
              <Divider sx={{ marginTop: '16px', marginBottom: '16px', width: '100%' }} />
              <TextField
                required
                type='text'
                fullWidth
                label={`Category Name ${index + 1}`}
                variant="outlined"
                name={category.name}
                value={formData.categories[index].name}
                onChange={(e) => {
                  const name = e.target.value;
                  setFormData({
                    ...formData,
                    categories: [
                      ...formData.categories.slice(0, index),
                      {
                        ...formData.categories[index],
                        name: name
                      },
                      ...formData.categories.slice(index + 1)
                    ]
                  });
                }}
                inputProps={{style: {fontFamily: 'Cabin'}}} // font size of input text
                InputLabelProps={{style: {fontFamily: 'Cabin'}}} // font size of input label
              />
              <Box sx={{ height: '16px' }} />
              <TextField
                required
                type='number'
                fullWidth
                label={'Category Amount (USD)'}
                variant="outlined"
                name={category.name}
                value={formData.categories[index].amount}
                onChange={(e) => {
                  const amount = e.target.value;
                  setFormData({
                    ...formData,
                    categories: [
                      ...formData.categories.slice(0, index),
                      {
                        ...formData.categories[index],
                        amount: amount
                      },
                      ...formData.categories.slice(index + 1)
                    ]
                  });
                }}
                inputProps={{style: {fontFamily: 'Cabin'}}} // font size of input text
                InputLabelProps={{style: {fontFamily: 'Cabin'}}} // font size of input label
              />
            </React.Fragment>
          )

        })}

        <Box sx={{ height: '16px' }} />

        <Button size='large' variant='contained' disableElevation sx={{ fontFamily: 'Cabin' }} onClick={handleSubmit}>
          {`Submit`}
        </Button>

      </Box>
    </Box>

  );
};

export default NgoNewCampaign;
