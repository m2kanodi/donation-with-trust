import { Chip, Box, Typography, Button } from '@mui/material'
import cerfLogo from '../assets/images/cerf_logo.png'
import media1 from '../assets/images/media1.jpeg'
import progress10 from '../assets/images/progress_10.png'
import logo from '../assets/images/logo.jpg'
import React, { useState, useEffect } from 'react'
import { fetchCampaignData } from '../utilities/rpc-interface.js'
import { getAllDonationAddresses, getSupplier } from '../utilities/database-interface.js'
import DollarAmountModal from '../components/DollarAmountModal'
import handleButtonClick from '../utilities/donateLogic'
import { CATEGORY_NAMES } from '../utilities/category-names-mapper'

const Donator = () => {
  
  const tags = [
    'Tsunami',
    'Flooding',
    'Food Aid',
    'Safe Water Supply',
    'Medicine',
  ]
  
  const [isDonateModalOpen, setIsDonateModalOpen] = useState(false);
  const [allCampaignsData, setAllCampaignsData] = useState([])

  const [addressToOrgNameMap, setAddressToOrgNameMap] = useState({
    "0x34a60D98966B88B90A275b039DB2fBC2fFCf50A8": "NourishHub",
    "0xe2c708E4901F3e331C7c8131d4cB0F07eEf37dc4": "NourishHub",
    "0x20D25Ad5DA88d4C5F8f854A1062e5f1c83A97F08": "AquaPurity",
    "0x5B6E22Ad6e8A8DA156a603BC4310F80c8445bca4": "MedEquip",
    "0x95727450EBe0C0105FecBc61Cc1602Da48b06309": "HealthGuard",
    "0x42b19A2a0bC3bF558A6d90DB01835d47501cfB72": "BuildRight",
    "0xBc8609f00F8C16F171550529220de8aEdE27aaB9": "EcoStructs",
    "0xc2D4463e15F4611870C27a2b43E243dA74141d6d": "RescueSphere",
    "0x705c835260506dCE9946f14202b1147204b14c75": "Oracle Response",
    "0xB647a8F0C4560b74E0e3d526300C349A7936Cc41": "HavenHub",
    "0x57E7aB7206D22354D97b8Ee5CebA3c6B8ceC99bf": "ShelterRidge",
    "0xC97C92E2D3102c0fC68A5918F095E1D3e3D347D7": "TempTents"
  });

  useEffect(() => {

    getAllDonationAddresses().then((addresses) => {

      const promises = [];

      for (let i = 0; i < addresses.length; i++) {
        const address = addresses[i];
        promises.push(fetchCampaignData(address));
      }

      Promise.all(promises).then((campaignDataArray) => {
        
        const arrayOfAddresses = [];

        for (let i = 0; i < addresses.length; i++) {

          const campaignData = campaignDataArray[i];

          const tempArr = [...allCampaignsData]
          tempArr.push(campaignData)
          setAllCampaignsData(tempArr)
        
        }

      })

    })

  }, [])

  const onDonateClicked = () => {
    setIsDonateModalOpen(true);
  }

  return (
    <Box
      sx={{
        backgroundColor: '#ffffff',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >

      {allCampaignsData.map((campaignData, index) => {

        return (<>

          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <img src={cerfLogo} width={300} height={70} />
            <Box sx={{ marginLeft: 'auto', marginRight: '16px' }}>
              <img src={logo} width={300} />
            </Box>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography
              sx={{ fontSize: '24px', fontWeight: 'bold', fontFamily: 'Cabin' }}
            >
              {`Unite for Resilience: Together We Can Rebuild, Renew and Restore!`}
            </Typography>
            <Box sx={{ height: '8px' }} />
            <Box>
              {tags.map((tag, index) => (
                <>
                  <Chip
                    key={index}
                    label={tag}
                    variant='contained'
                    color='primary'
                    sx={{ fontFamily: 'Cabin' }}
                  />
                  <Box sx={{ width: '6px', display: 'inline-block' }} />
                </>
              ))}
            </Box>
            <Box sx={{ height: '16px' }} />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <img src={media1} width={800} />
            <Box sx={{ width: '32px' }} />
            <Box>
              <Box sx={{ height: '24px' }} />
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <img src={progress10} width={300} />
                <Box sx={{ height: '12px' }} />
                <Typography
                  sx={{ fontSize: '24px', fontWeight: 'bold', fontFamily: 'Cabin' }}
                >{`$${campaignData.totalDonations}`}</Typography>
                <Typography
                  sx={{ fontSize: '16px', fontFamily: 'Cabin' }}
                >{`of $${campaignData.maxTotalDonations} goal raised`}</Typography>
              </Box>
              <Box sx={{ height: '24px' }} />
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography
                  sx={{ fontSize: '24px', fontWeight: 'bold', fontFamily: 'Cabin' }}
                >{`60`}</Typography>
                <Typography
                  sx={{ fontSize: '16px', fontFamily: 'Cabin' }}
                >{`supporters`}</Typography>
              </Box>
              <Box sx={{ height: '24px' }} />
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography
                  sx={{ fontSize: '24px', fontWeight: 'bold', fontFamily: 'Cabin' }}
                >{`15 Days`}</Typography>
                <Typography
                  sx={{ fontSize: '16px', fontFamily: 'Cabin' }}
                >{`left to support`}</Typography>
              </Box>
              <Box sx={{ height: '24px' }} />
              <Button
                disableElevation={true}
                variant='contained'
                sx={{ fontSize: '16px', fontFamily: 'Cabin' }}
                onClick={onDonateClicked}
              >
                {`Donate Online`}
              </Button>
            </Box>
          </Box>

          <Box sx={{ height: '24px' }}></Box>

          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <Box
              sx={{ display: 'flex', flexDirection: 'column', maxWidth: '800px' }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: '8px',
                  overflow: 'hidden',
                }}
              >
                <Box
                  sx={{
                    backgroundColor: '#1976D2',
                    color: '#ffffff',
                    padding: '8px',
                    display: 'flex',
                    justifyContent: 'center',
                    fontSize: '18px',
                  }}
                >
                  {`Our Goal`}
                </Box>
                <Box sx={{ backgroundColor: '#e0f0ff', padding: '8px' }}>
                  {`Join our mission to raise `}
                  <Typography
                    variant='span'
                    sx={{ fontWeight: 'bold' }}
                  >{`$${campaignData.maxTotalDonations} for emergency medical aid,`}</Typography>
                  {` providing critical support to the most vulnerable people in the world.`}
                </Box>
              </Box>
              <Box sx={{ height: '24px' }}></Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: '8px',
                  overflow: 'hidden',
                }}
              >
                <Box
                  sx={{
                    backgroundColor: '#1976D2',
                    color: '#ffffff',
                    padding: '8px',
                    display: 'flex',
                    justifyContent: 'center',
                    fontSize: '18px',
                  }}
                >
                  {`Our Smart Contract`}
                </Box>
                <Box sx={{ backgroundColor: '#e0f0ff', padding: '8px' }}>
                  <Box>
                    <Typography
                      sx={{ fontWeight: 'bold', fontFamily: 'Cabin' }}
                    >{`Total Amount: $${campaignData.maxTotalDonations}`}</Typography>

                    {campaignData.allocatedAmounts.map((allocatedAmount, index) => {

                      const recipientAddresses = campaignData.allowedRecipients[index];

                      return (<React.Fragment key={index}>
                        <Typography
                          sx={{ fontWeight: 'bold', fontFamily: 'Cabin', marginTop: '4px' }}
                        >{`${CATEGORY_NAMES[index]}: $${allocatedAmount} (${allocatedAmount * 100n / campaignData.maxTotalDonations}%)`}</Typography>
                        {recipientAddresses.map((recipientAddress, index) => {
                          return (<Typography
                            sx={{ fontFamily: 'Cabin', marginLeft: '8px' }}
                          >{`- ${recipientAddress} (${addressToOrgNameMap[recipientAddress]})`}</Typography>)
                        })}
                      </React.Fragment>)

                    })}

                  </Box>
                </Box>
              </Box>
            </Box>
            <Box sx={{ width: '32px' }} />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography
                sx={{ fontSize: '24px', fontFamily: 'Cabin', fontWeight: 'bold' }}
              >{`Key Information`}</Typography>
              <Box sx={{ height: '8px' }} />
              <Typography
                sx={{ fontSize: '16px', fontFamily: 'Cabin', fontWeight: 'bold' }}
              >{`Purpose`}</Typography>
              <Typography
                sx={{ fontSize: '16px', fontFamily: 'Cabin' }}
              >{`Emergency Medical Aid`}</Typography>
              <Box sx={{ height: '8px' }} />
              <Typography
                sx={{ fontSize: '16px', fontFamily: 'Cabin', fontWeight: 'bold' }}
              >{`Minimum Donation`}</Typography>
              <Typography
                sx={{ fontSize: '16px', fontFamily: 'Cabin' }}
              >{`$1`}</Typography>
              <Box sx={{ height: '8px' }} />
              <Typography
                sx={{ fontSize: '16px', fontFamily: 'Cabin', fontWeight: 'bold' }}
              >{`Goal`}</Typography>
              <Typography
                sx={{ fontSize: '16px', fontFamily: 'Cabin' }}
              >{`$${campaignData.maxTotalDonations}`}</Typography>
              <Box sx={{ height: '8px' }} />
              <Typography
                sx={{ fontSize: '16px', fontFamily: 'Cabin', fontWeight: 'bold' }}
              >{`Fundraising End Date`}</Typography>
              <Typography
                sx={{ fontSize: '16px', fontFamily: 'Cabin' }}
              >{`31 December 2023`}</Typography>
            </Box>
          </Box>

        </>)

      })}
      
      <DollarAmountModal open={isDonateModalOpen} handleClose={() => setIsDonateModalOpen(false)} handleSubmit={(amount) => handleButtonClick(amount)} />

    </Box>
  )
}

export default Donator
