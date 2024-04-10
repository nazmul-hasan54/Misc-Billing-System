/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  //apiUrl: "https://infonetlimited.com/api/v1/",
  //apiUrl: "http://119.40.95.187:1001/api/v1/",
  //apiUrl: "http://localhost:5160/api/v1/",
//  apiUrl: "http://27.147.216.162:1001/api/v1/",
  apiUrl: "http://119.40.95.184:3001/api/v1/",
  hubUrl: "http://localhost:5017/hubs/alarms/",
  mapPath: "../.././../../assets/images/cfems_map.png",
  cfemsLogo: "../../../../assets/images/cfems-logo.svg",
  ltaLogo: "../../../../assets/images/lta-logo.svg",
};
