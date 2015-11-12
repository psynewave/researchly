export default {
  TRENDS_URL : "https://mlspro.staging.mlslistings.com/odata/Growth/MarketTrends?$filter=Class%20eq%20%27Residential%20-%20Single%20Family%27",
  PARCELS_URL: 'https://rets.io/api/v1/pub/parcels?access_token=43224a475a157d1286c4b16dc75d5a7c&limit=10&landUseCode=rr',
  TRANSACTIONS_URL : 'https://rets.io/api/v1/pub/transactions?access_token=43224a475a157d1286c4b16dc75d5a7c&limit=10',
  ASSESSMENTS_URL: 'https://rets.io/api/v1/pub/assessments?access_token=43224a475a157d1286c4b16dc75d5a7c&limit=10',
  TRENDS_URL : "https://mlspro.staging.mlslistings.com/odata/Growth/MarketTrends?$filter=Class%20eq%20%27Residential%20-%20Single%20Family%27",
  //LISTINGS_URL: "https://rets.io/api/v1/armls/listings/",
  LISTINGS_URL: "http://api.mlslistings.com/api/search/PropertyDetailsByMLSNumber/",
  COMING_SOON_URL: "./Portal/api/comingSoon.json",
  // PARCELS_URL: './Portal/api/parcels.json',
  // TRANSACTIONS_URL : './Portal/api/transactions.json',
  // ASSESSMENTS_URL: './Portal/api/assessments.json',
  // LISTINGS_URL: './Portal/api/listings.json',
  NEW_LOC: 'NEW_LOC',
  NEW_TRENDS: 'NEW_TRENDS',
  NEW_COMPS:'NEW_COMPS',
  CACHED_TRENDS: 'CACHED_TRENDS',
  TREND_EVENT_COUNTY:'TE_County',
  TREND_EVENT_CITY:'TE_City',
  TREND_EVENT_ZIP:'TE_Zip',
  NEW_NOTES:'NEW_NOTES',
  NEW_LEVEL:'NEW_LEVEL',
  NEW_PARCELS:'NEW_PARCELS',
  NEW_ASSESSMENTS:'NEW_ASSESSMENTS',
  NEW_ASSESSMENTS:'NEW_ASSESSMENT',
  NEW_TRANSACTIONS:'NEW_TRANSACTIONS',
  PARCELS_RECEIVED:'PARCELS_RECEIVED',
  ASSESSMENTS_RECEIVED:'ASSESSMENTS_RECEIVED',
  ASSESSMENT_RECEIVED:'ASSESSMENT_RECEIVED',
  TRANSACTIONS_RECEIVED:'TRANSACTIONS_RECEIVED',
  COMPS_RECEIVED:'COMPS_RECEIVED',
  NOTES_RECEIVED:'NOTES_RECEIVED',
  REBIND_PAPER:'REBIND_PAPER',
  APN_CHANGED:'APN_CHANGED'
};
