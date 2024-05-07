import { Box, Button, Typography } from '@mui/material'
import 'chart.js/auto'

import cerfLogo from '../assets/images/cerf_logo.png'
import progress10 from '../assets/images/progress_10.png'
import React from 'react'

import { fetchCampaignData } from '../utilities/rpc-interface'
import {
  getAllDonationAddresses,
} from '../utilities/database-interface'
import { useEffect, useState, useCallback } from 'react'
import NgoCategory from '../components/NgoCategory'

const getSuppliersListByCategory = (categoryIndex) => {
  // Returns hardcoded results for every categoryIndex

  const suppliersListByCategory = [
    ['Walmart', 'NourishHub', 'AquaPurity'],
    ['MedEquip', 'HealthGuard'],
    ['BuildRight', 'EcoStructs'],
    ['RescueSphere', 'Oracle Response'],
    ['HavenHub', 'ShelterRidge', 'TempTents'],
  ];

  return suppliersListByCategory[categoryIndex];
}

const Ngo = () => {

  const categories = [
    'Food and Water Supplies',
    'Medical Supplies',
    'Infrastructure',
    'Search and Rescue',
    'Temporary Shelters',
  ];

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

  const hardcodedAmounts = [
    2000000,
    3000000,
    2000000,
    1500000,
    1500000
  ]

  useEffect(() => {

    getAllDonationAddresses().then((addresses) => {

      const promises = [];

      for (let i = 0; i < addresses.length; i++) {
        const address = addresses[i];
        promises.push(fetchCampaignData(address));
      }

      Promise.all(promises).then((campaignDataArray) => {

        for (let i = 0; i < addresses.length; i++) {

          const campaignData = campaignDataArray[i];

          const tempArr = [...allCampaignsData]
          tempArr.push(campaignData)
          setAllCampaignsData(tempArr)
        
        }

      })

    })

  }, [])


  return (
    <Box sx={{ backgroundColor: '#ffffff' }}>

      <Box
        sx={{
          height: '36px',
          backgroundColor: '#1976D2',
          color: '#ffffff',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {`Organization View`}
      </Box>

      {allCampaignsData.map((campaignData, index) => {

        console.log(index, campaignData)

        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', padding: '16px' }}>
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Typography
                  sx={{
                    fontSize: '22px',
                    fontFamily: 'Cabin',
                    fontWeight: 'bold',
                    maxWidth: '240px',
                    textAlign: 'center',
                  }}
                >{`Central Emergency Response Fund`}</Typography>
                <Box sx={{ height: '8px' }} />
                <img src={cerfLogo} width={300} height={70} />
              </Box>

              <Box sx={{ width: '64px' }} />

              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography
                      sx={{
                        fontSize: '22px',
                        fontFamily: 'Cabin',
                        fontWeight: 'bold',
                      }}
                    >{`Fundraising Summary`}</Typography>
                    <Box sx={{ height: '4px' }} />
                    {categories.map((category, index) => {
                      return (<React.Fragment key={index}>
                        <Typography
                          key={index} sx={{ fontSize: '20px', fontFamily: 'Cabin' }}
                        >{category}</Typography>
                      </React.Fragment>)
                    })}
                  </Box>
                  <Box sx={{ width: '32px' }} />
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography
                      sx={{
                        fontSize: '22px',
                        fontFamily: 'Cabin',
                        fontWeight: 'bold',
                      }}
                    >{`$${campaignData.maxTotalDonations}`}</Typography>
                    <Box sx={{ height: '4px' }} />
                    {campaignData && campaignData.allocatedAmounts.map((allocatedAmount, index) => {
                      return (<React.Fragment key={index}>
                        <Typography
                          key={index} sx={{ fontSize: '20px', fontFamily: 'Cabin' }}
                        >{`$${hardcodedAmounts[index]}`}</Typography>
                      </React.Fragment>)
                    })}
                  </Box>
                  <Box sx={{ width: '32px' }} />
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography
                      sx={{ fontSize: '24px', fontFamily: 'Cabin', fontWeight: 'bold' }}
                    >{`$${campaignData.totalDonations}`}</Typography>
                    <Box sx={{ height: '4px' }} />
                    <Typography
                      sx={{ fontSize: '16px', fontFamily: 'Cabin' }}
                    >{`of $${campaignData.maxTotalDonations} goal raised`}</Typography>
                    <Box sx={{ height: '4px' }} />
                    <img src={progress10} width={300} />
                  </Box>
                </Box>
              </Box>
            </Box>

            <Box>

              {categories.map((category, index) => {
                return (
                  <React.Fragment key={index}>
                    <Box sx={{ height: '24px' }} />
                    <NgoCategory
                      categoryName={category}
                      suppliers={getSuppliersListByCategory(index)}
                    />
                  </React.Fragment>
                )
              })}

            </Box>
          </Box>
        )
      })}

    </Box>
  )
}

export default Ngo
